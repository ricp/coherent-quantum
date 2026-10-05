const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../game.js');
// Constructed foundation history isolates authored study contracts; this is not pacing evidence.
function fixture(){
  const s=G.newGame();s.started=true;s.done=G.content.projects.filter(p=>!p.historyYear&&p.id!=='audit').map(p=>p.id);s.qualified=G.content.experiments.map(e=>e.id);s.reputation=s.qualified.length;
  Object.assign(s,{funds:1e6,designs:1e5,module:6,rack:6,fabricated:1000,integrated:1000,distance:3,decoder:3,factories:1,credits:2000,pulse:8,drift:.005,calibration:.3,service:0,theta:65,shots:2,mitigate:true,engineering:['workshop','storage1','storage2','storage3','autoCalibration'],notebooks:5,effort:34000});return s;
}
function drain(s){for(let i=0;i<1000&&s.job;i++)G.tick(s,1);assert.equal(s.job,null);}
function plan(s,id){
  G.configure(s,'distance',id==='history2023'?5:3);G.configure(s,'factories',id==='history2022'?0:id==='history2025'?2:1);G.configure(s,'theta',id==='history2018'?20:65);G.configure(s,'shots',2);G.configure(s,'mitigate',true);G.configure(s,'service',0);G.configure(s,'autoCalibration',true);
}
function earn(s,through=2025){for(let year=2015;year<=through;year++){const id='history'+year;plan(s,id);assert.equal(G.startStudy(s,id),true,JSON.stringify(G.studyStatus(s,id).reasons));drain(s);assert.equal(s.result.study.passed,true,id);assert.equal(G.buyProject(s,id),true,JSON.stringify(G.projectStatus(s,id).reasons));}}
const invalid=(s,mutate)=>{const state=JSON.parse(G.serialize(s)).state;mutate(state);assert.throws(()=>G.parseSave(G.serialize(state)));};

test('New campaigns require eleven paid discoveries, each gated by its own fresh study',()=>{
  const s=fixture();assert.equal(G.projectStatus(s,'audit').available,false,'The next-action rail must route unfinished annual prerequisites before Audit');assert.equal(G.projectStatus(s,'audit').ready,false);assert.match(G.projectStatus(s,'audit').reasons.join(' '),/all eleven/);
  const before=G.serialize(s);assert.equal(G.buyProject(s,'history2015'),false);assert.equal(G.startStudy(s,'history2016'),false);assert.equal(G.serialize(s),before);
  earn(s);assert.equal(s.researchResults.length,11);assert.equal(G.researchStatus(s).purchased,11);while(s.effort<34000)G.tick(s,1);assert.equal(G.projectStatus(s,'audit').available,true);assert.equal(G.projectStatus(s,'audit').ready,true);assert.deepEqual(G.parseSave(G.serialize(s)),s);
  assert.equal(G.buyProject(s,'audit'),true);assert.equal(s.ended,false);assert.equal(G.startWorkload(s,'dynamics'),true);drain(s);assert.equal(s.ended,true);assert.equal(s.endingRecord.discoveries,s.done.length);assert.deepEqual(G.parseSave(G.serialize(s)),s);
});

test('Historical results do not replace a fresh paid trial; cancellation and failure retain spent costs',()=>{
  const s=fixture();assert.equal(G.startExperiment(s,'memory'),true);drain(s);assert.equal(s.researchResults.length,0);
  const before=s.funds,cost=G.studyStatus(s,'history2015').recipe.cost;assert.equal(G.startStudy(s,'history2015'),true);assert.equal(s.funds,before-cost);const paid=s.funds;assert.equal(G.cancel(s),true);assert.equal(s.funds,paid);assert.equal(s.researchResults.length,0);
  assert.equal(G.startStudy(s,'history2015'),true);assert.equal(G.configure(s,'distance',5),true);drain(s);assert.equal(s.result.study.passed,false);assert.equal(s.researchResults.length,0);assert.equal(G.projectStatus(s,'history2015').ready,false);assert.deepEqual(G.parseSave(G.serialize(s)),s);
});

test('Study evidence and discovery payments occur once without inventing a repeat grant',()=>{
  const s=fixture(),reputation=s.reputation;assert.equal(G.startStudy(s,'history2015'),true);drain(s);assert.equal(s.reputation,reputation);assert.match(s.result.message,/no separate study grant/);
  const before=G.serialize(s);assert.equal(G.startStudy(s,'history2015'),false);assert.equal(G.serialize(s),before);
  const p=G.content.projects.find(p=>p.id==='history2015'),funds=s.funds,effort=s.effort,designs=s.designs;assert.equal(G.buyProject(s,p.id),true);assert.equal(s.funds,funds-p.cost.funds);assert.equal(s.effort,effort-p.cost.effort);assert.equal(s.designs,designs-p.cost.designs);assert.equal(G.buyProject(s,p.id),false);
});

