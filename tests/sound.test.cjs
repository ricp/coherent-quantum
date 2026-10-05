const test=require('node:test'),assert=require('node:assert/strict'),S=require('../audio.js');
class Param{constructor(value=1){this.value=value;}setValueAtTime(v){this.value=v;}linearRampToValueAtTime(v){this.value=v;}exponentialRampToValueAtTime(v){this.value=v;}setTargetAtTime(v){this.value=v;}cancelScheduledValues(){}}
class Node{constructor(){this.gain=new Param();this.frequency=new Param();this.Q=new Param();this.disconnected=false;}connect(){}disconnect(){this.disconnected=true;}start(t){this.startAt=t;}stop(t){this.stopAt=t;}}
class Context{
  constructor(){this.currentTime=0;this.sampleRate=8000;this.state='running';this.nodes=[];this.destination={};}
  node(){const node=new Node();this.nodes.push(node);return node;}
  createGain(){return this.node();}createOscillator(){return this.node();}createBufferSource(){return this.node();}createBiquadFilter(){return this.node();}
  createBuffer(_,length){const samples=new Float32Array(length);return {getChannelData:()=>samples};}
  advance(t){this.currentTime=t;for(const node of this.nodes)if(node.onended&&!node.ended&&node.stopAt<=t){node.ended=true;node.onended();}}
}
test('Every built apparatus has an original finite signature with distinct timbre or rhythm, not perpetual ambience',()=>{
  const types=['cryostat-stack','control-rack','decoder-rack','processor-package','memory-patch','factory-bay','planning-console','research-desk','commissioning-crane','commissioning-cell','chip-bay','support-bay','operations-console','service-terminal'];
  assert.equal(new Set(types.map(type=>JSON.stringify(S.profiles[type]))).size,14);
  for(const type of types){const voices=S.profiles[type];assert.ok(voices?.length);assert.ok(voices.some(v=>v[5]>0));for(const [wave,frequency,to,delay,duration,level]of voices){assert.ok(['noise','sine','triangle'].includes(wave));assert.ok(frequency>=80&&to>=80);assert.ok(delay>=0&&duration>0&&delay+duration<1);assert.ok(level>0&&level<=.35);}}
  const rhythms=types.map(type=>S.profiles[type].map(v=>v[3]).join(','));assert.ok(new Set(rhythms).size>=8);
});
test('Opt-in context and nonzero volume are necessary; muting cancels scheduled voices instead of replaying a stale cue',()=>{
  const c=new Context(),sound=S.create(c);assert.equal(sound.play('cryostat-stack'),false);assert.equal(sound.diagnostics.sources,0);
  sound.setVolume(.2);c.state='suspended';assert.equal(sound.play('control-rack'),false);assert.equal(sound.diagnostics.played,0);
  c.state='running';assert.ok(sound.play('control-rack'));sound.stop();assert.equal(sound.diagnostics.groups,0);assert.equal(sound.diagnostics.sources,0);assert.ok(c.nodes.slice(1).every(n=>n.disconnected));
  assert.ok(sound.play('memory-patch'));sound.setVolume(0);assert.equal(sound.diagnostics.groups,0);assert.equal(c.nodes[0].gain.value,0);assert.equal(sound.play('memory-patch'),false);
  sound.setVolume(1);assert.equal(sound.diagnostics.groups,0);assert.equal(c.nodes[0].gain.value,.35);assert.ok(sound.play('support-bay'));c.advance(2);assert.equal(sound.diagnostics.sources,0);assert.equal(sound.diagnostics.groups,0);
});
test('Rapid selections replace and release the previous sound, with bounded graph size and duplicate-click suppression',()=>{
  const c=new Context(),sound=S.create(c);sound.setVolume(.2);
  const roles=Object.keys(S.profiles).filter(k=>k.includes('-'));
  for(let i=0;i<80;i++){assert.ok(sound.play(roles[i%roles.length]));assert.ok(sound.diagnostics.groups<=2);assert.ok(sound.diagnostics.sources<=6);const connected=c.nodes.filter(n=>!n.disconnected);assert.ok(connected.length<=24);}
  const count=sound.diagnostics.played;assert.equal(sound.play(roles[79%roles.length]),false);assert.equal(sound.diagnostics.played,count);
  sound.stop();assert.equal(sound.diagnostics.groups,0);assert.ok(c.nodes.slice(1).every(n=>n.disconnected));assert.equal(sound.play('unknown-apparatus'),false);
});
test('Milestones replace routine clicks, then release priority; enabling sound never blocks the next instrument selection',()=>{
  const c=new Context(),sound=S.create(c);sound.setVolume(.2);assert.ok(sound.play('enable'));assert.ok(sound.play('cryostat-stack'));assert.equal(sound.play('click'),false);sound.stop();assert.ok(sound.play('click'));assert.ok(sound.play('chapter'));assert.equal(sound.play('click'),false);assert.equal(sound.play('result'),false);c.advance(2);assert.ok(sound.play('processor-package'));assert.ok(sound.play('result'));assert.equal(sound.play('memory-patch'),false);c.advance(3);assert.ok(sound.play('memory-patch'));
});

test('Sound defaults on in new games, while a saved explicit mute choice survives loading',()=>{const G=require('../game.js'),s=G.newGame();assert.equal(s.sound,true);assert.ok(G.configure(s,'sound',false));assert.equal(G.parseSave(G.serialize(s)).sound,false);});
