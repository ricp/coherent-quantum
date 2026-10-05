const test=require('node:test'),assert=require('node:assert/strict');
const G=require('../game.js'),H=require('../companion.js');
const late=()=>{const s=G.newGame();Object.assign(s,{started:true,done:G.content.projects.filter(p=>!p.historyYear).map(p=>p.id),module:5,rack:5,pulse:6,decoder:3,distance:3,factories:0,funds:1e6,effort:120,designs:1e6,credits:2000,drift:.005});return s;};
test('Explaining every native action and instrument preserves the complete engine save and uses real source IDs',()=>{
  const s=late(),before=G.serialize(s),cases={project:'feynman',study:'history2015',experiment:'vqe',engineering:'workflow',upgrade:'decoder',workload:'dynamics',objective:G.content.objectives[0].id,precision:G.content.precisionRequests[0].id,procurement:'local',campus:null,research:null,calibrate:null,job:null};
  for(const [type,id]of Object.entries(cases)){
    const h=H.describe(s,{action:{type,id,kind:'chip'},title:'Actual rail title',hint:'Actual rail explanation',instrument:{purpose:'Real equipment explanation.',constraint:'Real constraint.',target:'memory-controls',papers:['Q08']}});
    assert.equal(h.title,'Actual rail title');assert.match(h.explanation,/Actual rail explanation/);assert.equal(h.topics.length,7);for(const p of h.papers.concat(h.topics.flatMap(t=>t.papers)))assert.ok(G.content.papers[p],p);assert.ok(h.links.every(x=>x.target&&x.label));
  }
  assert.equal(G.serialize(s),before);
});
test('Help quotes and blockers come from the engine, including bank overflow and reservations rather than a second strategy',()=>{
  const s=G.newGame(),engine=G.projectStatus(s,'deutsch'),h=H.describe(s,{action:{type:'project',id:'deutsch'}});
  assert.deepEqual(h.reasons,engine.reasons);assert.equal(h.ready,engine.ready);assert.equal(h.budget.find(d=>d.label==='Research effort').value,'24');
  const t=late();t.funds=0;t.designs=0;
  const q=G.upgradeInfo(t,'decoder'),help=H.describe(t,{action:{type:'upgrade',id:'decoder'}});assert.deepEqual(help.reasons,q.reasons);assert.equal(help.budget[0].value,q.cost.toLocaleString('en',{maximumFractionDigits:2}));
  const large=G.content.projects.find(p=>!G.has(t,p.id)&&p.cost.effort>G.metrics(t).effortCap);assert.ok(large);assert.ok(H.describe(t,{action:{type:'project',id:large.id}}).reasons.some(r=>r.startsWith('Expand notebook capacity')));
  t.job={id:'dynamics',workload:true,recipe:'balanced',shots:0,progress:0,duration:35};assert.match(H.describe(t,{action:{type:'upgrade',id:'pulse'}}).reasons.join(' '),/reserves/);
});
test('Captured failed energy and successful historical evidence are distinct from current controls and a discovery purchase',()=>{
  const s=late();s.theta=20;s.shots=2;s.mitigate=false;
  assert.ok(G.startExperiment(s,'vqe'));while(s.job)G.tick(s,1);
  const theta=s.tutorial.theta;assert.equal(s.tutorial.qualified,false);G.configure(s,'theta',65);G.configure(s,'shots',0);
  const h=H.describe(s);assert.match(h.result.title,/not qualified/);assert.equal(h.result.details.find(d=>d.label==='Captured preparation').value,theta+'°');assert.equal(h.result.details.find(d=>d.label==='Actual samples').value,s.tutorial.shots.toLocaleString('en',{maximumFractionDigits:2}));assert.match(h.result.text,/do not remove residual bias or repair/);
  const t=late(),project=G.content.projects.find(p=>p.historyYear===2015);assert.ok(G.startStudy(t,project.id));while(t.job)G.tick(t,1);
  assert.equal(t.result.study.passed,true);assert.equal(t.done.includes(project.id),false);
  const study=H.describe(t,{action:{type:'project',id:project.id}});assert.match(study.result.text,/separate research purchase/);assert.ok(t.researchResults.some(r=>r.id===project.id));
  t.notebooks=64;t.effort=G.content.projects.find(p=>p.id===project.id).cost.effort;assert.ok(G.buyProject(t,project.id));assert.match(H.describe(t).result.text,/also been purchased/);
  const mismatch=late();mismatch.done.push('history2017');mismatch.theta=20;mismatch.shots=2;assert.ok(G.startStudy(mismatch,'history2018'));while(mismatch.job)G.tick(mismatch,1);assert.equal(mismatch.result.study.passed,true);assert.equal(mismatch.tutorial.qualified,false);assert.match(H.describe(mismatch).result.text,/passing the study does not qualify the ground-reference energy/);
  const finite=late(),item=G.content.objectives.find(x=>x.angle!==null);finite.theta=item.angle;finite.shots=2;finite.mitigate=true;assert.ok(G.startObjective(finite,item.id));while(finite.job)G.tick(finite,1);assert.equal(H.describe(finite).result.details.find(d=>d.label==='Captured task reference').value,finite.result.task.reference.toLocaleString('en',{maximumFractionDigits:4}));
});
test('Paused, ended and occupied shells explain action limits without making help or navigation unavailable',()=>{
  const s=G.newGame();s.paused=true;
  let h=H.describe(s,{action:{type:'experiment',id:'signal'},shellReasons:['Native control unavailable']});assert.equal(h.ready,false);assert.match(h.reasons.join(' '),/Help and navigation remain available/);assert.ok(h.reasons.includes('Native control unavailable'));
  s.paused=false;s.ended=true;h=H.describe(s,{action:{type:'experiment',id:'signal'}});assert.match(h.reasons.join(' '),/earned ending is preserved/);assert.equal(h.ready,false);
  s.ended=false;assert.ok(G.startExperiment(s,'signal'));h=H.describe(s,{action:{type:'job'}});assert.ok(!h.reasons.some(x=>x.includes('not recognized')));assert.match(h.result.title,/apparatus is working/);assert.match(h.result.text,/captured settings/);
  h=H.describe(s,{action:{type:'project',id:'feynman',navigation:true}});assert.match(h.reasons.join(' '),/still inspect its target/);assert.ok(h.links.length>0);
  const purchase=late();purchase.job={id:'signal',workload:false,progress:0,duration:5};purchase.done=purchase.done.filter(id=>id!=='feynman');purchase.qualified.push('signal');const permitted=H.describe(purchase,{action:{type:'project',id:'feynman'}});assert.equal(permitted.ready,G.projectStatus(purchase,'feynman').ready);assert.ok(!permitted.reasons.some(x=>/job is in progress/.test(x)));
  const calibration=late();calibration.funds=0;let q=G.calibrationStatus(calibration);assert.equal(H.describe(calibration,{action:{type:'calibrate'}}).ready,false);assert.deepEqual(H.describe(calibration,{action:{type:'calibrate'}}).reasons,q.reasons);calibration.funds=q.cost;assert.equal(H.describe(calibration,{action:{type:'calibrate'}}).budget[0].value,String(q.cost));assert.ok(G.calibrate(calibration));assert.equal(calibration.funds,0);assert.equal(calibration.job.duration,q.seconds);
});
test('Hardware, notebook and duty diagrams retain the engine allocation truth on reserved jobs and imported opening progress',()=>{
  const s=late();s.fabricated=200;s.integrated=20;s.service=.8;s.calibration=.25;s.effort=120;
  let h=H.describe(s),m=G.metrics(s);assert.deepEqual(h.diagrams.hardware.map(d=>d.value),[m.installed,m.capacity,m.active]);assert.equal(h.diagrams.bank[3].value,m.designBonus);assert.ok(h.opening.every(step=>step.done===G.has(s,step.title.includes('Feynman')?'feynman':step.title.includes('Deutsch')?'deutsch':'signal')||step.title.includes('signal')));
  s.job={id:'memory',workload:false,progress:2,duration:10};m=G.metrics(s);h=H.describe(s);assert.deepEqual(h.diagrams.duty.map(d=>d.value),[m.calibrationDuty,m.effectiveServiceDuty,m.experimentDuty]);assert.equal(h.diagrams.duty[1].value,0);assert.match(h.result.text,/reserves services/);
  const fresh=G.newGame();assert.ok(G.startExperiment(fresh,'signal'));while(fresh.job)G.tick(fresh,1);assert.ok(G.buyProject(fresh,'feynman'));const imported=G.parseSave(G.serialize(fresh));h=H.describe(imported);assert.deepEqual(h.opening.map(x=>x.done),[true,true,false]);assert.match(h.glossary.at(-1).meaning,/genuine interaction/);
});
