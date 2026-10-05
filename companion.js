/* Read-only teaching beside the existing engine and its selected next action. */
(function(root,factory){
  const G=typeof module==='object'&&module.exports?require('./game.js'):root.Coherent;
  const api=factory(G);
  if(typeof module==='object'&&module.exports)module.exports=api;else root.CoherentCompanion=api;
})(globalThis,function(G){
  'use strict';
  const C=G.content,num=(v,d=2)=>Number.isFinite(v)?v.toLocaleString('en',{maximumFractionDigits:d}):'—';
  const detail=(label,value,note='')=>({label,value:String(value),note});
  const topics=[
    {id:'signal',title:'I · Make a signal, then give it a purpose',body:'Prepare a known state and collect repeated measurements. A qualified first signal opens Feynman’s discovery; purchasing it opens research allocation. Deutsch’s notebook then makes engineering designs possible. These steps finish through earned evidence and purchases, not clicking through Help.',target:'run-experiment',papers:['Q01','Q02']},
    {id:'resources',title:'People, notebooks and the full bank',body:'Funding pays entry costs and upkeep. Effort fills a finite notebook bank; designs are classical plans. Researchers and notebooks share earned trust. More storage admits larger discoveries but takes longer to fill. A full effort bank increases design generation; spending effort removes that bonus.',target:'economy-section',papers:['Q02']},
    {id:'hardware',title:'II · Installed is not supported',body:'Active physical qubits are the smaller of installed chip capacity and commissioned control/cooling support. Adding only the larger side cannot increase active capacity. IV · Delivered assemblies remain stock until funded workshop commissioning; they are not active qubits.',target:'workshop-control',papers:['Q03','Q04']},
    {id:'duty',title:'II–III · Apparatus time has a budget',body:'Calibration is taken first, then the remaining duty is split between services and experiments. Apparatus seconds are not necessarily elapsed laboratory seconds. Atomic protected-memory, gate, factory, calibration and full workload jobs reserve apparatus duty; services, classical bench automation and commissioning pause where the engine marks them reserved.',target:'allocation-controls',papers:['Q04']},
    {id:'measurement',title:'III–IV · Better shots do not fix the wrong preparation',body:'The ansatz angle sets the known trial preparation. More shots reduce sampling uncertainty, while mitigation addresses a declared residual-bias model and costs extra acquisitions. Neither repairs an unsuitable ansatz. Compare the captured result with its classical reference; the finite task may use a different named criterion.',target:'noisy-controls',papers:['Q16','Q18']},
    {id:'protection',title:'V–VI · Protect memory, then budget the whole job',body:'Code distance trades physical footprint and time for suppression only in the declared below-threshold model. Memory qualification is separate from logical gates and fresh-state factories. Decoder streaming capacity and feedback latency are different limits. Factory credits are classical rehearsal records, not stored quantum states. Complete workload budgets include preparation, gates, fresh-state waiting, repetitions and readout; a browser resource model is not a quantum execution.',target:'memory-controls',papers:['Q08','Q10','Q11','Q37','Q41']},
    {id:'history',title:'Source chronology is not purchase order',body:'Paper dates order the archive; prerequisites determine play order. A fresh paid study earns evidence, then its separately priced discovery must be purchased. Later research does not mean every earlier item was bought. New campaigns require all eleven 2015–2025 study discoveries before the ending; already earned historical endings remain preserved.',target:'discoveries-section',papers:['Q51']}
  ];
  const glossary=[
    {term:'Funding',meaning:'Pays acquisition, research, equipment and upkeep; income requires grants or actually delivered services.'},
    {term:'Research effort',meaning:'Abstract work stored up to notebook capacity; discoveries spend it.'},
    {term:'Engineering designs',meaning:'Classical plans generated after Deutsch’s notebook; these are separate from research effort.'},
    {term:'Trust',meaning:'Earned assignments shared by researchers and notebooks, not spendable funding.'},
    {term:'Active qubits',meaning:'The minimum of commissioned installed and supported physical capacity, not universal computational power.'},
    {term:'Apparatus duty',meaning:'The fraction of laboratory time available to a job after calibration and competing work.'},
    {term:'Sampling bound',meaning:'A statistical uncertainty bound from a finite number of repeated preparations and measurements.'},
    {term:'Residual bias',meaning:'A modeled systematic error budget that more shots alone do not remove.'},
    {term:'Ansatz',meaning:'The chosen family of trial preparations; a precise measurement of the wrong preparation can still fail.'},
    {term:'Code distance',meaning:'A protection/footprint/time tradeoff inside the selected error model, not a universal hardware guarantee.'},
    {term:'Syndrome',meaning:'Error evidence from check measurements; it does not reveal the unknown data state.'},
    {term:'Feedback latency',meaning:'How long a classical response takes; independent of sustained decoding throughput.'},
    {term:'Rehearsal credits',meaning:'Classical planning records for future fresh-state supply, never stockpiled quantum states.'},
    {term:'Fresh study',meaning:'A separately paid trial yielding a study receipt; the discovery purchase remains another deliberate action.'}
  ];
  function actionData(s,a){
    if(!a)return {status:null,item:null,target:'next-title'};
    const find=list=>list.find(x=>x.id===a.id),types={
      project:[C.projects,G.projectStatus,'discoveries-section'],study:[C.projects,G.studyStatus,'discoveries-section'],
      experiment:[C.experiments,G.experimentStatus,'run-experiment'],engineering:[C.engineering,G.engineeringStatus,'engineering-section'],
      workload:[C.workloads,G.workloadStatus,'workload-section'],objective:[C.objectives,G.objectiveStatus,'objective-list'],precision:[C.precisionRequests,G.precisionStatus,'precision-list']
    };
    if(types[a.type]){const [items,status,target]=types[a.type];return {item:find(items),status:status(s,a.id),target};}
    if(a.type==='upgrade')return {item:G.upgradeInfo(s,a.id),status:G.upgradeInfo(s,a.id),target:'upgrade-list'};
    if(a.type==='procurement'){const q=G.procurementStatus(s,a.id,a.kind);return {item:q.offer,status:q,target:'procurement-section'};}
    if(a.type==='research')return {item:null,status:G.researchStatus(s),target:'enter-research'};
    if(a.type==='job')return {item:null,status:null,target:'cancel-job'};
    if(a.type==='campus')return {item:null,status:G.campusStatus(s),target:'enter-campus'};
    if(a.type==='calibrate')return {item:null,status:G.calibrationStatus(s),target:'calibrate-button'};
    return {item:null,status:{ready:false,reasons:['This action is not recognized. Review the current native control.']},target:'next-title'};
  }
  function result(s){
    const j=s.job,r=s.result,t=s.tutorial,details=[];
    if(j){
      details.push(detail('Apparatus progress',num(j.progress,1)+' / '+num(j.duration,1)+' s','Captured job progress, not scientific runtime'));
      if(j.id==='vqe')details.push(detail('Captured preparation',num(j.theta)+'°'),detail('Captured shots per group',num(j.shots)),detail('Captured mitigation',j.mitigate?'On':'Off'),detail('Captured readout bias',num(j.bias,4),'The bias captured when this trial began'));
      if(j.workload)details.push(detail('Captured recipe',j.recipe||'balanced','A modeled logical workload, not a quantum execution'));
      if(j.study)details.push(detail('Fresh study',C.projects.find(p=>p.id===j.study)?.title||j.study,'Its acquisition fee was spent; successful evidence and the research purchase are separate'));
      return {title:'The apparatus is working'+(s.paused?' · paused':''),text:'The current job keeps its captured settings. Changing a control does not rewrite this trial. Entry costs stay spent if you cancel. '+(G.metrics(s).atomic?'This job reserves services, analysis automation and commissioning.':'Calibration and service duty determine how quickly apparatus time advances.'),details};
    }
    if(!r)return {title:'No result recorded yet',text:'Run the actual first known-preparation experiment. Help neither runs trials nor grants evidence.',details};
    let text=r.message;
    if(r.id==='vqe'&&t){
      details.push(detail('Captured preparation',num(t.theta)+'°'),detail('Actual samples',num(t.shots),'Across three Pauli groups'),detail('Modeled acquisitions',num(t.modeledShots),'Includes the captured mitigation overhead'),detail('Sampled energy',num(t.energy,4)),detail('Classical reference',num(t.reference,4)),detail('Sampling bound','±'+num(t.statistical,4)),detail('Residual bias bound','≤'+num(t.bias,4)),detail('Ansatz mismatch',num(t.ansatzError,4)));
      text+=' More shots address sampling uncertainty; they do not remove residual bias or repair a mismatched preparation.';
      if(r.task){details.push(detail('Captured task reference',num(r.task.reference,4),'Distinct from the tutorial ground reference'),detail('Captured task tolerance',num(r.task.tolerance,4)));text+=' This finite task used its captured '+r.task.tolerance+' tolerance against '+(r.task.angle===null?'the ground reference':r.task.angle+'° known preparation')+'.';}
    }
    if(r.study){const p=C.projects.find(p=>p.id===r.study.id);if(p.study.kind==='ansatz-budget')text+=' This study succeeds by exposing a precise ansatz mismatch; passing the study does not qualify the ground-reference energy.';text+=' '+(r.study.passed?(G.has(s,r.study.id)?'Its discovery has also been purchased.':'Evidence is recorded; “'+p.title+'” still needs its separate research purchase.'):'No successful fresh-study receipt was earned.');}
    return {title:r.study?'Fresh study '+(r.study.passed?'accepted':'not qualified'):r.task?'Finite measurement '+(r.task.passed?'accepted':'not qualified'):r.id==='vqe'?'Energy trial '+(t?.qualified?'qualified':'not qualified'):'Recorded apparatus result',text,details};
  }
  function describe(s,context={}){
    const m=G.metrics(s),a=context.action,{item,status,target}=actionData(s,a),navigation=a?.navigation===true;
    const reasons=[...(status?.reasons||[]),...(context.shellReasons||[])];
    if(s.paused)reasons.push('Laboratory time is paused. Help and navigation remain available; resume before starting another paid trial.');
    if(s.ended)reasons.push('The earned ending is preserved. Continue the laboratory before new campaign actions; Help remains available.');
    if(s.job&&navigation)reasons.push('The current rail control is occupied by a captured job; you can still inspect its target from Help.');
    const title=context.title||item?.title||item?.name||item?.label||'Your laboratory, explained';
    let explanation=context.hint||item?.effect||item?.description||'Use the current next-action guidance and its real controls. Help explains your laboratory without buying, running or changing anything.';
    if(a?.type==='study')explanation+=' A successful fresh study records evidence; its discovery is purchased separately.';
    if(a?.type==='project'&&item?.historyYear)explanation+=' Its paper date is a publication landmark, not a prerequisite ranking. Study qualification and purchase are separate.';
    if(a?.type==='procurement')explanation+=' Delivery creates stock; funded commissioning converts it into installed or supported capacity.';
    const instrument=context.instrument;if(instrument)explanation+=' '+instrument.purpose+' '+instrument.constraint;
    const opening=[
      {title:'Prepare and measure the first signal',done:s.qualified.includes('signal'),explanation:'Use the real known-preparation experiment. Qualification is earned when it finishes.',target:'run-experiment'},
      {title:'Purchase Feynman’s discovery',done:G.has(s,'feynman'),explanation:'Evidence opens the discovery; purchasing it unlocks trust allocation for people and notebooks.',target:'discoveries-section'},
      {title:'Open Deutsch’s circuit notebook',done:G.has(s,'deutsch'),explanation:'Earn effort in the finite bank and buy the discovery to begin generating classical designs.',target:'discoveries-section'}
    ];
    const links=[{target:context.target||target,label:'Show me the control'}];if(instrument?.target&&instrument.target!==target)links.push({target:instrument.target,label:instrument.action||'Show instrument controls'});
    links.push({target:'sound-toggle',label:s.sound?'Sound is enabled · mute control':'Sound is muted · sound control'});
    const receipts=s.researchResults||[],pending=receipts.filter(r=>!G.has(s,r.id));
    const budget=[];
    if(['project','engineering'].includes(a?.type)&&item?.cost)for(const [key,label] of [['funds','Funding'],['effort','Research effort'],['designs','Engineering designs']])budget.push(detail(label,num(item.cost[key]||0)));
    if(a?.type==='upgrade'&&item)budget.push(detail('Funding',num(item.cost)),detail('Engineering designs',num(item.designs)));
    const recipe=a?.type==='experiment'?G.experimentRecipe(s,a.id):a?.type==='study'?status?.recipe:['objective','precision'].includes(a?.type)?status?.recipe:null;
    if(recipe)budget.push(detail('Funding',num(recipe.cost)),detail('Modeled acquisitions',num(recipe.modeledAcquisitions)),detail('Apparatus seconds',num(recipe.seconds),'Laboratory duration depends on current duty'));
    if(pending.length&&!s.result?.study)explanation+=' '+pending.length+' fresh study receipt'+(pending.length===1?' is':'s are')+' earned but its discovery purchase remains separate.';
    if(a?.type==='calibrate'&&status)budget.push(detail('Funding',num(status.cost)),detail('Apparatus seconds',num(status.seconds)));
    if(a?.type==='workload'&&item&&status)budget.push(detail('Funding',num(item.fee)),detail('Rehearsal credits',num(status.credits)),detail('Modeled runtime',num(status.runtime)+' μs'),detail('Apparatus seconds',num(item.seconds)));
    if(a?.type==='procurement'&&status?.offer)budget.push(detail('Funding',num(status.cost)),detail('Engineering designs',num(status.designs)),detail('Delivered stock units',num(status.units)),detail('Delivery laboratory seconds',num(status.seconds)));
    return {title,explanation,budget,reasons:[...new Set(reasons)],ready:!!status?.ready&&!s.paused&&!s.ended&&!context.shellReasons?.length,links,papers:[...new Set([...(item?.papers||[]),...(instrument?.papers||[])])].filter(id=>C.papers[id]),opening,result:result(s),diagrams:{
      hardware:[{label:'Installed',value:m.installed},{label:'Supported',value:m.capacity},{label:'Active · smaller footprint',value:m.active}],
      bank:[{label:'Stored effort',value:s.effort},{label:'Notebook capacity',value:m.effortCap},{label:'Free trust',value:m.freeTrust},{label:'Full-bank design multiplier',value:m.designBonus}],
      duty:[{label:'Calibration',value:m.calibrationDuty},{label:'Services',value:m.effectiveServiceDuty},{label:'Experiments',value:m.experimentDuty}]
    },topics,glossary:[...glossary,{term:'Instrument sound',meaning:'Authored feedback, not a recording or a measurement of hardware. '+(s.sound?'Sound is enabled; browser playback begins only after a genuine interaction.':'Your saved mute choice is respected.')}]};
  }
  return {describe};
});
