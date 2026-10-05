const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../game.js');
// Constructed prerequisite history isolates the finishing interaction; not campaign or pacing evidence.
function fixture(){
  const s=G.newGame();s.started=true;s.researchRevision=0;s.done=G.content.projects.filter(p=>!p.historyYear).map(p=>p.id).filter(id=>!['audit','factoring'].includes(id));s.qualified=G.content.experiments.map(e=>e.id);s.reputation=s.qualified.length;
  Object.assign(s,{funds:1e6,designs:1e5,module:6,rack:6,fabricated:1000,integrated:1000,distance:5,decoder:3,factories:3,credits:2000,pulse:8,drift:.005,calibration:.3,theta:65,shots:2,mitigate:false,engineering:['workshop','storage1','storage2','storage3'],notebooks:5,effort:34000});
  return s;
}
function drain(s){for(let i=0;i<100&&s.job;i++)G.tick(s,1);assert.equal(s.job,null,'The paid schedule must naturally finish before the final audit');}
function completedScientific(){
  const s=fixture();assert.equal(G.configure(s,'logicalRecipe','compact'),true);assert.equal(G.startWorkload(s,'dynamics'),true);drain(s);assert.equal(s.ended,false);assert.equal(s.completedRecipes.dynamics,'compact');return s;
}

test('A final audit cannot silently discard a paid second scientific workload',()=>{
  const s=completedScientific(),funds=s.funds,credits=s.credits;assert.equal(G.startWorkload(s,'molecule'),true);assert.equal(s.funds,funds-450);assert.equal(s.credits,credits-192);
  const before=G.serialize(s),status=G.projectStatus(s,'audit');assert.equal(status.available,true);assert.equal(status.ready,false);assert.ok(status.reasons.some(reason=>/Finish or explicitly cancel.*entry costs stay spent/.test(reason)));
  assert.equal(G.buyProject(s,'audit'),false);assert.equal(G.serialize(s),before,'Rejecting final research must preserve balances, captured job, scientific history and RNG exactly');assert.equal(s.endingRecord,null);
});

test('The finishing guard also preserves an ordinary paid experiment and its captured measurement',()=>{
  const s=completedScientific();assert.equal(G.startExperiment(s,'vqe'),true);const before=G.serialize(s);assert.equal(s.job.workload,false);assert.equal(s.job.recipeRevision,1);
  assert.equal(G.buyProject(s,'audit'),false);assert.equal(G.serialize(s),before,'An ordinary trial must not disappear or invent evidence when final Audit is attempted');drain(s);assert.equal(s.result.id,'vqe');assert.equal(G.buyProject(s,'audit'),true);assert.equal(s.ended,true);
});

test('Natural completion admits the final audit and preserves the first executed scientific recipe',()=>{
  const s=completedScientific();assert.equal(G.startWorkload(s,'molecule'),true);drain(s);assert.deepEqual(s.completed,['dynamics','molecule']);assert.equal(G.projectStatus(s,'audit').ready,true);
  assert.equal(G.buyProject(s,'audit'),true);assert.equal(s.ended,true);assert.equal(s.endingRecord.workload,'dynamics');assert.equal(s.endingRecord.recipe,'compact');assert.deepEqual(G.parseSave(G.serialize(s)),s);
});

test('Explicit cancellation, with entry costs already spent, makes finishing a deliberate choice',()=>{
  const s=completedScientific();assert.equal(G.startWorkload(s,'molecule'),true);const funds=s.funds,credits=s.credits;assert.equal(G.cancel(s),true);assert.equal(s.funds,funds);assert.equal(s.credits,credits);assert.match(s.log.at(-1).message,/Entry costs are not refunded/);
  assert.equal(G.projectStatus(s,'audit').ready,true);assert.equal(G.buyProject(s,'audit'),true);assert.equal(s.ended,true);assert.deepEqual(s.completed,['dynamics']);assert.deepEqual(G.parseSave(G.serialize(s)),s);
});

test('Harmless early Audit research and unrelated research remain available during jobs',()=>{
  const early=fixture();assert.equal(G.startExperiment(early,'vqe'),true);const captured={...early.job};assert.equal(G.projectStatus(early,'audit').ready,true);assert.equal(G.buyProject(early,'audit'),true);assert.deepEqual(early.job,captured);assert.equal(early.ended,false);assert.equal(early.endingRecord,null);assert.deepEqual(G.parseSave(G.serialize(early)),early);
  const late=completedScientific();assert.equal(G.startWorkload(late,'molecule'),true);const job={...late.job};assert.equal(G.projectStatus(late,'factoring').ready,true);assert.equal(G.buyProject(late,'factoring'),true);assert.deepEqual(late.job,job);assert.equal(late.ended,false);assert.equal(late.endingRecord,null);
});
