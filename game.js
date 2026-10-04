/* The same deterministic, DOM-free engine runs in the browser and Node tests. */
(function (root, factory) {
  const content = typeof module === 'object' && module.exports ? require('./content.js') : root.CoherentContent;
  const api = factory(content);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Coherent = api;
})(globalThis, function (C) {
  'use strict';
  const POOLS = [1,9,25,81,257,769,2049];
  const HARDWARE_COST = [120,360,900,2400,6000,16000];
  const RACK_COST = [90,280,700,1800,4500,12000];
  const has = (s,id) => s.done.includes(id);
  const clamp = (value,min,max) => Math.max(min,Math.min(max,value));
  const patchSize = d => 2*d*d-1;
  const stage = s => has(s,'accounting') ? 5 : has(s,'threshold') ? 4 : has(s,'classical') ? 3 : has(s,'coupled') ? 2 : has(s,'nakamura') ? 1 : 0;
  function newGame(seed = 424242) {
    return {version:1,started:false,paused:false,elapsed:0,funds:60,effort:0,done:[],qualified:[],module:0,rack:0,staff:1,pulse:0,decoder:0,drift:.3,distance:3,factories:0,calibration:0,service:0,theta:20,shots:1,mitigate:false,credits:0,reputation:0,seed:seed>>>0,job:null,result:null,tutorial:null,completed:[],ended:false,volume:.2,sound:false,theme:'dark',log:[]};
  }
  function random(s) {
    s.seed = (Math.imul(s.seed,1664525)+1013904223)>>>0;
    return s.seed / 4294967296;
  }
  function binomial(s,n,p) {
    let count=0;
    for(let i=0;i<n;i++)if(random(s)<p)count++;
    return count;
  }
  function note(s,message,kind='event') {
    s.log.push({time:s.elapsed,message,kind});
    if(s.log.length>60)s.log.shift();
  }
  function qualify(s,id,message) {
    if(s.qualified.includes(id))return;
    s.qualified.push(id);s.reputation++;s.funds+=35+20*s.reputation;s.effort+=8;
    note(s,message,'breakthrough');
  }
  function metrics(s) {
    const chapter=stage(s),installed=POOLS[s.module],capacity=POOLS[s.rack],active=Math.min(installed,capacity);
    const pEff=.012*2**(-s.pulse)*(has(s,'readout')?.85:1)*(has(s,'echo')?.9:1)*(1+s.drift);
    const rbError=.018*.62**s.pulse*(has(s,'readout')?.8:1)*(1+.4*s.drift);
    const below=pEff<.01,pL=below?Math.max(1e-8,.1*(100*pEff)**((s.distance+1)/2)):null;
    const patch=patchSize(s.distance),totalPatches=has(s,'surface')?Math.floor(active/patch):0;
    const routing=has(s,'surgery')?2:0,spares=has(s,'surgery')?1:0;
    const factoryUnits=s.factories*4,reserved=routing+spares+factoryUnits;
    const slots=Math.max(0,totalPatches-reserved);
    const syndromeRate=totalPatches*(s.distance*s.distance-1);
    const decoderRate=64*4**s.decoder,feedback=80*2**(-s.decoder);
    const decoderOK=decoderRate>=syndromeRate;
    const memoryOK=has(s,'surface')&&below&&pL<=.001&&slots>=1&&decoderOK;
    const gatesOK=has(s,'gates')&&memoryOK&&slots>=2&&feedback<=40;
    const factoryOK=has(s,'ancilla')&&gatesOK&&s.factories>=1&&pL<=.0001;
    const grants=6+8*s.reputation+8*chapter*chapter;
    const services=has(s,'nisq')&&s.qualified.includes('circuit')?s.service*80*(1+.15*s.staff):0;
    const upkeep=.5*s.staff+2*s.module+3*s.rack;
    const effortRate=1.8*s.staff*(1-s.service);
    return {chapter,installed,capacity,active,pEff,rbError,noFault:(1-rbError)**12,below,pL,gateError:pL===null?null:2*pL,patch,totalPatches,routing,spares,factoryUnits,reserved,slots,syndromeRate,decoderRate,feedback,decoderOK,memoryOK,gatesOK,factoryOK,pT:has(s,'ancilla')?1e-7:1e-3,modelFactoryRate:factoryOK?s.factories/(8*s.distance):0,creditRate:factoryOK?s.factories*8/s.distance:0,grants,services,upkeep,netFunding:grants+services-upkeep,effortRate,bias:has(s,'mitigation')&&s.mitigate?.002:has(s,'readout')?.008:.04};
  }
  function upgradeInfo(s,id) {
    const entries={
      hardware:{label:'Install a larger chip',cost:HARDWARE_COST[s.module],available:has(s,'rb'),max:s.module>=6,detail:'Installed capacity '+POOLS[Math.min(6,s.module+1)]+' physical qubits'},
      rack:{label:'Control & cooling rack',cost:RACK_COST[s.rack],available:has(s,'divincenzo'),max:s.rack>=6,detail:'Support '+POOLS[Math.min(6,s.rack+1)]+' active physical qubits'},
      staff:{label:'Add a research colleague',cost:90*2**(s.staff-1),available:has(s,'feynman'),max:s.staff>=6,detail:'More abstract research effort; allocation remains reversible'},
      pulse:{label:'Refine the control pulses',cost:140*2**s.pulse,available:has(s,'rb'),max:s.pulse>=8,detail:'Lower the selected stochastic error scenario'},
      decoder:{label:'Upgrade classical decoding',cost:180*2**s.decoder,available:has(s,'decoder'),max:s.decoder>=5,detail:'More streaming throughput and shorter feedback latency'}
    };
    return entries[id]||null;
  }
  function buyUpgrade(s,id) {
    const item=upgradeInfo(s,id);
    if(!item||!item.available||item.max||s.funds<item.cost||s.ended)return false;
    if(s.job?.workload&&['hardware','rack','pulse','decoder'].includes(id))return false;
    s.funds-=item.cost;
    const key={hardware:'module',rack:'rack',staff:'staff',pulse:'pulse',decoder:'decoder'}[id];s[key]++;
    note(s,item.label+'. '+item.detail+'.','engineering');return true;
  }
  function qualificationNow(s,id) {
    const m=metrics(s);
    if(id==='coupled')return m.active>=2;
    if(!s.qualified.includes(id))return false;
    if(id==='memory')return m.memoryOK;
    if(id==='gates')return m.memoryOK&&m.slots>=2&&m.feedback<=40;
    if(id==='factory')return m.factoryOK;
    return true;
  }
  function projectStatus(s,id) {
    const project=C.projects.find(p=>p.id===id);
    if(!project)return {available:false,ready:false,reasons:['Unknown discovery']};
    if(has(s,id))return {available:false,ready:false,reasons:['Already discovered']};
    const available=project.requires.every(key=>has(s,key));
    const reasons=[];
    if(!available)reasons.push('Complete the prerequisite discoveries');
    if(project.qualification&&!qualificationNow(s,project.qualification))reasons.push(project.qualification==='coupled'?'Support at least two active physical qubits':'Qualify '+(C.experiments.find(e=>e.id===project.qualification)?.name.toLowerCase()||project.qualification));
    if(s.funds<project.cost.funds)reasons.push('Need '+Math.ceil(project.cost.funds-s.funds)+' more funding');
    if(s.effort<project.cost.effort)reasons.push('Need '+Math.ceil(project.cost.effort-s.effort)+' more research effort');
    return {available,ready:available&&!reasons.length&&!s.ended,reasons};
  }
  function buyProject(s,id) {
    const status=projectStatus(s,id);if(!status.ready)return false;
    const project=C.projects.find(p=>p.id===id),before=stage(s);
    s.funds-=project.cost.funds;s.effort-=project.cost.effort;s.done.push(id);
    note(s,project.title+'. '+project.effect,'discovery');
    if(id==='rb')s.calibration=.25;
    if(stage(s)>before)note(s,C.chapters[stage(s)].transition,'chapter');
    checkEnding(s);return true;
  }
  function configure(s,key,value) {
    if(s.ended&& !['sound','volume','theme'].includes(key))return false;
    if(s.job?.workload&&['distance','factories','calibration','theta','shots','mitigate'].includes(key))return false;
    if(key==='distance'){if(!has(s,'surface')||![3,5,7,9].includes(value))return false;s.distance=value;}
    else if(key==='factories'){if(!has(s,'ancilla')||!Number.isInteger(value)||value<0||value>3)return false;s.factories=value;}
    else if(key==='calibration'){if(!has(s,'rb')||!Number.isFinite(value)||value<0||value>.6)return false;s.calibration=value;}
    else if(key==='service'){if(!has(s,'nisq')||!Number.isFinite(value)||value<0||value>.75)return false;s.service=value;}
    else if(key==='theta'){if(!has(s,'vqe')||!Number.isFinite(value)||value<0||value>90)return false;s.theta=value;}
    else if(key==='shots'){if(!has(s,'vqe')||![0,1,2,3].includes(value))return false;s.shots=value;}
    else if(key==='mitigate'){if(!has(s,'mitigation')||typeof value!=='boolean')return false;s.mitigate=value;}
    else if(key==='sound'){if(typeof value!=='boolean')return false;s.sound=value;}
    else if(key==='volume'){if(!Number.isFinite(value)||value<0||value>1)return false;s.volume=value;}
    else if(key==='theme'){if(!['dark','light'].includes(value))return false;s.theme=value;}
    else return false;
    return true;
  }
  function experimentStatus(s,id) {
    const experiment=C.experiments.find(e=>e.id===id),m=metrics(s),reasons=[];
    if(!experiment)return {ready:false,reasons:['Unknown experiment']};
    if(!experiment.requires.every(key=>has(s,key)))reasons.push('Research its prerequisites');
    if(s.job)reasons.push('The apparatus is occupied');
    if(s.funds<experiment.cost)reasons.push('Need experiment funding');
    if(id==='circuit'&&m.active<2)reasons.push('Support two active qubits');
    if(id==='memory'&&!m.memoryOK){
      if(!m.below)reasons.push('Reduce effective noise below the selected threshold');
      else if(m.pL>.001)reasons.push('Lower memory error: refine pulses or increase distance');
      if(m.slots<1)reasons.push('Install and support enough physical footprint');
      if(!m.decoderOK)reasons.push('Decoder throughput is behind syndrome production');
    }
    if(id==='gates'&&(!m.memoryOK||m.slots<2||m.feedback>40))reasons.push('Need current protected memory, two application slots, routing, and feedback ≤40 μs');
    if(id==='factory'&&!m.factoryOK)reasons.push('Need a qualified gate stack, factory footprint, decoder capacity, and memory error ≤0.0001');
    return {ready:!reasons.length&&!s.ended,reasons};
  }
  function startExperiment(s,id) {
    if(!experimentStatus(s,id).ready||s.paused)return false;
    const e=C.experiments.find(v=>v.id===id);
    s.started=true;s.funds-=e.cost;
    const samples=id==='vqe'?1024*4**s.shots:e.shots;
    s.job={id,workload:false,progress:0,duration:e.seconds,shots:samples,theta:s.theta,mitigate:s.mitigate,bias:metrics(s).bias};
    return true;
  }
  function calibrate(s) {
    if(stage(s)<1||s.job||s.paused||s.ended||s.funds<8)return false;
    s.funds-=8;s.job={id:'calibrate',workload:false,progress:0,duration:4,shots:512,theta:s.theta,mitigate:s.mitigate,bias:metrics(s).bias};return true;
  }
  function tutorialEnergy(degrees) {
    const theta=degrees*Math.PI/180;
    return Math.cos(2*theta)-1.2*Math.sin(2*theta);
  }
  function tutorialResult(s,job) {
    const theta=job.theta*Math.PI/180;
    const expectations=[Math.cos(2*theta),-Math.sin(2*theta),-Math.sin(2*theta)],weights=[1,.6,.6];
    const groups=expectations.map((value,i)=>{
      const observed=clamp(value+(i===0?job.bias:-job.bias),-1,1),plus=binomial(s,job.shots,(1+observed)/2);
      return {label:['ZZ','X₀','X₁'][i],plus,minus:job.shots-plus,estimate:2*plus/job.shots-1};
    });
    const energy=groups.reduce((sum,g,i)=>sum+g.estimate*weights[i],0);
    const variance=groups.reduce((sum,g,i)=>sum+weights[i]**2*(1-g.estimate**2),0);
    const multiplier=job.mitigate?4:1;
    const statistical=2.2*Math.sqrt(2*Math.log(6/.05)/job.shots);
    const reference=-Math.sqrt(2.44),exact=tutorialEnergy(job.theta),bias=2.2*job.bias;
    return {theta:job.theta,energy,exact,reference,statistical,se:Math.sqrt(Math.max(0,variance)/job.shots),bias,ansatzError:Math.max(0,exact-reference),shots:3*job.shots*multiplier,groups,qualified:Math.abs(energy-reference)+statistical+bias<=.12};
  }
  function finishExperiment(s,job) {
    const m=metrics(s);
    s.result={id:job.id,shots:job.shots,bins:[],message:''};
    if(job.id==='calibrate'){s.drift=.005;s.result.message='Calibration complete. Drift is reduced; it is not eliminated forever.';note(s,'The histogram is prettier. The error bars remain unconvinced.','calibration');return;}
    if(job.id==='signal'){const one=binomial(s,job.shots,.48);s.result.bins=[job.shots-one,one];s.result.message='A signal from repeated known preparations.';qualify(s,'signal','First signal. One qubit. An entire room to keep it cold.');}
    if(job.id==='ramsey'){s.drift=.03;s.result.message='Ramsey T₂* scenario fitted: 18.4 μs. An echo will ask a different question.';qualify(s,'ramsey','A fringe emerges from the noise.');}
    if(job.id==='echo'){s.result.message='Selected scenario: T₁ = 54 μs; echo T₂ = 42 μs; Ramsey T₂* = 18.4 μs.';qualify(s,'echo','The echo is clearer. It is still not a way to undo every error.');}
    if(job.id==='readout'){s.result.message='Known preparations characterize measurement bias. This does not reveal an arbitrary unknown state.';qualify(s,'readout','A measurement is now a little less opinionated.');}
    if(job.id==='benchmark'){s.result.message='Illustrative RB estimate: '+(m.rbError*100).toFixed(2)+'%. Its assumptions differ from the threshold scenario.';qualify(s,'benchmark','The control pulses have acquired error bars.');}
    if(job.id==='circuit'){const good=binomial(s,job.shots,clamp(m.noFault,0,1)),zero=binomial(s,good,.5),bad=job.shots-good;s.result.bins=[zero,Math.floor(bad/2),bad-Math.floor(bad/2),good-zero];s.result.message='Known Bell-state preparation sampled. Entanglement alone proves no advantage.';qualify(s,'circuit','The second qubit has something to say to the first.');}
    if(job.id==='vqe'){
      s.tutorial=tutorialResult(s,job);s.result.message=s.tutorial.qualified?'Tutorial reproduced within its declared uncertainty and residual-bias budget.':'The energy is not yet qualified. Tune θ, increase shots, or reduce bias.';
      if(s.tutorial.qualified)qualify(s,'vqe','A two-spin energy, reproduced against an exact classical reference.');
      else note(s,'The classical reference is unimpressed. The next trial can be better.','warning');
    }
    if(job.id==='memory'){
      s.result.bins=Array.from({length:8},()=>binomial(s,100,clamp(m.pEff,0,1)));
      s.result.message=m.memoryOK?'100 educational syndrome rounds sampled. The displayed logical error remains a model fit.':'Memory qualification lost: inspect current noise, footprint, and decoding.';
      if(m.memoryOK)qualify(s,'memory','Protected memory. The information survives; the funding remains exposed.');
    }
    if(job.id==='gates'){
      const ready=m.memoryOK&&m.slots>=2&&m.feedback<=40;
      s.result.message=ready?'The selected operation schedule is qualified separately from memory.':'Current memory, footprint, or feedback no longer qualifies this operation schedule.';
      if(ready)qualify(s,'gates','A memory learns to act. Routing takes its share of the chip.');
    }
    if(job.id==='factory'){
      s.result.message=m.factoryOK?'Factory schedule rehearsed. Credits represent planning; no quantum states are stored.':'Factory qualification lost. Check the current gate stack and layout.';
      if(m.factoryOK){s.credits+=24;qualify(s,'factory','The board requests more qubits. The decoder requests a chair.');}
    }
  }
  function workloadStatus(s,id) {
    const w=C.workloads.find(item=>item.id===id),m=metrics(s),reasons=[];
    if(!w)return {ready:false,reasons:['Unknown workload']};
    if(s.completed.includes(id))reasons.push('Already completed');
    if(!w.requires.every(key=>has(s,key)))reasons.push('Research its recipe');
    if(!m.gatesOK)reasons.push('Qualify the current logical gate stack');
    if(m.slots<w.width)reasons.push('Need '+w.width+' application slots; '+m.slots+' available');
    if(!m.factoryOK)reasons.push('Need a currently qualified factory for fresh states');
    if(!m.decoderOK)reasons.push('Decoder cannot keep up with all allocated patches');
    const gateTime=w.depth*4*s.distance,factoryTime=m.modelFactoryRate>0?w.magic/m.modelFactoryRate:Infinity;
    const feedbackTime=w.depth*m.feedback;
    const parallel=Math.max(gateTime,factoryTime,feedbackTime);
    const idle=Math.max(0,w.width*w.depth-w.gates)*4*s.distance+w.width*Math.max(0,parallel-gateTime);
    const memoryRisk=m.pL===null?1:idle*m.pL;
    const gateRisk=m.gateError===null?1:w.gates*m.gateError;
    const stateRisk=w.magic*m.pT;
    const perExecution=memoryRisk+gateRisk+stateRisk+w.preparationRisk+w.otherRisk;
    const risk=Math.min(1,w.repetitions*perExecution),runtime=w.repetitions*(w.preparation+parallel+w.readout+w.classical);
    const credits=w.magic*w.repetitions;
    if(risk>w.maxRisk)reasons.push('Model risk '+(risk*100).toFixed(2)+'% exceeds '+w.maxRisk*100+'%');
    if(runtime>w.maxTime)reasons.push('Modeled time exceeds the recipe ceiling');
    if(w.precision>w.target)reasons.push('Recipe precision does not meet its target');
    if(s.credits<credits)reasons.push('Need '+Math.ceil(credits-s.credits)+' more rehearsal credits');
    if(s.funds<w.fee)reasons.push('Need '+Math.ceil(w.fee-s.funds)+' more funding');
    if(s.job)reasons.push('The apparatus is occupied');
    const parts={memory:w.repetitions*memoryRisk,gates:w.repetitions*gateRisk,states:w.repetitions*stateRisk,preparation:w.repetitions*w.preparationRisk,other:w.repetitions*w.otherRisk};
    return {ready:!reasons.length&&!s.ended,reasons,risk,runtime,credits,idle,gateTime,factoryTime,feedbackTime,parts,width:w.width};
  }
  function startWorkload(s,id) {
    const status=workloadStatus(s,id);if(!status.ready||s.paused)return false;
    const w=C.workloads.find(item=>item.id===id);
    s.funds-=w.fee;s.credits-=status.credits;s.job={id,workload:true,progress:0,duration:w.seconds,shots:0,theta:s.theta,mitigate:s.mitigate,bias:metrics(s).bias};
    note(s,'Scheduled: '+w.name+'. Full modeled time '+status.runtime.toFixed(0)+' μs.','workload');return true;
  }
  function liveWorkloadStatus(s,id) {
    // Entry costs have already been paid. Check current engineering conditions only.
    const w=C.workloads.find(item=>item.id===id);
    return workloadStatus({...s,job:null,credits:Math.max(s.credits,w.magic*w.repetitions),funds:Math.max(s.funds,w.fee)},id);
  }
  function checkEnding(s) {
    if(!s.ended&&has(s,'audit')&&s.completed.some(id=>['dynamics','molecule'].includes(id))){s.ended=true;s.job=null;note(s,'Useful at last. A modeled scientific scenario is complete. For Keir, one qubit in return.','ending');}
  }
  function tick(s,seconds) {
    if(!s.started||s.paused||s.ended||!Number.isFinite(seconds)||seconds<=0)return;
    // One-second steps keep automated simulations and normal browser updates consistent.
    if(seconds>1){while(seconds>0){const dt=Math.min(1,seconds);tick(s,dt);seconds-=dt;}return;}
    const m=metrics(s),dt=seconds;s.elapsed+=dt;
    s.funds=clamp(s.funds+m.netFunding*dt,0,1e12);s.effort=clamp(s.effort+m.effortRate*dt,0,1e9);
    s.drift=clamp(s.drift+dt*(.00065*(s.job?1.5:1)-.004*s.calibration),.005,1);
    s.credits=clamp(s.credits+m.creditRate*dt,0,2000);
    if(!s.job)return;
    const job=s.job;
    if(job.workload&&!liveWorkloadStatus(s,job.id).ready){s.job=null;s.result={id:job.id,shots:0,bins:[],message:'Schedule stopped: current conditions no longer meet its model budget. Funding and rehearsal credits were spent; your laboratory is intact.'};note(s,s.result.message,'warning');return;}
    job.progress+=dt*(job.id==='calibrate'?1:1-s.calibration);
    if(job.progress<job.duration)return;
    s.job=null;
    if(job.workload){
      const w=C.workloads.find(item=>item.id===job.id);
      s.result={id:w.id,shots:0,bins:[],message:w.validation};
      if(w.id==='factors'){
        const n=15;let divisor=2;while(divisor*divisor<=n&&n%divisor!==0)divisor++;
        const a=divisor,b=n/divisor;s.result.certificate={n,a,b,valid:Number.isInteger(b)&&a*b===n};
        if(!s.result.certificate.valid)throw new Error('Factor certificate failed');
        s.result.message='Classical certificate checked: '+a+' × '+b+' = '+n+'. The logical execution was modeled, not run on quantum hardware.';
      }
      if(w.id==='search'){
        const entries=['copper','silver','tin','iron','cobalt','nickel','gold','zinc'],target='cobalt',index=entries.findIndex(value=>value===target);
        s.result.certificate={index,target,valid:index>=0&&entries[index]===target};
        if(!s.result.certificate.valid)throw new Error('Search certificate failed');
        s.result.message='Classical oracle check: entry '+index+' is '+target+'. All modeled oracle and repetition costs were counted; no speedup is claimed.';
      }
      if(!s.completed.includes(w.id)){s.completed.push(w.id);s.funds+=w.payout;s.reputation+=2;s.effort+=100;note(s,w.name+'. '+w.validation,'workload');}
      checkEnding(s);
    }else finishExperiment(s,job);
  }
  function pause(s) {if(!s.started)return false;s.paused=!s.paused;return true;}
  function cancel(s) {if(!s.job)return false;s.job=null;note(s,'Experiment cancelled. The apparatus is available again. Entry costs are not refunded.','event');return true;}
  function serialize(s) {return JSON.stringify({game:'coherent',version:1,state:s},null,2);}
  function parseSave(text) {
    if(typeof text!=='string'||text.length>250000)throw new Error('Save must be a JSON file smaller than 250 KB.');
    let envelope;try{envelope=JSON.parse(text);}catch{throw new Error('This file is not valid JSON. Your current laboratory is unchanged.');}
    if(envelope?.game!=='coherent'||envelope.version!==1||envelope.state?.version!==1)throw new Error('This is not a supported Coherent save.');
    const input=envelope.state,base=newGame(),s={};
    const ranges={elapsed:[0,1e9],funds:[0,1e12],effort:[0,1e9],module:[0,6],rack:[0,6],staff:[1,6],pulse:[0,8],decoder:[0,5],drift:[.005,1],distance:[3,9],factories:[0,3],calibration:[0,.6],service:[0,.75],theta:[0,90],shots:[0,3],credits:[0,2000],reputation:[0,1000],seed:[0,4294967295],volume:[0,1]};
    const integers=['module','rack','staff','pulse','decoder','distance','factories','shots','reputation','seed'];
    for(const [key,value] of Object.entries(base)){
      if(!(key in input))throw new Error('Save is missing '+key+'.');
      if(ranges[key]){const n=input[key],[min,max]=ranges[key];if(typeof n!=='number'||!Number.isFinite(n)||n<min||n>max||(integers.includes(key)&&!Number.isInteger(n)))throw new Error('Invalid '+key+' in save.');s[key]=n;}
      else if(typeof value==='boolean'){if(typeof input[key]!=='boolean')throw new Error('Invalid '+key+' in save.');s[key]=input[key];}
      else s[key]=input[key];
    }
    if(![3,5,7,9].includes(s.distance)||!['dark','light'].includes(s.theme))throw new Error('Invalid laboratory configuration.');
    const validateIds=(value,allowed,label)=>{if(!Array.isArray(value)||value.length>allowed.length||new Set(value).size!==value.length||value.some(id=>!allowed.includes(id)))throw new Error('Invalid '+label+' in save.');};
    validateIds(s.done,C.projects.map(p=>p.id),'discoveries');validateIds(s.qualified,C.experiments.map(e=>e.id),'qualifications');validateIds(s.completed,C.workloads.map(w=>w.id),'completed workloads');
    for(const p of C.projects)if(has(s,p.id)&&p.requires.some(id=>!has(s,id)))throw new Error('Discovery prerequisites are missing.');
    if(s.factories&&!has(s,'ancilla')||s.distance!==3&&!has(s,'surface')||s.module&&!has(s,'rb')||s.rack&&!has(s,'divincenzo')||s.pulse&&!has(s,'rb')||s.decoder&&!has(s,'decoder')||s.service&&!has(s,'nisq')||s.calibration&&!has(s,'rb')||s.mitigate&&!has(s,'mitigation'))throw new Error('Configuration has an unavailable upgrade.');
    if(!Array.isArray(s.log)||s.log.length>60||s.log.some(entry=>!entry||typeof entry.message!=='string'||entry.message.length>500||!Number.isFinite(entry.time)||entry.time<0||!['event','engineering','discovery','chapter','breakthrough','warning','calibration','workload','ending'].includes(entry.kind)))throw new Error('Invalid journal in save.');
    function finiteTree(value,depth=0){if(depth>8)throw new Error('Invalid result structure.');if(typeof value==='number'&&!Number.isFinite(value))throw new Error('Invalid result number.');if(typeof value==='string'&&value.length>1000)throw new Error('Result text is too long.');if(value&&typeof value==='object'){if(Array.isArray(value)&&value.length>100)throw new Error('Result is too large.');for(const v of Object.values(value))finiteTree(v,depth+1);}}
    finiteTree(s.result);finiteTree(s.tutorial);
    if(s.result!==null&&(!s.result||typeof s.result.message!=='string'||!Array.isArray(s.result.bins)||s.result.bins.some(n=>!Number.isFinite(n)||n<0)))throw new Error('Invalid experiment result.');
    if(s.tutorial!==null){const t=s.tutorial;if(!t||['theta','energy','exact','reference','statistical','se','bias','ansatzError','shots'].some(key=>!Number.isFinite(t[key]))||typeof t.qualified!=='boolean'||!Array.isArray(t.groups)||t.groups.length!==3)throw new Error('Invalid tutorial result.');}
    if(s.job!==null){
      const j=s.job,known=j?.workload?C.workloads.map(w=>w.id):[...C.experiments.map(e=>e.id),'calibrate'];
      if(!j||typeof j.workload!=='boolean'||!known.includes(j.id)||!Number.isFinite(j.duration)||j.duration<=0||j.duration>100||!Number.isFinite(j.progress)||j.progress<0||j.progress>=j.duration||!Number.isInteger(j.shots)||j.shots<0||j.shots>65536||!Number.isFinite(j.theta)||j.theta<0||j.theta>90||!Number.isFinite(j.bias)||j.bias<0||j.bias>1||typeof j.mitigate!=='boolean')throw new Error('Invalid active experiment.');
      const recipe=j.workload?C.workloads.find(w=>w.id===j.id):C.experiments.find(e=>e.id===j.id);
      if(recipe&&(recipe.requires.some(id=>!has(s,id))||recipe.seconds!==j.duration))throw new Error('Active experiment prerequisites or duration are invalid.');
      if(j.id==='calibrate'&&(stage(s)<1||j.duration!==4))throw new Error('Calibration is unavailable in this save.');
    }
    if(s.ended&&(!has(s,'audit')||!s.completed.some(id=>['dynamics','molecule'].includes(id))))throw new Error('Ending requirements are missing.');
    return JSON.parse(JSON.stringify(s));
  }
  return {content:C,POOLS,newGame,stage,has,metrics,patchSize,upgradeInfo,buyUpgrade,qualificationNow,projectStatus,buyProject,configure,experimentStatus,startExperiment,calibrate,tutorialEnergy,workloadStatus,startWorkload,liveWorkloadStatus,tick,pause,cancel,serialize,parseSave};
});
