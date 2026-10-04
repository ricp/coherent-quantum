const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../game.js');
const {play}=require('./playthrough.cjs');
// Unit fixtures isolate economy rules. Full campaign players below never inject resources.
function research(){
  const s=G.newGame();s.started=true;s.done=['feynman','deutsch'];s.qualified=['signal'];s.reputation=1;s.staff=3;s.funds=1000;s.designs=100;
  return s;
}
function laboratory(){
  const s=G.newGame();s.started=true;s.done=G.content.projects.map(p=>p.id);s.qualified=G.content.experiments.map(e=>e.id);s.reputation=s.qualified.length;s.module=2;s.rack=2;s.pulse=4;s.drift=.005;s.service=.5;s.calibration=.2;s.funds=1e5;
  return s;
}
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-9,actual+' != '+expected);
test('Researchers and notebooks share earned trust; a greedy allocation can recover without resetting',()=>{
  const s=research(),m=G.metrics(s);assert.equal(m.freeTrust,0);
  assert.equal(G.assign(s,'staff',1),false);assert.equal(G.assign(s,'notebooks',1),false);
  s.effort=m.effortCap;G.tick(s,5);assert.equal(s.effort,m.effortCap,'More staff cannot exceed note capacity');
  assert.equal(G.assign(s,'staff',-1),true);assert.equal(G.assign(s,'notebooks',1),true);
  const recovered=G.metrics(s);assert.equal(recovered.effortCap,2*m.effortCap);assert.ok(recovered.effortRate<m.effortRate,'Capacity has a real research-throughput opportunity cost');
  G.tick(s,5);assert.ok(s.effort>m.effortCap);assert.deepEqual(s.done,['feynman','deutsch']);assert.equal(s.reputation,1);
});
test('Removing notebook space cannot silently destroy banked research',()=>{
  const s=research();assert.equal(G.assign(s,'staff',-1),true);assert.equal(G.assign(s,'notebooks',1),true);s.effort=200;
  const before=G.serialize(s);assert.equal(G.assign(s,'notebooks',-1),false);assert.equal(G.serialize(s),before);
  assert.equal(G.buyEngineering(s,'workflow'),true);assert.equal(s.effort,110);
  assert.equal(G.assign(s,'notebooks',-1),true);assert.equal(s.effort,110,'Only an explicit purchase spends notes');
});
test('A full research bank accelerates designs; spending notes removes that bonus',()=>{
  const s=research(),base=G.metrics(s).designRate;s.effort=G.metrics(s).effortCap;
  assert.equal(G.metrics(s).designBonus,4);close(G.metrics(s).designRate,4*base);
  const before=s.designs;G.tick(s,1);close(s.designs-before,4*base);
  assert.equal(G.buyEngineering(s,'workflow'),true);assert.equal(G.metrics(s).designBonus,1);assert.ok(G.metrics(s).designRate<4*base,'Spending the bank removes its bonus even though workflow also improves design production');assert.ok(G.metrics(s).designRate>base,'Paid workflow must improve actual production');
});
test('Storage tiers change capacity rather than fabricating notes or scientific evidence',()=>{
  const s=research();s.effort=100;const before=G.metrics(s);
  assert.equal(G.buyEngineering(s,'storage1'),true);
  assert.equal(G.metrics(s).effortCap,4*before.effortCap);assert.equal(s.effort,20);assert.equal(s.reputation,1);
  assert.equal(G.metrics(s).fullBank,false,'More storage postpones the full-bank design bonus');
});
test('Contracts pay only for qualified work actually delivered within demand and customer capacity',()=>{
  const s=laboratory();G.configure(s,'price',.5);let m=G.metrics(s);
  assert.equal(m.serviceQualified,true);assert.ok(m.delivered<=m.demand);assert.ok(m.delivered<=m.customerCapacity);close(m.revenue,m.delivered*m.price);
  const available=m.customerCapacity;G.configure(s,'price',200);m=G.metrics(s);assert.ok(m.demand<available);close(m.delivered,m.demand);
  s.pulse=0;m=G.metrics(s);assert.equal(m.delivered,0);assert.equal(m.revenue,0,'Noisy hardware cannot sell qualified service capacity');
  s.pulse=4;s.drift=.26;assert.equal(G.metrics(s).revenue,0,'Historical qualification does not certify current drift');
});
test('Paid automation consumes shared capacity before customers and stops when none is allocated',()=>{
  const s=laboratory();s.engineering=['automation'];s.automation=4;let m=G.metrics(s);
  assert.ok(m.automationRunning>0);assert.ok(m.automationRunning<=m.sharedCapacity);close(m.customerCapacity,m.sharedCapacity-m.automationRunning);
  assert.equal(m.customerCapacity,0,'Purchased stations do not create free controller capacity');assert.equal(m.revenue,0);
  const automated=m.effortRate;G.configure(s,'service',0);m=G.metrics(s);assert.equal(m.automationRunning,0);assert.ok(m.effortRate<automated);close(m.effortRate,1.2*s.staff);
  const effort=s.effort;G.tick(s,1);close(s.effort-effort,m.effortRate);
});
test('Owned automation can be idled to recover customer revenue without selling stations or resetting',()=>{
  const s=laboratory();s.engineering=['automation'];s.automation=4;assert.equal(G.metrics(s).customerCapacity,0);
  assert.equal(G.configure(s,'analysisShare',.25),true);const partial=G.metrics(s);
  assert.equal(partial.automationRequested,1);assert.equal(partial.automationRunning,1);assert.ok(partial.customerCapacity>0);assert.ok(partial.revenue>0);assert.equal(s.automation,4);
  assert.equal(G.configure(s,'analysisShare',0),true);const idle=G.metrics(s);assert.equal(idle.automationRunning,0);assert.ok(idle.revenue>partial.revenue);assert.equal(s.automation,4);
  assert.equal(G.configure(s,'analysisShare',1),true);assert.equal(G.metrics(s).customerCapacity,0);assert.equal(G.metrics(s).revenue,0);
});
test('Unavailable or malformed automation duty cannot be configured or imported',()=>{
  const s=research(),before=G.serialize(s);assert.equal(G.configure(s,'analysisShare',.5),false);assert.equal(G.serialize(s),before);
  for(const value of [-1,1.1,'0.5',null]){const copy=JSON.parse(before).state;copy.analysisShare=value;assert.throws(()=>G.parseSave(G.serialize(copy)));}
  const available=laboratory();available.engineering=['automation'];
  for(const value of [-1,1.1,NaN,Infinity,'0.5',null])assert.equal(G.configure(available,'analysisShare',value),false);
});
test('Calibration, frontier experiments and services share one apparatus budget',()=>{
  const s=laboratory();let m=G.metrics(s);close(m.calibrationDuty+m.effectiveServiceDuty+m.experimentDuty,1);
  const previousDuty=m.experimentDuty;G.configure(s,'service',.8);m=G.metrics(s);assert.ok(m.experimentDuty<previousDuty);close(m.calibrationDuty+m.effectiveServiceDuty+m.experimentDuty,1);
  s.module=3;s.rack=3;s.engineering=['automation','workshop'];s.automation=1;s.workshops=1;
  assert.equal(G.startExperiment(s,'memory'),true);m=G.metrics(s);
  assert.equal(m.atomic,true);assert.equal(m.effectiveServiceDuty,0);assert.equal(m.automationRunning,0);assert.equal(m.fabricationRate,0);assert.equal(m.integrationRate,0);close(m.calibrationDuty+m.experimentDuty,1);
  const physical=m.active;G.tick(s,1);assert.equal(G.metrics(s).active,physical,'An atomic qualification owns its footprint while running');
});
test('Manual calibration reserves the apparatus and pauses services, automation and commissioning',()=>{
  const s=laboratory();s.engineering=['automation','workshop'];s.automation=1;s.workshops=1;
  assert.equal(G.calibrate(s),true);const m=G.metrics(s);
  assert.equal(m.calibrationDuty,1);assert.equal(m.effectiveServiceDuty,0);assert.equal(m.experimentDuty,0);assert.equal(m.automationRunning,0);assert.equal(m.fabricationRate,0);assert.equal(m.integrationRate,0);
  G.tick(s,4);assert.equal(s.job,null);assert.equal(s.drift,.005);assert.equal(s.fabricated,0);assert.equal(s.integrated,0);
});
test('Fabricated chips require integration; construction split produces the actual limiting resource',()=>{
  const s=laboratory();s.engineering=['workshop'];s.workshops=1;const before=G.metrics(s).active;
  assert.equal(G.configure(s,'fabrication',1),true);G.tick(s,10);let m=G.metrics(s);
  assert.ok(s.fabricated>0);assert.equal(s.integrated,0);assert.ok(m.installed>before);assert.equal(m.active,before,'Unintegrated physical chips cannot increase usable capacity');
  assert.equal(G.configure(s,'fabrication',0),true);G.tick(s,10);m=G.metrics(s);assert.ok(s.integrated>0);assert.ok(m.active>before);assert.equal(m.active,Math.min(m.installed,m.capacity));
});
test('Dissemination and rollout choices are exclusive investments with different consequences',()=>{
  const s=laboratory();s.effort=G.metrics(s).effortCap;s.designs=1e5;
  assert.equal(G.buyEngineering(s,'open'),false,'A fork still requires its actual research cost');
  s.notebooks=4;s.effort=480;assert.equal(G.buyEngineering(s,'open'),true);const open=G.metrics(s);
  const saved=G.serialize(s);assert.equal(G.buyEngineering(s,'proprietary'),false);assert.equal(G.serialize(s),saved);assert.equal(open.trust,G.metrics({...s,engineering:[]}).trust+4);
  const verified=laboratory(),rapid=laboratory();for(const x of [verified,rapid]){x.notebooks=3;x.effort=4800;x.designs=1e5;x.engineering=['workshop','storage1','storage2'];x.workshops=1;}
  assert.equal(G.buyEngineering(verified,'verified'),true);assert.equal(G.buyEngineering(rapid,'rapid'),true);
  assert.ok(G.metrics(verified).maintenance<G.metrics(rapid).maintenance);assert.ok(G.metrics(verified).workshopRate<G.metrics(rapid).workshopRate);
});
for(const policy of ['frontier','revenue','infrastructure','cautious'])test('The '+policy+' policy legally finishes and remains resumable',()=>{
  const r=play(policy);assert.equal(r.state.ended,true);assert.equal(r.events.length,6);assert.ok(r.measurements.revenue>0);assert.ok(r.measurements.fullStore>0);assert.ok(r.measurements.automationWork>0);
  assert.equal(r.measurements.busy+r.measurements.idle,r.state.elapsed);assert.ok(r.measurements.serviceDuty>0);assert.ok(r.measurements.investments.length>0);
  for(const s of Object.values(r.snapshots))assert.deepEqual(G.parseSave(G.serialize(s)),s,'Legally generated laboratories must load without fabricated offline progress');
});
