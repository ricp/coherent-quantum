const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../game.js');

const depthKeys=['notebooks','designs','engineering','price','autoPrice','autoCalibration','automation','analysisShare','workshops','fabrication','fabricated','integrated'];
function opening(){
  const s=G.newGame();assert.equal(G.startExperiment(s,'signal'),true);G.tick(s,5);
  assert.equal(G.buyProject(s,'feynman'),true);return s;
}
function rejectsWithoutReplacement(s,mutate,label,reason){
  const before=G.serialize(s),candidate=JSON.parse(before).state;mutate(candidate);
  let current=s;
  assert.throws(()=>{current=G.parseSave(G.serialize(candidate));},reason,label);
  assert.equal(current,s,'A rejected import must retain the active laboratory');
  assert.equal(G.serialize(s),before,'A rejected import must not spend or truncate existing progress');
}
// Constructed unit fixture: prerequisite history only, not a legal campaign or pacing result.
function engineeringFixture(){
  const s=opening();s.done=G.content.projects.map(p=>p.id);s.qualified=G.content.experiments.map(e=>e.id);s.reputation=s.qualified.length;
  return s;
}

test('A legal v2 opening restores a paused job without inventing offline progress or awards',()=>{
  const s=opening();assert.equal(G.assign(s,'staff',1),true);assert.equal(G.assign(s,'notebooks',1),true);
  assert.equal(G.startExperiment(s,'signal'),true);G.tick(s,2);G.pause(s);
  const saved=G.serialize(s),envelope=JSON.parse(saved),restored=G.parseSave(saved);
  assert.equal(envelope.version,2);assert.equal(envelope.state.version,2);assert.deepEqual(restored,s);
  G.tick(restored,3600);assert.equal(G.serialize(restored),saved,'A paused import must not catch up an hour');
  G.pause(s);G.pause(restored);G.tick(s,3);G.tick(restored,3);
  assert.deepEqual(restored,s,'The recorded job and random state must resume identically');
  assert.equal(restored.reputation,1,'Repeating the signal after loading must not mint another qualification');
});

test('Incomplete or mistyped depth fields cannot silently reset a running laboratory',()=>{
  const s=opening();
  for(const key of depthKeys){
    rejectsWithoutReplacement(s,x=>delete x[key],key+' missing',/Save is missing/);
    rejectsWithoutReplacement(s,x=>x[key]='wrong',key+' mistyped',/Invalid/);
  }
});

test('Impossible economic values cannot create negative resources or unbounded controller ownership',()=>{
  const s=opening();
  for(const [key,value] of [['notebooks',0],['notebooks',65],['designs',-1],['price',0],['price',201],['automation',17],['workshops',13],['fabricated',8193],['integrated',-1]]){
    rejectsWithoutReplacement(s,x=>x[key]=value,key+' outside its game limits',/Invalid/);
  }
  for(const [key,value] of [['analysisShare',.5],['autoPrice',true],['autoCalibration',true]]){
    rejectsWithoutReplacement(s,x=>x[key]=value,key+' before its engineering advance',/Engineering configuration is unavailable/);
  }
});

test('Imported assignments and banked effort must fit earned trust and purchased storage',()=>{
  const s=opening(),m=G.metrics(s);
  rejectsWithoutReplacement(s,x=>x.staff=m.trust,'Staff cannot spend an unearned assignment',/earned trust/);
  rejectsWithoutReplacement(s,x=>x.notebooks=m.trust,'Storage cannot spend an unearned assignment',/earned trust/);
  rejectsWithoutReplacement(s,x=>x.effort=m.effortCap+1,'Overfull notes must be rejected, not truncated',/earned trust/);
  rejectsWithoutReplacement(s,x=>x.reputation++,'Reputation needs a named qualification or completed workload',/earned trust/);
});

test('Save imports cannot bypass engineering prerequisites or own both sides of a permanent choice',()=>{
  const s=engineeringFixture();assert.deepEqual(G.parseSave(G.serialize(s)),s);
  for(const engineering of [['storage2'],['scheduler'],['open','proprietary'],['verified','rapid']]){
    rejectsWithoutReplacement(s,x=>x.engineering=engineering,engineering.join(' / '),/engineering prerequisites or exclusive choice/);
  }
  rejectsWithoutReplacement(s,x=>x.engineering=['storage1','storage1'],'Duplicate storage advances must not multiply capacity',/Invalid engineering advances/);
  for(const [key,value] of [['automation',1],['workshops',1],['fabricated',.5],['integrated',.5]]){
    rejectsWithoutReplacement(s,x=>x[key]=value,key+' needs its purchased engineering path',/Engineering configuration is unavailable/);
  }
  const early=opening();rejectsWithoutReplacement(early,x=>x.done.push('nisq'),'A paper cannot skip its scientific prerequisites',/Discovery prerequisites/);
});

test('V2 restoration preserves operating choices and partial construction without fractional physical qubits',()=>{
  const s=engineeringFixture();
  Object.assign(s,{engineering:['automation','pricing','autoCalibration','workshop'],automation:3,analysisShare:.25,autoPrice:true,autoCalibration:true,price:25,service:.6,workshops:1,fabrication:.7,fabricated:3.75,integrated:2.5,designs:.25,paused:true});
  const restored=G.parseSave(G.serialize(s));assert.deepEqual(restored,s);
  assert.equal(G.metrics(restored).installed,4);assert.equal(G.metrics(restored).capacity,3);assert.equal(G.metrics(restored).active,3,'Only complete commissioned units can support active physical capacity');
});

test('Baseline v1 saves receive an explicit no-migration error and cannot replace v2 progress',()=>{
  const s=opening(),before=G.serialize(s),baseline=JSON.parse(before);baseline.version=1;baseline.state.version=1;
  for(const key of depthKeys)delete baseline.state[key];
  const baselineText=JSON.stringify(baseline);let current=s;
  assert.throws(()=>{current=G.parseSave(baselineText);},/short-campaign baseline save/);
  assert.equal(current,s);assert.equal(G.serialize(s),before);
  rejectsWithoutReplacement(s,x=>x.version=1,'Envelope and state versions must agree',/not a supported Coherent save/);
});
