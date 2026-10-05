const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../game.js');
// Constructed unit fixtures provide prerequisite history to isolate contracts; not campaign/pacing evidence.
function fixture(seed=424242){
  const s=G.newGame(seed);s.started=true;s.researchRevision=0;s.done=G.content.projects.filter(p=>!p.historyYear).map(p=>p.id);s.qualified=G.content.experiments.map(e=>e.id);s.reputation=s.qualified.length;
  Object.assign(s,{funds:1e6,designs:1e5,pulse:8,drift:.005,calibration:.2,theta:65,shots:3,mitigate:true});return s;
}
function drain(s){for(let i=0;i<1000&&s.job;i++)G.tick(s,1);assert.equal(s.job,null,'Captured experiment must finish within its declared duty budget');}
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} differs from ${b}`);

test('Acquisition budgets buy precision and apparatus time; mitigation is modeled overhead, not extra raw samples',()=>{
  const s=fixture();G.configure(s,'mitigate',false);G.configure(s,'shots',3);const ordinary=G.experimentRecipe(s,'vqe');
  assert.equal(ordinary.seconds,24);assert.equal(ordinary.actualAcquisitions,196608);assert.equal(ordinary.modeledAcquisitions,196608);
  G.configure(s,'mitigate',true);const mitigated=G.experimentRecipe(s,'vqe');assert.equal(mitigated.seconds,72);assert.equal(mitigated.modeledAcquisitions,786432);assert.equal(mitigated.actualAcquisitions,ordinary.actualAcquisitions);assert.ok(mitigated.cost>ordinary.cost);
  G.configure(s,'shots',2);assert.equal(G.experimentRecipe(s,'vqe').seconds,24);
  for(const level of [0,1,2,3]){G.configure(s,'shots',level);const status=G.objectiveStatus(s,'bias-floor');assert.equal(status.prediction.bound,2.2*Math.sqrt(2*Math.log(120)/(1024*4**level)));}
});

test('Ground goals expose independent angle, sampling and bias limits without silently repairing controls',()=>{
  const s=fixture();G.configure(s,'theta',20);const before=G.serialize(s);assert.equal(G.objectiveStatus(s,'landscape').ready,false);assert.equal(G.startObjective(s,'landscape'),false);assert.equal(G.serialize(s),before);
  G.configure(s,'theta',65);G.configure(s,'mitigate',false);let status=G.objectiveStatus(s,'bias-floor');assert.ok(status.prediction.ansatz<.001);assert.ok(status.prediction.floor>.04);assert.equal(status.ready,false,'Maximum ordinary shots cannot remove systematic bias');
  G.configure(s,'mitigate',true);assert.equal(G.objectiveStatus(s,'bias-floor').ready,true);
  const small=G.newGame();assert.equal(G.objectiveStatus(small,'landscape').available,false,'Goals cannot bypass research history');
});

test('One fresh successful objective grants a single assignment, retains raw groups and freezes its entry settings',()=>{
  const s=fixture(),trust=G.metrics(s).trust,designs=s.designs;assert.equal(G.startObjective(s,'bias-floor'),true);
  const entry={...s.job};assert.equal(entry.recipeRevision,1);assert.equal(entry.trial,1);assert.equal(entry.duration,72);
  G.configure(s,'theta',20);G.configure(s,'shots',0);G.configure(s,'mitigate',false);drain(s);
  assert.equal(s.objectiveResults.length,1);const receipt=s.objectiveResults[0];assert.equal(receipt.id,'bias-floor');assert.equal(receipt.result.theta,65);assert.equal(receipt.result.shots,196608);assert.equal(receipt.result.modeledShots,786432);assert.equal(receipt.result.groups.length,3);assert.equal(receipt.trial,1);assert.equal(receipt.passed,true);assert.equal(s.result.task.passed,true);
  assert.equal(G.metrics(s).trust,trust+1);assert.ok(s.designs>=designs+140);assert.equal(s.reputation,10,'Objective trust does not become a quantum-service price boost');
  const before=G.serialize(s);assert.equal(G.startObjective(s,'bias-floor'),false);assert.equal(G.serialize(s),before);assert.deepEqual(G.parseSave(before),s);
});

test('Angle checks need the declared preparation; a paid precision request can pass without claiming ground-energy qualification',()=>{
  const s=fixture();assert.equal(G.precisionStatus(s,'desk30').ready,false);G.configure(s,'theta',30);G.configure(s,'shots',2);G.configure(s,'mitigate',false);assert.equal(G.precisionStatus(s,'desk30').ready,true);
  assert.equal(G.startPrecisionRequest(s,'desk30'),true);const paid=s.funds,rep=s.reputation;drain(s);
  assert.equal(s.precisionResults.length,1);assert.equal(s.tutorial.qualified,false,'A30° known-state check is not the ground-state experiment');assert.equal(s.result.request,'desk30');assert.match(s.result.message,/fresh evidence accepted.*30° known preparation.*800 funding paid once/);assert.doesNotMatch(s.result.message,/not yet qualified/);assert.equal(s.result.task.passed,true);close(s.result.task.reference,G.tutorialEnergy(30));assert.equal(s.reputation,rep);assert.ok(s.funds>=paid+800);assert.deepEqual(G.parseSave(G.serialize(s)),s);
  const before=G.serialize(s);assert.equal(G.startPrecisionRequest(s,'desk30'),false);assert.equal(G.serialize(s),before);
});

test('Ordinary or historical results, cancelled requests and failed intervals cannot mint precision payments',()=>{
  const s=fixture();G.configure(s,'theta',30);assert.equal(G.startExperiment(s,'vqe'),true);drain(s);assert.equal(s.precisionResults.length,0);
  assert.equal(G.startPrecisionRequest(s,'desk30'),true);const paid=s.funds;G.cancel(s);assert.equal(s.funds,paid);assert.equal(s.precisionResults.length,0);assert.equal(G.precisionStatus(s,'desk30').complete,false);
  // A deliberately adversarial constructed trial proves finish rechecks actual captured samples, not predicted readiness.
  assert.equal(G.startPrecisionRequest(s,'desk30'),true);s.job.theta=65;drain(s);assert.equal(s.precisionResults.length,0);assert.equal(s.result.task.passed,false);assert.equal(G.precisionStatus(s,'desk30').complete,false);
});

test('Strict receipts reject altered counts, false criteria, duplicate fresh IDs and partial new schemas',()=>{
  const s=fixture();G.configure(s,'theta',30);assert.equal(G.startPrecisionRequest(s,'desk30'),true);drain(s);assert.equal(G.startObjective(s,'reference30'),true);drain(s);assert.deepEqual(G.parseSave(G.serialize(s)),s);
  const invalid=mutate=>{const copy=JSON.parse(G.serialize(s)).state;mutate(copy);assert.throws(()=>G.parseSave(G.serialize(copy)));};
  invalid(x=>x.precisionResults[0].result.groups[0].plus++);invalid(x=>x.precisionResults[0].result.statistical=0);invalid(x=>x.precisionResults[0].result.bias=0);invalid(x=>x.precisionResults[0].result.theta=65);invalid(x=>x.precisionResults[0].passed=false);invalid(x=>x.precisionResults[0].trial=x.objectiveResults[0].trial);invalid(x=>x.result.task.reference=-1.5);invalid(x=>delete x.trialSerial);invalid(x=>x.precisionResults.push(x.precisionResults[0]));invalid(x=>x.objectiveResults=[]);invalid(x=>x.result.task.trial=x.precisionResults[0].trial);
});

test('Earned legacy v2 fields and active fixed-duration jobs survive explicit idle-only opt-in',()=>{
  const s=fixture();const campusKeys=Object.keys(G.newGame()).filter(key=>!['version','notebooks','designs','engineering','price','autoPrice','autoCalibration','automation','analysisShare','workshops','fabrication','fabricated','integrated','started','paused','elapsed','funds','effort','done','qualified','module','rack','staff','pulse','decoder','drift','distance','factories','calibration','service','theta','shots','mitigate','credits','reputation','seed','job','result','tutorial','completed','ended','volume','sound','theme','log'].includes(key));
  s.done=s.done.filter(id=>!G.content.projects.find(p=>p.id===id).optional);s.campusRevision=0;assert.equal(G.startExperiment(s,'vqe'),true);assert.equal(s.job.duration,10);const old=JSON.parse(G.serialize(s)).state;for(const key of campusKeys)delete old[key];
  const restored=G.parseSave(G.serialize(old));for(const [key,value] of Object.entries(old))assert.deepEqual(restored[key],value,key+' must not be repaired or reset');assert.equal(restored.campusRevision,0);assert.deepEqual(restored.objectiveResults,[]);assert.equal(G.enterCampus(restored),false);
  G.tick(restored,3);const active=G.parseSave(G.serialize(restored));assert.deepEqual(active.job,restored.job);drain(active);assert.equal(active.objectiveResults.length,0);const funds=active.funds,seed=active.seed,elapsed=active.elapsed;assert.equal(G.enterCampus(active),true);assert.equal(active.funds,funds);assert.equal(active.seed,seed);assert.equal(active.elapsed,elapsed);assert.equal(G.experimentRecipe(active,'vqe').seconds,72);assert.deepEqual(G.parseSave(G.serialize(active)),active);
  const corrupt=JSON.parse(G.serialize(old)).state;delete corrupt.designs;assert.throws(()=>G.parseSave(G.serialize(corrupt)),/Save is missing designs/);
});

test('Every new captured measurement and order restores to the same deterministic fresh result',()=>{
  const s=fixture();assert.equal(G.orderEquipment(s,'local','chip'),true);assert.equal(G.startObjective(s,'bias-floor'),true);G.tick(s,7);const restored=G.parseSave(G.serialize(s));assert.deepEqual(restored,s);drain(s);drain(restored);assert.deepEqual(restored,s);
  const bad=JSON.parse(G.serialize(fixture())).state;G.startObjective(bad,'bias-floor');bad.job.duration=10;assert.throws(()=>G.parseSave(G.serialize(bad)),/duration/);
});

test('Controller profiles win different declared mixes without boosting the physical or logical error model',()=>{
  const s=fixture();Object.assign(s,{module:5,rack:5,fabricated:2231,integrated:2231,engineering:['workshop'],distance:5,decoder:2,factories:3,credits:2000});
  const balanced=G.metrics(s);assert.equal(balanced.active,3000);assert.equal(G.workloadStatus(s,'dynamics').ready,false);
  G.configure(s,'controllerProfile','streaming');let m=G.metrics(s);assert.equal(m.decoderRate,2048);assert.equal(m.feedback,30);assert.equal(m.pEff,balanced.pEff);assert.equal(m.pL,balanced.pL);assert.equal(G.workloadStatus(s,'dynamics').ready,true);
  Object.assign(s,{module:5,rack:5,fabricated:0,integrated:0,distance:3,factories:2});G.configure(s,'controllerProfile','balanced');assert.equal(G.workloadStatus(s,'dynamics').ready,false);
  G.configure(s,'controllerProfile','response');m=G.metrics(s);assert.equal(m.active,769);assert.equal(m.syndromeRate,360);assert.equal(m.decoderRate,768);assert.equal(m.feedback,10);assert.equal(G.workloadStatus(s,'dynamics').ready,true);assert.deepEqual(G.parseSave(G.serialize(s)),s);
  assert.equal(G.startWorkload(s,'dynamics'),true);assert.equal(G.configure(s,'controllerProfile','streaming'),false);
});

test('Adaptive management lowers only a bounded maintenance need and still reserves calibration time',()=>{
  const s=fixture();s.done=s.done.filter(id=>id!=='adaptive2026');const old=G.metrics(s);s.done.push('adaptive2026');const next=G.metrics(s);close(next.maintenance,old.maintenance*.9);assert.equal(next.calibrationDuty,old.calibrationDuty);assert.equal(next.experimentDuty,old.experimentDuty);assert.equal(next.pEff,old.pEff);assert.equal(next.pL,old.pL);G.tick(s,1);assert.ok(s.drift>=.005);
});

test('The preserved first ending is immutable during deliberate postgame research',()=>{
  const s=fixture();s.done=s.done.filter(id=>id!=='factoring');s.engineering=['storage1','storage2','storage3'];s.notebooks=2;s.effort=10000;s.completed=['dynamics'];s.reputation=s.qualified.length+2;s.ended=true;s.endingRecord={elapsed:0,active:1,distance:3,discoveries:s.done.length,workload:'dynamics',recipe:'balanced'};
  const record={...s.endingRecord};assert.equal(G.continueLaboratory(s),true);assert.equal(G.buyProject(s,'factoring'),true);assert.equal(s.ended,false);G.tick(s,2);assert.deepEqual(s.endingRecord,record);assert.equal(G.continueLaboratory(s),false);assert.deepEqual(G.parseSave(G.serialize(s)),s);
});


test('Only the known pre-recipe campus block can recover an empty map without changing earned progress',()=>{
  const s=fixture();G.configure(s,'theta',30);assert.equal(G.startPrecisionRequest(s,'desk30'),true);drain(s);assert.equal(G.startObjective(s,'reference30'),true);G.tick(s,3);const earlier=JSON.parse(G.serialize(s)).state;delete earlier.completedRecipes;
  const restored=G.parseSave(G.serialize(earlier));assert.deepEqual(restored.completedRecipes,{});for(const [key,value] of Object.entries(earlier))assert.deepEqual(restored[key],value,'Known transition must preserve '+key);assert.equal(restored.job.objective,'reference30');assert.equal(restored.precisionResults.length,1);assert.equal(restored.seed,s.seed);
  for(const mutate of [x=>delete x.trialSerial,x=>x.completed=['dynamics'],x=>x.epilogue=true,x=>x.endingRecord={},x=>x.campusRevision=0]){const invalid=JSON.parse(JSON.stringify(earlier));mutate(invalid);assert.throws(()=>G.parseSave(G.serialize(invalid)),/incomplete campus/,'Any broader partial-schema repair must fail');}
});

test('The ending cannot invent a recipe or contradict the completed captured schedule',()=>{
  const s=fixture();s.completed=['dynamics'];s.completedRecipes={dynamics:'compact'};s.reputation=s.qualified.length+2;s.ended=true;s.endingRecord={elapsed:0,active:1,distance:3,discoveries:s.done.length,workload:'dynamics',recipe:'compact'};assert.deepEqual(G.parseSave(G.serialize(s)),s);
  const contradiction=JSON.parse(G.serialize(s)).state;contradiction.endingRecord.recipe='parallel';assert.throws(()=>G.parseSave(G.serialize(contradiction)),/ending record/);
  const molecule=JSON.parse(G.serialize(s)).state;molecule.completed=['molecule'];molecule.completedRecipes={molecule:'balanced'};molecule.endingRecord.workload='molecule';molecule.endingRecord.recipe='parallel';assert.throws(()=>G.parseSave(G.serialize(molecule)),/ending record/);
  const legacy=JSON.parse(G.serialize(s)).state;legacy.completedRecipes={};legacy.endingRecord.recipe='balanced';assert.deepEqual(G.parseSave(G.serialize(legacy)),legacy,'An imported baseline completion has only the balanced historical recipe');
});
