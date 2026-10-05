/* Read-only instrument views. All prices, qualification and predictions remain engine-owned. */
(function(root,factory){
  const G=typeof module==='object'&&module.exports?require('./game.js'):root.Coherent;
  const api=factory(G);
  if(typeof module==='object'&&module.exports)module.exports=api;else root.CoherentInspector=api;
})(globalThis,function(G){
  'use strict';
  const num=(v,d=0)=>Number.isFinite(v)?v.toLocaleString('en',{maximumFractionDigits:d}):'—';
  const pct=(v,d=2)=>Number.isFinite(v)?(v*100).toFixed(d)+'%':'Unqualified';
  const error=v=>v===null?'Unqualified':v.toExponential(2);
  const read=(label,value,note='')=>({label,value:String(value),note});
  function preview(s,id){
    const quote=G.upgradeInfo(s,id);
    if(!quote)return null;
    const before=G.metrics(s);
    let after=null;
    if(quote.ready){const candidate=JSON.parse(JSON.stringify(s));if(G.buyUpgrade(candidate,id))after=G.metrics(candidate);}
    const fields={hardware:[['Installed physical qubits','installed',''],['Active physical qubits','active','']],rack:[['Supported physical qubits','capacity',''],['Active physical qubits','active','']],pulse:[['Effective noise','pEff','percent'],['RB scenario error','rbError','percent']],decoder:[['Streaming capacity','decoderRate',' / μs'],['Feedback latency','feedback',' μs']],automation:[['Running analysis stations','automationRunning',''],['Research rate','effortRate',' / lab s']],workshop:[['Chip commissioning','fabricationRate',' / lab s'],['Support commissioning','integrationRate',' / lab s']]};
    const format=(v,unit)=>unit==='percent'?pct(v,3):num(v,2)+unit;
    return {id,...quote,comparisons:fields[id].map(([label,field,unit])=>({label,before:format(before[field],unit),after:after?format(after[field],unit):null}))};
  }
  function workflow(s){
    const j=s.job;
    const step=(label,station)=>({label,station});
    if(!j)return {active:false,progress:0,index:-1,label:'Apparatus idle',stages:[],note:'Choose an experiment to follow its apparatus progress. No unknown quantum state is displayed.'};
    const progress=Math.max(0,Math.min(1,j.progress/j.duration)),maintenance=j.id==='calibrate';
    const name=maintenance?'Calibrate the apparatus':(j.workload?G.content.workloads:G.content.experiments).find(x=>x.id===j.id)?.name||j.id;
    const qec=j.workload||['memory','gates','factory'].includes(j.id);
    const stages=maintenance?[step('Maintenance','cryostat')]:j.id==='memory'?[step('Encoded preparation','memory'),step('Repeated checks','control'),step('Classical decoding','control'),step('Memory qualification','operations')]:[step(j.workload?'Workspace preparation':'Known preparation',j.id==='factory'?'planning':G.stage(s)>=2?'processor':'cryostat'),step(qec?'Logical control':'Pulse control','control'),step(qec?'Check measurements':'Readout',G.stage(s)>=2?'processor':'cryostat'),step(qec?'Classical decoding':'Classical analysis',qec?'control':'research')];
    return {active:!s.paused&&!s.ended,progress,index:Math.min(stages.length-1,Math.floor(progress*stages.length)),label:name+(s.paused?' · paused':'')+' · '+pct(progress,0),stages,note:maintenance?'Maintenance occupies the apparatus; this is not a quantum computation.':'Schematic bands follow the actual job’s overall apparatus progress. They are not measured per-stage timings; scientific μs and laboratory time are separate.'};
  }
  function describe(s,type){
    const m=G.metrics(s),has=id=>G.has(s,id),planned=s.paused||s.ended||!s.started;
    let title,purpose,readouts,constraint,upgrade=null,target='next-title',action='Review the next action',papers=[];
    const hardware=[read('Installed',num(m.installed),'Physical qubits after commissioning'),read('Support capacity',num(m.capacity),'Control and cooling footprint'),read('Active',num(m.active),'The smaller installed/support footprint'),read('Calibration duty',pct(m.calibrationDuty,0),'Competes for apparatus time')];
    const fit=!m.below?'Effective noise is above the selected 1% threshold.':m.slots<1?'No application patch fits the current allocation.':!m.decoderOK?'Syndrome demand exceeds classical decoding throughput.':!m.memoryOK?'The current protected-memory model is not qualified.':'Protected memory fits this conditional model; logical gates need their own qualification.';
    if(type==='cryostat-stack'){
      title='The cooling stack';purpose='Staged cooling is shown as a schematic cutaway. The game combines control and cooling support into one commissioned footprint; it does not simulate temperatures.';
      readouts=hardware;constraint=m.installed>m.capacity?'Installed hardware exceeds commissioned support. Expand control and cooling before all qubits can be active.':'Support covers the installed footprint. More hardware still needs matching support.';
      upgrade='rack';target='allocation-controls';action='Adjust calibration duty';papers=['Q04','Q38'];
    }else if(type==='control-rack'){
      title='The pulse controller';purpose='Classical control prepares known states and applies the chosen pulse sequence. Refinement changes the game’s declared noise scenario, rather than revealing a quantum state.';
      readouts=[read('Effective noise',pct(m.pEff,3),'Selected stochastic scenario'),read('RB estimate',pct(m.rbError,3),'A distinct characterization model'),read('Drift',num(s.drift,3),'Maintenance changes this game parameter'),read('Experiment duty',pct(m.experimentDuty,0),'Fraction available to the apparatus')];
      constraint=m.below?'Noise is below the selected threshold; footprint, decoder and gate requirements still apply.':'The selected noise exceeds the 1% threshold; refine pulses and manage drift.';upgrade='pulse';target='allocation-controls';action='Adjust calibration duty';papers=['Q05','Q45'];
    }else if(type==='decoder-rack'){
      title='The classical decoder';purpose='Check ancilla evidence enters a classical decoder. Syndrome events report error evidence; they do not reveal the unknown data state.';
      readouts=[read('Syndrome demand',num(m.syndromeRate)+' / μs','All allocated ideal patches'),read('Streaming capacity',num(m.decoderRate)+' / μs','Separate from decoding accuracy'),read('Feedback latency',num(m.feedback)+' μs','Separate from streaming throughput'),read('Controller profile',s.controllerProfile||'balanced','Authored game tradeoff')];
      constraint=!has('surface')?'Research protected memory before the decoder receives modeled syndrome traffic.':!m.decoderOK?'The syndrome stream is arriving faster than this controller can decode it.':m.feedback>40?'The stream fits, but feedback is too slow for the selected logical-gate requirement.':'Streaming and feedback fit their current budgets. This does not certify a complete workload.';
      upgrade='decoder';target=has('controller2026')?'controller-profile-control':'engineering-section';action=has('controller2026')?'Compare controller profiles':'Review decoding engineering';papers=['Q37','Q41'];
    }else if(type==='processor-package'){
      title='The physical processor';purpose='The package contains physical qubits driven and measured by classical equipment. Installed qubits and Hilbert-space size are not universal computational power.';
      const captured=s.job?.id==='vqe'&&Number.isFinite(s.job.theta);
      readouts=[...hardware.slice(0,3),read(captured?'Captured trial preparation':'Selected trial preparation',num(captured?s.job.theta:s.theta)+'°',captured?'Captured by the active energy trial':'Selected tutorial control; other job kinds do not capture this preparation')];
      constraint=m.capacity<m.installed?'Support limits active physical qubits. Additional chip hardware alone will not fix that constraint.':'Installed hardware limits the active footprint; qualified experiments still require their own budgets.';upgrade=m.capacity<m.installed?'rack':'hardware';target=has('vqe')?'noisy-controls':'run-experiment';action=has('vqe')?'Tune a known trial preparation':'Choose the next experiment';papers=['Q03','Q04','Q29'];
    }else if(type==='memory-patch'){
      title='The protected-memory patch';purpose='A representative rotated surface-code patch uses data and check qubits. This is a conditional protected memory, not automatically a universal logical processor.';
      readouts=[read('Code distance',s.distance,'More protection consumes more footprint'),read('Physical footprint',num(m.patch)+' / ideal patch','Full-machine costs are larger'),read('Application slots',m.slots,'After routing, spare and factory allocations'),read('Memory error / cycle',error(m.pL),'Conditional selected model')];
      constraint=fit;target=has('surface')?'memory-controls':'discoveries-section';action=has('surface')?'Compare code distances and allocation':'Research protected memory';papers=['Q08','Q51'];
    }else if(type==='factory-bay'){
      title='The fresh-state factory';purpose='An allocated factory supplies fresh accepted ancillary states under the selected logical model. Rehearsal credits are classical planning records, never quantum states stored for later.';
      readouts=[read('Allocated factories',s.factories,'Four patch-sized units each'),read('Accepted-state scenario',m.factoryOK?num(m.modelFactoryRate,3)+' / μs':'Unqualified','Scientific model rate'),read('Rehearsal credits',num(s.credits,1)+' / 2,000','Classical bookkeeping'),read('Output error assumption',m.pT.toExponential(1),'Distinct from memory and gate errors')];
      constraint=!has('ancilla')?'Research fresh-state preparation first.':!m.factoryOK?'Qualify memory, logical gates and factory allocation before this model can supply accepted states.':'The factory model is qualified. A full workload may still be limited by footprint, fresh-state waiting, risk or runtime.';target=has('ancilla')?'factory-control':'discoveries-section';action=has('ancilla')?'Compare factory allocations':'Research fresh-state preparation';papers=['Q11','Q40','Q43'];
    }else if(type==='planning-console'){
      title='The logical planning table';purpose='Application, routing, spare and factory footprint compete on the same machine. A complete schedule includes memory, gates, fresh states, preparation, readout, feedback and repetitions.';
      readouts=[read('Ideal patches',m.totalPatches,'Not a full-machine cost estimate'),read('Reserved patches',m.reserved,'Routing, spare and factory footprint'),read('Application slots',m.slots,'Available to a workload'),read('Schedule recipe',s.job?.workload?s.job.recipe:s.logicalRecipe,'The active job keeps its captured recipe')];
      constraint=fit;target=G.stage(s)===5?'workload-section':'memory-controls';action=G.stage(s)===5?'Compare complete workload budgets':'Compare logical allocation';papers=['Q10','Q20','Q43'];
    }else if(type==='research-desk'){
      title='The research workstation';purpose='People and classical analysis turn qualified evidence into research effort and engineering designs. Notebook capacity consumes the same trust assignments as researchers.';
      readouts=[read('Researchers',s.staff,'Campus-wide allocation'),read('Notebook capacity',num(m.effortCap),'Abstract research-effort storage'),read('Free trust',m.freeTrust,'Assignments available'),read('Design generation',num(m.designRate,3)+' / lab s','A full research bank increases this rate')];
      constraint=m.freeTrust<1?'No trust assignments remain. Release a researcher or notebook before reallocating.':m.fullBank?'The effort bank is full. Its design bonus is active; more notebooks trade capacity against people.':'Researchers are building the evidence bank; notebook space sets its capacity.';upgrade='automation';target='economy-section';action='Reallocate researchers and notebooks';papers=['Q01'];
    }else if(type==='commissioning-crane'||type==='commissioning-cell'){
      title=type==='commissioning-cell'?'The commissioning cell':'The commissioning crane';purpose='Funded construction teams commission chip and support capacity. Delivered equipment is stock until workshop time and funding convert it into usable capacity.';
      readouts=[read('Construction teams',s.workshops,'Campus-wide team allocation'),read('Chip commissioning',num(m.fabricationRate,2)+' / lab s',(planned?'Planned':'Current')+' funded rate'),read('Support commissioning',num(m.integrationRate,2)+' / lab s',(planned?'Planned':'Current')+' funded rate'),read('Chip share',pct(s.fabrication,0),'The remainder commissions support')];
      constraint=m.atomic?'This apparatus job reserves the machine; commissioning is suspended.':!G.hasEngineering(s,'workshop')?'Research workshop engineering to start commissioning.':s.workshops<1?'Assign a funded construction team.':s.funds<=0?'Commissioning needs funding; delivered stock alone cannot install itself.':'Both chip and support commissioning matter. Their smaller footprint limits active capacity.';upgrade='workshop';target='workshop-control';action='Balance commissioning streams';papers=['Q04'];
    }else if(type==='chip-bay'||type==='support-bay'){
      const chip=type==='chip-bay',kind=chip?'chip':'support',orders=(s.orders||[]).filter(o=>o.kind===kind),pending=orders.reduce((n,o)=>n+(G.content.procurementOffers.find(p=>p.id===o.offer)?.units||0),0);
      title=chip?'The chip receiving bay':'The support receiving bay';purpose='This bay receives '+(chip?'chip':'control and cooling')+' assemblies. Crates represent stock cohorts, not individual qubits; receipt is not installed or active capacity.';
      readouts=[read('Received stock',num(chip?m.chipStock:m.supportStock,1),'Awaiting funded commissioning'),read('Incoming units',num(pending),orders.length+' outstanding orders'),read('Prefab commissioning',num(chip?m.prefabFabricationRate:m.prefabIntegrationRate,2)+' / lab s',(planned?'Planned':'Current')+' funded stock flow'),read(chip?'Installed physical qubits':'Supported physical qubits',num(chip?m.installed:m.capacity),'Commissioned footprint; separate from stock')];
      constraint=m.atomic?'Stock is retained while the current apparatus job reserves commissioning.':orders.length?'Orders remain in transit; received units still require funded workshop commissioning.':(chip?m.chipStock:m.supportStock)>0?'Stock has arrived. Allocate workshop time and funding to commission it.':'The bay has no received stock. Compare procurement offers and delivery times.';target='procurement-section';action='Compare delivery quotes and stock';papers=['Q04'];
    }else if(type==='operations-console'){
      title='The operations console';purpose='The console connects the current apparatus job, decoder budgets and next campaign constraint. Its counters are the same engine state used by the ordinary controls.';
      readouts=[read('Active physical qubits',num(m.active),'Installed and support minimum'),read('Decoder demand / capacity',num(m.syndromeRate)+' / '+num(m.decoderRate)+' per μs','Streaming traffic, not latency'),read('Feedback latency',num(m.feedback)+' μs','Independent controller constraint'),read('Apparatus duty',pct(m.experimentDuty,0),'Shared with calibration and eligible services')];
      constraint='Follow the next action and its actual prerequisites in the operations guidance.';target='next-title';action='Review the next action and budget';papers=['Q37','Q41'];
    }else if(type==='service-terminal'){
      title='The service terminal';purpose='Known-preparation customer batches share apparatus duty with classical analysis and explicit experiments. Finite precision requests require fresh trial evidence.';
      readouts=[read('Customer batches',num(m.delivered,2)+' / lab s',(planned?'Planned':'Current')+' qualified delivery rate'),read('Service funding',num(m.revenue,2)+' / lab s','Separate from grants and upkeep'),read('Analysis stations running',num(m.automationRunning,2),'Uses shared controller capacity'),read('Customer duty',pct(m.effectiveServiceDuty,0),'Calibration and atomic jobs reserve time')];
      constraint=m.atomic?'The active apparatus job reserves service time; planned customer delivery is suspended.':!m.serviceQualified?'Known-preparation services require their own current circuit, noise and drift qualification.':'Service funding competes with analysis and experiments. Tune allocation and price to the visible demand.';target='service-control';action='Balance customer and analysis duty';papers=['Q06','Q22'];
    }else return null;
    const j=s.job;
    return {type,title,purpose,readouts,constraint,quote:upgrade?preview(s,upgrade):null,target,action,papers,cohort:'Representative component; readouts and upgrades apply to the shared campus apparatus, not independently to this numbered object.',job:j?{id:j.id,workload:j.workload,recipe:j.recipe||null,theta:j.theta,shots:j.shots,mitigate:j.mitigate,bias:j.bias,progress:j.progress,duration:j.duration,study:j.study||null}:null,workflow:workflow(s)};
  }
  return {describe,preview,workflow};
});
