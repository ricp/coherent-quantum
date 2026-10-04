const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../game.js');
const {play}=require('./playthrough.cjs');
const late=()=>{const s=G.newGame();s.started=true;s.done=G.content.projects.map(p=>p.id);s.qualified=G.content.experiments.map(e=>e.id);s.module=6;s.rack=6;s.pulse=8;s.decoder=4;s.drift=.005;s.distance=5;s.factories=1;s.funds=1e6;s.effort=1e6;s.credits=2000;return s;};
test('The first experiment satisfies the opening within a minute, without fabricated resources',()=>{
  const s=G.newGame();assert.equal(G.buyProject(s,'feynman'),false);assert.equal(G.startExperiment(s,'signal'),true);G.tick(s,5);
  assert.deepEqual(s.qualified,['signal']);assert.ok(s.elapsed<60);assert.equal(G.buyProject(s,'feynman'),true);
  const first=s.reputation;G.startExperiment(s,'signal');G.tick(s,5);assert.equal(s.reputation,first,'Repeating a trivial measurement must not create a new scientific milestone');
});
test('Research cannot bypass prerequisites, qualifications, or costs',()=>{
  const s=G.newGame();s.funds=1e8;s.effort=1e8;
  assert.equal(G.buyProject(s,'audit'),false);assert.equal(G.buyProject(s,'feynman'),false);
  G.startExperiment(s,'signal');G.tick(s,5);assert.equal(G.buyProject(s,'feynman'),true);const effort=s.effort;assert.equal(G.buyProject(s,'feynman'),false);assert.equal(s.effort,effort);
});
test('Installed qubits alone do not create active capacity or certify a computation',()=>{
  const s=late();s.rack=0;s.pulse=0;s.credits=2000;
  const m=G.metrics(s);assert.equal(m.active,1);assert.equal(m.memoryOK,false);assert.equal(G.workloadStatus(s,'dynamics').ready,false);
  s.rack=6;s.drift=.5;assert.equal(G.metrics(s).below,false);assert.equal(G.metrics(s).pL,null);assert.equal(G.workloadStatus(s,'dynamics').ready,false);
});
test('Distance consumes exact ideal patch footprint; protection is conditional on the noise regime',()=>{
  assert.deepEqual([3,5,7,9].map(G.patchSize),[17,49,97,161]);
  const s=late(),a=G.metrics(s);G.configure(s,'distance',7);const b=G.metrics(s);assert.ok(b.slots<a.slots);assert.ok(b.pL<=a.pL);
  s.pulse=0;s.drift=.5;assert.equal(G.metrics(s).pL,null);G.configure(s,'distance',9);assert.equal(G.metrics(s).memoryOK,false);
});
test('Factory and routing allocations are reversible, and decoder load includes reserved patches',()=>{
  const s=late();s.distance=5;const one=G.metrics(s);assert.equal(one.slots,34);assert.equal(one.syndromeRate,41*24);
  G.configure(s,'factories',2);assert.equal(G.metrics(s).slots,30);G.configure(s,'factories',0);assert.equal(G.metrics(s).slots,38);
  s.decoder=0;assert.equal(G.metrics(s).decoderOK,false);assert.equal(G.workloadStatus(s,'dynamics').ready,false);
});
test('Historical memory discoveries do not qualify degraded memory or an unqualified gate stack',()=>{
  const s=late();s.done=s.done.filter(id=>id!=='gates');assert.equal(G.metrics(s).memoryOK,true);assert.equal(G.metrics(s).gatesOK,false);
  s.pulse=0;assert.equal(G.qualificationNow(s,'memory'),false);assert.equal(G.qualificationNow(s,'gates'),false);
});
test('The variational tutorial computes a real classical reference and keeps uncertainty separate',()=>{
  const angle=(Math.PI-Math.atan(1.2))/2*180/Math.PI;
  assert.ok(Math.abs(G.tutorialEnergy(angle)+Math.sqrt(2.44))<1e-12);
  const s=late();s.theta=65;s.shots=2;s.mitigate=true;assert.equal(G.startExperiment(s,'vqe'),true);G.tick(s,20);
  assert.equal(s.tutorial.qualified,true);assert.ok(s.tutorial.statistical>0);assert.ok(s.tutorial.bias>0);assert.ok(s.tutorial.se>0);assert.equal(s.tutorial.shots,3*16384*4);
  const t=late();t.theta=0;t.shots=3;t.mitigate=true;G.startExperiment(t,'vqe');G.tick(t,20);assert.equal(t.tutorial.qualified,false,'More shots cannot repair an unsuitable ansatz parameter');
});
test('Factory waits increase idle exposure, risk, and runtime; repetition costs are complete',()=>{
  const s=late();s.distance=3;s.module=5;s.rack=5;s.factories=1;s.decoder=4;
  const one=G.workloadStatus(s,'dynamics');s.factories=2;const two=G.workloadStatus(s,'dynamics');assert.ok(one.idle>two.idle);assert.ok(one.risk>two.risk);assert.ok(one.runtime>two.runtime);
  const w=G.content.workloads.find(w=>w.id==='factors');const budget=G.workloadStatus(s,'factors');assert.equal(budget.credits,w.magic*w.repetitions);assert.ok(budget.runtime>=w.repetitions*(w.preparation+w.readout+w.classical));
  assert.ok(Math.abs(Object.values(budget.parts).reduce((a,b)=>a+b,0)-budget.risk)<1e-12);
});
test('Workloads recheck current conditions and recover rather than silently certify a failing schedule',()=>{
  const s=late();assert.equal(G.startWorkload(s,'dynamics'),true);assert.equal(G.configure(s,'distance',7),false,'A running schedule owns its allocated layout');s.pulse=0;G.tick(s,1);
  assert.equal(s.job,null);assert.equal(s.ended,false);assert.match(s.result.message,/stopped/);const old=s.funds;G.tick(s,10);assert.ok(s.funds>old,'A stopped workload must retain a transparent funding recovery route');
});
test('Pausing freezes resources and jobs, and a saved job resumes without offline time',()=>{
  const s=G.newGame();G.startExperiment(s,'signal');G.tick(s,2);G.pause(s);const before=G.serialize(s);G.tick(s,100);assert.equal(G.serialize(s),before);
  const restored=G.parseSave(before);assert.equal(restored.job.progress,2);G.pause(restored);G.tick(restored,3);assert.ok(restored.qualified.includes('signal'));
});
test('Malformed saves are rejected; unavailable upgrades and incomplete endings cannot be imported',()=>{
  const s=G.newGame(),before=G.serialize(s);assert.throws(()=>G.parseSave('{broken'));assert.equal(G.serialize(s),before);
  for(const mutate of [x=>x.funds=-1,x=>x.pulse=99,x=>x.distance=4,x=>x.factories=1,x=>x.done=['audit'],x=>x.ended=true,x=>x.theme='<script>',x=>x.job={id:'unknown',workload:false,progress:0,duration:1}]){
    const copy=G.newGame();mutate(copy);assert.throws(()=>G.parseSave(G.serialize(copy)));
  }
});
test('All thirty discoveries have reviewed primary citations available without buying them',()=>{
  assert.equal(G.content.projects.length,30);assert.equal(Object.keys(G.content.papers).length,36);
  for(const p of G.content.projects)for(const id of p.papers){const paper=G.content.papers[id];assert.ok(paper);assert.ok(paper.links.some(link=>/^https:\/\//.test(link.url)));}
});
test('Toy workload results contain actual classical factor and oracle certificates',()=>{
  for(const id of ['factors','search']){const s=late();assert.equal(G.startWorkload(s,id),true);G.tick(s,40);assert.equal(s.result.certificate.valid,true);assert.ok(s.completed.includes(id));assert.equal(s.ended,false,'A toy certificate alone is not the scientific campaign ending');assert.equal(G.startWorkload(s,id),false,'Completion grants are unique');}
});
for(const strategy of ['compact','wide'])test('A '+strategy+' legal strategy finishes all six chapters and thirty discoveries',()=>{
  const run=play(strategy);assert.equal(run.state.ended,true);assert.equal(run.state.done.length,30);assert.equal(run.events.length,6);assert.ok(run.state.elapsed<3600);assert.ok(run.state.completed.includes('dynamics'));assert.deepEqual(G.parseSave(G.serialize(run.state)).done,run.state.done);
});
