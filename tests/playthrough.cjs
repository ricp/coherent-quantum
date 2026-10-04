/* Legal automated players. No injected funding, research, or qualification. */
const fs=require('node:fs');
const path=require('node:path');
const G=require('../game.js');
function play(strategy='compact') {
  const s=G.newGame(),snapshots={},events=[];
  G.startExperiment(s,'signal');
  let previous=-1;
  for(let second=0;second<7200&&!s.ended;second++){
    const chapter=G.stage(s);
    if(chapter!==previous){snapshots[chapter]=JSON.parse(JSON.stringify(s));events.push({chapter,at:s.elapsed});previous=chapter;}
    if(G.has(s,'rb'))G.configure(s,'calibration',.3);
    if(G.has(s,'vqe')){G.configure(s,'theta',65);G.configure(s,'shots',2);}
    if(G.has(s,'mitigation'))G.configure(s,'mitigate',true);
    if(G.has(s,'surface'))G.configure(s,'distance',strategy==='compact'?3:5);
    if(G.has(s,'ancilla'))G.configure(s,'factories',strategy==='compact'&&chapter>=5?2:1);
    const m=G.metrics(s);
    const moduleTarget=chapter>=5?(strategy==='compact'?5:6):chapter>=4?5:chapter>=3?(strategy==='compact'?2:3):G.has(s,'rb')?1:0;
    const pulseTarget=chapter>=5?(strategy==='compact'?8:7):chapter>=4?(strategy==='compact'?5:4):chapter>=3?(strategy==='compact'?4:3):0;
    const decoderTarget=chapter>=5?(strategy==='compact'?3:2):chapter>=4?2:0;
    // Compete for real budgets: engineering first, then research and staff.
    if(s.module<moduleTarget)G.buyUpgrade(s,'hardware');
    if(s.rack<moduleTarget)G.buyUpgrade(s,'rack');
    if(s.pulse<pulseTarget)G.buyUpgrade(s,'pulse');
    if(s.decoder<decoderTarget)G.buyUpgrade(s,'decoder');
    if(s.staff<6&&!(chapter>=5&&s.pulse<pulseTarget))G.buyUpgrade(s,'staff');
    for(const p of G.content.projects)G.buyProject(s,p.id);
    if(!s.job){
      const needed=G.content.projects.filter(p=>G.projectStatus(s,p.id).available&&p.qualification&&!G.qualificationNow(s,p.qualification));
      const target=needed.find(p=>G.content.experiments.some(e=>e.id===p.qualification));
      if(target)G.startExperiment(s,target.qualification);
      else if(chapter>=5&&s.done.length===30)G.startWorkload(s,'dynamics');
      if(!s.job&&m.drift>.06&&chapter>=1)G.calibrate(s);
    }
    G.tick(s,1);
  }
  snapshots.ending=JSON.parse(JSON.stringify(s));
  return {strategy,state:s,snapshots,events};
}
if(require.main===module){
  const results=['compact','wide'].map(play);
  const summaries=results.map(({strategy,state,events})=>({strategy,ended:state.ended,seconds:state.elapsed,discoveries:state.done.length,physical:G.metrics(state).active,distance:state.distance,factories:state.factories,completed:state.completed,chapters:events}));
  console.log(JSON.stringify(summaries,null,2));
  if(results.some(r=>!r.state.ended)){
    for(const r of results.filter(v=>!v.state.ended))console.error(JSON.stringify({strategy:r.strategy,state:r.state,next:G.content.projects.filter(p=>G.projectStatus(r.state,p.id).available).map(p=>({id:p.id,status:G.projectStatus(r.state,p.id)})),workload:G.workloadStatus(r.state,'dynamics')},null,2));
    process.exitCode=1;
  }else if(process.argv.includes('--write-evidence')){
    const dir=path.resolve(__dirname,'../evidence/coherent');fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,'playthroughs.json'),JSON.stringify(summaries,null,2)+'\n');
    for(const r of results)for(const [name,state]of Object.entries(r.snapshots))fs.writeFileSync(path.join(dir,r.strategy+'-'+name+'.json'),G.serialize(state)+'\n');
  }
}
module.exports={play};
