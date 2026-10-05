/* Read-only targeted audit. Public players create earned states; candidate settings are declared metric previews. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(process.argv[2]||path.resolve(__dirname,'..')),G=require(path.join(root,'game.js')),{campusPlay}=require(path.join(root,'tests/campus-playthrough.cjs'));
const oldReports=JSON.parse(fs.readFileSync(path.join(root,'evidence/campus-playthroughs.json'),'utf8'));
const hashes=Object.fromEntries(['game.js','content.js','app.js','tests/playthrough.cjs','tests/campus-playthrough.cjs'].map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')]));
const optional=p=>p.optional||['factoring','grover','chemistry'].includes(p.id);
function audit(policy){
  const frames=new Map(),changes=[],tick=G.tick,configure=G.configure;
  G.configure=function(s,key,value){const before=s[key],ok=configure(s,key,value);if(ok&&s[key]!==before)changes.push({at:s.elapsed,key,before,after:s[key]});return ok;};
  G.tick=function(s,dt){if(dt<=1)frames.set(s.elapsed,JSON.parse(JSON.stringify(s)));return tick(s,dt);};
  let run;try{run=campusPlay(policy);}finally{G.tick=tick;G.configure=configure;}
  const report=run.report,old=oldReports.find(r=>r.policy===policy),gaps=report.actions.map((to,i)=>i?{seconds:to.at-report.actions[i-1].at,from:report.actions[i-1],to}:null).filter(Boolean).sort((a,b)=>b.seconds-a.seconds);
  function inspect(s){
    const m=G.metrics(s),main=G.content.projects.find(p=>!G.has(s,p.id)&&!optional(p)&&G.projectStatus(s,p.id).available);
    const readyProjects=G.content.projects.filter(p=>G.projectStatus(s,p.id).ready).map(p=>p.id),readyEngineering=G.content.engineering.filter(e=>G.engineeringStatus(s,e.id).ready).map(e=>e.id);
    const readyWorkloads=G.content.workloads.filter(w=>G.workloadStatus(s,w.id).ready).map(w=>w.id);
    const readyExperiments=G.content.experiments.filter(e=>G.experimentStatus(s,e.id).ready).map(e=>({id:e.id,previouslyQualified:s.qualified.includes(e.id),seconds:G.experimentRecipe(s,e.id).seconds,cost:G.experimentRecipe(s,e.id).cost}));
    const readyUpgrades=['hardware','rack','pulse','decoder','automation','workshop','staff'].filter(id=>G.upgradeInfo(s,id).ready);
    const feasibleTasks=[];
    if(!s.job)for(const [kind,items,status] of [['goal',G.content.objectives,G.objectiveStatus],['request',G.content.precisionRequests,G.precisionStatus]])for(const item of items){
      if(!status(s,item.id).available||status(s,item.id).complete)continue;let found=null;
      for(const shots of [0,1,2,3])for(const mitigate of [false,true]){const candidate={...s,theta:item.angle===null?65:item.angle,shots,mitigate};const st=status(candidate,item.id);if(!found&&st.ready)found={kind,id:item.id,theta:candidate.theta,shots,mitigate,cost:st.recipe.cost,seconds:st.recipe.seconds};}
      if(found)feasibleTasks.push(found);
    }
    const logicalAlternatives=[];
    if(G.has(s,'hamiltonian')&&!s.completed.includes('dynamics')&&!s.job)for(const distance of [3,5,7,9])for(const controllerProfile of (G.has(s,'controller2026')?['balanced','streaming','response']:['balanced']))for(const recipe of (G.has(s,'state-readiness')?['balanced','compact','parallel']:['balanced'])){
      const preview={...s,distance,controllerProfile,logicalRecipe:recipe},status=G.workloadStatus(preview,'dynamics',recipe);if(status.ready)logicalAlternatives.push({distance,profile:controllerProfile,recipe,risk:status.risk,runtime:status.runtime,slots:G.metrics(preview).slots,credits:status.credits});
    }
    const fundingPlans=[];
    if(!s.job&&G.has(s,'nisq'))for(const service of [s.service,.9])for(const analysisShare of [s.analysisShare,0]){const p=G.metrics({...s,service,analysisShare});fundingPlans.push({service,analysisShare,netFunding:p.netFunding,effortRate:p.effortRate,designRate:p.designRate});}
    return {at:s.elapsed,chapter:G.stage(s),job:s.job?.id||null,nextMain:main?{id:main.id,reasons:G.projectStatus(s,main.id).reasons}:null,balance:{funds:s.funds,effort:s.effort,designs:s.designs},rates:{netFunding:m.netFunding,effort:m.effortRate,designs:m.designRate},effortCap:m.effortCap,fullBank:m.fullBank,staff:s.staff,notebooks:s.notebooks,service:s.service,analysisShare:s.analysisShare,physical:m.active,pulse:s.pulse,decoder:s.decoder,distance:s.distance,factories:s.factories,frontierDone:s.objectiveResults.length,requestsDone:s.precisionResults.length,readyProjects,readyEngineering,readyWorkloads,readyExperiments,readyUpgrades,feasibleTasks,logicalAlternatives,fundingPlans};
  }
  const events=[...report.actions.map(a=>({at:a.at,kind:a.kind,id:a.id})),...changes.map(c=>({at:c.at,kind:'changed-control',id:c.key}))].sort((a,b)=>a.at-b.at);
  const comprehensiveGaps=events.map((to,i)=>i?{seconds:to.at-events[i-1].at,from:events[i-1],to}:null).filter(Boolean).sort((a,b)=>b.seconds-a.seconds);
  const detailed=gaps.slice(0,8).map(gap=>{
    const ts=[gap.from.at+1,Math.floor((gap.from.at+gap.to.at)/2),gap.to.at-1];
    return {...gap,controlChanges:changes.filter(c=>c.at>gap.from.at&&c.at<gap.to.at),frames:ts.filter(t=>frames.has(t)).map(t=>inspect(frames.get(t)))};
  });
  const earliestOpportunities=gaps.slice(0,4).map(gap=>{
    let opportunity=null;
    for(let t=gap.from.at+1;t<gap.to.at&&!opportunity;t++){
      const s=frames.get(t);if(!s||s.job||!G.has(s,'hamiltonian')||s.completed.includes('dynamics'))continue;
      for(const distance of [s.distance,3,5,7,9])for(const recipe of (G.has(s,'state-readiness')?[s.logicalRecipe,'balanced','compact','parallel']:['balanced'])){
        const p={...s,distance,logicalRecipe:recipe},status=G.workloadStatus(p,'dynamics',recipe);
        if(!opportunity&&status.ready){
          const trial=JSON.parse(JSON.stringify(s));if(!G.configure(trial,'distance',distance)||!G.configure(trial,'logicalRecipe',recipe)||!G.startWorkload(trial,'dynamics'))throw new Error('Preview could not start through public actions');
          for(let i=0;i<150&&trial.job;i++)G.tick(trial,1);
          if(trial.job||!trial.completed.includes('dynamics'))throw new Error('Ready preview did not finish');
          opportunity={at:t,settingsWereAlreadySelected:s.distance===distance&&s.logicalRecipe===recipe,distance,recipe,pulse:s.pulse,physical:G.metrics(s).active,entryFunding:s.funds,entryCredits:s.credits,payout:G.content.workloads.find(w=>w.id==='dynamics').payout,risk:status.risk,runtime:status.runtime,finishedAt:trial.elapsed,finishedFunding:trial.funds,finishedCredits:trial.credits,ended:trial.ended,completed:trial.completed,entryNextMain:inspect(s).nextMain};
        }
      }
    }
    return {from:gap.from.at,to:gap.to.at,seconds:gap.seconds,opportunity};
  });
  const chapters=report.chapters.map((ch,i)=>({chapter:ch.chapter,from:ch.at,to:report.chapters[i+1]?.at||report.seconds,seconds:(report.chapters[i+1]?.at||report.seconds)-ch.at,recordedActions:report.actions.filter(a=>a.at>=ch.at&&a.at<(report.chapters[i+1]?.at||report.seconds)).length,changedControls:changes.filter(c=>c.at>=ch.at&&c.at<(report.chapters[i+1]?.at||report.seconds)).length}));
  return {policy,evidenceKind:'Targeted deterministic replay of existing public-action policy; not user Chrome or human enjoyment',clockMatchesSaved:report.seconds===old.seconds,seconds:report.seconds,recordedActions:report.actions.length,controlChanges:changes.length,analysisChanges:changes.filter(c=>c.key==='analysisShare').length,chapters,reportedLongestGap:report.campusCounts.longestNoAction,allChangedControlsLongestGap:comprehensiveGaps[0],largestRecordedGaps:detailed,earliestOpportunities};
}
const out={sourceHashes:hashes,runs:['local','bulk'].map(audit)};
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2));
console.log(JSON.stringify({sourceHashes:hashes,runs:out.runs.map(r=>({policy:r.policy,clockMatchesSaved:r.clockMatchesSaved,seconds:r.seconds,controlChanges:r.controlChanges,analysisChanges:r.analysisChanges,chapters:r.chapters,reportedLongestGap:r.reportedLongestGap,allChangedControlsLongestGap:r.allChangedControlsLongestGap,gaps:r.largestRecordedGaps.map(g=>({seconds:g.seconds,from:g.from,to:g.to,changedControls:g.controlChanges.length,frames:g.frames.map(f=>({at:f.at,next:f.nextMain,physical:f.physical,pulse:f.pulse,analysisShare:f.analysisShare,ready:f.readyWorkloads,feasibleTasks:f.feasibleTasks.map(t=>t.id),readyProjects:f.readyProjects,alternatives:f.logicalAlternatives.map(a=>`${a.distance}/${a.profile}/${a.recipe}`)}))}))}))},null,2));