test('Captured VQE settings survive edits, pause and restore; a precise bad ansatz is valid teaching evidence',()=>{
  const s=fixture();earn(s,2016);plan(s,'history2017');assert.equal(G.startStudy(s,'history2017'),true);G.tick(s,2);G.configure(s,'theta',20);G.configure(s,'shots',0);G.configure(s,'mitigate',false);G.pause(s);
  const saved=G.serialize(s),restored=G.parseSave(saved);G.tick(restored,3600);assert.equal(G.serialize(restored),saved);G.pause(s);G.pause(restored);drain(s);drain(restored);assert.deepEqual(restored,s);assert.equal(s.researchResults.at(-1).tutorial.theta,65);assert.equal(s.researchResults.at(-1).tutorial.qualified,true);assert.equal(G.buyProject(s,'history2017'),true);
  plan(s,'history2018');assert.equal(G.startStudy(s,'history2018'),true);drain(s);assert.equal(s.tutorial.qualified,false);assert.ok(s.tutorial.ansatzError>.5);assert.equal(s.result.study.passed,true);assert.equal(G.buyProject(s,'history2018'),true);assert.deepEqual(G.parseSave(G.serialize(s)),s);
});

test('Strict imports recompute study context and measured intervals instead of trusting passed flags',()=>{
  const s=fixture();earn(s,2018);assert.deepEqual(G.parseSave(G.serialize(s)),s);
  for(const mutate of [x=>delete x.researchRevision,x=>delete x.researchResults,x=>x.researchResults.push(x.researchResults[0]),x=>x.researchResults[0].id='history2016',x=>x.researchResults[0].context.distance=5,x=>x.researchResults[0].context.decoder=0,x=>x.researchResults[0].context.drift=3,x=>x.researchResults[0].context.done=[],x=>x.researchResults[0].context.extra=0,x=>x.researchResults[0].time=x.elapsed,x=>x.researchResults[1].time=0,x=>x.researchResults[2].tutorial.groups[0].plus++,x=>x.researchResults[2].tutorial.qualified=false,x=>x.researchResults[3].tutorial.theta=65,x=>x.researchResults=[],x=>x.researchRevision=0])invalid(s,mutate);
  const active=fixture();assert.equal(G.startStudy(active,'history2015'),true);invalid(active,x=>x.job.study='history2016');invalid(active,x=>x.job.study='unknown');invalid(active,x=>x.job.objective='landscape');
});

test('Memory and factory allocation remain distinct; irreversible decoder upgrades do not block 2022',()=>{
  const s=fixture();earn(s,2021);plan(s,'history2022');assert.equal(s.decoder,3);assert.equal(s.factories,0);assert.equal(G.studyStatus(s,'history2022').ready,true);assert.equal(G.startStudy(s,'history2022'),true);drain(s);assert.equal(s.researchResults.at(-1).stricterFeedbackReady,true);assert.equal(G.buyProject(s,'history2022'),true);assert.deepEqual(G.parseSave(G.serialize(s)),s);invalid(s,x=>x.researchResults.at(-1).stricterFeedbackReady=false);invalid(s,x=>x.researchResults.at(-1).context.factories=1);
});

test('Old completed gifts remain earned; opt-in and continued research preserve the first ending',()=>{
  const old=fixture();old.researchRevision=0;old.done.push('audit');old.completed=['dynamics'];old.completedRecipes={dynamics:'balanced'};old.reputation+=2;old.ended=true;old.endingRecord={elapsed:0,active:G.metrics(old).active,distance:old.distance,discoveries:old.done.length,workload:'dynamics',recipe:'balanced'};
  const state=JSON.parse(G.serialize(old)).state;delete state.researchRevision;delete state.researchResults;const restored=G.parseSave(G.serialize(state));assert.equal(restored.ended,true);assert.equal(restored.researchRevision,0);assert.deepEqual(restored.researchResults,[]);assert.equal(G.enterResearchProgramme(restored),false);const record={...restored.endingRecord};assert.equal(G.continueLaboratory(restored),true);assert.equal(G.startExperiment(restored,'memory'),true);assert.equal(G.enterResearchProgramme(restored),false);G.cancel(restored);assert.equal(G.enterResearchProgramme(restored),true);earn(restored);assert.equal(restored.ended,false);assert.deepEqual(restored.endingRecord,record);assert.deepEqual(G.parseSave(G.serialize(restored)),restored);
});

test('A opted-in final discovery cannot discard a paid job when an earlier Audit is already owned',()=>{
  const s=fixture();s.done.push('audit');s.completed=['dynamics'];s.completedRecipes={dynamics:'balanced'};s.reputation+=2;earn(s,2024);plan(s,'history2025');assert.equal(G.startStudy(s,'history2025'),true);drain(s);assert.equal(s.ended,false);assert.equal(G.startExperiment(s,'vqe'),true);
  const captured=G.serialize(s);assert.equal(G.buyProject(s,'history2025'),false);assert.equal(G.serialize(s),captured,'The last discovery must not discard paid apparatus work');drain(s);assert.equal(G.buyProject(s,'history2025'),true);assert.equal(s.ended,true);assert.deepEqual(G.parseSave(G.serialize(s)),s);
});

test('Repeated factory studies respect the 2,000 rehearsal-credit storage ceiling',()=>{
  const s=fixture();s.credits=2000;assert.equal(G.startExperiment(s,'factory'),true);drain(s);assert.equal(s.credits,2000);assert.deepEqual(G.parseSave(G.serialize(s)),s,'Finishing a paid factory rehearsal must not make its own save invalid');
});
