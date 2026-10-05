const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../game.js');
// Constructed unit fixtures isolate accounting and resource recipes; these are not legal campaign evidence.
function fixture(){const s=G.newGame();s.started=true;s.researchRevision=0;s.done=G.content.projects.filter(p=>!p.historyYear).map(p=>p.id);s.qualified=G.content.experiments.map(e=>e.id);s.reputation=s.qualified.length;Object.assign(s,{funds:1e6,designs:1e5,pulse:8,drift:.005,engineering:['workshop'],workshops:1});return s;}
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} differs from ${b}`);

test('Quotes trade commitment and lead time; purchase and arrival grant no active physical qubits',()=>{
  const s=fixture();s.engineering=[];s.workshops=0;const before=G.metrics(s),funds=s.funds,designs=s.designs;
  const local=G.procurementStatus(s,'local','chip'),bulk=G.procurementStatus(s,'bulk','chip');assert.equal(local.nonCancellable,true);assert.ok(local.seconds<bulk.seconds);assert.ok(local.cost<bulk.cost);assert.ok(local.cost/local.units>bulk.cost/bulk.units);
  assert.equal(G.orderEquipment(s,'local','chip'),true);assert.equal(s.funds,funds-220);assert.equal(s.designs,designs-12);assert.equal(G.metrics(s).active,before.active);assert.equal(s.chipStock,0);
  G.tick(s,19);assert.equal(s.chipStock,0);assert.equal(s.orders[0].remaining,1);G.tick(s,1);assert.equal(s.chipStock,64);assert.equal(s.orders.length,0);assert.equal(G.metrics(s).installed,before.installed);assert.equal(G.metrics(s).active,before.active);
  G.tick(s,60);assert.equal(s.chipStock,64,'Delivered stock requires workshop equipment and funded assembly');assert.equal(G.metrics(s).active,1);
});

test('Final orders require full funding/designs and reserve at most two delivery slots',()=>{
  const s=fixture();s.funds=219;const before=G.serialize(s);assert.equal(G.orderEquipment(s,'local','chip'),false);assert.equal(G.serialize(s),before);
  s.funds=10000;s.designs=11;assert.equal(G.orderEquipment(s,'local','chip'),false);s.designs=1000;assert.equal(G.orderEquipment(s,'local','chip'),true);assert.equal(G.orderEquipment(s,'bulk','support'),true);assert.equal(G.orderEquipment(s,'local','chip'),false);assert.equal(s.orders.length,2);
  s.paused=true;const paused=G.serialize(s);G.tick(s,999);assert.equal(G.serialize(s),paused);s.paused=false;const restored=G.parseSave(G.serialize(s));assert.deepEqual(restored,s);
  const invalid=JSON.parse(G.serialize(s)).state;invalid.orders[0].remaining=5;assert.throws(()=>G.parseSave(G.serialize(invalid)),/delivery/);
});

test('Shared fabrication splits fully conserve prefab stock, assembly funding and partial-tick in-house fallback',()=>{
  const s=fixture();s.chipStock=.3;s.supportStock=2;const before={fabricated:s.fabricated,integrated:s.integrated,chip:s.chipStock,support:s.supportStock,funds:s.funds},m=G.metrics(s,.5);
  close(m.prefabFabricationRate,.6);close(m.inhouseFabricationRate,.3);close(m.prefabIntegrationRate,1.2);close(m.inhouseIntegrationRate,0);
  G.tick(s,.5);close(s.chipStock,0);close(s.supportStock,before.support-.6);close(s.fabricated-before.fabricated,.45);close(s.integrated-before.integrated,.6);close(s.funds-before.funds,m.netFunding*.5);assert.equal(G.metrics(s).active,1,'Fractional assembly cannot be counted as physical capacity');
  const noStock=fixture();assert.equal(G.metrics(noStock).prefabFabricationRate,0);close(G.metrics(noStock).inhouseFabricationRate,.6);
  const stocked=fixture();stocked.chipStock=64;stocked.supportStock=64;assert.equal(G.metrics(stocked).fabricationRate,2*G.metrics(noStock).fabricationRate);close(G.metrics(stocked).upkeep,G.metrics(noStock).upkeep,'Twice unit output at half assembly cost preserves cost per workshop time');
});

test('Atomic apparatus work stops assembly while external delivery remains visible laboratory time',()=>{
  const s=fixture();s.chipStock=64;s.supportStock=64;assert.equal(G.orderEquipment(s,'local','chip'),true);assert.equal(G.calibrate(s),true);const before={chip:s.chipStock,support:s.supportStock,fab:s.fabricated,int:s.integrated};G.tick(s,1);assert.equal(s.job.id,'calibrate');assert.equal(s.chipStock,before.chip);assert.equal(s.supportStock,before.support);assert.equal(s.fabricated,before.fab);assert.equal(s.integrated,before.int);assert.equal(s.orders[0].remaining,19,'Suppliers do not reserve the quantum apparatus');
  G.tick(s,3);G.tick(s,1);assert.ok(s.chipStock<before.chip);assert.ok(s.fabricated>before.fab);
});

test('Chip and support assembly feed the limiting physical resource; funding scarcity cannot mint units',()=>{
  const s=fixture();s.chipStock=64;s.supportStock=64;G.configure(s,'fabrication',1);G.tick(s,10);assert.ok(G.metrics(s).installed>1);assert.equal(G.metrics(s).capacity,1);assert.equal(G.metrics(s).active,1);assert.equal(s.supportStock,64);
  G.configure(s,'fabrication',0);G.tick(s,10);assert.ok(G.metrics(s).active>1);assert.ok(s.supportStock<64);
  s.funds=0;const m=G.metrics(s);assert.equal(m.fabricationRate,0);assert.equal(m.integrationRate,0);assert.equal(m.upkeep,.06,'Assembly spends available funding; only future grants can restart it');
});

test('Pending inventory reserves the eventual ceiling across concurrent in-house work and preset upgrades',()=>{
  const s=fixture();Object.assign(s,{module:5,rack:5,fabricated:7400,integrated:7400});assert.equal(G.orderEquipment(s,'local','chip'),false);s.fabricated=6800;assert.equal(G.orderEquipment(s,'bulk','chip'),true);assert.equal(G.buyUpgrade(s,'hardware'),false,'An upgrade cannot silently discard already paid equipment');
  s.fabricated=6912;assert.equal(G.metrics(s).inhouseFabricationRate,0,'In-house production must respect units already reserved by a delivery');G.tick(s,90);assert.equal(s.chipStock,512);G.tick(s,500);assert.ok(s.chipStock>=0);assert.ok(769+s.fabricated+s.chipStock<=8193+1e-8);assert.ok(G.metrics(s).installed<=8193);assert.deepEqual(G.parseSave(G.serialize(s)),s);
  const bad=JSON.parse(G.serialize(s)).state;bad.chipStock=8192;assert.throws(()=>G.parseSave(G.serialize(bad)),/physical ceiling/);
});

test('Same32-data-spin schedules expose workspace, complete waiting risk and a factory-dependent crossover',()=>{
  const s=fixture();Object.assign(s,{module:6,rack:6,fabricated:1000,integrated:1000,distance:5,decoder:3,factories:1,credits:2000});
  const balanced=G.workloadStatus(s,'dynamics','balanced'),compact=G.workloadStatus(s,'dynamics','compact'),parallel=G.workloadStatus(s,'dynamics','parallel');assert.equal(compact.dataWidth,32);assert.equal(compact.workspace,0);assert.equal(parallel.dataWidth,32);assert.equal(parallel.workspace,8);assert.equal(parallel.width,40);assert.ok(compact.runtime<balanced.runtime,'Reduced fresh-state demand compensates compact depth with one factory');assert.ok(compact.risk<balanced.risk);assert.equal(compact.credits,128);assert.equal(balanced.credits,192);assert.ok(compact.runtime<parallel.runtime,'One factory makes the extra fresh-state lane costly');
  s.factories=3;const threeBalanced=G.workloadStatus(s,'dynamics','balanced'),threeCompact=G.workloadStatus(s,'dynamics','compact'),threeParallel=G.workloadStatus(s,'dynamics','parallel');assert.ok(threeBalanced.runtime<threeCompact.runtime,'Balanced beats compact once factory supply no longer dominates');assert.ok(threeParallel.runtime<threeBalanced.runtime,'More workspace can beat balanced when factory supply supports it');assert.ok(threeParallel.runtime<threeCompact.runtime,'Three factories make lower-depth workspace worthwhile');
  for(const status of [compact,parallel,threeCompact,threeParallel]){close(status.risk,Object.values(status.parts).reduce((sum,value)=>sum+value,0));assert.ok(status.idle>0);assert.ok(status.parts.memory>0);assert.ok(status.parts.gates>0);assert.ok(status.parts.states>0);}
  assert.equal(G.configure(s,'logicalRecipe','parallel'),true);assert.equal(G.startWorkload(s,'dynamics'),true);assert.equal(s.job.recipe,'parallel');assert.equal(G.configure(s,'logicalRecipe','compact'),false);const restored=G.parseSave(G.serialize(s));assert.deepEqual(restored.job,s.job);assert.equal(G.liveWorkloadStatus(s,'dynamics').recipe,'parallel');
});

test('Larger-distance footprint refuses parallel workspace; compact trades fresh-state credits against time',()=>{
  const s=fixture();Object.assign(s,{module:6,rack:6,fabricated:6144,integrated:6144,distance:9,decoder:3,factories:3,credits:2000});
  assert.equal(G.metrics(s).active,8193);assert.equal(G.metrics(s).slots,35);assert.equal(G.workloadStatus(s,'dynamics','compact').ready,true);assert.equal(G.workloadStatus(s,'dynamics','parallel').ready,false);assert.ok(G.workloadStatus(s,'dynamics','parallel').reasons.some(reason=>reason.includes('40 application')));
  s.credits=128;assert.equal(G.workloadStatus(s,'dynamics','compact').ready,true);assert.equal(G.workloadStatus(s,'dynamics','balanced').ready,false,'The compact plan can run with fewer fresh-state rehearsal credits');
  s.done=s.done.filter(id=>id!=='state-readiness');assert.equal(G.configure(s,'logicalRecipe','parallel'),false);assert.equal(G.workloadStatus(s,'dynamics','compact').ready,false);assert.equal(G.configure(s,'logicalRecipe','balanced'),true);
});


test('Captured alternative completion records its actual recipe and never pays the task twice',()=>{
  const s=fixture();Object.assign(s,{module:6,rack:6,fabricated:1000,integrated:1000,distance:5,decoder:3,factories:3,credits:2000,calibration:.3});assert.equal(G.configure(s,'logicalRecipe','parallel'),true);assert.equal(G.startWorkload(s,'dynamics'),true);assert.equal(s.credits,2000-256);
  for(let i=0;i<100&&s.job;i++)G.tick(s,1);assert.equal(s.job,null);assert.equal(s.ended,true);assert.equal(s.completedRecipes.dynamics,'parallel');assert.equal(s.endingRecord.recipe,'parallel');assert.deepEqual(G.parseSave(G.serialize(s)),s);
  assert.equal(G.continueLaboratory(s),true);assert.equal(G.configure(s,'logicalRecipe','compact'),true);const before=G.serialize(s);assert.equal(G.startWorkload(s,'dynamics'),false);assert.equal(G.serialize(s),before);
});

test('An audit after later experiments keeps the executed schedule rather than the idle planner',()=>{
  const s=fixture();s.done=s.done.filter(id=>id!=='audit');Object.assign(s,{module:6,rack:6,fabricated:1000,integrated:1000,distance:5,decoder:3,factories:3,credits:2000,calibration:.3,engineering:['workshop','storage1','storage2','storage3'],notebooks:5,effort:34000});
  assert.equal(G.configure(s,'logicalRecipe','compact'),true);assert.equal(G.startWorkload(s,'dynamics'),true);assert.equal(s.credits,2000-128);for(let i=0;i<100&&s.job;i++)G.tick(s,1);assert.equal(s.ended,false);assert.equal(s.endingRecord,null);assert.equal(s.completedRecipes.dynamics,'compact');
  assert.equal(G.configure(s,'logicalRecipe','parallel'),true);assert.equal(G.startExperiment(s,'signal'),true);for(let i=0;i<20&&s.job;i++)G.tick(s,1);assert.equal(s.result.id,'signal','A later ordinary result must not erase the scientific schedule history');
  assert.equal(G.buyProject(s,'audit'),true);assert.equal(s.ended,true);assert.equal(s.logicalRecipe,'parallel');assert.equal(s.endingRecord.recipe,'compact');assert.deepEqual(G.parseSave(G.serialize(s)),s);
});
