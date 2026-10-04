/* The same deterministic, DOM-free engine runs in the browser and Node tests. */
(function (root, factory) {
  const content = typeof module === 'object' && module.exports ? require('./content.js') : root.CoherentContent;
  const api = factory(content);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Coherent = api;
})(globalThis, function (C) {
  'use strict';
  const POOLS = [1,9,25,81,257,769,2049];
  const MAX_STAFF = 32;
  const HARDWARE_COST = [120,450,1800,7200,24000,64000];
  const RACK_COST = [90,350,1400,5600,18000,48000];
  const has = (s,id) => s.done.includes(id);
  const hasEngineering = (s,id) => s.engineering.includes(id);
  const clamp = (value,min,max) => Math.max(min,Math.min(max,value));
  const patchSize = d => 2*d*d-1;
  const stage = s => has(s,'accounting') ? 5 : has(s,'threshold') ? 4 : has(s,'classical') ? 3 : has(s,'coupled') ? 2 : has(s,'nakamura') ? 1 : 0;
  const campusDefaults = () => ({campusRevision:1,objectiveResults:[],precisionResults:[],orders:[],orderSerial:0,trialSerial:0,chipStock:0,supportStock:0,logicalRecipe:'balanced',controllerProfile:'balanced',completedRecipes:{},endingRecord:null,epilogue:false});
  function newGame(seed = 424242) {
    return {...campusDefaults(),version:2,notebooks:1,designs:0,engineering:[],price:8,autoPrice:false,autoCalibration:false,automation:0,analysisShare:1,workshops:0,fabrication:.5,fabricated:0,integrated:0,started:false,paused:false,elapsed:0,funds:60,effort:0,done:[],qualified:[],module:0,rack:0,staff:1,pulse:0,decoder:0,drift:.3,distance:3,factories:0,calibration:0,service:0,theta:20,shots:1,mitigate:false,credits:0,reputation:0,seed:seed>>>0,job:null,result:null,tutorial:null,completed:[],ended:false,volume:.2,sound:false,theme:'dark',log:[]};
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
    s.qualified.push(id);s.reputation++;s.funds+=80+120*s.reputation;s.effort=Math.min(metrics(s).effortCap,s.effort+8);
    note(s,message,'breakthrough');
  }
  function pendingUnits(s,kind) {return (s.orders||[]).filter(order=>order.kind===kind).reduce((sum,order)=>sum+(C.procurementOffers.find(offer=>offer.id===order.offer)?.units||0),0);}
  function reservedCapacity(s,kind) {return POOLS[kind==='chip'?s.module:s.rack]+s[kind==='chip'?'fabricated':'integrated']+(s[kind==='chip'?'chipStock':'supportStock']||0)+pendingUnits(s,kind);}
  function metrics(s,interval=1) {
    const chapter=stage(s),installed=Math.min(8193,POOLS[s.module]+Math.floor(s.fabricated)),capacity=Math.min(8193,POOLS[s.rack]+Math.floor(s.integrated)),active=Math.min(installed,capacity);
    const trust=2+2*s.reputation+Math.floor(s.done.length/4)+(hasEngineering(s,'open')?4:0)+(s.objectiveResults?.length||0),freeTrust=trust-s.staff-s.notebooks;
    const storageTier=['storage1','storage2','storage3'].filter(id=>hasEngineering(s,id)).length;
    const effortCap=120*s.notebooks*4**storageTier,fullBank=s.effort>=effortCap-1e-6;
    const manualCalibration=s.job?.id==='calibrate';
    const atomic=!!s.job&&(s.job.workload||['calibrate','memory','gates','factory'].includes(s.job.id));
    // These are game maintenance/controller presets, not measured device laws.
    const maintenance=Math.min(.55,(.08+.018*Math.log2(active+1)+.04*(atomic?0:s.service))*(hasEngineering(s,'verified')?.8:hasEngineering(s,'rapid')?1.2:1)*(has(s,'adaptive2026')?.9:1));
    const calibrationDuty=manualCalibration?1:s.autoCalibration?Math.min(.6,maintenance+.02):s.calibration;
    const effectiveServiceDuty=atomic?0:(1-calibrationDuty)*s.service;
    const experimentDuty=atomic?1-calibrationDuty:(1-calibrationDuty)*(1-s.service);
    const lanes=has(s,'nisq')?Math.min(1+2*s.rack,Math.floor(active/2)):0;
    const sharedCapacity=lanes*1.5*effectiveServiceDuty;
    const automationRequested=s.automation*s.analysisShare;
    const automationRunning=Math.min(automationRequested,sharedCapacity),customerCapacity=Math.max(0,sharedCapacity-automationRunning);
    const fairPrice=3*(1+.2*s.reputation)*(hasEngineering(s,'open')?.7:hasEngineering(s,'proprietary')?1.5:1);
    const demandAtFair=Math.min(60,(1+.4*s.reputation)*(hasEngineering(s,'open')?2:1));
    const matchingPrice=customerCapacity>0?clamp(fairPrice*(demandAtFair/customerCapacity)**(1/1.4),.5,200):200;
    const price=s.autoPrice?matchingPrice:s.price,demand=Math.min(60,demandAtFair*(fairPrice/price)**1.4);
    const pEff=.012*2**(-s.pulse)*(has(s,'readout')?.85:1)*(has(s,'echo')?.9:1)*(1+s.drift);
    const rbError=.018*.62**s.pulse*(has(s,'readout')?.8:1)*(1+.4*s.drift);
    const circuitFault=.01*.55**s.pulse*(has(s,'readout')?.8:1)*(1+.5*s.drift);
    const below=pEff<.01,pL=below?Math.max(1e-8,.1*(100*pEff)**((s.distance+1)/2)):null;
    const patch=patchSize(s.distance),totalPatches=has(s,'surface')?Math.floor(active/patch):0;
    const routing=has(s,'surgery')?2:0,spares=has(s,'surgery')?1:0;
    const factoryUnits=s.factories*4,reserved=routing+spares+factoryUnits;
    const slots=Math.max(0,totalPatches-reserved);
    const syndromeRate=totalPatches*(s.distance*s.distance-1);
    const profile={balanced:[1,1],streaming:[2,1.5],response:[.75,.5]}[s.controllerProfile||'balanced'];
    const decoderRate=64*4**s.decoder*profile[0],feedback=80*2**(-s.decoder)*profile[1];
    const decoderOK=decoderRate>=syndromeRate;
    const memoryOK=has(s,'surface')&&below&&pL<=.001&&slots>=1&&decoderOK;
    const gatesOK=has(s,'gates')&&memoryOK&&slots>=2&&feedback<=40;
    const factoryOK=has(s,'ancilla')&&gatesOK&&s.factories>=1&&pL<=.0001;
    const serviceQualified=has(s,'nisq')&&s.qualified.includes('circuit')&&pEff<=.004&&s.drift<=.25;
    const delivered=serviceQualified?Math.min(customerCapacity,demand):0,revenue=delivered*price;
    const grants=1+.12*s.reputation;
    const workshopRate=hasEngineering(s,'workshop')&&!atomic?s.workshops*1.2*(hasEngineering(s,'rapid')?1.4:hasEngineering(s,'verified')?.8:1):0;
    const constructionDuty=workshopRate>0?Math.min(1,Math.max(0,s.funds)/(workshopRate*.8)):0;
    const construction=(kind,share)=>{
      const raw=workshopRate*share*constructionDuty,stock=s[kind==='chip'?'chipStock':'supportStock']||0;
      const prefabTime=raw>0?Math.min(interval,stock/(2*raw)):0,prefab=2*raw*prefabTime;
      const inhouse=Math.min(raw*(interval-prefabTime),Math.max(0,8193-reservedCapacity(s,kind)));
      return {prefab:prefab/interval,inhouse:inhouse/interval};
    };
    const chip=construction('chip',s.fabrication),support=construction('support',1-s.fabrication);
    const fabricationRate=chip.prefab+chip.inhouse,integrationRate=support.prefab+support.inhouse;
    const prefabFabricationRate=chip.prefab,prefabIntegrationRate=support.prefab,inhouseFabricationRate=chip.inhouse,inhouseIntegrationRate=support.inhouse;
    const upkeep=.06*s.staff+.1*s.module+.1*s.rack+.1*automationRunning+.4*(chip.prefab+support.prefab)+.8*(chip.inhouse+support.inhouse);
    const researchMultiplier=(hasEngineering(s,'workflow')?2:1)*(hasEngineering(s,'scheduler')?2:1);
    const effortRate=(1.2*s.staff+3*automationRunning)*researchMultiplier;
    const designBonus=fullBank?4:1;
    const designRate=has(s,'deutsch')?(.04*s.staff**1.2+.3*automationRunning)*designBonus*(hasEngineering(s,'workflow')?1.25:1)*(hasEngineering(s,'scheduler')?1.5:1)*(hasEngineering(s,'synthesis')?2:1):0;
    return {campusEnabled:s.campusRevision===1,objectivesComplete:s.objectiveResults?.length||0,precisionComplete:s.precisionResults?.length||0,chipStock:s.chipStock||0,supportStock:s.supportStock||0,pendingOrders:s.orders?.length||0,prefabFabricationRate,prefabIntegrationRate,inhouseFabricationRate,inhouseIntegrationRate,chapter,installed,capacity,active,pEff,rbError,circuitFault,noFault:(1-circuitFault)**12,below,pL,gateError:pL===null?null:2*pL,patch,totalPatches,routing,spares,factoryUnits,reserved,slots,syndromeRate,decoderRate,feedback,decoderOK,memoryOK,gatesOK,factoryOK,pT:has(s,'ancilla')?1e-7:1e-3,modelFactoryRate:factoryOK?s.factories/(8*s.distance):0,creditRate:factoryOK?s.factories*8/s.distance:0,trust,freeTrust,effortCap,fullBank,designRate,designBonus,maintenance,calibrationDuty,effectiveServiceDuty,experimentDuty,atomic,lanes,sharedCapacity,automationRequested,automationRunning,customerCapacity,fairPrice,matchingPrice,demand,delivered,price,revenue,serviceQualified,workshopRate,fabricationRate,integrationRate,grants,services:revenue,upkeep,netFunding:grants+revenue-upkeep,effortRate,bias:has(s,'mitigation')&&s.mitigate?.002:has(s,'readout')?.008:.04};
  }
  function upgradeInfo(s,id) {
    const m=metrics(s),entries={
      hardware:{label:'Install a larger chip',cost:HARDWARE_COST[s.module],designs:16*2.2**s.module,available:has(s,'rb'),max:s.module>=6||m.installed>=8193,detail:'Installed preset '+POOLS[Math.min(6,s.module+1)]+' physical qubits; commissioned construction is additional'},
      rack:{label:'Control & cooling rack',cost:RACK_COST[s.rack],designs:12*2.2**s.rack,available:has(s,'divincenzo'),max:s.rack>=6,detail:'Support preset '+POOLS[Math.min(6,s.rack+1)]+' physical qubits; adds control/readout lanes'},
      staff:{label:'Assign a research colleague',cost:0,designs:0,available:has(s,'feynman'),max:s.staff>=MAX_STAFF||m.freeTrust<1,detail:'Uses one trust assignment; release it to make notebook space'},
      pulse:{label:'Refine the control pulses',cost:140*2**s.pulse,designs:20*1.8**s.pulse,available:has(s,'rb'),max:s.pulse>=8,detail:'Lower the selected stochastic error scenario'},
      decoder:{label:'Upgrade classical decoding',cost:180*2**s.decoder,designs:30*2**s.decoder,available:has(s,'decoder'),max:s.decoder>=5,detail:'More streaming throughput and shorter feedback latency'},
      automation:{label:'Add an analysis station',cost:1800*1.7**s.automation,designs:180*1.6**s.automation,available:hasEngineering(s,'automation'),max:s.automation>=16,detail:'One controller-batch slot before customers; contributes classical research/design work'},
      workshop:{label:'Add a construction team',cost:4000*1.65**s.workshops,designs:400*1.6**s.workshops,available:hasEngineering(s,'workshop'),max:s.workshops>=12,detail:'Split hypothetical fabrication and control/cooling integration'}
    };
    const item=entries[id];if(!item)return null;
    item.cost=Math.ceil(item.cost||0);item.designs=Math.ceil(item.designs);
    const reasons=[];
    if(!item.available)reasons.push('Research the engineering prerequisites');
    if(item.max)reasons.push('At capacity');
    if(['hardware','rack'].includes(id)&&!item.max){const kind=id==='hardware'?'chip':'support',key=id==='hardware'?'module':'rack';if(reservedCapacity(s,kind)-POOLS[s[key]]+POOLS[s[key]+1]>8193+1e-8)reasons.push('Delivered or ordered equipment reserves the remaining physical ceiling');}
    if(s.funds<item.cost)reasons.push('Need '+Math.ceil(item.cost-s.funds)+' funding');
    if(s.designs<item.designs)reasons.push('Need '+Math.ceil(item.designs-s.designs)+' engineering designs');
    if(s.job?.workload&&['hardware','rack','pulse','decoder'].includes(id))reasons.push('A full logical schedule reserves the apparatus');
    return {...item,ready:!reasons.length&&!s.ended,reasons};
  }
  function assign(s,key,delta) {
    if(s.ended||!['staff','notebooks'].includes(key)||![1,-1].includes(delta)||!has(s,'feynman'))return false;
    if(s[key]+delta<(key==='notebooks'?1:0)||s[key]+delta>(key==='notebooks'?64:MAX_STAFF)||delta>0&&metrics(s).freeTrust<1)return false;
    if(key==='notebooks'&&delta<0&&s.effort>metrics({...s,notebooks:s.notebooks-1}).effortCap)return false;
    s[key]+=delta;
    note(s,(delta>0?'Assigned':'Released')+' one '+(key==='staff'?'research colleague':'notebook assignment')+'.','engineering');return true;
  }
  function buyUpgrade(s,id) {
    if(id==='staff')return assign(s,'staff',1);
    const item=upgradeInfo(s,id);if(!item?.ready)return false;
    s.funds-=item.cost;s.designs-=item.designs;
    const key={hardware:'module',rack:'rack',pulse:'pulse',decoder:'decoder',automation:'automation',workshop:'workshops'}[id];s[key]++;
    note(s,item.label+'. '+item.detail+'.','engineering');return true;
  }
  function engineeringStatus(s,id) {
    const e=(C.engineering||[]).find(e=>e.id===id);if(!e)return {available:false,ready:false,reasons:['Unknown engineering advance']};
    const chosen=e.group&&(C.engineering||[]).find(item=>item.group===e.group&&hasEngineering(s,item.id));
    const available=!hasEngineering(s,id)&&!chosen&&e.requires.every(id=>has(s,id))&&e.engineeringRequires.every(id=>hasEngineering(s,id));
    const reasons=[];
    if(!available)reasons.push(chosen?'Choice already made: '+chosen.title:'Complete the engineering prerequisites');
    for(const [key,label] of [['funds','funding'],['effort','research effort'],['designs','engineering designs']])if(s[key]<(e.cost[key]||0))reasons.push('Need '+Math.ceil(e.cost[key]-s[key])+' '+label);
    if(e.cost.effort>metrics(s).effortCap)reasons.push('Expand notebook capacity to '+e.cost.effort);
    return {available,ready:available&&!reasons.length&&!s.ended,reasons};
  }
  function buyEngineering(s,id) {
    if(!engineeringStatus(s,id).ready)return false;
    const e=C.engineering.find(e=>e.id===id);for(const key of ['funds','effort','designs'])s[key]-=e.cost[key]||0;
    s.engineering.push(id);note(s,e.title+'. '+e.effect,'engineering');return true;
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
    const available=project.requires.every(key=>has(s,key))&&(!project.optional||s.campusRevision===1);
    const reasons=[];
    if(!available)reasons.push('Complete the prerequisite discoveries');
    if(id==='audit'&&!s.epilogue&&s.job&&s.completed.some(key=>['dynamics','molecule'].includes(key)))reasons.push('Finish or explicitly cancel the current apparatus job before completing the campaign; its entry costs stay spent.');
    if(project.qualification&&!qualificationNow(s,project.qualification))reasons.push(project.qualification==='coupled'?'Support at least two active physical qubits':'Required evidence: '+(C.experiments.find(e=>e.id===project.qualification)?.name||project.qualification));
    if(s.funds<project.cost.funds)reasons.push('Need '+Math.ceil(project.cost.funds-s.funds)+' more funding');
    if(s.effort<project.cost.effort)reasons.push('Need '+Math.ceil(project.cost.effort-s.effort)+' more research effort');
    if(s.designs<(project.cost.designs||0))reasons.push('Need '+Math.ceil(project.cost.designs-s.designs)+' engineering designs');
    if(project.cost.effort>metrics(s).effortCap)reasons.push('Expand notebook capacity to '+project.cost.effort);
    return {available,ready:available&&!reasons.length&&!s.ended,reasons};
  }
  function buyProject(s,id) {
    const status=projectStatus(s,id);if(!status.ready)return false;
    const project=C.projects.find(p=>p.id===id),before=stage(s);
    s.funds-=project.cost.funds;s.effort-=project.cost.effort;s.designs-=project.cost.designs||0;s.done.push(id);
    note(s,project.title+(/[.!?]$/.test(project.title)?' ':'. ')+project.effect,'discovery');
    if(id==='rb')s.calibration=.25;
    if(stage(s)>before)note(s,C.chapters[stage(s)].transition,'chapter');
    checkEnding(s);return true;
  }
  function configure(s,key,value) {
    if(s.ended&& !['sound','volume','theme'].includes(key))return false;
    if(s.job?.workload&&['distance','factories','calibration','theta','shots','mitigate','logicalRecipe'].includes(key))return false;
    if(key==='controllerProfile'){if(s.campusRevision!==1||!has(s,'controller2026')||!['balanced','streaming','response'].includes(value)||metrics(s).atomic)return false;s.controllerProfile=value;}
    else if(key==='distance'){if(!has(s,'surface')||![3,5,7,9].includes(value))return false;s.distance=value;}
    else if(key==='factories'){if(!has(s,'ancilla')||!Number.isInteger(value)||value<0||value>3)return false;s.factories=value;}
    else if(key==='calibration'){if(!has(s,'rb')||!Number.isFinite(value)||value<0||value>.6)return false;s.calibration=value;}
    else if(key==='service'){if(!has(s,'nisq')||s.job?.workload||!Number.isFinite(value)||value<0||value>.9)return false;s.service=value;}
    else if(key==='price'){if(!has(s,'nisq')||!Number.isFinite(value)||value<.5||value>200)return false;s.price=value;}
    else if(key==='autoPrice'){if(!hasEngineering(s,'pricing')||typeof value!=='boolean')return false;s.autoPrice=value;}
    else if(key==='autoCalibration'){if(!hasEngineering(s,'autoCalibration')||s.job?.workload||typeof value!=='boolean')return false;s.autoCalibration=value;}
    else if(key==='analysisShare'){if(!hasEngineering(s,'automation')||!Number.isFinite(value)||value<0||value>1)return false;s.analysisShare=value;}
    else if(key==='fabrication'){if(!hasEngineering(s,'workshop')||!Number.isFinite(value)||value<0||value>1)return false;s.fabrication=value;}
    else if(key==='theta'){if(!has(s,'vqe')||!Number.isFinite(value)||value<0||value>90)return false;s.theta=value;}
    else if(key==='shots'){if(!has(s,'vqe')||![0,1,2,3].includes(value))return false;s.shots=value;}
    else if(key==='mitigate'){if(!has(s,'mitigation')||typeof value!=='boolean')return false;s.mitigate=value;}
    else if(key==='logicalRecipe'){if(s.campusRevision!==1||!has(s,'accounting')||!C.dynamicsRecipes.some(recipe=>recipe.id===value)||(value!=='balanced'&&!has(s,'state-readiness')))return false;s.logicalRecipe=value;}
    else if(key==='sound'){if(typeof value!=='boolean')return false;s.sound=value;}
    else if(key==='volume'){if(!Number.isFinite(value)||value<0||value>1)return false;s.volume=value;}
    else if(key==='theme'){if(!['dark','light'].includes(value))return false;s.theme=value;}
    else return false;
    return true;
  }
  function experimentRecipe(s,id) {
    const e=C.experiments.find(experiment=>experiment.id===id);
    if(!e)return null;
    const shots=id==='vqe'?1024*4**s.shots:e.shots;
    const sampledShots=id==='vqe'?3*shots:shots,modeledShots=sampledShots*(id==='vqe'&&s.mitigate?4:1);
    const seconds=id==='vqe'&&s.campusRevision===1?8+modeledShots/12288:e.seconds;
    return {...e,seconds,shots,sampledShots,modeledShots,actualAcquisitions:sampledShots,modeledAcquisitions:modeledShots,cost:e.cost+(id==='vqe'?Math.ceil(modeledShots/2048):0)};
  }
  function experimentStatus(s,id) {
    const experiment=C.experiments.find(e=>e.id===id),m=metrics(s),reasons=[];
    if(!experiment)return {ready:false,reasons:['Unknown experiment']};
    if(!experiment.requires.every(key=>has(s,key)))reasons.push('Research its prerequisites');
    if(s.job)reasons.push('The apparatus is occupied');
    if(s.funds<experimentRecipe(s,id).cost)reasons.push('Need experiment funding');
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
    const e=experimentRecipe(s,id);
    s.started=true;s.funds-=e.cost;
    const samples=e.shots;
    s.job={id,workload:false,progress:0,duration:e.seconds,shots:samples,theta:s.theta,mitigate:s.mitigate,bias:metrics(s).bias};
    if(id==='vqe'&&s.campusRevision===1){s.job.recipeRevision=1;s.job.trial=++s.trialSerial;}
    return true;
  }
  function campusStatus(s) {
    const enabled=s.campusRevision===1,reasons=[];
    if(enabled)reasons.push('Expanded campus already enabled');
    if(s.job)reasons.push('Finish or cancel the captured apparatus job before entering');
    return {enabled,ready:!enabled&&!reasons.length,reasons};
  }
  function endingSnapshot(s,recipe) {
    const workload=s.completed.find(id=>['dynamics','molecule'].includes(id));recipe=recipe||s.completedRecipes?.[workload]||'balanced';
    return {elapsed:s.elapsed,active:metrics(s).active,distance:s.distance,discoveries:s.done.length,workload,recipe};
  }
  function enterCampus(s) {
    if(!campusStatus(s).ready)return false;
    s.campusRevision=1;if(s.ended&&!s.endingRecord)s.endingRecord=endingSnapshot(s);
    note(s,'The expanded campus is open. Earned resources and historical evidence are preserved; new frontier rewards require new trials.','engineering');return true;
  }
  function continueLaboratory(s) {
    if(s.campusRevision!==1||!s.ended||!s.endingRecord)return false;
    s.ended=false;s.epilogue=true;note(s,'The first scientific ending is preserved. The laboratory remains open for unfinished research.','event');return true;
  }
  function taskPrediction(s,item,tutorial=null) {
    const recipe=experimentRecipe(s,'vqe'),shots=tutorial?tutorial.shots/3:recipe.shots,theta=tutorial?tutorial.theta:s.theta;
    const bound=tutorial?tutorial.statistical:2.2*Math.sqrt(2*Math.log(6/.05)/shots),bias=tutorial?tutorial.bias:2.2*metrics(s).bias;
    const exact=tutorialEnergy(theta),reference=item.angle===null?-Math.sqrt(2.44):exact,ansatz=Math.max(0,exact+Math.sqrt(2.44));
    const angleOk=item.angle===null||Math.abs(theta-item.angle)<=1;
    return {bound,bias,ansatz,reference,angleOk,floor:bound+bias,theta,qualified:angleOk&&(item.angle!==null||ansatz<=item.tolerance)&&(!item.maxBias||bias<=item.maxBias)&&!!tutorial&&Math.abs(tutorial.energy-reference)+bound+bias<=item.tolerance};
  }
  function measurementStatus(s,id,precision=false) {
    const item=(precision?C.precisionRequests:C.objectives).find(item=>item.id===id),reasons=[];
    if(!item)return {available:false,ready:false,complete:false,reasons:['Unknown measurement task']};
    const receipt=(precision?s.precisionResults:s.objectiveResults)?.find(receipt=>receipt.id===id)||null,complete=!!receipt;
    const available=s.campusRevision===1&&item.requires.every(id=>has(s,id));
    const recipe=experimentRecipe(s,'vqe'),prediction=taskPrediction(s,item);
    if(!available)reasons.push('Enter the expanded campus and research its prerequisites');
    if(complete)reasons.push('Already earned; its reward is paid once');
    if(s.job)reasons.push('The apparatus is occupied');
    if(s.paused)reasons.push('Resume laboratory time');
    if(s.funds<recipe.cost)reasons.push('Need '+Math.ceil(recipe.cost-s.funds)+' acquisition funding');
    if(!prediction.angleOk)reasons.push('Set the named preparation to '+item.angle+'° ±1°');
    if(item.angle===null&&prediction.ansatz>item.tolerance)reasons.push('The exact ansatz error exceeds this ground-reference tolerance');
    if(prediction.floor>item.tolerance)reasons.push('Sampling plus residual bias exceeds the tolerance; change acquisition settings');
    if(item.maxBias&&prediction.bias>item.maxBias)reasons.push('Residual bias must be at most '+item.maxBias);
    return {item,available,ready:available&&!reasons.length&&!s.ended,complete,reasons,recipe,prediction,receipt};
  }
  const objectiveStatus=(s,id)=>measurementStatus(s,id);
  const precisionStatus=(s,id)=>measurementStatus(s,id,true);
  function startMeasurementTask(s,id,precision=false) {
    if(!measurementStatus(s,id,precision).ready||!startExperiment(s,'vqe'))return false;
    s.job[precision?'request':'objective']=id;
    note(s,'Fresh measurement scheduled: '+(precision?C.precisionRequests:C.objectives).find(item=>item.id===id).name+'.','event');return true;
  }
  const startObjective=(s,id)=>startMeasurementTask(s,id);
  const startPrecisionRequest=(s,id)=>startMeasurementTask(s,id,true);
  function finishMeasurementTask(s,job,result) {
    const precision=!!job.request,id=job.request||job.objective;
    if(!id||s.campusRevision!==1||job.recipeRevision!==1)return;
    const item=(precision?C.precisionRequests:C.objectives).find(item=>item.id===id),receipts=precision?s.precisionResults:s.objectiveResults;
    if(!item||receipts.some(receipt=>receipt.id===id))return;
    const prediction=taskPrediction(s,item,result);s.result[precision?'request':'objective']=id;s.result.task={id,precision,trial:job.trial,passed:prediction.qualified,reference:prediction.reference,tolerance:item.tolerance,angle:item.angle,maxBias:item.maxBias};
    if(!prediction.qualified){s.result.message=item.name+': the fresh trial does not meet the declared '+item.tolerance+' energy interval for '+(item.angle===null?'the ground reference':item.angle+'° known preparation')+'. Acquisition funding was spent; no task reward was paid.';note(s,s.result.message,'warning');return;}
    receipts.push({id,trial:job.trial,passed:true,time:s.elapsed,result:JSON.parse(JSON.stringify(result))});
    s.funds=Math.min(1e12,s.funds+(precision?item.payout:item.reward.funds));
    if(!precision)s.designs=Math.min(1e9,s.designs+item.reward.designs);
    s.result.message=item.name+': fresh evidence accepted against '+(item.angle===null?'the ground reference':item.angle+'° known preparation')+' within the '+item.tolerance+' interval. '+(precision?item.payout+' funding paid once.':item.reward.funds+' funding, '+item.reward.designs+' designs and one trust assignment earned once.');
    note(s,s.result.message,'breakthrough');
  }
  function procurementStatus(s,offerId,kind) {
    const offer=C.procurementOffers.find(offer=>offer.id===offerId),reasons=[];
    if(!offer||!['chip','support'].includes(kind))return {ready:false,reasons:['Unknown equipment quote']};
    if(s.campusRevision!==1||!offer.requires.every(id=>has(s,id)))reasons.push('Enter the campus and research the classical challenger');
    if((s.orders?.length||0)>=2)reasons.push('Both delivery slots are occupied');
    if(s.funds<offer.cost)reasons.push('Need '+Math.ceil(offer.cost-s.funds)+' funding');
    if(s.designs<offer.designs)reasons.push('Need '+Math.ceil(offer.designs-s.designs)+' engineering designs');
    if(reservedCapacity(s,kind)+offer.units>8193+1e-8)reasons.push('Eventual commissioned equipment would exceed the physical ceiling');
    if(s.paused)reasons.push('Resume laboratory time');
    return {offer,kind,ready:!reasons.length&&!s.ended,reasons,units:offer.units,cost:offer.cost,designs:offer.designs,seconds:offer.seconds,stock:s[kind==='chip'?'chipStock':'supportStock']||0,pending:pendingUnits(s,kind),nonCancellable:true};
  }
  function orderEquipment(s,offerId,kind) {
    const quote=procurementStatus(s,offerId,kind);if(!quote.ready)return false;
    s.funds-=quote.cost;s.designs-=quote.designs;s.orders.push({id:++s.orderSerial,offer:offerId,kind,placedAt:s.elapsed,remaining:quote.seconds});
    note(s,quote.offer.name+': '+quote.units+' '+kind+' prefab units ordered. Final order; delivery then funded workshop commissioning.','engineering');return true;
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
    return {theta:job.theta,mitigate:job.mitigate,readoutBias:job.bias,energy,exact,reference,statistical,se:Math.sqrt(Math.max(0,variance)/job.shots),bias,ansatzError:Math.max(0,exact-reference),shots:3*job.shots,modeledShots:3*job.shots*multiplier,groups,qualified:Math.abs(energy-reference)+statistical+bias<=.12};
  }
  function finishExperiment(s,job) {
    const m=metrics(s);
    s.result={id:job.id,shots:job.shots,bins:[],message:''};
    if(job.id==='calibrate'){s.drift=.005;s.result.message='Calibration complete. Drift is reduced; it is not eliminated forever.';note(s,'The histogram is prettier. The error bars remain unconvinced.','calibration');return;}
    if(job.id==='signal'){const one=binomial(s,job.shots,.48);s.result.bins=[job.shots-one,one];s.result.message='A signal from repeated known preparations.';qualify(s,'signal','First signal. One qubit. An entire room to keep it cold.');}
    if(job.id==='ramsey'){s.drift=.03;s.result.message='Selected Ramsey scenario: T₂* = 18.4 μs. An echo will ask a different question.';qualify(s,'ramsey','A fringe emerges from the noise.');}
    if(job.id==='echo'){s.result.message='Selected scenario: T₁ = 54 μs; echo T₂ = 42 μs; Ramsey T₂* = 18.4 μs.';qualify(s,'echo','The echo is clearer. It is still not a way to undo every error.');}
    if(job.id==='readout'){s.result.message='Known preparations characterize measurement bias. This does not reveal an arbitrary unknown state.';qualify(s,'readout','A measurement is now a little less opinionated.');}
    if(job.id==='benchmark'){s.result.message='Illustrative RB estimate: '+(m.rbError*100).toFixed(2)+'%. Its assumptions differ from the threshold scenario.';qualify(s,'benchmark','The control pulses have acquired error bars.');}
    if(job.id==='circuit'){const good=binomial(s,job.shots,clamp(m.noFault,0,1)),zero=binomial(s,good,.5),bad=job.shots-good;s.result.bins=[zero,Math.floor(bad/2),bad-Math.floor(bad/2),good-zero];s.result.message='Known Bell-state preparation sampled. Entanglement alone proves no advantage.';qualify(s,'circuit','The second qubit has something to say to the first.');}
    if(job.id==='vqe'){
      s.tutorial=tutorialResult(s,job);s.result.message=s.tutorial.qualified?'Tutorial reproduced within its declared uncertainty and residual-bias budget.':'The energy is not yet qualified. Tune θ, increase shots, or reduce bias.';
      if(s.tutorial.qualified)qualify(s,'vqe','A two-spin energy, reproduced against an exact classical reference.');
      else if(!job.objective&&!job.request)note(s,'The classical reference is unimpressed. The next trial can be better.','warning');
      finishMeasurementTask(s,job,s.tutorial);
    }
    if(job.id==='memory'){
      s.result.bins=Array.from({length:8},()=>binomial(s,100,clamp(m.pEff,0,1)));
      s.result.message=m.memoryOK?'100 illustrative detection-event trials sampled; this is not a decoded surface-code simulation. Logical error remains a model fit.':'Memory qualification lost: inspect current noise, footprint, and decoding.';
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
  function workloadRecipe(s,id,recipeId=s.logicalRecipe||'balanced') {
    const base=C.workloads.find(item=>item.id===id);if(!base)return null;
    if(id!=='dynamics')return {...base,dataWidth:base.width,workspace:0,recipe:'balanced'};
    const recipe=C.dynamicsRecipes.find(recipe=>recipe.id===recipeId);return recipe?{...base,...recipe,id:base.id,recipe:recipe.id}:null;
  }
  function workloadStatus(s,id,recipeId) {
    const w=workloadRecipe(s,id,recipeId),m=metrics(s),reasons=[];
    if(!w)return {ready:false,reasons:['Unknown workload']};
    if(s.completed.includes(id))reasons.push('Already completed');
    if(w.recipe!=='balanced'&&(s.campusRevision!==1||!has(s,'state-readiness')))reasons.push('Research the optional state-readiness comparison');
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
    return {ready:!reasons.length&&!s.ended,reasons,risk,runtime,credits,idle,gateTime,factoryTime,feedbackTime,parts,width:w.width,dataWidth:w.dataWidth,workspace:w.workspace,recipe:w.recipe};
  }
  function startWorkload(s,id) {
    const status=workloadStatus(s,id);if(!status.ready||s.paused)return false;
    const w=workloadRecipe(s,id);
    s.funds-=w.fee;s.credits-=status.credits;s.job={id,recipe:w.recipe,workload:true,progress:0,duration:w.seconds,shots:0,theta:s.theta,mitigate:s.mitigate,bias:metrics(s).bias};
    note(s,'Scheduled: '+w.name+'. Full modeled time '+status.runtime.toFixed(0)+' μs.','workload');return true;
  }
  function liveWorkloadStatus(s,id) {
    // Entry costs have already been paid. Check current engineering conditions only.
    const recipe=s.job?.recipe||s.logicalRecipe||'balanced',w=workloadRecipe(s,id,recipe);
    return workloadStatus({...s,job:null,credits:Math.max(s.credits,w.magic*w.repetitions),funds:Math.max(s.funds,w.fee)},id,recipe);
  }
  function checkEnding(s) {
    if(!s.ended&&!s.epilogue&&has(s,'audit')&&s.completed.some(id=>['dynamics','molecule'].includes(id))){s.ended=true;if(s.campusRevision===1&&!s.endingRecord)s.endingRecord=endingSnapshot(s);s.job=null;note(s,'Useful at last. A modeled scientific scenario is complete. For Keir, one qubit in return.','ending');}
  }
  function tick(s,seconds) {
    if(!s.started||s.paused||s.ended||!Number.isFinite(seconds)||seconds<=0)return;
    // One-second steps keep automated simulations and normal browser updates consistent.
    if(seconds>1){while(seconds>0){const dt=Math.min(1,seconds);tick(s,dt);seconds-=dt;}return;}
    const dt=seconds,m=metrics(s,dt);s.elapsed+=dt;
    s.funds=clamp(s.funds+m.netFunding*dt,0,1e12);s.effort=clamp(s.effort+m.effortRate*dt,0,m.effortCap);s.designs=clamp(s.designs+m.designRate*dt,0,1e9);
    s.drift=clamp(s.drift+dt*.004*(m.maintenance-m.calibrationDuty),.005,1);
    s.fabricated=clamp(s.fabricated+m.fabricationRate*dt,0,8192);s.integrated=clamp(s.integrated+m.integrationRate*dt,0,8192);
    if(s.campusRevision===1){
      s.chipStock=Math.max(0,s.chipStock-m.prefabFabricationRate*dt);s.supportStock=Math.max(0,s.supportStock-m.prefabIntegrationRate*dt);
      for(const order of s.orders)order.remaining=Math.max(0,order.remaining-dt);
      for(const order of s.orders.filter(order=>order.remaining<=0)){const units=C.procurementOffers.find(offer=>offer.id===order.offer).units;s[order.kind==='chip'?'chipStock':'supportStock']+=units;note(s,'Delivery received: '+units+' '+order.kind+' prefab units. Workshop commissioning still needs allocation and funding.','engineering');}
      s.orders=s.orders.filter(order=>order.remaining>0);
    }
    s.credits=clamp(s.credits+m.creditRate*dt,0,2000);
    if(!s.job)return;
    const job=s.job;
    if(job.workload&&!liveWorkloadStatus(s,job.id).ready){s.job=null;s.result={id:job.id,shots:0,bins:[],message:'Schedule stopped: current conditions no longer meet its model budget. Funding and rehearsal credits were spent; your laboratory is intact.'};note(s,s.result.message,'warning');return;}
    job.progress+=dt*(job.id==='calibrate'?1:m.experimentDuty);
    if(job.progress<job.duration)return;
    s.job=null;
    if(job.workload){
      const w=workloadRecipe(s,job.id,job.recipe||'balanced');
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
      if(!s.completed.includes(w.id)){s.completed.push(w.id);if(s.campusRevision===1)s.completedRecipes[w.id]=w.recipe;s.funds+=w.payout;s.reputation+=2;s.effort=Math.min(metrics(s).effortCap,s.effort+100);note(s,w.name+'. '+w.validation,'workload');}
      if(has(s,'audit')&&!s.epilogue&&!s.endingRecord&&['dynamics','molecule'].includes(w.id)&&s.campusRevision===1)s.endingRecord=endingSnapshot(s,w.recipe);
      checkEnding(s);
    }else finishExperiment(s,job);
  }
  function pause(s) {if(!s.started)return false;s.paused=!s.paused;return true;}
  function cancel(s) {if(!s.job)return false;s.job=null;note(s,'Experiment cancelled. The apparatus is available again. Entry costs are not refunded.','event');return true;}
  function serialize(s) {return JSON.stringify({game:'coherent',version:2,state:s},null,2);}
  function parseSave(text) {
    if(typeof text!=='string'||text.length>250000)throw new Error('Save must be a JSON file smaller than 250 KB.');
    let envelope;try{envelope=JSON.parse(text);}catch{throw new Error('This file is not valid JSON. Your current laboratory is unchanged.');}
    if(envelope?.game!=='coherent'||envelope.version!==2||envelope.state?.version!==2)throw new Error(envelope?.version===1?'This is a short-campaign baseline save. It remains preserved; the deeper campaign begins in a new laboratory.':'This is not a supported Coherent save.');
    const input=envelope.state,base=newGame(),s={},campus=campusDefaults(),campusKeys=Object.keys(campus);
    // A known in-progress campus rollout added recipe receipts before any workload finished.
    // Accept only its complete previous block, never repair partial saves or infer history.
    if(input.campusRevision===1&&!('completedRecipes' in input)&&campusKeys.filter(key=>key!=='completedRecipes').every(key=>key in input)&&Array.isArray(input.completed)&&input.completed.length===0&&input.endingRecord===null&&input.epilogue===false)input.completedRecipes={};
    const campusCount=campusKeys.filter(key=>key in input).length;
    if(campusCount&&campusCount!==campusKeys.length)throw new Error('Save has an incomplete campus state block.');
    Object.assign(s,campusCount?Object.fromEntries(campusKeys.map(key=>[key,input[key]])):{...campus,campusRevision:0});
    if(![0,1].includes(s.campusRevision)||!Array.isArray(s.objectiveResults)||s.objectiveResults.length>6||!Array.isArray(s.precisionResults)||s.precisionResults.length>6||!Array.isArray(s.orders)||s.orders.length>2||!Number.isInteger(s.orderSerial)||s.orderSerial<0||s.orderSerial>1e9||!Number.isInteger(s.trialSerial)||s.trialSerial<0||s.trialSerial>1e9||typeof s.epilogue!=='boolean'||!['balanced','compact','parallel'].includes(s.logicalRecipe)||!['balanced','streaming','response'].includes(s.controllerProfile)||(!s.completedRecipes||Array.isArray(s.completedRecipes)||typeof s.completedRecipes!=='object')||[s.chipStock,s.supportStock].some(n=>typeof n!=='number'||!Number.isFinite(n)||n<0||n>8192))throw new Error('Invalid campus configuration.');
    if(s.campusRevision===0&&(s.objectiveResults.length||s.precisionResults.length||s.orders.length||s.orderSerial||s.trialSerial||s.chipStock||s.supportStock||s.logicalRecipe!=='balanced'||s.controllerProfile!=='balanced'||Object.keys(s.completedRecipes).length||s.endingRecord!==null||s.epilogue))throw new Error('Legacy laboratory cannot contain earned campus progress.');
    const ranges={elapsed:[0,1e9],funds:[0,1e12],effort:[0,1e9],module:[0,6],rack:[0,6],staff:[0,MAX_STAFF],notebooks:[1,64],designs:[0,1e9],price:[.5,200],automation:[0,16],analysisShare:[0,1],workshops:[0,12],fabrication:[0,1],fabricated:[0,8192],integrated:[0,8192],pulse:[0,8],decoder:[0,5],drift:[.005,1],distance:[3,9],factories:[0,3],calibration:[0,.6],service:[0,.9],theta:[0,90],shots:[0,3],credits:[0,2000],reputation:[0,1000],seed:[0,4294967295],volume:[0,1]};
    const integers=['notebooks','automation','workshops','module','rack','staff','pulse','decoder','distance','factories','shots','reputation','seed'];
    for(const [key,value] of Object.entries(base)){
      if(campusKeys.includes(key))continue;
      if(!(key in input))throw new Error('Save is missing '+key+'.');
      if(ranges[key]){const n=input[key],[min,max]=ranges[key];if(typeof n!=='number'||!Number.isFinite(n)||n<min||n>max||(integers.includes(key)&&!Number.isInteger(n)))throw new Error('Invalid '+key+' in save.');s[key]=n;}
      else if(typeof value==='boolean'){if(typeof input[key]!=='boolean')throw new Error('Invalid '+key+' in save.');s[key]=input[key];}
      else s[key]=input[key];
    }
    if(![3,5,7,9].includes(s.distance)||!['dark','light'].includes(s.theme))throw new Error('Invalid laboratory configuration.');
    const validateIds=(value,allowed,label)=>{if(!Array.isArray(value)||value.length>allowed.length||new Set(value).size!==value.length||value.some(id=>!allowed.includes(id)))throw new Error('Invalid '+label+' in save.');};
    validateIds(s.qualified,C.experiments.map(e=>e.id),'qualifications');
    validateIds(s.engineering,(C.engineering||[]).map(e=>e.id),'engineering advances');
    for(const e of C.engineering||[])if(hasEngineering(s,e.id)&&(e.requires.some(id=>!has(s,id))||e.engineeringRequires.some(id=>!hasEngineering(s,id))||e.group&&(C.engineering||[]).some(other=>other.id!==e.id&&other.group===e.group&&hasEngineering(s,other.id))))throw new Error('Invalid engineering prerequisites or exclusive choice.');
    if(s.staff+s.notebooks>metrics(s).trust||s.effort>metrics(s).effortCap+1e-6||s.reputation!==s.qualified.length+2*s.completed.length)throw new Error('Research assignments or capacity exceed earned trust.');
    if((s.automation||s.analysisShare!==1)&&!hasEngineering(s,'automation')||s.workshops&&!hasEngineering(s,'workshop')||(s.fabricated||s.integrated)&&!hasEngineering(s,'workshop')||s.autoPrice&&!hasEngineering(s,'pricing')||s.autoCalibration&&!hasEngineering(s,'autoCalibration'))throw new Error('Engineering configuration is unavailable.');
    validateIds(s.done,C.projects.map(p=>p.id),'discoveries');validateIds(s.qualified,C.experiments.map(e=>e.id),'qualifications');validateIds(s.completed,C.workloads.map(w=>w.id),'completed workloads');
    for(const p of C.projects)if(has(s,p.id)&&(p.requires.some(id=>!has(s,id))||p.qualification&&p.qualification!=='coupled'&&!s.qualified.includes(p.qualification)))throw new Error('Discovery prerequisites or historical qualifications are missing.');
    for(const e of C.experiments)if(s.qualified.includes(e.id)&&e.requires.some(id=>!has(s,id)))throw new Error('Qualification prerequisites are missing.');
    for(const w of C.workloads)if(s.completed.includes(w.id)&&w.requires.some(id=>!has(s,id)))throw new Error('Completed workload prerequisites are missing.');
    if(s.factories&&!has(s,'ancilla')||s.distance!==3&&!has(s,'surface')||s.module&&!has(s,'rb')||s.rack&&!has(s,'divincenzo')||s.staff>1&&!has(s,'feynman')||s.pulse&&!has(s,'rb')||s.decoder&&!has(s,'decoder')||s.service&&!has(s,'nisq')||s.calibration&&!has(s,'rb')||s.mitigate&&!has(s,'mitigation')||(s.theta!==20||s.shots!==1)&&!has(s,'vqe')||s.credits&&!has(s,'ancilla'))throw new Error('Configuration has an unavailable upgrade.');
    if(!Array.isArray(s.log)||s.log.length>60||s.log.some(entry=>!entry||Array.isArray(entry)||typeof entry.message!=='string'||entry.message.length>500||!Number.isFinite(entry.time)||entry.time<0||entry.time>s.elapsed||!['event','engineering','discovery','chapter','breakthrough','warning','calibration','workload','ending'].includes(entry.kind)))throw new Error('Invalid journal in save.');
    function finiteTree(value,depth=0){if(depth>8)throw new Error('Invalid result structure.');if(typeof value==='number'&&!Number.isFinite(value))throw new Error('Invalid result number.');if(typeof value==='string'&&value.length>1000)throw new Error('Result text is too long.');if(value&&typeof value==='object'){if(Array.isArray(value)&&value.length>100)throw new Error('Result is too large.');for(const v of Object.values(value))finiteTree(v,depth+1);}}
    finiteTree(s.result);finiteTree(s.tutorial);
    const number=(n,min,max,integer=false)=>typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max&&(!integer||Number.isInteger(n));
    const sampleCounts=[1024,4096,16384,65536];
    if(s.result!==null){
      const r=s.result,e=C.experiments.find(e=>e.id===r?.id),w=C.workloads.find(w=>w.id===r?.id);
      const expectedShots=e?.shots??(r?.id==='calibrate'?512:0),binCount={signal:2,circuit:4,memory:8}[r?.id]||0;
      if(!r||(!e&&!w&&r.id!=='calibrate')||typeof r.message!=='string'||!Array.isArray(r.bins)||r.bins.length!==binCount||r.bins.some(n=>!number(n,0,expectedShots,true))||!(r.id==='vqe'?sampleCounts.includes(r.shots):r.shots===expectedShots)||(e||w)?.requires.some(id=>!has(s,id))||r.id==='calibrate'&&stage(s)<1)throw new Error('Invalid experiment result.');
      if(['signal','circuit'].includes(r.id)&&r.bins.reduce((a,b)=>a+b,0)!==r.shots)throw new Error('Measurement counts do not match the result shots.');
      if(r.certificate!==undefined){
        const c=r.certificate,valid=c&&c.valid===true&&(r.id==='factors'?c.n===15&&c.a===3&&c.b===5:r.id==='search'&&c.index===4&&c.target==='cobalt');
        if(!valid)throw new Error('Invalid classical certificate.');
      }
      if(r.id==='vqe'&&s.tutorial===null)throw new Error('The trial energy is missing its measurement data.');
    }
    function validateTutorial(t,receipt=false) {
      const M=t?.shots/3;
      if(!t||!has(s,'vqe')||!number(t.shots,3072,196608,true)||!number(t.modeledShots,3072,786432,true)||!sampleCounts.includes(M)||!number(t.theta,0,90)||['energy','exact','reference'].some(key=>!number(t[key],-2.2,2.2))||['statistical','se','bias','ansatzError'].some(key=>!number(t[key],0,5))||typeof t.qualified!=='boolean'||![t.shots,t.shots*4].includes(t.modeledShots)||t.modeledShots!==t.shots&&!has(s,'mitigation')||!Array.isArray(t.groups)||t.groups.length!==3)throw new Error('Invalid tutorial result or shot accounting.');
      if(t.groups.some((g,i)=>!g||g.label!==['ZZ','X₀','X₁'][i]||!number(g.plus,0,M,true)||!number(g.minus,0,M,true)||g.plus+g.minus!==M||!number(g.estimate,-1,1)||Math.abs(g.estimate-(2*g.plus/M-1))>1e-12))throw new Error('Invalid tutorial measurement groups.');
      const weights=[1,.6,.6],energy=t.groups.reduce((sum,g,i)=>sum+weights[i]*g.estimate,0),variance=t.groups.reduce((sum,g,i)=>sum+weights[i]**2*(1-g.estimate**2),0);
      const exact=tutorialEnergy(t.theta),reference=-Math.sqrt(2.44),statistical=2.2*Math.sqrt(2*Math.log(6/.05)/M),se=Math.sqrt(Math.max(0,variance)/M),ansatzError=Math.max(0,exact-reference);
      if(Object.entries({energy,exact,reference,statistical,se,ansatzError}).some(([key,value])=>Math.abs(t[key]-value)>1e-10)||![.04,.008,.002].some(bias=>Math.abs(t.bias-2.2*bias)<1e-12)||t.qualified!==(Math.abs(energy-reference)+statistical+t.bias<=.12))throw new Error('Tutorial claims disagree with its captured measurement groups.');
      if((receipt||t.mitigate!==undefined||t.readoutBias!==undefined)&&(typeof t.mitigate!=='boolean'||![.04,.008,.002].includes(t.readoutBias)||Math.abs(t.bias-2.2*t.readoutBias)>1e-12||t.modeledShots!==t.shots*(t.mitigate?4:1)||t.mitigate&&!has(s,'mitigation')||t.readoutBias!==(t.mitigate?.002:.008)))throw new Error('Invalid captured receipt mitigation or bias.');
      return t;
    }
    if(s.tutorial!==null){validateTutorial(s.tutorial);if(s.result?.id==='vqe'&&s.result.shots!==s.tutorial.shots/3)throw new Error('Tutorial and result shot counts disagree.');}
    if((s.result?.objective!==undefined||s.result?.request!==undefined)&&s.result?.task===undefined)throw new Error('Recorded measurement task is missing its criterion.');
    if(s.result?.task!==undefined){
      const task=s.result.task,item=(task?.precision?C.precisionRequests:C.objectives).find(item=>item.id===task?.id),prediction=item&&s.tutorial?taskPrediction(s,item,s.tutorial):null;
      if(s.campusRevision!==1||s.result.id!=='vqe'||!item||typeof task.precision!=='boolean'||!number(task.trial,1,s.trialSerial,true)||task.passed!==prediction?.qualified||task.reference!==prediction?.reference||task.tolerance!==item.tolerance||task.angle!==item.angle||task.maxBias!==item.maxBias||s.result[task.precision?'request':'objective']!==task.id||s.result[task.precision?'objective':'request']!==undefined)throw new Error('Invalid recorded task-specific measurement criterion.');
    }
    const trials=new Set();
    for(const [receipts,items] of [[s.objectiveResults,C.objectives],[s.precisionResults,C.precisionRequests]]){
      const ids=new Set();
      for(const receipt of receipts){
        const item=items.find(item=>item.id===receipt?.id);
        if(!receipt||receipt.passed!==true||!item||ids.has(item.id)||!number(receipt.time,0,s.elapsed)||!number(receipt.trial,1,s.trialSerial,true)||trials.has(receipt.trial)||item.requires.some(id=>!has(s,id)))throw new Error('Invalid fresh measurement receipt identity or prerequisites.');
        finiteTree(receipt.result);validateTutorial(receipt.result,true);
        if(!taskPrediction(s,item,receipt.result).qualified)throw new Error('Measurement receipt does not meet its declared interval.');
        ids.add(item.id);trials.add(receipt.trial);
      }
    }
    if(s.result?.task?.passed){
      const task=s.result.task,receipt=(task.precision?s.precisionResults:s.objectiveResults).find(receipt=>receipt.id===task.id&&receipt.trial===task.trial),tutorial=s.tutorial;
      if(!receipt||['theta','shots','modeledShots','mitigate','readoutBias'].some(key=>receipt.result[key]!==tutorial[key])||receipt.result.groups.some((group,i)=>group.plus!==tutorial.groups[i].plus||group.minus!==tutorial.groups[i].minus))throw new Error('Successful current task is missing its matching fresh receipt.');
    }
    const orderIds=new Set();
    for(const order of s.orders){
      const offer=C.procurementOffers.find(offer=>offer.id===order?.offer);
      if(!order||!offer||!number(order.id,1,s.orderSerial,true)||orderIds.has(order.id)||!['chip','support'].includes(order.kind)||!number(order.placedAt,0,s.elapsed)||!number(order.remaining,Number.EPSILON,offer.seconds)||Math.abs(order.remaining-(offer.seconds-(s.elapsed-order.placedAt)))>1e-7||offer.requires.some(id=>!has(s,id)))throw new Error('Invalid equipment delivery or laboratory-time accounting.');
      orderIds.add(order.id);
    }
    if((s.chipStock||pendingUnits(s,'chip'))&&reservedCapacity(s,'chip')>8193+1e-7||(s.supportStock||pendingUnits(s,'support'))&&reservedCapacity(s,'support')>8193+1e-7)throw new Error('Equipment stock and orders exceed the eventual physical ceiling.');
    if(s.logicalRecipe!=='balanced'&&!has(s,'state-readiness')||s.controllerProfile!=='balanced'&&!has(s,'controller2026')||s.campusRevision===0&&s.done.some(id=>C.projects.find(project=>project.id===id)?.optional))throw new Error('Modern research configuration is unavailable.');
    if(Object.entries(s.completedRecipes).some(([id,recipe])=>!s.completed.includes(id)||!['balanced','compact','parallel'].includes(recipe)||id!=='dynamics'&&recipe!=='balanced'||recipe!=='balanced'&&!has(s,'state-readiness')))throw new Error('Invalid captured completed workload recipe.');
    if(s.endingRecord!==null){
      const record=s.endingRecord;
      if(!record||!number(record.elapsed,0,s.elapsed)||!number(record.active,1,8193,true)||![3,5,7,9].includes(record.distance)||!number(record.discoveries,1,s.done.length,true)||!['dynamics','molecule'].includes(record.workload)||!s.completed.includes(record.workload)||!['balanced','compact','parallel'].includes(record.recipe)||record.recipe!==(s.completedRecipes[record.workload]||'balanced')||record.workload!=='dynamics'&&record.recipe!=='balanced'||!has(s,'audit')||(!s.ended&&!s.epilogue))throw new Error('Invalid preserved ending record.');
    }
    if(s.epilogue&&(!s.endingRecord||s.ended)||s.campusRevision===1&&s.ended&&!s.endingRecord)throw new Error('Expanded campus ending record is missing or inconsistent.');
    if(s.job!==null){
      const j=s.job,known=j?.workload?C.workloads.map(w=>w.id):[...C.experiments.map(e=>e.id),'calibrate'];
      if(!j||typeof j.workload!=='boolean'||!known.includes(j.id)||!Number.isFinite(j.duration)||j.duration<=0||j.duration>100||!Number.isFinite(j.progress)||j.progress<0||j.progress>=j.duration||!Number.isInteger(j.shots)||j.shots<0||j.shots>65536||!Number.isFinite(j.theta)||j.theta<0||j.theta>90||!Number.isFinite(j.bias)||j.bias<0||j.bias>1||typeof j.mitigate!=='boolean')throw new Error('Invalid active experiment.');
      const recipe=j.workload?workloadRecipe(s,j.id,j.recipe||'balanced'):C.experiments.find(e=>e.id===j.id);
      const expectedDuration=j.id==='vqe'&&s.campusRevision===1?8+3*j.shots*(j.mitigate?4:1)/12288:recipe?.seconds;
      if(!recipe&&j.id!=='calibrate'||recipe&&(recipe.requires.some(id=>!has(s,id))||Math.abs(expectedDuration-j.duration)>1e-12))throw new Error('Active experiment prerequisites or duration are invalid.');
      if(j.id==='calibrate'&&(stage(s)<1||j.duration!==4))throw new Error('Calibration is unavailable in this save.');
      if(j.id==='vqe'?!sampleCounts.includes(j.shots):j.shots!==(j.workload?0:j.id==='calibrate'?512:recipe.shots))throw new Error('Active experiment sample count is invalid.');
      if(j.mitigate&&!has(s,'mitigation')||![.04,.008,.002].includes(j.bias))throw new Error('Active experiment bias configuration is invalid.');
      if(j.id==='vqe'&&s.campusRevision===1){
        if(j.recipeRevision!==1||!number(j.trial,1,s.trialSerial,true)||trials.has(j.trial)||j.objective!==undefined&&j.request!==undefined||j.bias!==(j.mitigate?.002:.008))throw new Error('Invalid captured fresh trial identity.');
        const item=j.objective!==undefined?C.objectives.find(item=>item.id===j.objective):j.request!==undefined?C.precisionRequests.find(item=>item.id===j.request):null;
        if((j.objective!==undefined||j.request!==undefined)&&(!item||item.requires.some(id=>!has(s,id))||(j.objective?s.objectiveResults:s.precisionResults).some(receipt=>receipt.id===item.id)))throw new Error('Invalid active measurement objective or request.');
      }else if(j.recipeRevision!==undefined||j.trial!==undefined||j.objective!==undefined||j.request!==undefined)throw new Error('Legacy or unrelated job cannot claim fresh campus evidence.');
      if(j.workload&&(j.recipe!==undefined&&!C.dynamicsRecipes.some(recipe=>recipe.id===j.recipe)||j.id!=='dynamics'&&j.recipe&&j.recipe!=='balanced'||j.recipe&&j.recipe!=='balanced'&&!has(s,'state-readiness')))throw new Error('Invalid captured workload recipe.');
      if(j.workload&&s.completed.includes(j.id))throw new Error('A completed workload cannot still be running.');
    }
    if(!s.started&&(s.paused||s.elapsed||s.done.length||s.qualified.length||s.completed.length||s.job||s.result||s.tutorial||s.objectiveResults.length||s.precisionResults.length||s.orders.length||s.chipStock||s.supportStock||s.trialSerial||s.orderSerial))throw new Error('An unstarted laboratory cannot contain progress.');
    if(s.ended&&s.job)throw new Error('A completed campaign cannot contain an active job.');
    if(s.ended&&(!has(s,'audit')||!s.completed.some(id=>['dynamics','molecule'].includes(id))))throw new Error('Ending requirements are missing.');
    return JSON.parse(JSON.stringify(s));
  }
  return {content:C,POOLS,MAX_STAFF,newGame,stage,has,hasEngineering,assign,engineeringStatus,buyEngineering,metrics,patchSize,upgradeInfo,buyUpgrade,qualificationNow,projectStatus,buyProject,configure,campusStatus,enterCampus,continueLaboratory,objectiveStatus,precisionStatus,startObjective,startPrecisionRequest,procurementStatus,orderEquipment,experimentRecipe,experimentStatus,startExperiment,calibrate,tutorialEnergy,workloadRecipe,workloadStatus,startWorkload,liveWorkloadStatus,tick,pause,cancel,serialize,parseSave};
});
