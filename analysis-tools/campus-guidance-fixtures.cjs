/* Isolated UI QA only. These fixtures are earned through public actions, never human saves. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(process.argv[2]||path.resolve(__dirname,'..')),output=path.resolve(process.argv[3]||require('node:os').tmpdir()),G=require(path.join(root,'game.js')),{campusPlay}=require(path.join(root,'tests/campus-playthrough.cjs'));
fs.mkdirSync(output,{recursive:true});
const tick=G.tick,copy=s=>JSON.parse(JSON.stringify(s));let earned;
G.tick=function(s,dt){if(!earned&&s.elapsed===4242)earned=copy(s);return tick(s,dt);};
try{campusPlay('bulk');}finally{G.tick=tick;}
if(!earned||!G.workloadStatus(earned,'dynamics').ready)throw Error('Expected earned current-plan opportunity missing');
function save(name,state){if(!state.paused)G.pause(state);const raw=G.serialize(state);G.parseSave(raw);fs.writeFileSync(path.join(output,'campus-guidance-'+name+'.json'),raw);return {name,elapsed:state.elapsed,funds:state.funds,done:state.done.length,completed:state.completed,job:state.job?.id||null,audit:G.projectStatus(state,'audit'),ready:G.content.workloads.filter(w=>G.workloadStatus(state,w.id).ready).map(w=>w.id)};}
const report=[save('earned-dynamics',copy(earned))];
const unavailable=copy(earned);if(!G.configure(unavailable,'distance',3))throw Error('Distance preview refusal');report.push(save('unqualified',unavailable));
const ready=copy(earned);for(let i=0;i<1000&&!G.projectStatus(ready,'audit').ready;i++)G.tick(ready,1);if(!G.projectStatus(ready,'audit').ready)throw Error('Audit not funded');report.push(save('audit-ready',ready));
const occupied=copy(earned);if(!G.startWorkload(occupied,'dynamics'))throw Error('Expected schedule entry');report.push(save('occupied',occupied));
const molecule=copy(earned);if(!G.startWorkload(molecule,'dynamics'))throw Error('Dynamics entry');for(let i=0;i<150&&molecule.job;i++)G.tick(molecule,1);
for(let i=0;i<1000&&!G.projectStatus(molecule,'chemistry').ready;i++)G.tick(molecule,1);if(!G.buyProject(molecule,'chemistry'))throw Error('Chemistry unavailable');
for(let i=0;i<1000&&!G.workloadStatus(molecule,'molecule').ready;i++)G.tick(molecule,1);if(!G.workloadStatus(molecule,'molecule').ready)throw Error('Molecule not ready');report.push(save('molecule-only',molecule));
fs.writeFileSync(path.join(output,'campus-guidance-fixtures-summary.json'),JSON.stringify({evidenceKind:'legal public-action simulation fixture; not user Chrome',fixtures:report},null,2));console.log(JSON.stringify(report,null,2));
