/* Read-only constructed numerical scenarios; not legal progression or browser evidence. */
const path=require('node:path'),fs=require('node:fs'),crypto=require('node:crypto');
const projectRoot=process.argv[2]?path.resolve(process.argv[2]):path.resolve(__dirname,'..');
const G=require(path.join(projectRoot,'game.js'));
const evidenceKind='constructed numerical model fixture; not legal earned progression';
function fixture(){const s=G.newGame();s.started=true;s.done=G.content.projects.map(p=>p.id);s.qualified=G.content.experiments.map(e=>e.id);s.reputation=s.qualified.length;Object.assign(s,{module:5,rack:5,funds:1e6,designs:1e5,pulse:8,drift:.005,distance:5,decoder:2,factories:3,credits:2000,engineering:['workshop'],fabricated:2231,integrated:2231});return s;}
const scenarios=[];
for(const mix of ['throughput','response']){const s=fixture();if(mix==='response')Object.assign(s,{distance:3,factories:2,fabricated:0,integrated:0});for(const profile of ['balanced','streaming','response']){G.configure(s,'controllerProfile',profile);const m=G.metrics(s),w=G.workloadStatus(s,'dynamics');scenarios.push({evidenceKind,mix,profile,active:m.active,distance:s.distance,factories:s.factories,pEff:m.pEff,pL:m.pL,syndrome:m.syndromeRate,decoder:m.decoderRate,feedback:m.feedback,runtime:w.runtime,risk:w.risk,ready:w.ready,reasons:w.reasons});}}
for(const factories of [1,3]){const s=fixture();Object.assign(s,{module:6,rack:6,fabricated:1000,integrated:1000,decoder:3,factories});for(const recipe of ['balanced','compact','parallel']){const w=G.workloadStatus(s,'dynamics',recipe);scenarios.push({evidenceKind,mix:'same32data-d5',recipe,factories,runtime:w.runtime,risk:w.risk,credits:w.credits,parts:w.parts,width:w.width,dataWidth:w.dataWidth,workspace:w.workspace,ready:w.ready});}}
const sourceHashes=Object.fromEntries(['game.js','content.js'].map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(path.join(projectRoot,file))).digest('hex')]));
console.log(JSON.stringify({evidenceKind,sourceHashes,scenarios},null,2));
