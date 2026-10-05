/* Browser shell: the engine owns every game rule; this file owns the instrument panel. */
(function () {
  'use strict';
  const G=Coherent,C=G.content,papers=Object.values(C.papers),KEY='coherent.v2',$=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num=(value,digits=0)=>Number.isFinite(value)?value.toLocaleString('en',{maximumFractionDigits:digits}):'—';
  const pct=(value,digits=2)=>Number.isFinite(value)?(value*100).toFixed(digits)+'%':'—';
  const signed=(value,digits=1)=>(value<0?'−':'+')+num(Math.abs(value),digits);
  const clock=value=>Math.floor(value/60).toString().padStart(2,'0')+':'+Math.floor(value%60).toString().padStart(2,'0');
  const has=id=>G.has(s,id),show=(id,yes)=>$(id).hidden=!yes;
  const write=(id,value)=>{if($(id).textContent!==String(value))$(id).textContent=value;};
  const rendered=new Map();
  const html=(id,value)=>{
    if(rendered.get(id)===value)return;
    const container=$(id),focused=container.contains(document.activeElement)?document.activeElement:null;
    const key=focused&&Object.entries(focused.dataset).find(([key])=>['focusKey','project','engineering','upgrade','paper','workload','runWorkload','stationTarget','objective','precisionRequest','orderEquipment','recipe','study','studyInspect','studyDetails'].includes(key));
    container.innerHTML=value;rendered.set(id,value);
    if(key){const [name,identity]=key,attribute=name.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),replacement=container.querySelector('[data-'+attribute+'="'+identity+'"]');(replacement&&!replacement.disabled?replacement:container.querySelector('button:not(:disabled)'))?.focus({preventScroll:true});}
  };
  let s=G.newGame(),view='lab',archive='history',experiment='signal',workload='dynamics',experimentChosen=false;
  let protectedSave=false,lastSave=0,lastSaveAttempt=0,savedAt='',lastResult='',taskFeedback='',lastEnding=false,audio=null,soundKit=null,soundWanted=false,soundReady=false,pendingSound=null,audioRequest=0,animation=0,noticeKind='',baselineRaw=null;
  try {const raw=localStorage.getItem(KEY);baselineRaw=localStorage.getItem('coherent.v1');show('baseline-notice',raw===null&&baselineRaw!==null);show('settings-baseline',baselineRaw!==null);if(raw!==null){s=G.parseSave(raw);write('save-status','Loaded local save');}}
  catch(error){protectedSave=true;write('save-status','Stored save unreadable');notice('Your stored save could not be loaded: '+error.message+' It is preserved. Import a valid save or explicitly start a new laboratory to replace it.');}
  lastEnding=s.ended;lastResult=JSON.stringify(s.result);taskFeedback=s.result?.task||s.result?.study?s.result.message:'';if(s.ended)view='ending';
  function clearTaskFeedback(){if(taskFeedback){taskFeedback='';write('experiment-feedback','');}}
  function notice(message,kind=''){noticeKind=kind;write('notice',message);show('notice',!!message);}
  function save(explicit=false) {
    lastSaveAttempt=performance.now();
    if(protectedSave){if(explicit)write('settings-feedback','The unreadable save is preserved. Export this temporary laboratory, import a valid save, or start a new one.');return false;}
    try {localStorage.setItem(KEY,G.serialize(s));lastSave=s.elapsed;savedAt=new Date().toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'});write('save-status','Saved locally · '+savedAt);if(noticeKind==='storage')notice('');if(explicit)write('settings-feedback','Saved locally at '+savedAt+'. No offline progress.');return true;}
    catch(error){write('save-status','Save unavailable');notice('Browser storage is unavailable. This laboratory is running in memory. Export your save to keep it.','storage');if(explicit)write('settings-feedback','Local save failed. Export JSON to preserve the current laboratory.');return false;}
  }
  function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function exportSave(){download(new Blob([G.serialize(s)],{type:'application/json'}),'coherent-'+clock(s.elapsed).replace(':','-')+'.json');write('settings-feedback','Save export requested. Your browser manages the download.');}
  function exportBaseline(){if(baselineRaw!==null){download(new Blob([baselineRaw],{type:'application/json'}),'coherent-earlier-campaign-v1.json');write('settings-feedback','Earlier campaign export requested. Its browser save remains preserved.');}}
  function setView(next){view=next;render();$('main').scrollIntoView({block:'start'});}
  function paperNotes(id) {
    const p=C.projects.find(item=>item.id===id),sources=p?p.papers.map(key=>papers.find(item=>item.id===key)):papers.filter(item=>item.id===id);
    write('paper-title',p?p.title:sources[0]?.title||'Primary source');
    html('paper-body',(p?'<p class="caption">In the game: '+esc(p.effect)+' Prices, timing, and numerical bonuses are educational abstractions. The sources support the concepts; they do not certify this laboratory.</p>':'')+sources.map(q=>'<article class="paper-entry"><h3>'+esc(q.title)+'</h3><p class="paper-meta">'+esc(q.authors)+'<br>'+esc(q.date)+' · '+esc(q.type)+'</p><div class="paper-section-label">What the source supports</div><p>'+esc(q.finding)+'</p>'+(q.game?'<div class="paper-section-label">What this game abstracts</div><p>'+esc(q.game)+'</p>':'')+'<div class="paper-links">'+q.links.map(link=>'<a href="'+esc(link.url)+'" target="_blank" rel="noopener noreferrer">'+esc(link.label)+' ↗</a>').join('')+'</div></article>').join(''));
    $('paper-dialog').showModal();
  }
  function tone(kind='click') {
    if(!s.sound||s.volume<=0||document.hidden)return;
    if(!soundReady||!audio||audio.state!=='running'){if(soundWanted)pendingSound=kind;return;}
    soundKit?.setVolume(s.volume);soundKit?.play(kind);
  }
  function cancelSounds(){audioRequest++;pendingSound=null;soundWanted=!!(soundReady&&s.sound&&audio?.state==='running');soundKit?.stop();}
  async function startSound(confirmation=false){
    const request=++audioRequest;soundWanted=true;soundReady=false;
    try {audio=audio||new (window.AudioContext||window.webkitAudioContext)();soundKit=soundKit||CoherentSound.create(audio);await audio.resume();if(request!==audioRequest||!soundWanted)return;if(audio.state!=='running')throw new Error('Audio context did not start');soundReady=true;soundKit.setVolume(s.volume);const cue=pendingSound||(confirmation?'enable':null);pendingSound=null;if(cue)tone(cue);}
    catch {if(request===audioRequest){notice('Sound could not start in this browser. The laboratory continues silently.');G.configure(s,'sound',false);soundWanted=false;pendingSound=null;soundKit?.stop();}}
    if(request===audioRequest){save();render();}
  }
  async function toggleSound(){
    if(s.sound||soundWanted){G.configure(s,'sound',false);cancelSounds();soundReady=false;soundKit?.setVolume(0);const request=audioRequest;try{if(audio)await audio.suspend();}catch{/* Sources are already stopped and the master is silent. */}if(request===audioRequest){save();render();}}
    else{G.configure(s,'sound',true);startSound(true);}
  }
  function unlockSound(event){
    if(!event.isTrusted||event.target.closest('#sound-toggle')||!s.sound||s.volume<=0||document.hidden||soundWanted&&(!soundReady||audio?.state==='running'))return;
    if(event.type==='pointerdown'&&event.button!==0||event.type==='keydown'&&!['Enter',' ','+','=','-','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
    startSound();
  }
  document.addEventListener('pointerdown',unlockSound,{capture:true});document.addEventListener('keydown',unlockSound,{capture:true});
  function act(action){
    const before=G.stage(s),focused=document.activeElement;
    if(action()){clearTaskFeedback();tone();afterChange(before);save();render();if(focused!==document.body&&(!focused.isConnected||focused.disabled)&&document.activeElement===document.body)(focused.dataset.assign?document.querySelector('[data-assign="'+focused.dataset.assign+'"]:not(:disabled)'):s.job?$('cancel-job'):$('discovery-list').querySelector('button:not(:disabled)'))?.focus({preventScroll:true});}
    else write('experiment-feedback','That action is not available under the current conditions. Check the visible requirements.');
  }
  function afterChange(before){
    const next=G.stage(s);
    if(next>before){experiment='';write('chapter-dialog-label','Chapter '+['I','II','III','IV','V','VI'][next]+' / '+C.chapters[next].name);write('chapter-dialog-title',C.chapters[next].transition);write('chapter-dialog-story',C.chapters[next].story);$('chapter-dialog').showModal();tone('chapter');}
    if(s.ended&&!lastEnding){lastEnding=true;view='ending';tone('chapter');$('main').scrollIntoView({block:'start'});}
  }
  const optionalDiscoveries=['factoring','grover','chemistry'];
  const isOptional=p=>p.optional||optionalDiscoveries.includes(p.id);
  function nextDiscovery(){const available=C.projects.filter(p=>!has(p.id)&&G.projectStatus(s,p.id).available);return available.find(p=>!isOptional(p))||(s.researchRevision===1?available.find(p=>C.projects.some(q=>q.historyYear&&!has(q.id)&&q.requires.includes(p.id))):null)||available[0];}
  function researchBlocker(p,m){return p.cost.effort>m.effortCap?'capacity':s.designs<(p.cost.designs||0)?'designs':s.funds<p.cost.funds?'funding':s.effort<p.cost.effort?'effort':'';}
  function qualifiedWorkOpportunity(next,phase){
    if(phase!==5||next?.id!=='audit'||G.projectStatus(s,next.id).ready||s.funds>=next.cost.funds)return null;
    return C.workloads.find(w=>['dynamics','molecule'].includes(w.id)&&G.workloadStatus(s,w.id).ready)||null;
  }
  function chooseExperiment(phase){
    const available=C.experiments.filter(e=>e.requires.every(has)&&e.chapter<=phase&&(e.chapter===phase||e.id==='memory'&&phase===4));
    const needed=C.projects.filter(p=>!has(p.id)&&p.requires.every(has)).map(p=>p.qualification).find(id=>id&&available.some(e=>e.id===id)&&!G.qualificationNow(s,id));
    if(!available.some(e=>e.id===experiment))experiment=needed||available.find(e=>!s.qualified.includes(e.id))?.id||available.at(-1)?.id||'';
    const options=available.map(e=>'<option value="'+e.id+'">'+esc(e.name)+(s.qualified.includes(e.id)?' · recorded':'')+'</option>').join('');
    html('experiment-select',options);$('experiment-select').value=experiment;
    return available;
  }
  function readouts(items){html('instrument-readouts',items.map(([label,value,note])=>'<div class="readout"><span class="readout-label">'+esc(label)+'</span><strong class="readout-value">'+esc(value)+'</strong><span class="readout-note">'+esc(note)+'</span></div>').join(''));}
  function renderReadouts(m,phase){
    const cases=[
      [['Known preparations',s.result?.id==='signal'?num(s.result.shots):'128 shots','Repeated trials; one qubit'],['Apparatus',m.active+' active','Installed '+m.installed+' · rack '+m.capacity],['First evidence',s.qualified.includes('signal')?'Recorded':'Awaiting signal','No unknown state readout']],
      [['Ramsey T₂*',s.qualified.includes('ramsey')?'18.4 μs':'Awaiting scan','Selected scenario, not a fitted trace'],['Echo T₂',s.qualified.includes('echo')?'42 μs':'Awaiting echo','T₁ scenario: 54 μs'],['RB estimate',s.qualified.includes('benchmark')?pct(m.rbError):'Awaiting RB','Illustrative characterization']],
      [['IID no-fault proxy',pct(m.noFault,1),'12 independent assumed events'],['Recorded trial estimate',s.tutorial?num(s.tutorial.energy,4):'Awaiting trial','H = ZZ + 0.6X₀ + 0.6X₁'],[s.tutorial?'Recorded trial bias':'Planned bias bound',num(s.tutorial?s.tutorial.bias:2.2*m.bias,4),'Separate from sampling uncertainty']],
      [['Effective noise p',pct(m.pEff,3),'Selected threshold: 1%'],['Memory error / cycle',m.pL===null?'Unqualified':m.pL.toExponential(2),'Conditional model; not certification'],['Decoder stream',num(m.syndromeRate)+' / μs','Capacity '+num(m.decoderRate)+' / μs']],
      [['Application slots',num(m.slots),'After routing, spare & factories'],['Feedback latency',num(m.feedback)+' μs','Streaming throughput is separate'],['Factory schedule',m.factoryOK?num(m.modelFactoryRate,3)+' / μs':'Unqualified','Fresh-state rate; fictional layout']],
      [['Application footprint',num(m.slots)+' slots','Ideal patch count: '+m.totalPatches],['Memory / gate error',m.pL===null?'Unqualified':m.pL.toExponential(1)+' / '+m.gateError.toExponential(1),'Per qubit-cycle / per operation'],['Factory output error',m.pT.toExponential(1),'Total accepted-state assumption']]
    ];
    readouts(cases[phase]);
    write('instrument-legend',['○ Physical qubit · ▪ Control port','Pulse · selected coherence traces','○ Coupled physical qubits','○ Data · ◇ check ancilla · amber event','Application · routing · factory · spare','Preparation · parallel work · readout'][phase]);
    write('instrument-mode',['Illustrative schematic','Selected model traces','Representative connectivity','One ideal rotated patch','Fictional allocation layout','Assumed recipe schedule'][phase]);
    $('machine').setAttribute('aria-label',C.chapters[phase].instrument+'. '+cases[phase].map(x=>x[0]+': '+x[1]+'. '+x[2]).join('. '));
    let warning='';
    if(phase>=3&&has('surface'))warning=!m.below?'Above the selected threshold. Raw qubit count cannot qualify this memory. Refine the control pulses.':m.slots<1?'No application patch fits this allocation. Reduce distance, free factory footprint, or expand chip and rack.':!m.decoderOK?'The decoder stream cannot keep up. Upgrade classical decoding or reduce the allocated footprint.':m.pL>.001?'The memory error model is too high. Trade code distance against footprint, or refine pulses.':phase>=4&&m.feedback>40?'Protected memory is available. Logical operations still need shorter feedback latency.':'';
    write('lab-warning',warning);show('lab-warning',!!warning);
    write('instrument-note',[
      'One qubit is a beginning. A qualified experiment is progress.',
      'Characterization makes uncertainty visible. Automatic calibration will retire the routine chore.',
      'The two-spin tutorial is computed classically. Its exact reference keeps the experiment honest.',
      'Check ancillas reveal error evidence, never the unknown data state. The logical fit remains conditional.',
      'Protection consumes footprint. Operations consume time. Factories must supply fresh resources.',
      'One complete budget: memory, gates, preparation, fresh states, feedback, repetitions, and time.'
    ][phase]);
    if(phase===4)write('instrument-note','Protection consumes footprint. Operations consume time. Current memory model: '+(m.pL===null?'unqualified':m.pL.toExponential(2)+' per qubit-cycle')+'. Factories require ≤1e−4, qualified operations, and fresh-state capacity.');
  }
  function renderStation(m,phase){
    if(!$('campus-station'))return;
    const camera=document.querySelector('[data-camera][aria-pressed=true]')?.dataset.camera||'overview',next=nextDiscovery();
    let title='A campus built around the next question',detail=next?'Next research: '+next.title+'. Funding, effort and engineering designs must all be ready.':'Inspect the apparatus and choose a measured question.',target=s.started?'discoveries-section':'run-experiment',label=s.started?'Visit the research desk':'Prepare the first signal',upgrade=null;
    if(camera==='research'){title='People turn evidence into plans';detail=m.freeTrust+' unassigned trust · '+num(m.effortCap)+' effort capacity · '+m.designBonus+'× design generation. Notebook space takes trust away from researchers.';target='economy-section';label='Allocate researchers and notebooks';}
    else if(['cryostat','processor'].includes(camera)){title='Installed hardware needs commissioned support';detail=num(m.installed)+' installed · '+num(m.capacity)+' supported · '+num(m.active)+' active. '+(m.installed>m.capacity?'Control and cooling limit the active footprint.':m.capacity>m.installed?'Installed hardware limits the active footprint.':'Chip and support footprints are balanced.');upgrade=m.installed>m.capacity?'rack':'hardware';target='engineering-section';label='Inspect expansion costs';}
    else if(camera==='control'){title=phase>=3?'Streaming capacity and feedback are separate':'Control makes an experiment repeatable';detail=phase>=3?num(m.syndromeRate)+' syndrome events / μs; decoder capacity '+num(m.decoderRate)+' / μs. Feedback takes '+num(m.feedback)+' μs. '+(m.decoderOK?'The streaming lane keeps up.':'The streaming lane is behind.'):'Effective noise '+pct(m.pEff,3)+' under the selected scenario. Pulse tooling changes this noise assumption; calibration controls drift.';upgrade=phase>=3?'decoder':'pulse';target='engineering-section';label='Inspect control engineering';}
    else if(camera==='memory'){title='Protection occupies real footprint';detail=num(m.totalPatches)+' ideal patches · '+num(m.reserved)+' reserved · '+num(m.slots)+' application slots at distance '+s.distance+'. '+(m.pL===null?'The declared memory model is unqualified.':'Conditional memory error '+m.pL.toExponential(2)+' / cycle.');target=has('surface')?'memory-controls':'discoveries-section';label=has('surface')?'Compare code distances':'Open the correction research';}
    else if(camera==='planning'){title='A schedule needs fresh resources';detail=has('ancilla')?s.factories+' allocated factories · '+num(m.modelFactoryRate,3)+' accepted states / μs under the selected model. Rehearsal credits are classical bookkeeping.':'The foundry is planned. Qualified memory, logical operations and fresh-state supply open its schedule.';target=phase===5?'workload-section':'discoveries-section';label=phase===5?'Compare complete workload budgets':'Visit the next research';}
    else if(camera==='fabrication'){title='The commissioning dock';detail=G.hasEngineering(s,'workshop')?s.workshops+' construction teams · '+num(m.fabricationRate,2)+' installed and '+num(m.integrationRate,2)+' supported positions / lab s. Active capacity needs both streams.':'Construction teams and delivery commitments open after the workshop engineering advance.';target=G.hasEngineering(s,'workshop')?'workshop-control':'engineering-section';label=G.hasEngineering(s,'workshop')?'Balance commissioning streams':'Inspect workshop engineering';}
    else if(camera==='service'){title='A gallery with two kinds of customer';detail=has('nisq')?num(m.delivered,2)+' known-preparation batches / lab s · '+num(m.revenue,2)+' funding / lab s. Customer work competes with analysis and explicit experiments.':'Known-preparation services open with the noisy processor. Precision work later needs fresh trial evidence.';target=has('nisq')?'service-control':'discoveries-section';label=has('nisq')?'Balance customer and analysis duty':'Visit the next research';}
    else if(camera==='warehouse'){title='Received stock still needs commissioning';detail=num(s.chipStock||0,1)+' chip assemblies · '+num(s.supportStock||0,1)+' control/cooling assemblies · '+(s.orders?.length||0)+' incoming orders. '+(s.paused||s.ended||!s.started?'Planned':'Current')+' funded prefab flow: '+num(m.prefabFabricationRate,2)+' chip + '+num(m.prefabIntegrationRate,2)+' support / lab s. Receipt is not installed capacity.';target=$('procurement-section').hidden?'next-title':'procurement-section';label=target==='next-title'?'Review the receiving-dock prerequisites':'Inspect deliveries and stock';}
    else if(camera==='operations'){title='The next constraint, in one room';detail=$('next-copy').textContent;target='next-title';label='Inspect the next action and budget';}
    if($(target)?.hidden){target='run-experiment';label='Return to the next experiment';}
    const u=upgrade&&G.upgradeInfo(s,upgrade),purchase=u?.available&&!u.max?'<button type="button" data-upgrade="'+upgrade+'" '+(!u.ready?'disabled':'')+'>'+esc(u.label)+' · '+num(u.cost)+' funding · '+num(u.designs)+' designs ↗</button>':'';
    const readings=camera==='control'?[['Q37','2026 · feedback'],['Q41','Accuracy and throughput']]:camera==='cryostat'?[['Q38','2026 · adaptive control']]:camera==='planning'?[['Q40','Cultivation evidence'],['Q43','2026 · state readiness']]:camera==='memory'?[['Q42','2026 · connectivity']]:[];
    html('campus-station','<div><span class="eyebrow">Selected facility</span><h3>'+esc(title)+'</h3><p>'+esc(detail)+'</p><div class="station-reading">'+readings.filter(([id])=>C.papers[id]).map(([id,label])=>'<button type="button" data-paper="'+id+'">'+esc(label)+' ↗</button>').join('')+'</div></div><div class="station-actions">'+purchase+'<button type="button" data-station-target="'+target+'">'+esc(label)+' →</button></div>');
  }
  function renderInspector(){
    const host=$('three-lab'),panel=$('three-inspector');
    if(!panel||!window.CoherentInspector)return;
    const component=host?.dataset.component,type=component?.split(':')[0],data=component&&CoherentInspector.describe(s,type);
    if(!data||view!=='lab'){panel.hidden=true;return;}
    panel.hidden=false;
    write('three-inspector-title',host.dataset.componentName||data.title);
    write('three-inspector-kind',data.title);
    const requested=$(data.target),target=requested&&!requested.closest('[hidden]')?data.target:'next-title';
    const q=data.quote;
    html('three-inspector-body','<p id="inspector-purpose"></p><p class="caption" id="inspector-cohort"></p><dl class="inspector-readouts">'+data.readouts.map((_,i)=>'<div><dt id="inspector-label-'+i+'"></dt><dd id="inspector-value-'+i+'"></dd><small id="inspector-note-'+i+'"></small></div>').join('')+'</dl><div class="inspector-constraint"><span class="eyebrow">Current constraint</span><p id="inspector-constraint"></p></div><div class="inspector-captured"><span class="eyebrow">Captured apparatus job</span><p id="inspector-job"></p></div>'+(q?'<details class="inspector-preview"><summary data-focus-key="inspector-preview">Preview this investment</summary><p id="inspector-preview-detail"></p><dl>'+q.comparisons.map((_,i)=>'<div><dt id="inspector-preview-label-'+i+'"></dt><dd id="inspector-preview-value-'+i+'"></dd></div>').join('')+'</dl><p class="caption">The available purchase preview includes its quoted funding and design costs under the current allocation and job. Previewing spends nothing; purchasing uses the ordinary engine rules.</p></details><p class="limiter" id="inspector-quote-reasons"></p><button type="button" class="inspector-buy" data-upgrade="'+q.id+'" id="inspector-buy"></button>':'')+'<button type="button" data-help-open="instrument" class="inspector-controls">Help with this instrument →</button><button type="button" class="inspector-controls" data-station-target="'+target+'">'+esc(target===data.target?data.action:'Review the next action and prerequisites')+' →</button><div class="inspector-papers">'+data.papers.filter(id=>C.papers[id]).map(id=>'<button type="button" class="paper-notes" data-paper="'+id+'">'+esc(C.papers[id].title)+' ↗</button>').join('')+'</div>');
    write('inspector-purpose',data.purpose);write('inspector-cohort',data.cohort);
    data.readouts.forEach((r,i)=>{write('inspector-label-'+i,r.label);write('inspector-value-'+i,r.value);write('inspector-note-'+i,r.note);});
    write('inspector-constraint',type==='operations-console'?$('next-copy').textContent:data.constraint);
    const j=data.job;
    write('inspector-job',j?data.workflow.label+(j.workload?' · captured '+j.recipe+' recipe':j.id==='calibrate'?' · maintenance reservation':' · '+num(j.shots)+' captured shots'+(j.id==='vqe'?' / group · θ '+num(j.theta)+'°'+(j.mitigate?' · mitigation enabled':''):''))+(j.study?' · paid dated study':''):'No active apparatus job. Choose a measured question using the ordinary controls.');
    if(q){
      write('inspector-preview-detail',q.detail);
      q.comparisons.forEach((r,i)=>{write('inspector-preview-label-'+i,r.label);write('inspector-preview-value-'+i,r.before+(r.after===null?' · purchase unavailable': ' → '+r.after));});
      write('inspector-quote-reasons',q.reasons.join(' · ')+(s.ended?' · Continue the laboratory before purchasing.':''));
      write('inspector-buy',q.max?'At capacity':q.label+' · '+num(q.cost)+' funding · '+num(q.designs)+' designs');
      $('inspector-buy').disabled=!q.ready;
    }
    const w=data.workflow;
    html('three-inspector-workflow','<div class="inspector-flow-heading"><span class="eyebrow">Follow the experiment</span><span id="inspector-flow-label"></span></div><progress id="inspector-flow-progress" max="1" aria-label="Overall apparatus job progress"></progress><ol class="inspector-flow-list">'+w.stages.map((step,i)=>'<li id="inspector-flow-'+i+'"><span>'+esc(step.label)+'</span></li>').join('')+'</ol><p class="caption" id="inspector-flow-note"></p>');
    write('inspector-flow-label',w.label);write('inspector-flow-note',w.note);$('inspector-flow-progress').value=w.progress;
    w.stages.forEach((_,i)=>{$('inspector-flow-'+i).dataset.current=String(i===w.index);$('inspector-flow-'+i).setAttribute('aria-current',i===w.index?'step':'false');});
  }
  function frontierCard(item,status,request){
    const p=status.prediction,r=status.recipe,receipt=status.receipt,key=request?'precision-request':'objective';
    const title=item.title||item.name,ground=item.angle===null,reference=ground?'ground-state reference':'exact reference at the recorded angle';
    const prediction=p?'This trial: sampling ±'+num(p.bound,4)+' · residual bias ≤'+num(p.bias,4)+(ground?' · exact ansatz error '+num(p.ansatz,4):'')+'.':'';
    const reward=request?num(item.payout)+' funding':costLabel(item.reward)+' · +1 trust';
    return '<article class="frontier-card '+(status.complete?'frontier-complete':'')+'"><div class="frontier-card-top"><span class="eyebrow">'+(request?'Fresh customer request':'Classical two-spin tutorial')+'</span><span class="mono">'+(status.complete?'Recorded':ground?'Tune θ':item.angle+'° ±1°')+'</span></div><h4>'+esc(title)+'</h4><p>'+esc(item.description||('Compare with the '+reference+'.'))+'</p><div class="frontier-target">Total criterion '+num(item.tolerance,3)+' · '+esc(reference)+(item.maxBias?' · bias ≤'+num(item.maxBias,3):'')+'</div><p class="caption">'+esc(prediction)+'</p><div class="frontier-quote">'+(r?num(r.cost)+' funding · '+num(r.seconds,1)+' apparatus s<br>'+num(r.actualAcquisitions)+' actual samples · '+num(r.modeledAcquisitions)+' modeled acquisitions':'')+'</div><div class="frontier-reward">'+(request?'Qualified delivery pays ':'First success earns ')+esc(reward)+'</div><div class="frontier-actions"><button type="button" data-'+key+'="'+item.id+'" '+(!status.ready?'disabled':'')+'>'+(status.complete?'Completed':s.job?.[request?'request':'objective']===item.id?'Trial running':'Run a fresh trial')+' →</button><button type="button" class="text-button" data-focus-key="'+key+'-'+item.id+'-tune" data-station-target="noisy-controls">Tune angle & acquisitions ↗</button></div><p class="limiter">'+esc(status.reasons.join(' · '))+'</p>'+(receipt?'<p class="caption">Accepted at '+clock(receipt.time)+' laboratory time.</p>':'')+'</article>';
  }
  function renderCampus(m){
    if(!G.campusStatus)return;
    const campus=G.campusStatus(s),enabled=campus.enabled;
    show('campus-notice',!enabled&&['lab','ending'].includes(view));$('enter-campus').disabled=!campus.ready;write('campus-entry-reason',campus.reasons.join(' · '));
    show('frontier-section',enabled&&has('vqe'));
    if(enabled&&has('vqe')){
      const goals=C.objectives.map(item=>({item,status:G.objectiveStatus(s,item.id)})),requests=C.precisionRequests.map(item=>({item,status:G.precisionStatus(s,item.id)}));
      write('frontier-count',s.objectiveResults.length+' / '+C.objectives.length+' goals · '+s.precisionResults.length+' / '+C.precisionRequests.length+' requests');
      html('objective-list',goals.filter(x=>x.status.available&&!x.status.complete).map(x=>frontierCard(x.item,x.status,false)).join('')||'<p class="quiet-message">The current frontier is recorded. New research opens the next question.</p>');
      show('precision-desk',has('classical'));
      $('frontier-section').classList.toggle('has-precision',has('classical'));
      html('precision-list',requests.filter(x=>x.status.available&&!x.status.complete).map(x=>frontierCard(x.item,x.status,true)).join('')||'<p class="quiet-message">Every available request is delivered. The known-preparation service desk can keep earning funding.</p>');
      const receipts=[...goals,...requests].filter(x=>x.status.complete);
      html('frontier-receipts',receipts.map(({item,status})=>{const r=status.receipt,t=r.result;return '<article class="frontier-receipt"><strong>'+esc(item.title||item.name)+'</strong><span>'+clock(r.time)+' · θ '+t.theta+'° · '+num(t.shots)+' samples</span><p>Estimate '+num(t.energy,4)+' · per-trial bound ±'+num(t.statistical,4)+' · bias ≤'+num(t.bias,4)+'. Reward recorded once.</p></article>';}).join('')||'<p class="quiet-message">Fresh successful trials will leave a receipt here.</p>');
    }
    show('procurement-section',enabled&&has('classical'));
    if(enabled&&has('classical')){
      write('procurement-summary',s.orders.length+' / 2 scheduled deliveries');
      html('procurement-stock',[['chip',s.chipStock,'Chip assemblies'],['support',s.supportStock,'Control & cooling assemblies']].map(([kind,stock,title])=>'<div><span class="eyebrow">Received · awaiting commissioning</span><strong>'+num(stock,1)+'</strong><p>'+title+'</p></div>').join('')+'<p class="caption">'+(G.hasEngineering(s,'workshop')?'Both commissioning streams share the funded construction allocation.':'Implement workshop engineering and assign a construction team to commission received equipment.')+' Prefab commissioning runs at 2× the in-house rate: 0.4 funding per unit versus 0.8 in-house. In-house work resumes when stock runs out.</p><p class="caption">Current funded flow / lab s: chip '+num(m.prefabFabricationRate,2)+' prefab + '+num(m.inhouseFabricationRate,2)+' in-house; support '+num(m.prefabIntegrationRate,2)+' prefab + '+num(m.inhouseIntegrationRate,2)+' in-house.</p>');
      html('procurement-offers',C.procurementOffers.map(offer=>'<article class="procurement-offer"><span class="eyebrow">'+esc(offer.title||offer.name)+'</span><h3>'+num(offer.units)+' unit equivalents</h3><p>'+num(offer.seconds)+' lab s lead · '+num(offer.cost)+' funding · '+num(offer.designs)+' designs</p><div>'+['chip','support'].map(kind=>{const status=G.procurementStatus(s,offer.id,kind);return '<button type="button" data-order-equipment="'+offer.id+'-'+kind+'" data-offer="'+offer.id+'" data-kind="'+kind+'" '+(!status.ready?'disabled':'')+'>Order '+(kind==='chip'?'chip':'support')+' assemblies →</button><p class="limiter">'+esc(status.reasons.join(' · '))+'</p>';}).join('')+'</div><small>Final quote · no cancellation · capacity after commissioning</small></article>').join(''));
      html('procurement-orders',s.orders.map(order=>{const offer=C.procurementOffers.find(o=>o.id===order.offer);return '<article class="procurement-order"><div><strong>'+esc(offer.title||offer.name)+' / '+(order.kind==='chip'?'chip':'support')+'</strong><span class="mono">'+num(order.remaining,1)+' lab s to receipt</span></div><progress max="'+offer.seconds+'" value="'+(offer.seconds-order.remaining)+'" aria-label="'+esc((offer.title||offer.name)+' '+order.kind+' delivery progress')+'"></progress><p class="caption">'+num(offer.units)+' uncommissioned units arrive at the dock.'+(s.paused?' Delivery clock is paused.':'')+'</p></article>';}).join('')||'<p class="quiet-message">No delivery commitments. Keep cash flexible or reserve a quote above.</p>');
    }
    show('continue-lab',enabled&&s.ended);$('continue-lab').disabled=!s.ended;
    show('controller-profile-control',enabled&&has('controller2026'));
    if(enabled&&has('controller2026')){
      $('controller-profile').value=s.controllerProfile;$('controller-profile').disabled=m.atomic||s.ended;
      write('controller-profile-summary','Selected '+s.controllerProfile+' scenario: '+num(m.decoderRate)+' / μs throughput; '+num(m.feedback)+' μs feedback. These authored presets do not change physical noise or decoding accuracy.');
      html('controller-profile-comparison','<dl class="controller-comparison">'+['balanced','streaming','response'].map(profile=>{const preview=G.metrics({...s,controllerProfile:profile});return '<div><dt>'+esc(profile)+'</dt><dd>'+num(preview.decoderRate)+' / μs · '+num(preview.feedback)+' μs</dd></div>';}).join('')+'</dl>');
    }
  }
  function studyControls(p){
    if(!p.study)return '';
    const status=G.studyStatus(s,p.id),receipt=status.receipt;
    const recipe=receipt?G.experimentRecipe({...s,...receipt.context,...(receipt.tutorial?{theta:receipt.tutorial.theta,mitigate:receipt.tutorial.mitigate,shots:Math.round(Math.log(receipt.tutorial.shots/(3*1024))/Math.log(4))}:{})},p.study.experiment):status.recipe;
    const captured=receipt?G.metrics({...s,...receipt.context,job:null}):null;
    const evidence=receipt?'Fresh study qualified at '+clock(receipt.time)+'. '+(p.study.kind==='memory-latency'?'Captured feedback '+num(captured.feedback,1)+' μs; the authored 20 μs comparison '+(receipt.stricterFeedbackReady?'passes':'fails')+'. Memory qualified with no factories; credits are planning records.':p.study.kind==='ansatz-budget'?'Ansatz error '+num(receipt.tutorial.ansatzError,4)+'; sampling bound '+num(receipt.tutorial.statistical,4)+'. The deliberately poor preparation does not qualify the ground energy.':p.study.kind==='decoder-budget'?'Captured stream '+num(captured.syndromeRate)+' / μs versus '+num(captured.decoderRate)+' / μs capacity; feedback '+num(captured.feedback,1)+' μs. No decoding-accuracy change.':'A dated study receipt is retained. This is an authored educational scenario, not a reproduction of the paper.') : '';
    return '<div class="history-study" data-study-details="'+p.id+'" tabindex="-1"><span class="eyebrow">Fresh evidence / '+p.historyYear+'</span><p>'+esc(p.study.criterion)+'</p><p class="caption">'+(recipe?(receipt?'Recorded entry: ':'New entry: ')+num(recipe.cost)+' funding · '+num(recipe.modeledShots)+' modeled acquisitions · '+num(recipe.seconds,1)+' apparatus s. ':'')+'Study entry is separate from the research purchase. Cancelled or failed studies keep their spent costs.</p>'+(receipt?'<p class="history-evidence">'+esc(evidence)+'</p>':'<button type="button" data-study-inspect="'+p.id+'" '+(!status.available?'disabled':'')+'>Adjust study controls</button><button type="button" data-study="'+p.id+'" '+(!status.ready||s.paused||s.ended?'disabled':'')+'>Run the dated study</button><p class="limiter">'+esc(status.reasons.join(' · '))+'</p>')+'</div>';
  }
  function discoveryCard(p){
    const q=papers.find(q=>q.id===p.papers[0]),status=G.projectStatus(s,p.id);
    return '<article class="discovery"><div class="discovery-top"><div class="paper-year">'+esc(q.date)+' / '+esc(q.authors.split(';')[0])+'</div>'+diagram(p.chapter)+'</div><h3>'+esc(p.title)+'</h3><p>'+esc(p.effect)+'</p>'+studyControls(p)+'<div class="discovery-cost">'+costLabel(p.cost)+'</div><button type="button" data-project="'+p.id+'" '+(!status.ready?'disabled':'')+'><span>Research discovery</span><span aria-hidden="true">→</span></button><div class="limiter">'+esc(status.reasons.join(' · '))+'</div><button type="button" class="paper-notes" data-paper="'+p.id+'">Read the primary '+(p.papers.length>1?'papers':'paper')+' ↗</button></article>';
  }
  function costLabel(cost){return [['funds','funding'],['effort','effort'],['designs','designs']].filter(([key])=>cost[key]>0).map(([key,label])=>num(cost[key])+' '+label).join(' · ');}
  function engineeringCard(e,archiveOnly=false){
    const status=G.engineeringStatus(s,e.id),owned=G.hasEngineering(s,e.id),other=e.group&&C.engineering.find(item=>item.group===e.group&&item.id!==e.id),closed=other&&G.hasEngineering(s,other.id);
    const prerequisites=[...e.requires.map(id=>C.projects.find(p=>p.id===id)?.title||id),...e.engineeringRequires.map(id=>C.engineering.find(p=>p.id===id)?.title||id)];
    return '<article class="engineering-card '+(owned?'chosen':closed?'closed':'')+'"><div class="engineering-kind">'+(owned?'Implemented':closed?'Path closed':e.group?'Choose '+(e.group==='rollout'?'a rollout':'a laboratory policy'):'Classical engineering')+'</div><h3>'+esc(e.title)+'</h3><p>'+esc(e.effect)+'</p>'+(other?'<div class="choice-outcome">'+esc(owned?'You chose this path. '+other.title+' is closed.':closed?'You chose “'+other.title+'”. This path is closed.':'Permanent choice: closes “'+other.title+'”.')+'</div>':'')+'<div class="engineering-prerequisites">Requires '+esc(prerequisites.join(' · '))+'</div>'+(archiveOnly?'<span class="archive-status">'+(owned?'Implemented':closed?'Excluded by your choice':'Game assumptions; no paper result')+'</span>':'<div class="discovery-cost">'+costLabel(e.cost)+'</div><button type="button" data-engineering="'+e.id+'" '+(!status.ready?'disabled':'')+'><span>'+(owned?'Implemented':closed?'Other path chosen':e.group?'Choose this path':'Implement engineering')+'</span><span aria-hidden="true">'+(owned?'✓':closed?'—':'→')+'</span></button><div class="limiter">'+esc(owned||closed?'':status.reasons.join(' · '))+'</div>')+'</article>';
  }
  function diagram(chapter){
    const drawings=[
      '<path d="M3 20h18m0-8v16m5-16v16m0-8h9m0-8v16m5-16v16m0-8h17"/>',
      '<path d="M2 20h9l3-10 5 20 5-20 5 20 5-20 5 20 5-20 3 10h11"/>',
      '<path d="M15 11h30M15 29h30M15 11v18M45 11v18"/><circle cx="15" cy="11" r="4"/><circle cx="45" cy="11" r="4"/><circle cx="15" cy="29" r="4"/><circle cx="45" cy="29" r="4"/>',
      '<path d="M15 10h30M15 20h30M15 30h30M15 10v20M30 10v20M45 10v20"/><path class="copper-stroke" d="M20 12h5v5h-5zM35 12h5v5h-5zM20 22h5v5h-5zM35 22h5v5h-5z"/>',
      '<path d="M9 7h10v10H9zM25 7h10v10H25zM9 23h10v10H9zM25 23h10v10H25z"/><path class="copper-stroke" d="M41 7h10v10H41zM41 23h10v10H41z"/>',
      '<path d="M4 9h44M4 20h25M4 31h38"/><path class="copper-stroke" d="M32 20h23"/>'
    ];
    return '<svg class="discovery-diagram" viewBox="0 0 60 40" aria-hidden="true" fill="none">'+drawings[chapter]+'</svg>';
  }
  function renderResearch(){
    const query=$('paper-search').value.trim().toLowerCase();
    const activeStudy=s.job?.study?C.projects.find(p=>p.id===s.job.study):null;
    show('research-study-progress',!!activeStudy);show('research-study-running',!!activeStudy||!!s.result?.study);show('research-cancel-study',!!activeStudy);
    if(activeStudy){$('research-study-progress').value=s.job.progress/s.job.duration;write('research-study-running',(s.paused?'Paused: ':'Running: ')+activeStudy.title+' · '+pct(s.job.progress/s.job.duration,0));}
    else if(s.result?.study)write('research-study-running','Last study: '+C.projects.find(p=>p.id===s.result.study.id).title+' · '+s.result.message);
    const paperCollection=archive==='papers'||archive==='frontier',year=p=>Math.max(...(p.date.match(/\d{4}/g)||[0]).map(Number));
    const timelineYear=p=>p.historyYear||(['controller2026','adaptive2026','state-readiness'].includes(p.id)?2026:Math.min(...(C.papers[p.papers[0]].date.match(/\d{4}/g)||[0]).map(Number)));
    const items=archive==='history'?[...C.projects].sort((a,b)=>timelineYear(a)-timelineYear(b)):archive==='frontier'?papers.filter(p=>year(p)>=2024).sort((a,b)=>year(b)-year(a)):archive==='papers'?papers:archive==='engineering'?C.engineering:C.projects;
    write('archive-source-count','The archive / '+papers.length+' academic sources');
    const research=G.researchStatus(s);
    show('research-programme',archive==='history');
    write('research-programme-copy',research.enabled?research.purchased+' / '+research.total+' dated discoveries purchased · '+research.completed+' fresh studies qualified. New campaigns require all eleven before the gift ending.':'This save preserves its original campaign and earned ending. Join the dated research programme while the apparatus is idle; a completed laboratory must first Continue from its gift ending.');
    show('enter-research',!research.enabled&&!s.ended);$('enter-research').disabled=!research.ready;
    show('research-return-ending',!!s.endingRecord);write('research-return-ending',s.ended?'Return to the recorded ending to continue':'View recorded completion');
    write('research-programme-reasons',research.enabled?'Study targets and costs are authored game choices; the papers do not certify this laboratory.':research.reasons.join(' · '));
    html('archive-list',items.filter(p=>JSON.stringify(p).toLowerCase().includes(query)).map(p=>{
      if(archive==='engineering')return engineeringCard(p,true);
      const q=paperCollection?p:papers.find(q=>q.id===p.papers[0]);
      if(archive==='history'){
        const status=G.projectStatus(s,p.id);
        return '<article class="archive-row history-row" data-history-year="'+timelineYear(p)+'"><span class="year">'+timelineYear(p)+'</span><div><h3>'+esc(p.title)+'</h3><p>'+esc(p.effect)+'</p><p class="caption">Cited-source year or declared publication landmark; supporting sources can have other dates.</p>'+studyControls(p)+'<div class="discovery-cost">'+costLabel(p.cost)+'</div><span class="archive-status">'+(has(p.id)?'Discovered':status.available?'Prerequisites complete':'Complete the prerequisite discoveries')+'</span><p class="limiter">'+esc(status.reasons.join(' · '))+'</p></div><div class="history-actions"><button type="button" data-paper="'+p.id+'">Read academic sources ↗</button><button type="button" data-project="'+p.id+'" '+(!status.ready?'disabled':'')+'>'+(has(p.id)?'Discovered':'Research discovery')+'</button></div></article>';
      }
      return '<article class="archive-row"><span class="year">'+esc(paperCollection?year(q):p.historyYear||Math.max(...p.papers.map(id=>year(C.papers[id]))))+'</span><div>'+(archive==='discoveries'?'<span class="archive-mark">'+diagram(p.chapter)+'</span>':'')+'<h3>'+esc(p.title)+'</h3><p>'+esc(paperCollection?q.authors+' · '+q.type:p.effect)+'</p>'+(paperCollection?'<p class="archive-date">'+esc(q.date)+'</p>':'')+'<span class="archive-status">'+(paperCollection?esc(q.id+' / primary source'):has(p.id)?'Discovered':'Available to read before discovery')+'</span></div><button type="button" data-paper="'+p.id+'">Read '+(paperCollection?'source':'papers')+' ↗</button></article>';
    }).join('')||'<p class="quiet-message">No matching source. Try a title, author, or topic.</p>');
    document.querySelectorAll('[data-archive]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.archive===archive)));
    $('archive-list').classList.toggle('engineering-archive',archive==='engineering');
  }
  function budgetStat(label,value,note){return '<div class="budget-stat"><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong><small>'+esc(note)+'</small></div>';}
  const riskTerm=value=>Number.isFinite(value)?value>0&&value<.001?value.toExponential(1):num(value,3):'—';
  function renderWorkload(){
    const base=C.workloads.find(item=>item.id===workload);
    const active=s.job?.workload&&s.job.id===workload,w=G.workloadRecipe?G.workloadRecipe(s,workload,active?s.job.recipe:s.logicalRecipe):C.workloads.find(w=>w.id===workload),b=active?G.liveWorkloadStatus(s,w.id):G.workloadStatus(s,w.id),m=G.metrics(s);
    html('recipe-controls',workload==='dynamics'&&s.campusRevision===1?'<div><span class="eyebrow">The same 32-site Ising task</span><h3>Choose the space–time plan.</h3><p>Authored resource scenarios. Extra workspace and fresh states count toward the complete budget.</p></div><div class="recipe-options">'+(has('state-readiness')?C.dynamicsRecipes.map(recipe=>'<button type="button" data-recipe="'+recipe.id+'" aria-pressed="'+(recipe.id===w.recipe)+'" '+(s.ended||s.job?.workload?'disabled':'')+'><strong>'+esc(recipe.title||recipe.name)+'</strong><span>'+recipe.width+' application registers · depth '+recipe.depth+' · '+recipe.magic+' fresh states</span></button>').join(''):'<button type="button" data-paper="state-readiness">2026 research: state readiness opens alternative plans ↗</button>')+'</div>':'');
    html('workload-list',C.workloads.map(w=>{const ready=G.workloadStatus(s,w.id).ready;return '<button type="button" class="workload-option" data-workload="'+w.id+'" aria-pressed="'+(w.id===workload)+'"><span><span class="eyebrow">'+esc(w.tag)+'</span><strong>'+esc(w.name)+'</strong></span><span class="workload-state">'+(s.completed.includes(w.id)?'Complete':ready?'Qualified':'Inspect budget')+'</span></button>';}).join(''));
    const colors=['var(--teal)','var(--copper)','var(--warning)','var(--muted)','var(--ink)'],entries=Object.entries(b.parts),total=entries.reduce((a,[,v])=>a+(Number.isFinite(v)?v:1),0);
    html('budget-panel','<div class="budget-top"><div><span class="eyebrow">'+esc(w.tag)+'</span><h3>'+esc(base.name)+'</h3>'+(w.id==='dynamics'?'<p class="caption">'+(s.completed.includes(w.id)?'Recorded completion: '+esc(C.dynamicsRecipes.find(recipe=>recipe.id===(s.completedRecipes[w.id]||'balanced')).name)+'. Current planning preview: ':'Selected plan: ')+esc(w.name)+'.</p>':'')+'<p>'+esc(w.description)+'</p></div></div><div class="budget-stats">'+budgetStat('Required / available application slots',w.width+' / '+m.slots,(w.dataWidth||w.width)+' data + '+(w.workspace||0)+' workspace · '+num(m.totalPatches)+' patches · '+num(m.reserved)+' reserved')+budgetStat('Total conditional risk',pct(b.risk),'Recipe ceiling '+pct(w.maxRisk,0))+budgetStat('Full modeled time',num(b.runtime)+' μs',w.repetitions+' execution(s); ceiling '+num(w.maxTime)+' μs')+budgetStat('Fresh states / rehearsal credits',num(b.credits),num(w.fee)+' funding · '+w.seconds+' apparatus s')+'</div><div class="budget-bar" aria-hidden="true">'+entries.map(([,v],i)=>'<span style="width:'+((Number.isFinite(v)?v:1)/Math.max(total,.00001)*100)+'%;background:'+colors[i]+'"></span>').join('')+'</div><div class="budget-legend">'+entries.map(([key,v],i)=>'<span><i style="background:'+colors[i]+'"></i>'+esc(key)+' '+riskTerm(v)+'</span>').join('')+'</div><p class="budget-caption">Uncapped additive risk terms cover all repetitions; 1.00 corresponds to 100%. Total risk is capped at 100%.</p><p class="budget-caption">Assumed recipe precision: '+w.precision+'; target '+w.target+'. Gate schedule '+num(b.gateTime)+' μs; fresh-state supply '+num(b.factoryTime)+' μs; feedback '+num(b.feedbackTime)+' μs. Parallel lanes overlap; waiting increases memory exposure.</p><p class="budget-reasons">'+esc(s.completed.includes(w.id)?'This workload is complete. Rewards are awarded once.':s.job?.workload&&s.job.id===w.id?'Schedule running. Engineering conditions remain checked.':b.reasons.join(' · ')||'Every declared condition qualifies under the selected model.')+'</p><div class="budget-actions"><button type="button" class="primary-button" data-run-workload="'+w.id+'" '+(!b.ready||s.job||s.paused||s.ended?'disabled':'')+'><span>'+(s.completed.includes(w.id)?'Scenario completed':'Run the full schedule')+'</span><span aria-hidden="true">→</span></button></div><p class="budget-caption">'+num(w.payout)+' funding grant on first completion. The '+num(w.fee)+' funding fee and '+num(b.credits)+' rehearsal credits are spent when the schedule starts. Customer services, bench automation, and commissioning pause for its '+w.seconds+' apparatus seconds; calibration reduces the available duty.</p><p class="budget-caption">'+esc(w.validation)+'</p>');
  }
  function renderMeasurement(){
    const r=s.result,t=s.tutorial;
    show('measurement-panel',!!r);
    let title='Experiment notebook',context='Educational scenario',caption=r?.message||'Tune the angle, inspect the exact landscape, then test the estimate.';
    if(r?.id==='signal'||r?.id==='circuit'){title='Repeated known preparations';context=num(r.shots)+' sampled shots';caption+=' Counts do not reveal an arbitrary unknown state.';}
    if(r?.id==='vqe'&&t){
      const task=r.task,item=task&&(task.precision?C.precisionRequests:C.objectives).find(item=>item.id===task.id);
      title=item?.name||'The two-spin energy';context='Exact classical reference: '+num(task?.reference??t.reference,4);
      caption='Estimate '+num(t.energy,4)+' · this trial’s 95% simultaneous sampling bound ±'+num(t.statistical,4)+' · standard error '+num(t.se,4)+' · residual bias ≤'+num(t.bias,4)+(task?.angle!==null&&task?' · recorded known angle '+t.theta+'°':' · exact ansatz error '+num(t.ansatzError,4))+'. '+num(t.shots)+' actual samples; '+num(t.modeledShots)+' modeled acquisitions. '+(task?(task.passed?'This trial qualifies; its reward is recorded once.':'This trial fails the declared '+num(task.tolerance,3)+' total criterion. Acquisition costs remain spent.'):(t.qualified?'Ground-reference tutorial qualified.':'Tune θ, shots, or mitigation to meet the 0.12 ground-reference criterion.'));
    }
    if(r?.id==='memory'){title='Detection-event rehearsal';context='100 illustrative trials / check';}
    if(r?.study){
      const project=C.projects.find(p=>p.id===r.study.id),receipt=G.studyStatus(s,project.id).receipt;
      title=(r.study.passed?'Study qualified / ':'Study failed / ')+project.historyYear;
      context='Authored '+project.study.experiment+' study; historical paper not reproduced';
      if(r.id==='vqe')caption=r.message+' Estimate '+num(t.energy,4)+'; sampling bound ±'+num(t.statistical,4)+'; residual bias ≤'+num(t.bias,4)+'; ansatz error '+num(t.ansatzError,4)+'. '+(project.study.kind==='ansatz-budget'?'This intentionally poor preparation was measured precisely. Its study can pass while the ground-energy tutorial remains unqualified; no barren-plateau training was simulated.':t.qualified?'The separate ground-reference criterion also passes.':'The separate ground-reference criterion does not pass.');
      else caption=r.message+' '+project.study.criterion+' The rehearsal uses the game’s conditional model, not the historical hardware or an unknown-state readout.';
      if(receipt?.stricterFeedbackReady!==undefined){const m=G.metrics({...s,...receipt.context,job:null});caption+=' Captured feedback '+num(m.feedback,1)+' μs: the authored 20 μs comparison '+(receipt.stricterFeedbackReady?'passes':'fails')+'. Memory qualified with zero allocated factories; credits are planning records, not stored states.';}
    }
    write('measurement-title',title);write('measurement-context',context);write('measurement-caption',caption);
    $('measurement').setAttribute('aria-label',title+'. '+caption);
  }
  function renderEconomy(m){
    show('economy-section',has('feynman'));show('service-control',has('nisq'));show('workshop-control',G.hasEngineering(s,'workshop'));
    $('economy-section').classList.toggle('has-services',has('nisq'));
    write('economy-summary',s.ended?'Laboratory complete. The final allocation is recorded.':s.paused?'Laboratory paused. Rates show the current plan.':'Grants '+num(m.grants,2)+' · upkeep '+num(m.upkeep,2)+' funding / lab s');
    write('trust-readout',m.freeTrust+' free / '+m.trust+' trust');write('staff-count',s.staff);write('notebook-count',s.notebooks);
    const smallerCap=s.notebooks>1?G.metrics({...s,notebooks:s.notebooks-1}).effortCap:0,storedBeyondSmaller=s.notebooks>1&&s.effort>smallerCap;
    document.querySelectorAll('[data-assign]').forEach(b=>{const key=b.dataset.assign,adding=Number(b.dataset.delta)>0;b.disabled=s.ended||!has('feynman')||(adding?m.freeTrust<1||s[key]>=(key==='staff'?G.MAX_STAFF:64):s[key]<=(key==='staff'?0:1)||key==='notebooks'&&storedBeyondSmaller);});
    write('notes-bank-value',num(Math.floor(s.effort))+' / '+num(m.effortCap));$('notes-meter').max=m.effortCap;$('notes-meter').value=s.effort;
    write('design-bonus',m.designBonus+'× designs');$('design-bonus').classList.toggle('bank-full',m.fullBank);
    write('design-bonus-note',!has('deutsch')?'Design work opens with the circuit notebook.':m.fullBank?'Full bank: fourfold design generation.':'Fill this bank for 4× design generation.');
    const next=nextDiscovery(),capacityNeeds=[next,...C.engineering.filter(e=>G.engineeringStatus(s,e.id).available)].filter(p=>p&&p.cost.effort>m.effortCap);
    write('notebook-warning',(capacityNeeds.length?'“'+capacityNeeds[0].title+'” needs '+num(capacityNeeds[0].cost.effort)+' effort capacity. Assign notebooks or improve storage.':m.freeTrust===0?'All trust is assigned. Release a researcher to add notebook space.':'More storage admits larger discoveries, but takes longer to fill for the design bonus.')+(storedBeyondSmaller?' Spend banked effort before reducing storage.':''));
    $('notebook-warning').classList.toggle('is-advice',!capacityNeeds.length&&!storedBeyondSmaller);
    write('service-value',pct(s.service,0));$('service').value=s.service*100;$('service').disabled=s.ended||!!s.job?.workload;
    write('service-status',s.ended?'Complete':s.paused?'Paused':m.atomic?'Reserved':m.serviceQualified?'Qualified':'Quality hold');
    show('analysis-control',G.hasEngineering(s,'automation'));$('analysis-share').value=s.analysisShare*100;$('analysis-share').disabled=s.ended;write('analysis-value',pct(s.analysisShare,0));
    const duties=[['duty-calibration',m.calibrationDuty],['duty-service',m.effectiveServiceDuty],['duty-experiment',m.experimentDuty]];
    duties.forEach(([id,value])=>$(id).style.width=pct(value,3));
    const timeKey='Calibration '+pct(m.calibrationDuty,0)+' · service '+pct(m.effectiveServiceDuty,0)+' · experiments '+pct(m.experimentDuty,0);
    write('apparatus-key',timeKey);$('apparatus-track').setAttribute('aria-label','Apparatus time: '+timeKey+'.');
    write('queue-capacity',num(m.sharedCapacity,2)+' batch slots / lab s');
    const unused=Math.max(0,m.sharedCapacity-m.automationRunning-m.delivered),capacity=Math.max(m.sharedCapacity,1e-6);
    [['queue-automation',m.automationRunning],['queue-customer',m.delivered],['queue-unused',unused]].forEach(([id,value])=>$(id).style.width=pct(value/capacity,3));
    $('queue-track').setAttribute('aria-label','Controller capacity: '+num(m.automationRunning,2)+' classical automation, '+num(m.delivered,2)+' delivered customer batches, '+num(unused,2)+' unused slots per laboratory second.');
    write('service-demand',num(m.demand,2));write('service-delivered',num(m.delivered,2));write('service-revenue',num(m.revenue,2));
    write('automation-use',num(m.automationRunning,2)+' running / '+num(m.automationRequested,2)+' requested / '+s.automation+' owned analysis-station equivalents. Automation uses capacity first; these are classical bench batches.');
    write('service-qualification',m.atomic?(s.job.id==='calibrate'?'Manual calibration reserves the entire apparatus.':'The protected-memory or logical job reserves all post-calibration apparatus time.')+' Customer contracts and bench automation pause until it finishes.':!m.serviceQualified?'Customer quality hold: a qualified known-preparation circuit, effective noise ≤0.4%, and drift ≤0.25 are required. Classical analysis can still use controller capacity.':m.customerCapacity===0?'No controller capacity remains for customers. Increase the service share or control lanes, or reduce analysis duty.':'Delivered batches are limited by both customer demand and spare controller capacity.');
    $('service-qualification').classList.toggle('is-advice',m.serviceQualified&&!m.atomic&&m.customerCapacity>0);
    if(document.activeElement!==$('contract-price'))$('contract-price').value=Number(m.price.toFixed(2));$('contract-price').disabled=s.ended||s.autoPrice;
    show('auto-price',G.hasEngineering(s,'pricing'));write('auto-price',s.autoPrice?'Automatic pricing on · use manual':'Match price to capacity');$('auto-price').setAttribute('aria-pressed',String(s.autoPrice));$('auto-price').disabled=s.ended;
    write('workshop-teams',s.workshops+' construction '+(s.workshops===1?'team':'teams'));$('fabrication').value=s.fabrication*100;$('fabrication').disabled=s.ended;
    write('fabrication-value',pct(s.fabrication,0)+' / '+pct(1-s.fabrication,0));
    write('installed-count',num(m.installed));write('supported-count',num(m.capacity));write('fabrication-rate','+'+num(m.fabricationRate,2)+' / lab s');write('integration-rate','+'+num(m.integrationRate,2)+' / lab s');
    const footprint=Math.max(m.installed,m.capacity,1);$('installed-bar').style.width=pct(m.installed/footprint,3);$('supported-bar').style.width=pct(m.capacity/footprint,3);
    write('construction-fit',num(m.active)+' active · '+(m.installed>m.capacity?num(m.installed-m.capacity)+' installed qubits await control & cooling.':m.capacity>m.installed?num(m.capacity-m.installed)+' supported positions await fabricated qubits.':'Fabrication and integration are balanced.'));
    write('workshop-note',s.workshops===0?'Add a construction team below, then balance hypothetical hardware fabrication with control and cooling integration.':m.fabricationRate+m.integrationRate===0&&s.funds<1?'Funding limits construction. Grants and delivered services cover its running cost.':'Total laboratory upkeep: '+num(m.upkeep,2)+' funding / lab s, including construction. These are fictional build rates; active qubits require both installation and support.');
  }
  function renderRail(m,phase){
    const available=chooseExperiment(phase),e=G.experimentRecipe(s,experiment),status=e?G.experimentStatus(s,e.id):null;
    const next=nextDiscovery(),opportunity=qualifiedWorkOpportunity(next,phase),mainPending=next&&!isOptional(next),workNext=phase===5&&(!mainPending||!!opportunity),qualificationNeeded=next?.qualification&&!G.qualificationNow(s,next.qualification),studyNeeded=next?.study&&!G.studyStatus(s,next.id).complete,blocker=next?researchBlocker(next,m):'';
    write('next-label',!s.started?'Your first experiment':s.ended?'The laboratory is complete':'Your next step');
    write('next-title',!s.started?'Start with one fragile thing.':workNext?'Give the machine a question.':studyNeeded?'A fresh '+next.historyYear+' study.':qualificationNeeded?'Evidence before expansion.':blocker==='capacity'?'Make room for the next idea.':blocker==='designs'?'Let the notebook become a plan.':blocker==='funding'?(has('nisq')?'Keep the service desk working.':'Budget the next experiment.'):blocker==='effort'?'Put trust where it helps.':next?'A discovery on the desk.':'The next apparatus.');
    let hint=!s.started?'Prepare a known state. Apply a pulse. Measure. Repeat. A signal begins with five seconds of patience.':opportunity?'“'+opportunity.name+'” qualifies under your current plan. Completion awards a one-time '+num(opportunity.payout)+' funding grant toward the '+num(Math.ceil(next.cost.funds-s.funds))+' funding still needed for “'+next.title+'”. Inspect the fee, credits, and apparatus reservation below; customer services and commissioning pause during this work.':workNext?'Inspect a named workload below. Trade code distance, pulses, decoder capacity, and factory footprint until the complete budget qualifies.':qualificationNeeded?G.projectStatus(s,next.id).reasons.filter(reason=>!reason.startsWith('Need ')&&!reason.startsWith('Expand notebook')).join(' · ')+(next.qualification==='coupled'?' Expand both the chip and its control rack.':' '+(e?.description||'')):next?'Next: “'+next.title+'”. ':C.chapters[phase].goal;
    if(s.started&&!workNext&&!qualificationNeeded&&next){
      if(blocker==='capacity')hint+=num(next.cost.effort)+' effort needs more than the '+num(m.effortCap)+' bank. Assign trust to notebooks'+(m.freeTrust===0?' by releasing researchers':'')+', or improve indexed storage. A larger bank takes longer to fill for the 4× design bonus.';
      else if(blocker==='designs')hint+='Need '+num(Math.ceil(next.cost.designs-s.designs))+' more engineering designs. Fill the effort bank for 4× generation.'+(G.hasEngineering(s,'automation')?' Give classical analysis stations controller duty; balance their research against paying customers.':' Researchers produce designs through the circuit notebook.')+' Spending research effort removes the full-bank bonus.';
      else if(blocker==='funding')hint+='Need '+num(Math.ceil(next.cost.funds-s.funds))+' more funding.'+(has('nisq')?' Deliver qualified customer batches: balance price, service duty, calibration, and analysis duty. Revenue requires actual delivery.':' Keep funding for the next discovery and its experiment; service contracts open with the noisy processor.');
      else if(blocker==='effort')hint+='Assign more earned trust to researchers, or classical analysis once available. Effort fills the notebook bank; reserving more notebook space reduces the trust left for research.';
      else hint+='The declared evidence and resource costs are ready. Review the discovery below.';
    }
    if(studyNeeded){const reasons=G.studyStatus(s,next.id).reasons.join(' · ');hint='Next: “'+next.title+'”. '+next.study.criterion+(reasons?' '+reasons+'.':'')+' Qualify this fresh study before its research purchase.';}
    write('next-copy',hint);
    show('experiment-picker',s.started&&available.length>1);
    write('experiment-cost-label',workNext?'Workload budget':e?'Experiment budget':'Next action');
    write('experiment-cost',opportunity?num(opportunity.fee)+' funding · '+num(G.workloadStatus(s,opportunity.id).credits)+' rehearsal credits · '+opportunity.seconds+' apparatus s':workNext?'Inspect the workload budget':e?num(e.cost)+' funding · '+num(e.modeledShots)+' acquisitions · '+e.seconds+' apparatus s':'Review the requirements below');
    if(studyNeeded){const recipe=G.studyStatus(s,next.id).recipe;write('experiment-cost-label','Study entry budget');write('experiment-cost',num(recipe.cost)+' funding · '+num(recipe.modeledShots)+' modeled acquisitions · '+num(recipe.seconds,1)+' apparatus s; research purchase is separate.');}
    const researchNext=!experimentChosen&&next&&!qualificationNeeded&&!workNext;
    write('run-label',!s.started?'Begin with one qubit':s.job?(s.paused?'Paused · ':'Running · ')+pct(s.job.progress/s.job.duration,0):s.paused?'Paused · resume in the header':studyNeeded?'Inspect '+next.historyYear+' study':opportunity?'Inspect qualified work':workNext?'Inspect useful work':researchNext?blocker==='capacity'?'Expand research storage':blocker==='designs'?'Plan engineering designs':blocker==='funding'&&has('nisq')?'Balance the service desk':blocker==='effort'?'Allocate research trust':'Continue research':e?e.name:'Continue research');
    $('run-experiment').disabled=!!s.job||s.paused||s.ended||!researchNext&&!workNext&&!!e&&!status.ready;
    const needs=!researchNext&&!workNext?status?.reasons.filter(reason=>reason!=='The apparatus is occupied').join(' · '):'';
    if(!s.job&&taskFeedback)write('experiment-feedback',taskFeedback);
    else if(!s.job&&needs&&!s.ended)write('experiment-feedback',needs);
    else if(!s.job&&(!s.result||s.result.id!==e?.id))write('experiment-feedback','');
    show('job-progress',!!s.job);
    if(s.job){const task=s.job.objective?C.objectives.find(item=>item.id===s.job.objective):s.job.request?C.precisionRequests.find(item=>item.id===s.job.request):null,recipe=s.job.workload?C.workloads.find(w=>w.id===s.job.id):C.experiments.find(e=>e.id===s.job.id);write('job-label',s.job.id==='calibrate'?'Calibrating':task?.name||recipe?.name||'Experiment');write('job-percent',pct(s.job.progress/s.job.duration,0));$('job-meter').value=s.job.progress/s.job.duration;write('cancel-job',s.job.workload?'Cancel schedule · costs stay spent':'Cancel experiment · costs stay spent');}
    show('calibrate-button',phase>=1);$('calibrate-button').disabled=!G.calibrationStatus(s).ready;
    show('noisy-controls',has('vqe'));show('mitigate-control',has('mitigation'));
    $('theta').value=s.theta;write('theta-value',s.theta+'°');$('shot-count').value=s.shots;$('mitigate').checked=s.mitigate;
    const vqe=G.experimentRecipe(s,'vqe');write('precision-plan',num(vqe.sampledShots)+' actual samples; '+num(vqe.modeledShots)+' modeled acquisitions · '+vqe.cost+' funding. Bias and statistical precision are distinct.');
    show('memory-controls',has('surface'));write('patch-footprint',G.patchSize(s.distance)+' physical / patch');
    document.querySelectorAll('[data-distance]').forEach(b=>{b.setAttribute('aria-pressed',String(Number(b.dataset.distance)===s.distance));b.disabled=!!s.job?.workload||s.ended;});
    show('factory-control',has('ancilla'));$('factory-count').value=s.factories;
    show('allocation-controls',has('rb'));
    $('calibration').max=s.job?.id==='calibrate'?100:60;$('calibration').value=m.calibrationDuty*100;write('calibration-value',pct(m.calibrationDuty,0));write('maintenance-target','Maintenance target '+pct(m.maintenance,1));write('drift-value','Drift '+num(s.drift,3));
    write('drift-forecast',m.calibrationDuty<m.maintenance?'Drift is rising. Reserve more calibration duty or reset drift manually.':m.calibrationDuty>m.maintenance?'Drift is falling. Calibration uses apparatus time before services and experiments.':'Drift is steady under the current game maintenance model.');
    show('auto-calibration',G.hasEngineering(s,'autoCalibration'));write('auto-calibration',s.autoCalibration?'Automatic calibration on · use manual':'Keep calibration on target');$('auto-calibration').setAttribute('aria-pressed',String(s.autoCalibration));$('auto-calibration').disabled=s.ended||!!s.job?.workload;
    ['theta','shot-count','mitigate'].forEach(id=>$(id).disabled=!!s.job||s.ended);
    $('factory-count').disabled=!!s.job?.workload||s.ended;$('calibration').disabled=!!s.job?.workload||s.job?.id==='calibrate'||s.ended||s.autoCalibration;
    railHelp={source:$('run-experiment'),title:$('next-title').textContent,hint:$('next-copy').textContent,action:s.job?{type:'job',navigation:true}:studyNeeded?{type:'study',id:next.id,navigation:true}:opportunity?{type:'workload',id:opportunity.id,navigation:true}:workNext?{type:'workload',id:workload,navigation:true}:researchNext?{type:'project',id:next.id,navigation:true}:e?{type:'experiment',id:e.id}:null,target:s.job?'cancel-job':studyNeeded?'[data-study-details="'+next.id+'"]':researchNext&&['capacity','designs','effort'].includes(blocker)?'economy-section':researchNext&&blocker==='funding'&&has('nisq')?'service-control':researchNext?'[data-project="'+next.id+'"]':workNext?'workload-section':'run-experiment'};
  }
  function render(){
    const phase=G.stage(s),chapter=C.chapters[phase],m=G.metrics(s);
    document.documentElement.dataset.theme=s.theme;
    ['lab','research','journal','ending'].forEach(v=>show(v+'-view',view===v));
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
    write('chapter-label','Chapter '+['I','II','III','IV','V','VI'][phase]+' / '+chapter.name);
    html('chapter-progress',C.chapters.map((c,i)=>'<span class="'+(i===phase?'current':i<phase?'past':'')+'" title="'+esc(c.name)+'" aria-label="'+esc(c.name)+(i===phase?', current':i<phase?', reached':', ahead')+'"></span>').join(''));
    write('lab-clock',(s.paused?'PAUSED ':s.ended?'COMPLETE ':'LAB ')+clock(s.elapsed));
    html('headline',esc(chapter.title)+'<br><em>'+esc(chapter.accent)+'</em>');write('chapter-subtitle',chapter.subtitle);
    write('headline-count',num(m.active));write('headline-unit',m.active===1?'physical qubit':'active physical qubits');write('headline-caption','Installed '+num(m.installed)+' · supported '+num(m.capacity));
    write('instrument-title',chapter.instrument);write('instrument-code','SC / '+['Q01','CONTROL','NISQ','MEMORY','LOGICAL','WORK'][phase]);
    show('resource-strip',s.started);write('funds',num(Math.floor(s.funds)));write('funding-rate',signed(m.netFunding,2)+' / lab s after upkeep');write('effort',num(Math.floor(s.effort)));write('effort-rate',m.fullBank?'Bank full · '+m.designBonus+'× design generation':'+'+num(m.effortRate,1)+' / lab s · capped at '+num(m.effortCap));
    write('third-resource-label','Engineering designs');write('third-resource',num(Math.floor(s.designs)));write('third-resource-note',has('deutsch')?'+'+num(m.designRate,3)+' / lab s · classical plans':'Open the circuit notebook to begin');
    write('pause-toggle',s.paused?'Resume':'Pause');$('pause-toggle').disabled=!s.started||s.ended;
    const soundActive=s.sound;
    write('sound-toggle',soundActive?'Sound on':'Sound off');$('sound-toggle').title=soundActive?'Sound is enabled; playback begins with your first interaction. Click to mute.':'Enable apparatus sounds';$('sound-toggle').setAttribute('aria-pressed',String(!!soundActive));write('theme-toggle',s.theme==='dark'?'Use light appearance':'Use dark appearance');$('volume').value=s.volume*100;write('volume-value',pct(s.volume,0));
    write('archive-count',s.done.length);write('discoveries-count',s.done.length+' / '+C.projects.length+' discoveries');
    const discoveries=C.projects.filter(p=>!has(p.id)&&G.projectStatus(s,p.id).available);
    html('discovery-list',discoveries.map(discoveryCard).join('')||'<p class="quiet-message">'+(s.ended?'Every discovery is in the archive. The machine has a purpose.':'The desk is clear. The next experiment will open another question.')+'</p>');
    const upgrades=['hardware','rack','pulse','decoder','automation','workshop'].map(id=>({id,...G.upgradeInfo(s,id)})).filter(u=>u.available);
    for(const u of upgrades)if(!u.max){
      if(u.id==='pulse')u.detail='Effective noise '+pct(m.pEff,3)+' → '+pct(G.metrics({...s,pulse:s.pulse+1}).pEff,3)+'; selected scenario';
      if(u.id==='decoder')u.detail='Stream '+num(m.decoderRate)+' → '+num(m.decoderRate*4)+' / μs; feedback '+m.feedback+' → '+m.feedback/2+' μs';
    }
    const advances=C.engineering.filter(e=>G.engineeringStatus(s,e.id).available),choices=C.engineering.filter(e=>e.group&&G.hasEngineering(s,e.id));
    show('engineering-section',upgrades.length>0||advances.length>0||choices.length>0);
    html('engineering-choices',choices.map(e=>'<div class="chosen-policy"><span class="eyebrow">'+(e.group==='rollout'?'Rollout':'Lab policy')+'</span><p>'+esc(e.title)+'<small>Other path closed: '+esc(C.engineering.find(other=>other.group===e.group&&other.id!==e.id).title)+'.</small></p></div>').join('')+(choices.length?'<button type="button" class="text-button" id="review-engineering">Review decisions ↗</button>':''));
    html('engineering-list',advances.map(e=>engineeringCard(e)).join(''));
    html('upgrade-list',upgrades.map(u=>'<article class="upgrade"><div><h3>'+esc(u.label)+'</h3><p>'+esc(u.detail)+'</p><p class="upgrade-reasons">'+esc(u.reasons.join(' · '))+'</p></div><button type="button" data-upgrade="'+u.id+'" aria-label="'+esc(u.label)+(u.max?', maximum reached':', '+num(u.cost)+' funding and '+num(u.designs)+' designs')+'" '+(!u.ready?'disabled':'')+'>'+(u.max?'At capacity':'<span>'+num(u.cost)+' funding</span><small>'+num(u.designs)+' designs ↗</small>')+'</button></article>').join(''));
    write('journal-line',s.log.at(-1)?.message||'One qubit. An entire room to keep it cold.');
    renderReadouts(m,phase);renderRail(m,phase);renderEconomy(m);renderMeasurement();renderCampus(m);show('workload-section',phase===5);if(phase===5)renderWorkload();
    if(view==='research')renderResearch();
    if(view==='journal')html('journal-list',s.log.slice().reverse().map(entry=>'<article class="log-row '+esc(entry.kind)+'"><span class="mono">'+clock(entry.time)+'</span><div><p>'+esc(entry.message)+'</p><span class="log-kind">'+esc(entry.kind)+'</span></div></article>').join('')||'<p class="quiet-message">The notebook begins with your first experiment.</p>');
    if(view==='ending'){
      const record=s.endingRecord;
      write('ending-result',C.workloads.find(w=>record?w.id===record.workload:s.completed.includes(w.id)&&['dynamics','molecule'].includes(w.id))?.validation||'A scientific resource scenario is complete.');
      html('ending-stats','<span><strong>'+clock(record?.elapsed??s.elapsed)+'</strong>visible laboratory time</span><span><strong>'+(record?.discoveries??s.done.length)+'</strong>discoveries</span><span><strong>'+num(record?.active??m.active)+'</strong>physical qubits supported</span><span><strong>'+(record?.distance??s.distance)+'</strong>code distance</span>');
    }
    draw();renderStation(m,phase);renderInspector();renderExplainButtons();write('help-opening-invite',has('deutsch')?'Revisit the guided opening ↗':'Take the guided first step ↗');renderCompanion();
  }
  let helpOpen=false,helpTab='next',helpContext=null,helpTrigger=null,helpTarget=null,railHelp={};
  const helpAttributes={project:'project',engineering:'engineering',upgrade:'upgrade',study:'study',runWorkload:'workload',objective:'objective',precisionRequest:'precision',orderEquipment:'procurement'};
  function clearHelpTarget(){if(helpTarget){helpTarget.node.classList.remove('help-target');if(helpTarget.tabindex===null)helpTarget.node.removeAttribute('tabindex');else helpTarget.node.setAttribute('tabindex',helpTarget.tabindex);helpTarget=null;}}
  function helpAction(button){
    for(const [key,type]of Object.entries(helpAttributes))if(button.dataset[key])return {type,id:type==='procurement'?button.dataset.offer:button.dataset[key],kind:button.dataset.kind};
    return button.id==='run-experiment'?railHelp.action:button.id==='calibrate-button'?{type:'calibrate'}:button.id==='enter-campus'?{type:'campus'}:button.id==='enter-research'?{type:'research'}:null;
  }
  function renderExplainButtons(){
    const selector=Object.keys(helpAttributes).map(key=>'[data-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())+']').join(',')+',#run-experiment,#calibrate-button,#enter-campus,#enter-research';
    for(const button of document.querySelectorAll(selector)){
      if(button.tagName!=='BUTTON')continue;let explain=button.nextElementSibling;
      if(!explain?.matches('[data-help-explain]')){explain=document.createElement('button');explain.type='button';explain.className='help-explain';explain.dataset.helpExplain='';button.after(explain);}
      explain.hidden=button.hidden;
      if(button.id==='run-experiment'&&button.parentElement.matches('.lab-command-bar')){const group=document.createElement('div');group.className='lab-action-group';button.before(group);group.append(button,explain);}
      explain.textContent='Explain';explain.setAttribute('aria-label','Explain '+button.textContent.trim().replace(/\s+/g,' '));
    }
  }
  function openCompanion(context=null,tab='next',trigger=$('help-toggle')){
    clearHelpTarget();helpContext=context;helpTab=tab;if(!helpOpen)helpTrigger=trigger;helpOpen=true;if(document.fullscreenElement)document.fullscreenElement.append($('lab-companion'));$('lab-companion').hidden=false;$('help-toggle').setAttribute('aria-expanded','true');renderCompanion();$('companion-title').focus({preventScroll:true});
    if(tab==='opening'){$('companion-opening').open=true;helpTab='next';$('companion-opening').scrollIntoView({block:'nearest'});}
  }
  function closeCompanion(restore=true){helpOpen=false;$('lab-companion').hidden=true;$('help-toggle').setAttribute('aria-expanded','false');if(restore){const target=helpTrigger?.isConnected?helpTrigger:$('help-toggle');target.scrollIntoView({block:'nearest'});target.focus({preventScroll:true});}}
  function showHelpControl(selector){
    closeCompanion(false);setView('lab');let target=null;try{target=document.querySelector(selector.startsWith('#')||selector.startsWith('[')?selector:'#'+selector);}catch{}
    const fallback=!target||!!target.closest('[hidden]');if(fallback)target=$('next-title');
    if(target.disabled)target=target.closest('article,section,[data-study-details]')||target.parentElement;
    clearHelpTarget();helpTarget={node:target,tabindex:target.getAttribute('tabindex')};if(!target.matches('button,a,input,select,[tabindex]'))target.tabIndex=-1;target.classList.add('help-target');target.scrollIntoView({block:'center'});target.focus({preventScroll:true});write('help-navigation-note',fallback?'That control is not unlocked or present. Here is the current next step.':'Highlighted the real control. You decide whether to change or use it.');$('help-navigation-note').hidden=false;
  }
  function helpRows(id,rows){
    html(id,rows.map((row,i)=>'<div><dt>'+esc(row.label)+'</dt><dd id="'+id+'-value-'+i+'"></dd><small id="'+id+'-note-'+i+'"></small></div>').join(''));
    rows.forEach((row,i)=>{write(id+'-value-'+i,row.value);write(id+'-note-'+i,row.note||'');});
  }
  function renderCompanion(){
    if(!helpOpen||!window.CoherentCompanion)return;
    const host=$('three-lab'),instrument=helpContext?.instrument&&host?.dataset.component&&window.CoherentInspector?CoherentInspector.describe(s,host.dataset.component.split(':')[0]):null;
    const context=helpContext?.action?{...helpContext}:{...railHelp},source=helpContext?.source||(!helpContext?.instrument?railHelp.source:null);
    context.shellReasons=[];
    if(source?.isConnected&&source.disabled)context.shellReasons.push('The current control is disabled. Its requirements, current pause and apparatus reservation apply.');
    if(source?.isConnected&&source.closest('[hidden]'))context.shellReasons.push('This control is currently locked or outside the displayed page. Show me will use the visible next-step fallback.');
    if(instrument){context.action=instrument.quote?{type:'upgrade',id:instrument.quote.id}:null;context.instrument=instrument;context.title=host.dataset.componentName;context.hint=instrument.purpose;context.target=instrument.target;}
    const data=CoherentCompanion.describe(s,context);
    write('companion-lab-state',s.ended?'The earned ending is preserved. Help remains available.':s.paused?'Laboratory paused. The diagrams show your plan; Help does not resume it.':!s.started?'Your first experiment awaits. Help explains; you choose every paid action.':'Your laboratory keeps running. Help explains; you choose every paid action.');
    write('companion-context',helpContext?'Selected control':'Current next action');write('companion-action-title',data.title);write('companion-explanation',data.explanation);
    write('companion-block-title',data.reasons.length?'What is holding this up?':'This action has no reported blocker');
    html('companion-reasons',data.reasons.map(reason=>'<li>'+esc(reason)+'</li>').join('')||'<li>Review the real control and its quoted costs. Help does not perform the action.</li>');
    helpRows('companion-budget',data.budget);$('companion-budget').hidden=!data.budget.length;
    write('companion-result-title',data.result.title);write('companion-result-text',data.result.text);helpRows('companion-result-details',data.result.details);
    document.querySelectorAll('[data-help-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.helpTab===helpTab)));
    ['next','blocked','result'].forEach(tab=>$('companion-'+tab).hidden=tab!==helpTab);
    html('companion-links',data.links.map(link=>'<button type="button" data-help-show="'+esc(link.target)+'">'+esc(link.label)+' →</button>').join('')+data.papers.map(id=>'<button type="button" class="paper-notes" data-paper="'+id+'">'+esc(C.papers[id].title)+' ↗</button>').join(''));
    html('companion-opening-steps',data.opening.map((step,i)=>'<li><span id="companion-step-state-'+i+'"></span><h4>'+esc(step.title)+'</h4><p>'+esc(step.explanation)+'</p><button type="button" data-help-show="'+step.target+'">Show me →</button></li>').join(''));
    data.opening.forEach((step,i)=>{write('companion-step-state-'+i,step.done?'Earned':'To do');$('companion-step-state-'+i).parentElement.classList.toggle('is-earned',step.done);});write('companion-opening-count',data.opening.filter(step=>step.done).length+' / '+data.opening.length+' earned');
    html('companion-topics',data.topics.map(topic=>'<details><summary>'+esc(topic.title)+'</summary><p id="companion-topic-'+topic.id+'"></p><button type="button" data-help-show="'+topic.target+'">Show the relevant controls →</button>'+topic.papers.map(id=>'<button type="button" class="paper-notes" data-paper="'+id+'">'+esc(C.papers[id].title)+' ↗</button>').join('')+'</details>').join(''));
    data.topics.forEach(topic=>write('companion-topic-'+topic.id,topic.body));
    html('companion-glossary',data.glossary.map((entry,i)=>'<div data-help-word="'+esc(entry.term.toLowerCase())+'"><dt>'+esc(entry.term)+'</dt><dd id="companion-meaning-'+i+'"></dd></div>').join(''));
    data.glossary.forEach((entry,i)=>write('companion-meaning-'+i,entry.meaning));filterHelpGlossary();
    const h=data.diagrams.hardware,b=data.diagrams.bank,d=data.diagrams.duty,max=Math.max(1,...h.map(x=>x.value));
    h.forEach((row,i)=>{write('help-hardware-label-'+i,row.label);write('help-hardware-value-'+i,num(row.value));$('help-hardware-meter-'+i).max=max;$('help-hardware-meter-'+i).value=row.value;});
    write('help-bank-value',num(b[0].value)+' / '+num(b[1].value));$('help-bank-meter').max=b[1].value;$('help-bank-meter').value=b[0].value;write('help-bank-bonus',b[2].value+' free trust · '+b[3].value+'× full-bank design multiplier');
    d.forEach((row,i)=>{write('help-duty-value-'+i,row.label+' '+pct(row.value,0));$('help-duty-part-'+i).style.width=pct(row.value,3);});
  }
  function filterHelpGlossary(){const query=$('companion-search').value.trim().toLowerCase();let count=0;for(const row of $('companion-glossary').children){row.hidden=query&&!row.textContent.toLowerCase().includes(query);if(!row.hidden)count++;}write('companion-search-status',count+' terms shown');}

  function draw(time=performance.now()){const record=view==='ending'?s.endingRecord:null;if(window.CoherentArt)CoherentArt.draw(s,{workload:record?.workload||workload,recipe:record?.recipe||(s.job?.workload?s.job.recipe:s.logicalRecipe),bottleneck:view==='ending'?'Recorded milestone. Continue the laboratory for another question.':$('next-copy').textContent,nextAction:$('next-title').textContent,view,time});}
  function motionActive(){return view==='lab'&&!document.hidden&&!s.paused&&!s.ended&&(s.job||G.metrics(s).creditRate>0&&s.credits<2000)&&!matchMedia('(prefers-reduced-motion: reduce)').matches;}
  function animate(time){animation=0;if(!motionActive())return;draw(time);animation=requestAnimationFrame(animate);}
  function ensureAnimation(){if(!animation&&motionActive())animation=requestAnimationFrame(animate);}
  document.addEventListener('coherent-inspect',event=>{renderInspector();if(event.detail?.type)tone(event.detail.type);if(helpOpen)renderCompanion();});
  document.addEventListener('coherent-focus',event=>{if(event.detail?.type)tone(event.detail.type);});
  document.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b||b.disabled)return;
    if(b.id==='help-toggle'){if(helpOpen)closeCompanion();else openCompanion(null,'next',b);}
    else if(b.id==='companion-close')closeCompanion();
    else if(b.dataset.helpOpen)openCompanion(b.dataset.helpOpen==='instrument'?{instrument:true}:null,b.dataset.helpOpen==='opening'?'opening':'next',b);
    else if(b.hasAttribute('data-help-explain')){const source=b.previousElementSibling;openCompanion({action:helpAction(source),title:source.textContent.trim().replace(/\s+/g,' '),source,target:source.id?'#'+source.id:undefined},'blocked',b);}
    else if(b.dataset.helpTab){helpTab=b.dataset.helpTab;renderCompanion();}
    else if(b.id==='companion-current'){helpContext=null;renderCompanion();}
    else if(b.dataset.helpShow)showHelpControl(b.dataset.helpShow);
    else if(b.dataset.view)setView(b.dataset.view);
    else if(b.dataset.camera)renderStation(G.metrics(s),G.stage(s));
    else if(b.dataset.archive){archive=b.dataset.archive;renderResearch();}
    else if(b.id==='review-engineering'){archive='engineering';setView('research');}
    else if(b.dataset.paper)paperNotes(b.dataset.paper);
    else if(b.dataset.dialog)$(b.dataset.dialog).showModal();
    else if(b.dataset.close)$(b.dataset.close).close();
    else if(b.dataset.studyInspect){const p=C.projects.find(p=>p.id===b.dataset.studyInspect);setView('lab');const id=p.study.experiment==='vqe'?'noisy-controls':p.study.kind==='maintenance-budget'?'allocation-controls':p.study.experiment==='gates'?(has('controller2026')?'controller-profile-control':'upgrade-list'):'memory-controls';const target=$(id);target.scrollIntoView({block:'center'});(target.matches('input')?target:target.querySelector('button:not(:disabled),input:not(:disabled),select:not(:disabled)'))?.focus({preventScroll:true});}
    else if(b.id==='research-cancel-study')act(()=>G.cancel(s));
    else if(b.dataset.study)act(()=>G.startStudy(s,b.dataset.study));
    else if(b.id==='enter-research')act(()=>G.enterResearchProgramme(s));
    else if(b.id==='research-return-ending'){setView('ending');const target=$(s.ended?'continue-lab':'postcard-button');target.scrollIntoView({block:'center'});target.focus({preventScroll:true});}
    else if(b.dataset.project)act(()=>{const bought=G.buyProject(s,b.dataset.project);if(bought){experiment='';experimentChosen=false;}return bought;});
    else if(b.dataset.engineering)act(()=>G.buyEngineering(s,b.dataset.engineering));
    else if(b.dataset.assign)act(()=>G.assign(s,b.dataset.assign,Number(b.dataset.delta)));
    else if(b.dataset.upgrade)act(()=>G.buyUpgrade(s,b.dataset.upgrade));
    else if(b.dataset.stationTarget){const target=$(b.dataset.stationTarget);target.scrollIntoView({block:'center'});(target.matches('button,input,select,[tabindex]')?target:target.querySelector('button:not(:disabled),input:not(:disabled),select:not(:disabled)'))?.focus({preventScroll:true});}
    else if(b.dataset.objective)act(()=>G.startObjective(s,b.dataset.objective));
    else if(b.dataset.precisionRequest)act(()=>G.startPrecisionRequest(s,b.dataset.precisionRequest));
    else if(b.dataset.orderEquipment)act(()=>G.orderEquipment(s,b.dataset.offer,b.dataset.kind));
    else if(b.dataset.recipe)act(()=>G.configure(s,'logicalRecipe',b.dataset.recipe));
    else if(b.dataset.distance)act(()=>G.configure(s,'distance',Number(b.dataset.distance)));
    else if(b.dataset.workload){workload=b.dataset.workload;render();}
    else if(b.dataset.runWorkload)act(()=>G.startWorkload(s,b.dataset.runWorkload));
    else if(b.dataset.action==='export')exportSave();
    else if(b.dataset.action==='export-baseline')exportBaseline();
    else if(b.dataset.action==='save')save(true);
    else if(b.id==='run-experiment'){
      const next=nextDiscovery(),m=G.metrics(s),opportunity=qualifiedWorkOpportunity(next,G.stage(s)),blocker=next?researchBlocker(next,m):'';
      if(next?.study&&!G.studyStatus(s,next.id).complete){$('discoveries-section').scrollIntoView({block:'start'});const target=$('discovery-list').querySelector('[data-study-details="'+next.id+'"]');target?.scrollIntoView({block:'center'});target?.focus({preventScroll:true});}
      else if(opportunity){workload=opportunity.id;render();const target=$('workload-list').querySelector('[data-workload="'+workload+'"]');target.scrollIntoView({block:'center'});target.focus({preventScroll:true});}
      else if(G.stage(s)===5&&(!next||isOptional(next)))$('workload-section').scrollIntoView({block:'start'});
      else if(!experimentChosen&&next&&(!next.qualification||G.qualificationNow(s,next.qualification))){
        if(blocker==='capacity'||blocker==='designs'||blocker==='effort'||blocker==='funding'&&has('nisq')){const target=blocker==='funding'?$('service-control'):$('economy-section');target.scrollIntoView({block:'start'});target.querySelector('button:not(:disabled),input:not(:disabled)')?.focus({preventScroll:true});}
        else{const target=$('discovery-list').querySelector('[data-project="'+next.id+'"]:not(:disabled)');(target||$('discoveries-section')).scrollIntoView({block:target?'center':'start'});target?.focus({preventScroll:true});}
      }
      else if(experiment)act(()=>G.startExperiment(s,experiment));
    }
    else if(b.id==='calibrate-button')act(()=>G.calibrate(s));
    else if(b.id==='cancel-job')act(()=>G.cancel(s));
    else if(b.id==='pause-toggle')act(()=>G.pause(s));
    else if(b.id==='sound-toggle')toggleSound();
    else if(b.id==='theme-toggle')act(()=>G.configure(s,'theme',s.theme==='dark'?'light':'dark'));
    else if(b.id==='auto-price')act(()=>G.configure(s,'autoPrice',!s.autoPrice));
    else if(b.id==='auto-calibration')act(()=>G.configure(s,'autoCalibration',!s.autoCalibration));
    else if(b.id==='import-button')$('import-file').click();
    else if(b.id==='confirm-reset'){
      const preferences={theme:s.theme,volume:s.volume,sound:s.sound};s=Object.assign(G.newGame(),preferences);cancelSounds();soundKit?.setVolume(s.volume);protectedSave=false;savedAt='';lastEnding=false;lastResult='';taskFeedback='';experiment='signal';experimentChosen=false;view='lab';notice('');document.querySelectorAll('dialog[open]').forEach(d=>d.close());write('experiment-feedback','');write('settings-feedback','New laboratory started.');save();render();$('main').scrollIntoView({block:'start'});
    }
    else if(b.id==='ending-lab')setView('lab');
    else if(b.id==='enter-campus')act(()=>G.enterCampus(s));
    else if(b.id==='continue-lab')act(()=>{if(!G.continueLaboratory(s))return false;view='lab';return true;});
    else if(b.id==='postcard-button'&&window.CoherentArt)CoherentArt.postcard(s).toBlob(blob=>{if(blob)download(blob,'coherent-run.png');else notice('The postcard could not be exported. Your game save is intact.');},'image/png');
    ensureAnimation();
  });
  const controls={theta:['theta',1], 'shot-count':['shots',1], 'factory-count':['factories',1],calibration:['calibration',.01],service:['service',.01],'analysis-share':['analysisShare',.01],fabrication:['fabrication',.01],volume:['volume',.01]};
  document.addEventListener('input',event=>{
    const target=event.target;if(target.id==='paper-search'){renderResearch();return;}if(target.id==='companion-search'){filterHelpGlossary();return;}
    if(controls[target.id]){const [key,scale]=controls[target.id];if(G.configure(s,key,Number(target.value)*scale)){if(key==='volume'){soundKit?.setVolume(s.volume);if(s.volume===0)pendingSound=null;}clearTaskFeedback();render();save();}}
    else if(target.id==='mitigate')act(()=>G.configure(s,'mitigate',target.checked));
  });
  $('contract-price').addEventListener('change',event=>{if(!G.configure(s,'price',Number(event.target.value)))event.target.value=s.price;else clearTaskFeedback();render();save();});
  $('controller-profile').addEventListener('change',event=>{if(!G.configure(s,'controllerProfile',event.target.value))event.target.value=s.controllerProfile;else clearTaskFeedback();render();save();});
  $('experiment-select').addEventListener('change',event=>{experiment=event.target.value;experimentChosen=true;clearTaskFeedback();write('experiment-feedback','');render();});
  $('import-file').addEventListener('change',async event=>{
    const file=event.target.files[0];if(!file)return;
    try {
      if(file.size>250000)throw new Error('Save is larger than 250 KB.');
      const imported=G.parseSave(await file.text());s=imported;cancelSounds();soundKit?.setVolume(s.volume);protectedSave=false;lastEnding=s.ended;lastResult=JSON.stringify(s.result);taskFeedback=s.result?.task||s.result?.study?s.result.message:'';experiment='';experimentChosen=false;view=s.ended?'ending':'lab';notice('');write('experiment-feedback','');save();write('settings-feedback','Imported '+file.name+'. '+(s.paused?'The laboratory remains paused.':'The laboratory resumes visible play.'));render();ensureAnimation();
    }catch(error){write('settings-feedback','Import failed: '+error.message+' Your current laboratory is unchanged.');}
    event.target.value='';
  });
  let previous=performance.now();
  setInterval(()=>{
    const now=performance.now(),dt=Math.min(.25,(now-previous)/1000);previous=now;
    if(document.hidden||$('chapter-dialog').open)return;
    const before=G.stage(s);G.tick(s,dt);afterChange(before);
    const result=JSON.stringify(s.result);
    if(result!==lastResult){lastResult=result;if(s.result){taskFeedback=s.result.task||s.result.study?s.result.message:'';write('experiment-feedback',s.result.message);tone('result');save();}}
    if(s.started&&!s.paused&&!s.ended&&s.elapsed-lastSave>=10&&now-lastSaveAttempt>=10000)save();
    render();ensureAnimation();
  },100);
  document.addEventListener('visibilitychange',()=>{previous=performance.now();if(document.hidden){cancelSounds();if(s.started)save();if(animation)cancelAnimationFrame(animation);animation=0;}else{render();ensureAnimation();}});
  window.addEventListener('pagehide',()=>{cancelSounds();if(s.started)save();});
  window.addEventListener('resize',()=>draw());matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>{draw();ensureAnimation();});
  document.addEventListener('keydown',event=>{if(event.defaultPrevented||document.querySelector('dialog[open]'))return;if(event.key==='Escape'&&helpOpen){event.preventDefault();closeCompanion();}else if(event.key==='?'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.target.closest('input,textarea,select,[contenteditable=true]')){event.preventDefault();if(helpOpen)closeCompanion();else openCompanion(null,'next',document.activeElement);}});
  $('chapter-dialog').addEventListener('close',()=>{($('run-experiment').disabled?$('pause-toggle'):$('run-experiment')).focus({preventScroll:true});});
  render();ensureAnimation();
})();
