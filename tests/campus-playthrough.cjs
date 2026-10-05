/* Legal campus policy fixtures. This wraps the baseline player's tick boundary, adding only public engine actions. */
const G=require('../game.js');
const {play,summary}=require('./playthrough.cjs');
function campusPlay(policy='local',seed=424242,options={}){
  if(!['local','bulk'].includes(policy))throw new Error('Unknown campus policy');
  const originalTick=G.tick,actions=[],orders=[],counts={busy:0,idle:0,taskBusy:0,studyBusy:0,longestNoAction:0},failures={},completed=new Set();let lastAction=0,totalOrdered={chip:0,support:0};
  const record=(s,kind,id)=>{counts.longestNoAction=Math.max(counts.longestNoAction,s.elapsed-lastAction);lastAction=s.elapsed;actions.push({at:s.elapsed,kind,id});};
  const tracked=['assign','buyProject','buyEngineering','buyUpgrade','calibrate','startExperiment','startWorkload','startStudy'];
  const originals=Object.fromEntries(tracked.map(name=>[name,G[name]]));
  for(const name of tracked)G[name]=function(s,...args){const accepted=originals[name](s,...args);if(accepted)record(s,name,args[0]||name);return accepted;};
  G.tick=function(s,dt){
    // Baseline player uses <=1s steps. The actual original tick calls itself for long intervals.
    if(dt>1){return originalTick(s,dt);}
    if(!s.job&&!s.ended){
      for(const id of ['controller2026','adaptive2026','state-readiness'])if(G.projectStatus(s,id).ready&&G.buyProject(s,id))record(s,'modern-discovery',id);
      const sources=policy==='local'?[[false,G.content.objectives],[true,G.content.precisionRequests]]:[[true,G.content.precisionRequests],[false,G.content.objectives]];
      for(const [precision,items] of sources){
        const item=items.find(item=>{
          const status=(precision?G.precisionStatus:G.objectiveStatus)(s,item.id);
          return status.available&&!status.complete&&(failures[item.id]||0)<3;
        });
        if(!item)continue;
        const previousService=s.service;
        G.configure(s,'theta',item.angle===null?65:item.angle);G.configure(s,'shots',item.tolerance>=.16?1:item.tolerance>=.10?2:3);G.configure(s,'mitigate',item.tolerance<.06||policy==='bulk');G.configure(s,'service',0);
        if((precision?G.startPrecisionRequest:G.startObjective)(s,item.id)){record(s,precision?'precision':'objective',item.id);break;}
        G.configure(s,'service',previousService);
      }
    }
    if(!s.ended&&s.workshops>0){
      const offer=G.content.procurementOffers.find(offer=>offer.id===policy),m=G.metrics(s);
      const target=policy==='local'?768:2048;
      const kind=m.installed<=m.capacity?'chip':'support';
      const stock=s[kind==='chip'?'chipStock':'supportStock'];
      if(totalOrdered[kind]<target&&stock<offer.units&&s.funds>=offer.cost+1800&&G.orderEquipment(s,policy,kind)){totalOrdered[kind]+=offer.units;orders.push({at:s.elapsed,offer:policy,kind,units:offer.units});record(s,'procurement',kind);}
    }
    const old=s.job,id=old?.objective||old?.request||old?.study;
    if(old){counts.busy++;if(old.objective||old.request)counts.taskBusy++;if(old.study)counts.studyBusy++;}else counts.idle++;
    originalTick(s,dt);
    if(old&&!s.job){
      record(s,old.study?'study-completion':id?'measurement-completion':old.workload?'workload-completion':'experiment-completion',id||old.id);
      if(id&&!s.objectiveResults.some(result=>result.id===id)&&!s.precisionResults.some(result=>result.id===id)&&!s.researchResults.some(result=>result.id===id))failures[id]=(failures[id]||0)+1;
    }
    for(const receipt of [...s.objectiveResults,...s.precisionResults])completed.add(receipt.id);
  };
  let result;
  try{result=play(policy==='local'?'frontier':'infrastructure','dynamics',{seed,...options});}finally{G.tick=originalTick;for(const name of tracked)G[name]=originals[name];}
  const s=result.state;counts.longestNoAction=Math.max(counts.longestNoAction,s.elapsed-lastAction);
  return {result,report:{evidenceKind:'legal public-action automated campus fixture; not human enjoyment or browser evidence',policy,seed,...summary(result),campusCounts:counts,frontier:s.objectiveResults.map(receipt=>receipt.id),precision:s.precisionResults.map(receipt=>receipt.id),history:s.researchResults.map(receipt=>receipt.id),modern:s.done.filter(id=>G.content.projects.find(project=>project.id===id).optional),orders,actions,failures}};
}
if(require.main===module){
  const runs=['local','bulk'].map(policy=>campusPlay(policy));console.log(JSON.stringify(runs.map(run=>run.report),null,2));if(runs.some(run=>!run.result.state.ended))process.exitCode=1;
}
module.exports={campusPlay};
