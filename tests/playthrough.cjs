/* Legal automated players. Resources, evidence, and progress come only from engine actions. */
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const G=require('../game.js');
const policies={
  frontier:{distance:3,service:.55,automation:4,workshops:2,dissemination:'open',rollout:'rapid'},
  revenue:{distance:3,service:.85,automation:2,workshops:1,dissemination:'proprietary',rollout:'rapid'},
  infrastructure:{distance:5,service:.7,automation:4,workshops:4,dissemination:'open',rollout:'rapid'},
  cautious:{distance:5,service:.55,automation:2,workshops:2,dissemination:'proprietary',rollout:'verified'}
};
const copy=s=>JSON.parse(JSON.stringify(s));
function requiredProjects(workload,allDiscoveries){
  if(allDiscoveries)return new Set(G.content.projects.map(p=>p.id));
  const required=new Set();
  function add(id){if(required.has(id))return;required.add(id);for(const prerequisite of G.content.projects.find(p=>p.id===id).requires)add(prerequisite);}
  add('audit');for(const id of G.content.workloads.find(w=>w.id===workload).requires)add(id);
  return required;
}
function play(strategy='compact',workload='dynamics',options={}) {
  const policyName={compact:'frontier',wide:'cautious'}[strategy]||strategy;
  if(!policies[policyName])throw new Error('Unknown policy '+strategy);
  const policy={...policies[policyName],...(options.policy||{})},allDiscoveries=options.allDiscoveries??['compact','wide'].includes(strategy);
  const required=requiredProjects(workload,allDiscoveries),s=options.resumeSave?G.parseSave(options.resumeSave):G.newGame(options.seed??424242),snapshots={},events=[];
  const measurements={policy:policyName,seed:options.seed??424242,allDiscoveries,limit:options.limit??14400,busy:0,idle:0,calibrationDuty:0,serviceDuty:0,experimentDuty:0,fullStore:0,designsWhileFull:0,designsWhileNotFull:0,grants:0,revenue:0,upkeep:0,delivered:0,automationWork:0,fabricated:0,integrated:0,longestNoAction:0,blocked:{funding:0,effort:0,designs:0,capacity:0,qualification:0},actions:{assignment:0,engineering:0,equipment:0,experiment:0,calibration:0,workload:0},investments:[],milestones:[],assignments:[],aborts:0};
  measurements.inputs=policy;measurements.initialElapsed=s.elapsed;measurements.resumed=!!options.resumeSave;measurements.longestNoActionWindow=null;measurements.priceChecks=0;measurements.priceAdjustments=0;measurements.analysisAdjustments=0;
  let previous=-1,lastAction=s.elapsed,lastActionId=options.resumeSave?'loaded laboratory':'opening',lastPrice=-Infinity;
  function recordAction(id){
    const interval=s.elapsed-lastAction;
    if(interval>measurements.longestNoAction){measurements.longestNoAction=interval;measurements.longestNoActionWindow={from:lastAction,to:s.elapsed,previous:lastActionId,next:id};}
    lastAction=s.elapsed;lastActionId=id;
  }
  function action(kind,id,operation){
    const before={funds:s.funds,effort:s.effort,designs:s.designs};
    if(!operation())return false;
    recordAction(kind+'/'+id);
    if(kind in measurements.actions)measurements.actions[kind]++;
    if(['equipment','engineering'].includes(kind))measurements.investments.push({at:s.elapsed,kind,id,funds:before.funds-s.funds,effort:before.effort-s.effort,designs:before.designs-s.designs});
    if(kind==='assignment')measurements.assignments.push({at:s.elapsed,id,staff:s.staff,notebooks:s.notebooks});
    if(kind==='discovery')measurements.milestones.push({at:s.elapsed,id,chapter:G.stage(s)});
    return true;
  }
  const upgrade=id=>action('equipment',id,()=>G.buyUpgrade(s,id));
  const engineering=id=>action('engineering',id,()=>G.buyEngineering(s,id));
  if(!s.started)action('experiment','signal',()=>G.startExperiment(s,'signal'));
  for(let second=0;second<measurements.limit&&!s.ended;second++){
    const chapter=G.stage(s);
    if(chapter!==previous){snapshots[chapter]=copy(s);events.push({chapter,at:s.elapsed});previous=chapter;}
    if(G.has(s,'vqe')){G.configure(s,'theta',65);G.configure(s,'shots',2);}
    if(G.has(s,'mitigation'))G.configure(s,'mitigate',true);
    if(G.has(s,'surface'))G.configure(s,'distance',policy.distance);
    if(G.has(s,'ancilla'))G.configure(s,'factories',policy.distance===3&&chapter>=5?2:1);
    let m=G.metrics(s);
    if(G.has(s,'rb'))G.configure(s,'calibration',Math.min(.6,Math.ceil((m.maintenance+.025)*20)/20));
    if(G.hasEngineering(s,'autoCalibration'))G.configure(s,'autoCalibration',true);
    if(G.has(s,'nisq')){
      G.configure(s,'service',s.job&&!m.atomic?0:policy.service);
      m=G.metrics(s);
      if(G.hasEngineering(s,'pricing'))G.configure(s,'autoPrice',true);
      else if(s.elapsed-lastPrice>=(policy.priceEvery??30)){
        const price=Math.min(200,Math.max(.5,policy.priceMode==='fair'?m.fairPrice:m.matchingPrice));
        if(price!==s.price&&G.configure(s,'price',price))measurements.priceAdjustments++;
        lastPrice=s.elapsed;measurements.priceChecks++;
      }
    }
    // Balance the next advance's storage requirement against staff and the full-bank bonus.
    const available=G.content.projects.filter(p=>required.has(p.id)&&G.projectStatus(s,p.id).available);
    const next=available[0];
    const planned=['workflow','storage1','storage2',policy.dissemination,...(policy.pricing===false?[]:['pricing']),'autoCalibration','automation',...(chapter>=3?['storage3']:[]),...(chapter>=4?['scheduler','workshop',policy.rollout]:[]),...(chapter>=(policy.synthesisAfter??4)?['synthesis']:[])];
    const nextEngineering=planned.map(id=>G.content.engineering.find(e=>e.id===id)).find(e=>e&&G.engineeringStatus(s,e.id).available);
    const targetEffort=Math.max(next?.cost.effort||0,nextEngineering?.cost.effort||0);
    const perNotebook=m.effortCap/s.notebooks,notebooksNeeded=Math.max(1,Math.ceil(targetEffort/perNotebook));
    const targetBooks=Math.min(notebooksNeeded,Math.max(1,m.trust-1));
    while(s.notebooks<targetBooks){
      if(G.metrics(s).freeTrust<1&&!action('assignment','staff−1',()=>G.assign(s,'staff',-1)))break;
      if(!action('assignment','notebooks+1',()=>G.assign(s,'notebooks',1)))break;
    }
    while(s.notebooks>targetBooks&&action('assignment','notebooks−1',()=>G.assign(s,'notebooks',-1))){}
    while(G.metrics(s).freeTrust>0&&s.staff<G.MAX_STAFF&&action('assignment','staff+1',()=>G.assign(s,'staff',1))){}
    for(const id of planned)engineering(id);
    // Early service expansion is useful independently of logical-computing footprint.
    const moduleTarget=chapter>=3?(policy.distance===3?2:3):G.has(s,'nisq')?2:G.has(s,'rb')?1:0;
    if(s.module<moduleTarget)upgrade('hardware');
    if(s.rack<moduleTarget)upgrade('rack');
    const pulseTarget=chapter>=5?(policy.distance===3?8:7):chapter>=4?(policy.distance===3?5:4):chapter>=3?(policy.distance===3?4:3):G.has(s,'nisq')?2:0;
    if(s.pulse<pulseTarget)upgrade('pulse');
    m=G.metrics(s);
    if(m.fullBank&&chapter>=2&&!snapshots.fullStore)snapshots.fullStore=copy(s);
    if(m.automationRunning>0&&!snapshots.automation)snapshots.automation=copy(s);
    if(s.workshops>0&&(s.fabricated>0||s.integrated>0)&&!snapshots.workshop)snapshots.workshop=copy(s);
    if(m.atomic&&s.job?.id!=='calibrate'&&!snapshots.atomic)snapshots.atomic=copy(s);
    if(s.job?.workload&&!snapshots.atomicWorkload)snapshots.atomicWorkload=copy(s);
    const decoderTarget=Math.max(chapter>=5?3:chapter>=4?2:0,Math.max(0,Math.ceil(Math.log(m.syndromeRate/64)/Math.log(4))));
    if(s.decoder<decoderTarget)upgrade('decoder');
    m=G.metrics(s);
    // Purchased stations can be idled; own only what the shared controller can run.
    if(s.automation<Math.min(policy.automation,Math.ceil(m.sharedCapacity)))upgrade('automation');
    if(s.rack<6&&G.has(s,'nisq')){
      const candidate=G.metrics({...s,rack:s.rack+1}),rack=G.upgradeInfo(s,'rack');
      const extraStation=G.hasEngineering(s,'automation')&&s.automation<policy.automation&&Math.ceil(candidate.sharedCapacity)>Math.ceil(m.sharedCapacity);
      const extraRevenue=candidate.revenue-m.revenue,payback=extraRevenue>0?rack.cost/extraRevenue:Infinity;
      if(s.funds>=rack.cost+(next?.cost.funds||1000)&&(extraStation||policyName==='revenue'&&payback<600))upgrade('rack');
    }
    if(s.workshops<policy.workshops)upgrade('workshop');
    if(G.hasEngineering(s,'workshop'))G.configure(s,'fabrication',m.installed<m.capacity ? .8 : m.installed>m.capacity ? .2 : .5);
    if(s.automation>0&&!m.atomic&&policy.dynamicAnalysis!==false&&second%15===0){
      // Choose a coarse, reversible duty setting against visible funding/notes/design deficits.
      const plannedAdvance=planned.map(id=>G.content.engineering.find(e=>e.id===id)).find(e=>e&&G.engineeringStatus(s,e.id).available);
      const pending=[['hardware',s.module<moduleTarget],['rack',s.rack<moduleTarget],['pulse',s.pulse<pulseTarget],['decoder',s.decoder<decoderTarget]].filter(([,needed])=>needed).map(([id])=>G.upgradeInfo(s,id));
      const funding=Math.max(next?.cost.funds||0,plannedAdvance?.cost.funds||0,G.content.workloads.find(w=>w.id===workload).fee,...pending.map(item=>item.cost));
      const designs=Math.max(next?.cost.designs||0,plannedAdvance?.cost.designs||0,...pending.map(item=>item.designs));
      const effort=Math.max(next?.cost.effort||0,plannedAdvance?.cost.effort||0);
      let chosen=1,best=Infinity;
      for(const fraction of [.2,.4,.6,.8,1]){
        const projected=G.metrics({...s,analysisShare:fraction});
        const fundingTime=Math.max(0,funding-s.funds)/Math.max(.001,projected.netFunding);
        const effortTime=Math.max(0,effort-s.effort)/Math.max(.001,projected.effortRate);
        const fillTime=Math.max(0,projected.effortCap-s.effort)/Math.max(.001,projected.effortRate),baseDesignRate=projected.designRate/projected.designBonus;
        const missingDesigns=Math.max(0,designs-s.designs),beforeFull=baseDesignRate*fillTime;
        const designTime=missingDesigns<=beforeFull?missingDesigns/Math.max(.001,baseDesignRate):fillTime+(missingDesigns-beforeFull)/Math.max(.001,4*baseDesignRate);
        const wait=Math.max(fundingTime,effortTime,designTime);
        if(wait<=best){best=wait;chosen=fraction;}
      }
      if(s.analysisShare!==chosen&&G.configure(s,'analysisShare',chosen))measurements.analysisAdjustments++;
    }
    for(const p of available){
      if(p.id==='classical'&&G.projectStatus(s,p.id).ready&&!snapshots.tutorial)snapshots.tutorial=copy(s);
      if(p.id==='threshold'&&G.projectStatus(s,p.id).ready&&!snapshots.memory)snapshots.memory=copy(s);
      if(p.id==='accounting'&&G.projectStatus(s,p.id).ready&&!snapshots.factory)snapshots.factory=copy(s);
      action('discovery',p.id,()=>G.buyProject(s,p.id));
    }
    if(!s.job){
      m=G.metrics(s);
      const needed=G.content.projects.filter(p=>required.has(p.id)&&G.projectStatus(s,p.id).available&&p.qualification&&!G.qualificationNow(s,p.qualification));
      const target=needed.find(p=>G.content.experiments.some(e=>e.id===p.qualification));
      if(s.drift>.08&&chapter>=1)action('calibration','calibrate',()=>G.calibrate(s));
      else if(target){
        // Frontier evidence temporarily gets the apparatus; atomic schedules reserve it in the engine.
        if(G.experimentStatus(s,target.qualification).ready){
          if(G.has(s,'nisq'))G.configure(s,'service',0);
          action('experiment',target.qualification,()=>G.startExperiment(s,target.qualification));
        }
      }else if(required.size===s.done.filter(id=>required.has(id)).length){
        const status=G.workloadStatus(s,workload);
        if(status.ready&&!snapshots.ready)snapshots.ready=copy(s);
        action('workload',workload,()=>G.startWorkload(s,workload));
      }
    }
    m=G.metrics(s);
    const blocked=G.content.projects.find(p=>required.has(p.id)&&G.projectStatus(s,p.id).available);
    if(blocked){
      if(s.funds<blocked.cost.funds)measurements.blocked.funding++;
      if(s.effort<blocked.cost.effort)measurements.blocked.effort++;
      if(s.designs<(blocked.cost.designs||0))measurements.blocked.designs++;
      if(m.effortCap<blocked.cost.effort)measurements.blocked.capacity++;
      if(blocked.qualification&&!G.qualificationNow(s,blocked.qualification))measurements.blocked.qualification++;
    }
    // Busy/idle refer to explicit jobs; continuous calibration and services have separate integrals.
    measurements[s.job?'busy':'idle']++;
    measurements.calibrationDuty+=m.calibrationDuty;
    measurements.serviceDuty+=m.effectiveServiceDuty;
    if(s.job)measurements.experimentDuty+=m.experimentDuty;
    if(m.fullBank)measurements.fullStore++;
    measurements[m.fullBank?'designsWhileFull':'designsWhileNotFull']+=m.designRate;
    for(const [key,rate]of [['grants','grants'],['revenue','revenue'],['upkeep','upkeep'],['delivered','delivered'],['automationWork','automationRunning'],['fabricated','fabricationRate'],['integrated','integrationRate']])measurements[key]+=m[rate];
    const qualifications=s.qualified.length,oldJob=s.job;
    G.tick(s,1);
    if(s.qualified.length>qualifications){recordAction('qualification/'+s.qualified.at(-1));measurements.milestones.push({at:s.elapsed,id:s.qualified.at(-1),kind:'qualification',chapter:G.stage(s)});}
    if(oldJob?.workload&&!s.job&&!s.completed.includes(oldJob.id))measurements.aborts++;
  }
  if(s.elapsed-lastAction>measurements.longestNoAction){measurements.longestNoAction=s.elapsed-lastAction;measurements.longestNoActionWindow={from:lastAction,to:s.elapsed,previous:lastActionId,next:s.ended?'ending':'simulation limit'};}
  snapshots.ending=copy(s);
  return {strategy,state:s,snapshots,events,measurements};
}
function summary({strategy,state,events,measurements}){
  const m=G.metrics(state);
  return {strategy,ended:state.ended,seconds:state.elapsed,discoveries:state.done.length,engineering:state.engineering,physical:m.active,module:state.module,rack:state.rack,pulse:state.pulse,decoder:state.decoder,distance:state.distance,factories:state.factories,staff:state.staff,notebooks:state.notebooks,automation:state.automation,analysisShare:state.analysisShare,workshops:state.workshops,funds:Math.round(state.funds),designs:Math.round(state.designs),completed:state.completed,chapters:events,measurements};
}
if(require.main===module){
  const matrix=process.argv.includes('--matrix');
  const seeds=matrix?[1,42,1337,424242,4294967295]:[424242];
  const results=seeds.flatMap(seed=>Object.keys(policies).map(strategy=>play(strategy,'dynamics',{seed})));
  console.log(JSON.stringify(results.map(summary),null,2));
  if(results.some(r=>!r.state.ended)){
    for(const r of results.filter(r=>!r.state.ended))console.error(JSON.stringify({strategy:r.strategy,seed:r.measurements.seed,next:G.content.projects.filter(p=>G.projectStatus(r.state,p.id).available).map(p=>({id:p.id,status:G.projectStatus(r.state,p.id)})),metrics:G.metrics(r.state),workload:G.workloadStatus(r.state,'dynamics')},null,2));
    process.exitCode=1;
  }else if(process.argv.includes('--write-evidence')){
    const dir=path.resolve(__dirname,'../evidence/coherent-depth');fs.mkdirSync(dir,{recursive:true});
    for(const r of results)for(const state of Object.values(r.snapshots))G.parseSave(G.serialize(state));
    const sourceHashes=Object.fromEntries(['game.js','content.js','tests/playthrough.cjs'].map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(path.resolve(__dirname,'..',file))).digest('hex')]));
    const rows=results.map(r=>{
      const row=summary(r);
      if(matrix){const {investments,assignments,milestones,...counts}=row.measurements;row.measurements={...counts,investmentCount:investments.length,assignmentCount:assignments.length,milestoneCount:milestones.length};row.restoredSnapshots=Object.keys(r.snapshots).length;}
      return row;
    });
    fs.writeFileSync(path.join(dir,matrix?'matrix.json':'playthroughs.json'),JSON.stringify(matrix?{status:'candidate',sourceHashes,runs:rows}:rows,null,2)+'\n');
    fs.writeFileSync(path.join(dir,'candidate.json'),JSON.stringify({status:'candidate',stateVersion:2,sourceHashes,notes:'Legal automated strategy fixtures. Pacing is under active tuning; these are not final acceptance evidence.'},null,2)+'\n');
    if(!matrix)for(const r of results)for(const [name,state]of Object.entries(r.snapshots))fs.writeFileSync(path.join(dir,r.strategy+'-'+name+'.json'),G.serialize(state)+'\n');
  }
}
module.exports={play,summary,policies};
