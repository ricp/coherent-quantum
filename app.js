/* Browser shell: the engine owns every game rule; this file owns the instrument panel. */
(function () {
  'use strict';
  const G=Coherent,C=G.content,papers=Object.values(C.papers),KEY='coherent.v1',$=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num=(value,digits=0)=>Number.isFinite(value)?value.toLocaleString('en',{maximumFractionDigits:digits}):'—';
  const pct=(value,digits=2)=>Number.isFinite(value)?(value*100).toFixed(digits)+'%':'—';
  const clock=value=>Math.floor(value/60).toString().padStart(2,'0')+':'+Math.floor(value%60).toString().padStart(2,'0');
  const has=id=>G.has(s,id),show=(id,yes)=>$(id).hidden=!yes;
  const write=(id,value)=>{if($(id).textContent!==String(value))$(id).textContent=value;};
  const rendered=new Map();
  const html=(id,value)=>{
    if(rendered.get(id)===value)return;
    const container=$(id),focused=container.contains(document.activeElement)?document.activeElement:null;
    const key=focused&&Object.entries(focused.dataset).find(([key])=>['project','upgrade','paper','workload','runWorkload'].includes(key));
    container.innerHTML=value;rendered.set(id,value);
    if(key){const [name,identity]=key,attribute=name.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),replacement=container.querySelector('[data-'+attribute+'="'+identity+'"]');(replacement&&!replacement.disabled?replacement:container.querySelector('button:not(:disabled)'))?.focus({preventScroll:true});}
  };
  let s=G.newGame(),view='lab',archive='discoveries',experiment='signal',workload='dynamics',experimentChosen=false;
  let protectedSave=false,lastSave=0,lastSaveAttempt=0,savedAt='',lastResult='',lastEnding=false,audio=null,animation=0,noticeKind='';
  try {const raw=localStorage.getItem(KEY);if(raw!==null){s=G.parseSave(raw);write('save-status','Loaded local save');}}
  catch(error){protectedSave=true;write('save-status','Stored save unreadable');notice('Your stored save could not be loaded: '+error.message+' It is preserved. Import a valid save or explicitly start a new laboratory to replace it.');}
  lastEnding=s.ended;if(s.ended)view='ending';
  function notice(message,kind=''){noticeKind=kind;write('notice',message);show('notice',!!message);}
  function save(explicit=false) {
    lastSaveAttempt=performance.now();
    if(protectedSave){if(explicit)write('settings-feedback','The unreadable save is preserved. Export this temporary laboratory, import a valid save, or start a new one.');return false;}
    try {localStorage.setItem(KEY,G.serialize(s));lastSave=s.elapsed;savedAt=new Date().toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'});write('save-status','Saved locally · '+savedAt);if(noticeKind==='storage')notice('');if(explicit)write('settings-feedback','Saved locally at '+savedAt+'. No offline progress.');return true;}
    catch(error){write('save-status','Save unavailable');notice('Browser storage is unavailable. This laboratory is running in memory. Export your save to keep it.','storage');if(explicit)write('settings-feedback','Local save failed. Export JSON to preserve the current laboratory.');return false;}
  }
  function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function exportSave(){download(new Blob([G.serialize(s)],{type:'application/json'}),'coherent-'+clock(s.elapsed).replace(':','-')+'.json');write('settings-feedback','Save export requested. Your browser manages the download.');}
  function setView(next){view=next;render();$('main').scrollIntoView({block:'start'});}
  function paperNotes(id) {
    const p=C.projects.find(item=>item.id===id),sources=p?p.papers.map(key=>papers.find(item=>item.id===key)):papers.filter(item=>item.id===id);
    write('paper-title',p?p.title:sources[0]?.title||'Primary source');
    html('paper-body',(p?'<p class="caption">In the game: '+esc(p.effect)+' Prices, timing, and numerical bonuses are educational abstractions. The sources support the concepts; they do not certify this laboratory.</p>':'')+sources.map(q=>'<article class="paper-entry"><h3>'+esc(q.title)+'</h3><p class="paper-meta">'+esc(q.authors)+'<br>'+esc(q.date)+' · '+esc(q.type)+'</p><div class="paper-section-label">What the source supports</div><p>'+esc(q.finding)+'</p><div class="paper-links">'+q.links.map(link=>'<a href="'+esc(link.url)+'" target="_blank" rel="noopener noreferrer">'+esc(link.label)+' ↗</a>').join('')+'</div></article>').join(''));
    $('paper-dialog').showModal();
  }
  function tone(kind='click') {
    if(!s.sound||!audio||audio.state!=='running'||s.volume<=0||document.hidden)return;
    const notes=kind==='chapter'?[261.63,329.63,392,523.25]:kind==='result'?[392,523.25]:[440];
    for(let i=0;i<notes.length;i++){
      const oscillator=audio.createOscillator(),gain=audio.createGain(),start=audio.currentTime+i*.11;
      oscillator.type='sine';oscillator.frequency.value=notes[i];gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(s.volume*.15,start+.012);gain.gain.exponentialRampToValueAtTime(.0001,start+.24);
      oscillator.connect(gain);gain.connect(audio.destination);oscillator.start(start);oscillator.stop(start+.25);
    }
  }
  async function toggleSound(){
    if(s.sound&&audio?.state==='running'){G.configure(s,'sound',false);await audio.suspend();}
    else try {audio=audio||new (window.AudioContext||window.webkitAudioContext)();await audio.resume();G.configure(s,'sound',true);tone('result');}
    catch {notice('Sound could not start in this browser. The laboratory continues silently.');G.configure(s,'sound',false);}
    save();render();
  }
  function act(action){
    const before=G.stage(s),focused=document.activeElement;
    if(action()){tone();afterChange(before);save();render();if(focused!==document.body&&(!focused.isConnected||focused.disabled)&&document.activeElement===document.body)(s.job?$('cancel-job'):$('discovery-list').querySelector('button:not(:disabled)'))?.focus({preventScroll:true});}
    else write('experiment-feedback','That action is not available under the current conditions. Check the visible requirements.');
  }
  function afterChange(before){
    const next=G.stage(s);
    if(next>before){experiment='';write('chapter-dialog-label','Chapter '+['I','II','III','IV','V','VI'][next]+' / '+C.chapters[next].name);write('chapter-dialog-title',C.chapters[next].transition);write('chapter-dialog-story',C.chapters[next].story);$('chapter-dialog').showModal();tone('chapter');}
    if(s.ended&&!lastEnding){lastEnding=true;view='ending';tone('chapter');$('main').scrollIntoView({block:'start'});}
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
  function discoveryCard(p){
    const q=papers.find(q=>q.id===p.papers[0]),status=G.projectStatus(s,p.id);
    return '<article class="discovery"><div class="discovery-top"><div class="paper-year">'+esc(q.date)+' / '+esc(q.authors.split(';')[0])+'</div>'+diagram(p.chapter)+'</div><h3>'+esc(p.title)+'</h3><p>'+esc(p.effect)+'</p><div class="discovery-cost">'+num(p.cost.funds)+' funding · '+num(p.cost.effort)+' effort</div><button type="button" data-project="'+p.id+'" '+(!status.ready?'disabled':'')+'><span>Research discovery</span><span aria-hidden="true">→</span></button><div class="limiter">'+esc(status.reasons.join(' · '))+'</div><button type="button" class="paper-notes" data-paper="'+p.id+'">Read the primary '+(p.papers.length>1?'papers':'paper')+' ↗</button></article>';
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
    const items=archive==='papers'?papers:C.projects;
    html('archive-list',items.filter(p=>JSON.stringify(p).toLowerCase().includes(query)).map(p=>{
      const q=archive==='papers'?p:papers.find(q=>q.id===p.papers[0]);
      return '<article class="archive-row"><span class="year">'+esc(q.date.match(/\d{4}/)?.[0]||'—')+'</span><div>'+(archive==='discoveries'?'<span class="archive-mark">'+diagram(p.chapter)+'</span>':'')+'<h3>'+esc(p.title)+'</h3><p>'+esc(archive==='papers'?q.authors+' · '+q.type:p.effect)+'</p><span class="archive-status">'+(archive==='papers'?esc(q.id+' / primary source'):has(p.id)?'Discovered':'Available to read before discovery')+'</span></div><button type="button" data-paper="'+p.id+'">Read '+(archive==='papers'?'source':'papers')+' ↗</button></article>';
    }).join('')||'<p class="quiet-message">No matching source. Try a title, author, or topic.</p>');
    document.querySelectorAll('[data-archive]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.archive===archive)));
  }
  function budgetStat(label,value,note){return '<div class="budget-stat"><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong><small>'+esc(note)+'</small></div>';}
  function renderWorkload(){
    const w=C.workloads.find(w=>w.id===workload),b=s.job?.workload&&s.job.id===w.id?G.liveWorkloadStatus(s,w.id):G.workloadStatus(s,w.id);
    html('workload-list',C.workloads.map(w=>{const ready=G.workloadStatus(s,w.id).ready;return '<button type="button" class="workload-option" data-workload="'+w.id+'" aria-pressed="'+(w.id===workload)+'"><span><span class="eyebrow">'+esc(w.tag)+'</span><strong>'+esc(w.name)+'</strong></span><span class="workload-state">'+(s.completed.includes(w.id)?'Complete':ready?'Qualified':'Inspect budget')+'</span></button>';}).join(''));
    const colors=['var(--teal)','var(--copper)','var(--warning)','var(--muted)','var(--ink)'],entries=Object.entries(b.parts),total=entries.reduce((a,[,v])=>a+(Number.isFinite(v)?v:1),0);
    html('budget-panel','<div class="budget-top"><div><span class="eyebrow">'+esc(w.tag)+'</span><h3>'+esc(w.name)+'</h3><p>'+esc(w.description)+'</p></div></div><div class="budget-stats">'+budgetStat('Application / complete patches',w.width+' / '+G.metrics(s).totalPatches,'Routing, spare & factory footprint are separate')+budgetStat('Total conditional risk',pct(b.risk),'Recipe ceiling '+pct(w.maxRisk,0))+budgetStat('Full modeled time',num(b.runtime)+' μs',w.repetitions+' execution(s); ceiling '+num(w.maxTime)+' μs')+budgetStat('Fresh states / rehearsal credits',num(b.credits),num(w.fee)+' funding · '+w.seconds+' apparatus s')+'</div><div class="budget-bar" aria-hidden="true">'+entries.map(([,v],i)=>'<span style="width:'+((Number.isFinite(v)?v:1)/Math.max(total,.00001)*100)+'%;background:'+colors[i]+'"></span>').join('')+'</div><div class="budget-legend">'+entries.map(([key,v],i)=>'<span><i style="background:'+colors[i]+'"></i>'+esc(key)+' '+pct(v)+'</span>').join('')+'</div><p class="budget-caption">Assumed recipe precision: '+w.precision+'; target '+w.target+'. Gate schedule '+num(b.gateTime)+' μs; fresh-state supply '+num(b.factoryTime)+' μs; feedback '+num(b.feedbackTime)+' μs. Parallel lanes overlap; waiting increases memory exposure.</p><p class="budget-reasons">'+esc(s.completed.includes(w.id)?'This workload is complete. Rewards are awarded once.':s.job?.workload&&s.job.id===w.id?'Schedule running. Engineering conditions remain checked.':b.reasons.join(' · ')||'Every declared condition qualifies under the selected model.')+'</p><div class="budget-actions"><button type="button" class="primary-button" data-run-workload="'+w.id+'" '+(!b.ready||s.job||s.paused||s.ended?'disabled':'')+'><span>'+(s.completed.includes(w.id)?'Scenario completed':'Run the full schedule')+'</span><span aria-hidden="true">→</span></button></div><p class="budget-caption">'+esc(w.validation)+'</p>');
  }
  function renderMeasurement(){
    const r=s.result,t=s.tutorial;
    show('measurement-panel',!!r);
    let title='Experiment notebook',context='Educational scenario',caption=r?.message||'Tune the angle, inspect the exact landscape, then test the estimate.';
    if(r?.id==='signal'||r?.id==='circuit'){title='Repeated known preparations';context=num(r.shots)+' sampled shots';caption+=' Counts do not reveal an arbitrary unknown state.';}
    if(r?.id==='vqe'&&t){
      title='The two-spin energy';context='Exact classical reference: −1.5620';
      caption=t?'Estimate '+num(t.energy,4)+' · 95% simultaneous sampling bound ±'+num(t.statistical,4)+' · standard error '+num(t.se,4)+' · residual bias ≤'+num(t.bias,4)+' · ansatz error '+num(t.ansatzError,4)+'. '+num(t.shots)+' actual samples; '+num(t.modeledShots)+' modeled acquisitions. '+(t.qualified?'Qualified.':'Tune θ, shots, or mitigation to meet the 0.12 total criterion.'):'H = ZZ + 0.6X₀ + 0.6X₁. The exact variational curve is computed classically; sampling and bias remain separate.';
    }
    if(r?.id==='memory'){title='Detection-event rehearsal';context='100 illustrative trials / check';}
    write('measurement-title',title);write('measurement-context',context);write('measurement-caption',caption);
    $('measurement').setAttribute('aria-label',title+'. '+caption);
  }
  function renderRail(m,phase){
    const available=chooseExperiment(phase),e=G.experimentRecipe(s,experiment),status=e?G.experimentStatus(s,e.id):null;
    const next=C.projects.find(p=>!has(p.id)&&p.requires.every(has));
    write('next-label',!s.started?'Your first experiment':s.ended?'The laboratory is complete':'Your next step');
    write('next-title',!s.started?'Start with one fragile thing.':phase===5?'Give the machine a question.':next?.qualification&&!G.qualificationNow(s,next.qualification)?'Evidence before expansion.':next?'A discovery on the desk.':'The next apparatus.');
    write('next-copy',!s.started?'Prepare a known state. Apply a pulse. Measure. Repeat. A signal begins with five seconds of patience.':phase===5?'Inspect a named workload below. Trade code distance, pulses, decoder capacity, and factory footprint until the complete budget qualifies.':next?.qualification&&!G.qualificationNow(s,next.qualification)?G.projectStatus(s,next.id).reasons.filter(reason=>!reason.startsWith('Need ')).join(' · ')+(next.qualification==='coupled'?' Expand both the chip and its control rack.':' '+(e?.description||'')):next?'Research “'+next.title+'” below. Funding and effort accrue while the visible laboratory runs.':C.chapters[phase].goal);
    show('experiment-picker',s.started&&available.length>1);
    write('experiment-cost-label',e?'Experiment budget':'Next action');
    write('experiment-cost',e?num(e.cost)+' funding · '+num(e.modeledShots)+' acquisitions · '+e.seconds+' apparatus s':'Inspect the workload budget');
    const researchNext=!experimentChosen&&next&&(!next.qualification||G.qualificationNow(s,next.qualification));
    write('run-label',!s.started?'Begin with one qubit':s.job?(s.paused?'Paused · ':'Running · ')+pct(s.job.progress/s.job.duration,0):s.paused?'Paused · resume in the header':phase===5?'Inspect useful work':researchNext?'Continue research':e?e.name:'Continue research');
    $('run-experiment').disabled=!!s.job||s.paused||s.ended||!researchNext&&!!e&&!status.ready;
    const needs=status?.reasons.filter(reason=>reason!=='The apparatus is occupied').join(' · ');
    if(!s.job&&needs&&!s.ended)write('experiment-feedback',needs);
    else if(!s.result&&!s.job)write('experiment-feedback','');
    show('job-progress',!!s.job);
    if(s.job){const recipe=s.job.workload?C.workloads.find(w=>w.id===s.job.id):C.experiments.find(e=>e.id===s.job.id);write('job-label',s.job.id==='calibrate'?'Calibrating':recipe?.name||'Experiment');write('job-percent',pct(s.job.progress/s.job.duration,0));$('job-meter').value=s.job.progress/s.job.duration;write('cancel-job',s.job.workload?'Cancel schedule · costs stay spent':'Cancel experiment · costs stay spent');}
    show('calibrate-button',phase>=1&&!has('rb'));$('calibrate-button').disabled=!!s.job||s.paused||s.ended||s.funds<8;
    show('noisy-controls',has('vqe'));show('mitigate-control',has('mitigation'));
    $('theta').value=s.theta;write('theta-value',s.theta+'°');$('shot-count').value=s.shots;$('mitigate').checked=s.mitigate;
    const vqe=G.experimentRecipe(s,'vqe');write('precision-plan',num(vqe.sampledShots)+' actual samples; '+num(vqe.modeledShots)+' modeled acquisitions · '+vqe.cost+' funding. Bias and statistical precision are distinct.');
    show('memory-controls',has('surface'));write('patch-footprint',G.patchSize(s.distance)+' physical / patch');
    document.querySelectorAll('[data-distance]').forEach(b=>{b.setAttribute('aria-pressed',String(Number(b.dataset.distance)===s.distance));b.disabled=!!s.job?.workload||s.ended;});
    show('factory-control',has('ancilla'));$('factory-count').value=s.factories;
    show('allocation-controls',has('rb')||has('nisq'));show('calibration-control',has('rb'));show('service-control',has('nisq'));
    $('calibration').value=s.calibration*100;write('calibration-value',pct(s.calibration,0));$('service').value=s.service*100;write('service-value',pct(s.service,0));
    ['theta','shot-count','mitigate'].forEach(id=>$(id).disabled=!!s.job||s.ended);
    ['factory-count','calibration'].forEach(id=>$(id).disabled=!!s.job?.workload||s.ended);$('service').disabled=s.ended;
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
    show('resource-strip',s.started);write('funds',num(Math.floor(s.funds)));write('funding-rate','+'+num(m.netFunding,1)+' / lab s after upkeep');write('effort',num(Math.floor(s.effort)));write('effort-rate','+'+num(m.effortRate,1)+' / lab s · abstract work');
    write('third-resource-label',phase>=4?'Rehearsal credits':'Qualified experiments');write('third-resource',phase>=4?num(Math.floor(s.credits)):s.qualified.length);write('third-resource-note',phase>=4?'+'+num(m.creditRate,1)+' / lab s · scheduling currency':'Evidence, not raw qubit count');
    write('pause-toggle',s.paused?'Resume':'Pause');$('pause-toggle').disabled=!s.started||s.ended;
    const soundActive=s.sound&&audio?.state==='running';
    write('sound-toggle',soundActive?'Sound on':s.sound?'Enable sound':'Sound off');$('sound-toggle').setAttribute('aria-pressed',String(!!soundActive));write('theme-toggle',s.theme==='dark'?'Use light appearance':'Use dark appearance');$('volume').value=s.volume*100;write('volume-value',pct(s.volume,0));
    write('archive-count',s.done.length);write('discoveries-count',s.done.length+' / 30 discoveries');
    const discoveries=C.projects.filter(p=>!has(p.id)&&G.projectStatus(s,p.id).available);
    html('discovery-list',discoveries.map(discoveryCard).join('')||'<p class="quiet-message">'+(s.ended?'Every discovery is in the archive. The machine has a purpose.':'The desk is clear. The next experiment will open another question.')+'</p>');
    const upgrades=['hardware','rack','staff','pulse','decoder'].map(id=>({id,...G.upgradeInfo(s,id)})).filter(u=>u.available);
    for(const u of upgrades)if(!u.max){
      if(u.id==='pulse')u.detail='Effective noise '+pct(m.pEff,3)+' → '+pct(G.metrics({...s,pulse:s.pulse+1}).pEff,3)+'; selected scenario';
      if(u.id==='decoder')u.detail='Stream '+num(m.decoderRate)+' → '+num(m.decoderRate*4)+' / μs; feedback '+m.feedback+' → '+m.feedback/2+' μs';
    }
    show('engineering-section',upgrades.length>0);
    html('upgrade-list',upgrades.map(u=>'<article class="upgrade"><div><h3>'+esc(u.label)+'</h3><p>'+esc(u.detail)+'</p></div><button type="button" data-upgrade="'+u.id+'" aria-label="'+esc(u.label)+(u.max?', maximum reached':', '+num(u.cost)+' funding')+'" '+(u.max||s.funds<u.cost||s.ended||s.job?.workload&&u.id!=='staff'?'disabled':'')+'>'+(u.max?'At capacity':num(u.cost)+' ↗')+'</button></article>').join(''));
    write('journal-line',s.log.at(-1)?.message||'One qubit. An entire room to keep it cold.');
    renderReadouts(m,phase);renderRail(m,phase);renderMeasurement();show('workload-section',phase===5);if(phase===5)renderWorkload();
    if(view==='research')renderResearch();
    if(view==='journal')html('journal-list',s.log.slice().reverse().map(entry=>'<article class="log-row '+esc(entry.kind)+'"><span class="mono">'+clock(entry.time)+'</span><div><p>'+esc(entry.message)+'</p><span class="log-kind">'+esc(entry.kind)+'</span></div></article>').join('')||'<p class="quiet-message">The notebook begins with your first experiment.</p>');
    if(view==='ending'){
      write('ending-result',C.workloads.find(w=>s.completed.includes(w.id)&&['dynamics','molecule'].includes(w.id))?.validation||'A scientific resource scenario is complete.');
      html('ending-stats','<span><strong>'+clock(s.elapsed)+'</strong>visible laboratory time</span><span><strong>'+s.done.length+'</strong>discoveries</span><span><strong>'+num(m.active)+'</strong>physical qubits supported</span><span><strong>'+s.distance+'</strong>code distance</span>');
    }
    draw();
  }
  function draw(time=performance.now()){if(window.CoherentArt)CoherentArt.draw(s,{workload,view,time});}
  function motionActive(){return view==='lab'&&!document.hidden&&!s.paused&&!s.ended&&(s.job||G.metrics(s).creditRate>0&&s.credits<2000)&&!matchMedia('(prefers-reduced-motion: reduce)').matches;}
  function animate(time){animation=0;if(!motionActive())return;draw(time);animation=requestAnimationFrame(animate);}
  function ensureAnimation(){if(!animation&&motionActive())animation=requestAnimationFrame(animate);}
  document.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b||b.disabled)return;
    if(b.dataset.view)setView(b.dataset.view);
    else if(b.dataset.archive){archive=b.dataset.archive;renderResearch();}
    else if(b.dataset.paper)paperNotes(b.dataset.paper);
    else if(b.dataset.dialog)$(b.dataset.dialog).showModal();
    else if(b.dataset.close)$(b.dataset.close).close();
    else if(b.dataset.project)act(()=>{const bought=G.buyProject(s,b.dataset.project);if(bought){experiment='';experimentChosen=false;}return bought;});
    else if(b.dataset.upgrade)act(()=>G.buyUpgrade(s,b.dataset.upgrade));
    else if(b.dataset.distance)act(()=>G.configure(s,'distance',Number(b.dataset.distance)));
    else if(b.dataset.workload){workload=b.dataset.workload;render();}
    else if(b.dataset.runWorkload)act(()=>G.startWorkload(s,b.dataset.runWorkload));
    else if(b.dataset.action==='export')exportSave();
    else if(b.dataset.action==='save')save(true);
    else if(b.id==='run-experiment'){
      const next=C.projects.find(p=>!has(p.id)&&p.requires.every(has));
      if(G.stage(s)===5)$('workload-section').scrollIntoView({block:'start'});
      else if(!experimentChosen&&next&&(!next.qualification||G.qualificationNow(s,next.qualification))){$('discoveries-section').scrollIntoView({block:'start'});$('discovery-list').querySelector('button:not(:disabled)')?.focus({preventScroll:true});}
      else if(experiment)act(()=>G.startExperiment(s,experiment));
    }
    else if(b.id==='calibrate-button')act(()=>G.calibrate(s));
    else if(b.id==='cancel-job')act(()=>G.cancel(s));
    else if(b.id==='pause-toggle')act(()=>G.pause(s));
    else if(b.id==='sound-toggle')toggleSound();
    else if(b.id==='theme-toggle')act(()=>G.configure(s,'theme',s.theme==='dark'?'light':'dark'));
    else if(b.id==='import-button')$('import-file').click();
    else if(b.id==='confirm-reset'){
      const preferences={theme:s.theme,volume:s.volume,sound:s.sound};s=Object.assign(G.newGame(),preferences);protectedSave=false;savedAt='';lastEnding=false;lastResult='';experiment='signal';experimentChosen=false;view='lab';notice('');document.querySelectorAll('dialog[open]').forEach(d=>d.close());write('experiment-feedback','');write('settings-feedback','New laboratory started.');save();render();$('main').scrollIntoView({block:'start'});
    }
    else if(b.id==='ending-lab')setView('lab');
    else if(b.id==='postcard-button'&&window.CoherentArt)CoherentArt.postcard(s).toBlob(blob=>{if(blob)download(blob,'coherent-for-keir.png');else notice('The postcard could not be exported. Your game save is intact.');},'image/png');
    ensureAnimation();
  });
  const controls={theta:['theta',1], 'shot-count':['shots',1], 'factory-count':['factories',1],calibration:['calibration',.01],service:['service',.01],volume:['volume',.01]};
  document.addEventListener('input',event=>{
    const target=event.target;if(target.id==='paper-search'){renderResearch();return;}
    if(controls[target.id]){const [key,scale]=controls[target.id];if(G.configure(s,key,Number(target.value)*scale)){render();save();}}
    else if(target.id==='mitigate')act(()=>G.configure(s,'mitigate',target.checked));
  });
  $('experiment-select').addEventListener('change',event=>{experiment=event.target.value;experimentChosen=true;write('experiment-feedback','');render();});
  $('import-file').addEventListener('change',async event=>{
    const file=event.target.files[0];if(!file)return;
    try {
      if(file.size>250000)throw new Error('Save is larger than 250 KB.');
      const imported=G.parseSave(await file.text());s=imported;protectedSave=false;lastEnding=s.ended;lastResult='';experiment='';experimentChosen=false;view=s.ended?'ending':'lab';notice('');write('experiment-feedback','');save();write('settings-feedback','Imported '+file.name+'. '+(s.paused?'The laboratory remains paused.':'The laboratory resumes visible play.'));render();ensureAnimation();
    }catch(error){write('settings-feedback','Import failed: '+error.message+' Your current laboratory is unchanged.');}
    event.target.value='';
  });
  let previous=performance.now();
  setInterval(()=>{
    const now=performance.now(),dt=Math.min(.25,(now-previous)/1000);previous=now;
    if(document.hidden||$('chapter-dialog').open)return;
    const before=G.stage(s);G.tick(s,dt);afterChange(before);
    const result=JSON.stringify(s.result);
    if(result!==lastResult){lastResult=result;if(s.result){write('experiment-feedback',s.result.message);tone('result');save();}}
    if(s.started&&!s.paused&&!s.ended&&s.elapsed-lastSave>=10&&now-lastSaveAttempt>=10000)save();
    render();ensureAnimation();
  },100);
  document.addEventListener('visibilitychange',()=>{previous=performance.now();if(document.hidden){if(s.started)save();if(animation)cancelAnimationFrame(animation);animation=0;}else{render();ensureAnimation();}});
  window.addEventListener('pagehide',()=>{if(s.started)save();});
  window.addEventListener('resize',()=>draw());matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>{draw();ensureAnimation();});
  $('chapter-dialog').addEventListener('close',()=>{$('run-experiment').focus({preventScroll:true});});
  render();ensureAnimation();
})();
