const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../game.js'),I=require('../inspector.js');
const types=['cryostat-stack','control-rack','decoder-rack','processor-package','memory-patch','factory-bay','planning-console','research-desk','commissioning-crane','chip-bay','support-bay','operations-console','service-terminal'];
const late=()=>{const s=G.newGame();s.started=true;s.done=G.content.projects.filter(p=>!p.historyYear).map(p=>p.id);s.engineering=['workshop','automation'];s.module=5;s.rack=5;s.pulse=6;s.decoder=2;s.factories=1;s.distance=5;s.workshops=2;s.funds=1e6;s.designs=1e6;s.credits=2000;s.drift=.005;return s;};
test('Inspecting every component and previewing investments spends nothing and does not alter a captured save',()=>{
  const s=late();s.chipStock=64;s.supportStock=32;
  const original=JSON.stringify(s);
  for(const type of types){const d=I.describe(s,type);assert.ok(d);assert.equal(d.readouts.length,4);assert.match(d.cohort,/shared campus apparatus/);for(const p of d.papers)assert.ok(G.content.papers[p]);}
  assert.equal(I.describe(s,'invented-component'),null);
  assert.equal(JSON.stringify(s),original);
  const before=I.preview(s,'decoder');assert.ok(G.buyUpgrade(s,'decoder'));
  assert.equal(before.comparisons[0].after,G.metrics(s).decoderRate.toLocaleString('en',{maximumFractionDigits:2})+' / μs');
  assert.equal(before.comparisons[1].after,G.metrics(s).feedback.toLocaleString('en',{maximumFractionDigits:2})+' μs');
});
test('Inspector quotes inherit actual affordability, prerequisites, apparatus reservations and capacity',()=>{
  const s=G.newGame();
  for(const type of types){const q=I.describe(s,type).quote;if(q){const engine=G.upgradeInfo(s,q.id);assert.equal(q.ready,engine.ready);assert.deepEqual(q.reasons,engine.reasons);assert.equal(q.cost,engine.cost);assert.equal(q.designs,engine.designs);}}
  const t=late();t.funds=0;t.designs=0;
  let q=I.describe(t,'decoder-rack').quote;assert.equal(q.ready,false);assert.ok(q.reasons.some(x=>x.includes('funding')));assert.ok(q.reasons.some(x=>x.includes('designs')));
  t.funds=1e6;t.designs=1e6;t.job={workload:true,id:'dynamics',recipe:'balanced',progress:0,duration:35};
  q=I.describe(t,'decoder-rack').quote;assert.equal(q.ready,false);assert.match(q.reasons.join(' '),/reserves/);
  t.job=null;t.decoder=5;assert.equal(I.describe(t,'decoder-rack').quote.max,true);assert.equal(I.describe(t,'decoder-rack').quote.ready,false);
});
test('A workshop preview deducts its quoted cost, so spending the last cash does not invent funded commissioning',()=>{
  const s=late(),quote=G.upgradeInfo(s,'workshop');s.funds=quote.cost;s.designs=quote.designs;
  const original=JSON.stringify(s),preview=I.preview(s,'workshop');assert.equal(preview.ready,true);
  assert.ok(G.metrics(s).fabricationRate>0);assert.equal(preview.comparisons[0].after,'0 / lab s');assert.equal(preview.comparisons[1].after,'0 / lab s');assert.equal(JSON.stringify(s),original);
  assert.equal(G.buyUpgrade(s,'workshop'),true);assert.equal(s.funds,0);assert.equal(G.metrics(s).fabricationRate,0);assert.equal(G.metrics(s).integrationRate,0);
  const blocked=I.preview(s,'workshop');assert.equal(blocked.ready,false);assert.ok(blocked.comparisons.every(r=>r.after===null),'Unaffordable investments must not imply that the game lent the player funding');
});
test('Live inspection separates streaming from latency, received stock from installed qubits, memory from gates and credits from states',()=>{
  const s=late();s.decoder=0;s.chipStock=512;s.supportStock=64;
  const decoder=I.describe(s,'decoder-rack');assert.equal(decoder.readouts[0].label,'Syndrome demand');assert.equal(decoder.readouts[1].label,'Streaming capacity');assert.equal(decoder.readouts[2].label,'Feedback latency');assert.match(decoder.constraint,/faster/);assert.match(decoder.purpose,/do not reveal/);
  const bay=I.describe(s,'chip-bay');assert.equal(bay.readouts[0].value,'512');assert.equal(bay.readouts[3].value,'769');assert.match(bay.purpose,/receipt is not installed/);
  assert.match(I.describe(s,'memory-patch').purpose,/not automatically a universal logical processor/);
  assert.match(I.describe(s,'factory-bay').purpose,/classical planning records, never quantum states/);
  s.paused=true;assert.match(I.describe(s,'chip-bay').readouts[2].note,/Planned/);
  s.job={workload:true,id:'dynamics',recipe:'balanced',progress:1,duration:35};assert.match(I.describe(s,'chip-bay').constraint,/reserves commissioning/);assert.match(I.describe(s,'commissioning-crane').constraint,/suspended/);
});
test('The experiment journey uses the captured actual job and honest job-specific bands rather than invented unknown-state readout',()=>{
  const s=late();s.theta=65;s.shots=2;s.mitigate=true;assert.equal(G.startExperiment(s,'vqe'),true);
  const captured=I.describe(s,'processor-package');assert.equal(captured.job.theta,65);assert.equal(captured.job.shots,16384);assert.equal(captured.job.mitigate,true);
  assert.ok(G.configure(s,'theta',12));assert.ok(G.configure(s,'shots',0));
  const changed=I.describe(s,'processor-package');assert.equal(changed.job.theta,65);assert.equal(changed.job.shots,16384);assert.match(changed.readouts[3].value,/65/);
  G.tick(s,2);const moving=I.workflow(s);assert.ok(moving.progress>0);assert.equal(moving.stages.at(-1).label,'Classical analysis');assert.match(moving.note,/not measured per-stage/);
  G.pause(s);assert.equal(I.workflow(s).active,false);
  s.job={id:'memory',progress:4,duration:10,workload:false};assert.deepEqual(I.workflow(s).stages.map(x=>x.label),['Encoded preparation','Repeated checks','Classical decoding','Memory qualification']);
  assert.equal(I.describe(s,'processor-package').readouts[3].label,'Selected trial preparation');assert.match(I.describe(s,'processor-package').readouts[3].note,/other job kinds do not capture/);
  s.job={id:'calibrate',progress:1,duration:4,workload:false};assert.deepEqual(I.workflow(s).stages,[{label:'Maintenance',station:'cryostat'}]);
  s.job=null;assert.equal(I.workflow(s).index,-1);assert.equal(I.workflow(s).active,false);
});
