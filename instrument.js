/* Original instrument drawings. Geometry is schematic; numerical displays use the game engine. */
(function () {
  'use strict';
  const G=window.Coherent, C=G.content;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const mono="'SFMono-Regular', Consolas, monospace", sans="system-ui, sans-serif", serif="'Instrument Serif', Georgia, serif";
  const num=(n,d=0)=>Number.isFinite(n)?n.toLocaleString('en-US',{maximumFractionDigits:d}):'unqualified';
  function palette() {
    const css=getComputedStyle(document.documentElement),p={};
    for(const key of ['bg','panel','ink','muted','line','copper','teal','soft','chip','warning','danger'])p[key]=css.getPropertyValue('--'+key).trim();
    return p;
  }
  function fit(id,p) {
    const canvas=document.getElementById(id);
    if(!canvas||!canvas.clientWidth||!canvas.clientHeight)return null;
    const w=canvas.clientWidth,h=canvas.clientHeight,dpr=Math.min(2,window.devicePixelRatio||1);
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    const x=canvas.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,w,h);
    return {x,w,h,p};
  }
  function text(a,value,x,y,color=a.p.muted,size=11,align='left',font=mono) {
    a.x.fillStyle=color;a.x.font=size+'px '+font;a.x.textAlign=align;a.x.textBaseline='middle';a.x.fillText(value,x,y);a.x.textAlign='left';
  }
  function line(a,x1,y1,x2,y2,color=a.p.line,width=1,dash=[]) {
    a.x.beginPath();a.x.strokeStyle=color;a.x.lineWidth=width;a.x.setLineDash(dash);a.x.moveTo(x1,y1);a.x.lineTo(x2,y2);a.x.stroke();a.x.setLineDash([]);
  }
  function box(a,x,y,w,h,fill,stroke,r=3) {
    a.x.beginPath();a.x.roundRect(x,y,w,h,r);if(fill){a.x.fillStyle=fill;a.x.fill();}if(stroke){a.x.strokeStyle=stroke;a.x.lineWidth=1;a.x.stroke();}
  }
  function dot(a,x,y,r,fill,stroke) {
    a.x.beginPath();a.x.arc(x,y,r,0,Math.PI*2);if(fill){a.x.fillStyle=fill;a.x.fill();}if(stroke){a.x.strokeStyle=stroke;a.x.lineWidth=1;a.x.stroke();}
  }
  function grid(a) {
    a.x.save();a.x.globalAlpha=.5;
    for(let x=20;x<a.w;x+=24)for(let y=22;y<a.h;y+=24)dot(a,x,y,.6,a.p.line);
    a.x.restore();
  }
  function wave(a,x,y,w,h,fn,color=a.p.teal) {
    a.x.beginPath();a.x.lineWidth=1.5;a.x.strokeStyle=color;
    for(let i=0;i<=w;i++){const yy=y+h*fn(i/w);if(i===0)a.x.moveTo(x+i,yy);else a.x.lineTo(x+i,yy);}
    a.x.stroke();
  }
  function cursor(a,x,y,h,t) {
    line(a,x+t,y,x+t,y+h,a.p.copper,1);dot(a,x+t,y+h,2,a.p.copper);
  }
  function qubit(a,x,y,r,active=false) {
    box(a,x-r*1.7,y-r*.7,r*1.25,r*1.4,a.p.copper,null,2);
    box(a,x+r*.45,y-r*.7,r*1.25,r*1.4,a.p.copper,null,2);
    line(a,x-r*.45,y,x+r*.45,y,a.p.copper,1.3);
    box(a,x-2,y-3,4,6,a.p.chip,a.p.copper,0);
    if(active){a.x.save();a.x.globalAlpha=.25;dot(a,x,y,r*2.5,null,a.p.teal);a.x.restore();}
  }
  function board(a,x,y,w,h) {
    box(a,x+5,y+6,w,h,a.p.bg,a.p.line,9);box(a,x,y,w,h,a.p.chip,a.p.line,9);
    for(const xx of [x+9,x+w-9])for(const yy of [y+9,y+h-9]){dot(a,xx,yy,2.4,a.p.panel,a.p.line);line(a,xx-1,yy,xx+1,yy,a.p.muted);}
    for(let i=1;i<9;i++){const yy=y+h*i/10;line(a,x-9,yy,x,yy,a.p.copper);line(a,x+w,yy,x+w+9,yy,a.p.copper);}
  }
  function opening(a,s,m,phase) {
    grid(a);const narrow=a.w<430,cx=a.w/2,cy=a.h*.46,bw=Math.min(a.w*.62,340),bh=a.h*.39,bx=cx-bw/2,by=cy-bh/2;
    text(a,'01 / COHERENT CONTROL',20,24,a.p.copper,10);
    text(a,narrow?'SC / q₀':'SUPERCONDUCTING CIRCUIT',a.w-20,24,a.p.muted,9,'right');
    // Copper control/readout lines enter a lithographed capacitor and Josephson junction.
    const inputY=cy-bh*.22;
    line(a,20,inputY,bx-18,inputY,a.p.line);line(a,bx-18,inputY,bx-18,cy,a.p.line);line(a,bx-18,cy,bx,cy,a.p.copper,1.5);
    line(a,bx+bw,cy,a.w-32,cy,a.p.copper,1.5);
    board(a,bx,by,bw,bh);
    line(a,bx+15,cy,cx-bw*.18,cy,a.p.copper,1.5);
    // A folded readout resonator, not an orbiting particle.
    const path=a.x;path.beginPath();path.strokeStyle=a.p.copper;path.lineWidth=1.5;path.moveTo(cx+bw*.2,cy);
    for(let i=0;i<5;i++){const xx=cx+bw*.2+i*bw*.035;path.lineTo(xx,cy+(i%2?bh*.3:-bh*.3));path.lineTo(xx+bw*.035,cy+(i%2?bh*.3:-bh*.3));}
    path.lineTo(bx+bw-15,cy);path.stroke();
    qubit(a,cx-bw*.01,cy,Math.min(22,bw*.085),Boolean(s.job));
    line(a,cx-bw*.01,cy+24,cx-bw*.01,by+bh-15,a.p.line);
    text(a,'q₀',cx-bw*.01,by+bh-26,a.p.teal,13,'center');
    text(a,'CONTROL',20,inputY-15,a.p.muted,9);text(a,'READOUT',a.w-20,cy+19,a.p.muted,9,'right');
    const py=by+bh+37,pw=Math.min(a.w-64,410),px=cx-pw/2;
    line(a,px,py,px+pw,py,a.p.line);
    wave(a,px,py,pw,11,t=>Math.exp(-(((t-.5)/.15)**2))*Math.sin(t*42-(s.job?phase:0)),a.p.teal);
    if(s.job&&phase)cursor(a,px,py-20,40,pw*Math.min(1,s.job.progress/s.job.duration));
    text(a,'Prepare → pulse → measure',cx,py+37,a.p.ink,narrow?12:14,'center',sans);
    text(a,s.job?'REPEATED KNOWN PREPARATIONS':'ONE QUBIT · ONE ENTIRE REFRIGERATOR',cx,a.h-28,a.p.muted,narrow?9:10,'center');
    document.getElementById('machine').setAttribute('aria-label','Illustrative superconducting circuit: one capacitor and Josephson junction connected to control and readout lines.');
  }
  function control(a,s,m,phase) {
    grid(a);const left=a.w<430?91:105,right=22,w=a.w-left-right,top=58,step=(a.h-118)/3;
    text(a,'02 / PREPARATION, CONTROL, MEASUREMENT',20,24,a.p.copper,a.w<400?9:10);
    const rows=[['PULSE','known control',t=>Math.abs(t-.2)<.035||Math.abs(t-.72)<.035?-.68:0,a.p.copper],['RAMSEY','T₂* 18.4 μs',t=>.65*Math.exp(-t*48/18.4)*Math.cos(t*34),a.p.teal],['ECHO','T₂ 42 μs',t=>-.65*Math.exp(-t*48/42),a.p.teal]];
    rows.forEach(([label,small,fn,color],i)=>{
      const y=top+i*step+step*.42;text(a,label,18,y-7,a.p.ink,10);text(a,small,18,y+10,a.p.muted,9);
      for(let j=0;j<=4;j++)line(a,left+w*j/4,y-step*.28,left+w*j/4,y+step*.28,a.p.line,1,[2,4]);
      line(a,left,y,left+w,y,a.p.line);wave(a,left,y,w,step*.43,fn,color);
      if(s.job&&phase)cursor(a,left,y-step*.28,step*.56,w*Math.min(1,s.job.progress/s.job.duration));
    });
    text(a,'0',left,a.h-54,a.p.muted,9);text(a,'SELECTED DELAY / μs',left+w/2,a.h-54,a.p.muted,9,'center');text(a,'48',left+w,a.h-54,a.p.muted,9,'right');
    text(a,'Selected scenarios · not fitted hardware traces',a.w/2,a.h-26,a.p.muted,a.w<430?9:10,'center');
    document.getElementById('machine').setAttribute('aria-label','Selected control, Ramsey, and echo scenario traces. Ramsey T2-star is 18.4 microseconds; echo T2 is 42 microseconds. These are schematic scenarios, not fitted hardware measurements.');
  }
  function landscape(a,s,x,y,w,h) {
    const min=-1.75,max=1.25,toY=e=>y+h*(max-e)/(max-min),reference=-Math.sqrt(2.44);
    line(a,x,y+h,x+w,y+h,a.p.line);line(a,x,y,x,y+h,a.p.line);
    line(a,x,toY(reference),x+w,toY(reference),a.p.copper,1,[4,5]);
    wave(a,x,0,w,1,t=>toY(G.tutorialEnergy(t*90)),a.p.teal);
    const tx=x+w*s.theta/90,ey=toY(G.tutorialEnergy(s.theta));
    line(a,tx,y,tx,y+h,a.p.line,1,[2,5]);dot(a,tx,ey,4,a.p.chip,a.p.teal);
    if(s.tutorial){const t=s.tutorial,sx=x+w*t.theta/90,sy=toY(t.energy),bound=t.statistical;
      line(a,sx,toY(t.energy+bound),sx,toY(t.energy-bound),a.p.copper,1.5);line(a,sx-4,toY(t.energy+bound),sx+4,toY(t.energy+bound),a.p.copper);line(a,sx-4,toY(t.energy-bound),sx+4,toY(t.energy-bound),a.p.copper);dot(a,sx,sy,2.5,a.p.copper);
    }
    text(a,'0°',x,y+h+15,a.p.muted,9);text(a,'θ',x+w/2,y+h+15,a.p.muted,10,'center');text(a,'90°',x+w,y+h+15,a.p.muted,9,'right');
    text(a,'E(θ)',x+6,y+8,a.p.muted,10);text(a,'exact reference −1.5620',x+w-2,toY(reference)-11,a.p.copper,a.w<400?9:10,'right');
  }
  function noisy(a,s,m,phase) {
    grid(a);text(a,'03 / COUPLED PROCESSOR',20,24,a.p.copper,10);const show=G.has(s,'ansatz'),n=Math.min(5,Math.max(2,Math.ceil(Math.sqrt(m.active)))),count=Math.min(m.active,n*n);
    const areaH=show?a.h*.45:a.h*.72,cell=Math.min(48,(a.w-75)/(n+1),areaH/(n+.5)),bw=cell*(n+.55),bh=bw,x=(a.w-bw)/2,y=show?48:(a.h-bh)/2;
    board(a,x,y,bw,bh);let nodes=[];
    for(let i=0;i<count;i++){const row=Math.floor(i/n),col=i%n;nodes.push({x:x+cell*.78+col*cell,y:y+cell*.78+row*cell});}
    nodes.forEach((node,i)=>{if(i%n<n-1&&nodes[i+1])line(a,node.x,node.y,nodes[i+1].x,node.y,a.p.copper);if(nodes[i+n])line(a,node.x,node.y,node.x,nodes[i+n].y,a.p.copper);});
    nodes.forEach((node,i)=>{dot(a,node.x,node.y,cell*.15,a.p.panel,a.p.teal);if(s.job&&phase&&Math.floor(s.job.progress*3)%count===i)dot(a,node.x,node.y,cell*.25,null,a.p.copper);});
    text(a,num(m.active)+' active physical qubits',a.w/2,y+bh+24,a.p.ink,11,'center',sans);
    if(m.active>count)text(a,'Schematic subset · '+count+' sites drawn',a.w/2,y+bh+42,a.p.muted,9,'center');
    if(show){const ly=a.h*.63,lh=a.h-ly-46;landscape(a,s,40,ly,a.w-66,lh);text(a,'Classically computed two-spin expectation',a.w/2,a.h-11,a.p.muted,a.w<400?9:10,'center');}
    else text(a,'Coupling is a resource. Entanglement is not a speedup.',a.w/2,a.h-28,a.p.muted,a.w<430?9:10,'center');
    document.getElementById('machine').setAttribute('aria-label',num(m.active)+' active physical qubits; '+count+' sites in the illustrative chip schematic.'+(show?' The lower plot shows the exact classically computed two-spin variational energy as a function of the ansatz angle, with the classical ground-state reference.':''));
  }
  function surface(a,s,m,phase) {
    grid(a);const d=s.distance,cell=Math.min(49,(a.w-58)/(d+1),(a.h-106)/(d+1)),cx=a.w/2,cy=a.h*.49,ox=cx-(d-1)*cell/2,oy=cy-(d-1)*cell/2;
    text(a,'04 / ROTATED MEMORY PATCH',20,24,a.p.copper,10);
    const checks=[];
    for(let r=0;r<d-1;r++)for(let c=0;c<d-1;c++)checks.push({c:c+.5,r:r+.5,type:(r+c)%2?'X':'Z',data:[[c,r],[c+1,r],[c,r+1],[c+1,r+1]]});
    for(let i=0;i<d-1;i+=2){checks.push({c:i+.5,r:-.5,type:'X',data:[[i,0],[i+1,0]]},{c:i+1.5,r:d-.5,type:'X',data:[[i+1,d-1],[i+2,d-1]]},{c:-.5,r:i+1.5,type:'Z',data:[[0,i+1],[0,i+2]]},{c:d-.5,r:i+.5,type:'Z',data:[[d-1,i],[d-1,i+1]]});}
    checks.forEach((check,i)=>{
      const xx=ox+check.c*cell,yy=oy+check.r*cell,hit=(s.result?.id==='memory'&&s.result.bins[i%8]>0&&i<8)||(phase&&s.job?.id==='memory'&&i===Math.floor(s.job.progress*3)%checks.length);
      check.data.forEach(([c,r])=>line(a,xx,yy,ox+c*cell,oy+r*cell,hit?a.p.copper:a.p.line));
      box(a,xx-cell*.12,yy-cell*.12,cell*.24,cell*.24,hit?a.p.copper:a.p.soft,check.type==='X'?a.p.teal:a.p.copper,1);
      if(cell>34)text(a,check.type,xx,yy,hit?a.p.bg:a.p.muted,8,'center');
    });
    for(let r=0;r<d;r++)for(let c=0;c<d;c++)dot(a,ox+c*cell,oy+r*cell,cell*.105,a.p.chip,a.p.teal);
    const footY=a.h-61;dot(a,24,footY,3,a.p.chip,a.p.teal);text(a,d*d+' data',34,footY,a.p.muted,10);
    box(a,a.w*.45-4,footY-4,8,8,a.p.soft,a.p.copper,1);text(a,(d*d-1)+' ancilla',a.w*.45+10,footY,a.p.muted,10);
    text(a,'d = '+d+' · '+m.patch+' physical qubits / ideal patch',a.w/2,a.h-38,a.p.ink,a.w<400?10:11,'center',sans);
    if(a.w<430){text(a,'Detection events are illustrative.',a.w/2,a.h-25,a.p.muted,9,'center');text(a,'Unknown state is not displayed.',a.w/2,a.h-11,a.p.muted,9,'center');}
    else text(a,'Illustrative detection events · unknown state is not displayed',a.w/2,a.h-16,a.p.muted,10,'center');
    document.getElementById('machine').setAttribute('aria-label','Ideal rotated distance '+d+' memory patch: '+d*d+' data qubits and '+(d*d-1)+' ancilla qubits, '+m.patch+' physical qubits in total. Detection highlights are illustrative; no unknown data state is displayed.');
  }
  function logical(a,s,m,phase) {
    grid(a);text(a,'05 / ALLOCATION, THEN OPERATION',20,24,a.p.copper,10);
    const colors={application:a.p.teal,routing:a.p.copper,factory:a.p.warning,spare:a.p.muted},total=m.totalPatches;
    const cols=Math.max(1,Math.ceil(Math.sqrt(Math.max(total,1)*(a.w-48)/(a.h-136)))),rows=Math.ceil(Math.max(total,1)/cols),cell=Math.min(39,(a.w-45)/cols,(a.h-133)/rows),side=cell*.7,ox=(a.w-cols*cell)/2,oy=69;
    const cells=[];
    for(let i=0;i<total;i++){
      const kind=i<m.routing?'routing':i<m.routing+m.spares?'spare':i<m.reserved?'factory':'application',x=ox+(i%cols)*cell,y=oy+Math.floor(i/cols)*cell;
      box(a,x+(cell-side)/2,y+(cell-side)/2,side,side,a.p.chip,colors[kind],Math.min(3,side*.12));
      if(side>24){const label={application:'L',routing:'R',factory:'F',spare:'S'}[kind];text(a,label,x+cell/2,y+cell/2,colors[kind],10,'center');}
      cells.push({x:x+cell/2,y:y+cell/2,kind});
    }
    if(!total)text(a,'No complete patch fits the supported footprint.',a.w/2,a.h*.44,a.p.warning,11,'center',sans);
    const fy=a.h-65,items=[['application',m.slots+' application'],['routing',m.routing+' routing'],['factory',m.factoryUnits+' factory'],['spare',m.spares+' spare']];
    items.forEach(([kind,label],i)=>{const x=18+(i%2)*(a.w/2),y=fy+Math.floor(i/2)*20;box(a,x,y-3,6,6,colors[kind],null,1);text(a,label,x+12,y,a.p.muted,10);});
    text(a,(a.w<430?'FICTIONAL UNITS · ':'FICTIONAL PATCH-SIZED UNITS · ')+total+' AVAILABLE',a.w/2,a.h-15,a.p.muted,a.w<430?9:10,'center');
    if(m.reserved>total)text(a,'Allocation exceeds the current footprint',a.w/2,47,a.p.warning,10,'center');
    else text(a,num(m.active-total*m.patch)+' physical qubits outside complete patches',a.w/2,47,a.p.muted,9,'center');
    if(m.factoryOK&&!s.paused&&!s.ended&&phase){const factory=cells.filter(c=>c.kind==='factory'),target=cells.find(c=>c.kind==='routing');
      if(factory.length&&target){const from=factory[0],t=(phase/6)%1;line(a,from.x,from.y,target.x,from.y,a.p.line,1,[2,5]);line(a,target.x,from.y,target.x,target.y,a.p.line,1,[2,5]);dot(a,from.x+(target.x-from.x)*t,from.y,2,a.p.copper);}
    }
    document.getElementById('machine').setAttribute('aria-label','Fictional logical allocation budget: '+total+' complete patch-sized units, '+m.slots+' application slots, '+m.routing+' routing units, '+m.spares+' spare unit, '+m.factoryUnits+' factory units. Factory motion represents scheduling rehearsals; no quantum states are stored.');
  }
  function schedule(a,s,m,id) {
    grid(a);const w=C.workloads.find(w=>w.id===id)||C.workloads[0],b=G.workloadStatus(s,w.id),parallel=Math.max(b.gateTime,b.factoryTime,b.feedbackTime),known=Number.isFinite(parallel),effective=known?parallel:Math.max(b.gateTime,b.feedbackTime),finish=w.preparation+effective+w.readout+w.classical;
    text(a,'06 / THE COMPLETE SCHEDULE',20,24,a.p.copper,10);text(a,'Selected recipe · one execution · μs',20,45,a.p.muted,a.w<430?9:10);
    const left=a.w<430?104:139,right=24,pw=a.w-left-right,top=83,gap=(a.h-169)/6;
    const items=[['Preparation',0,w.preparation,a.p.muted],['Operations',w.preparation,b.gateTime,a.p.teal],['Fresh states',w.preparation,b.factoryTime,a.p.copper],['Feedback',w.preparation,b.feedbackTime,a.p.warning],['Readout',w.preparation+effective,w.readout,a.p.muted],['Classical',w.preparation+effective+w.readout,w.classical,a.p.muted]];
    for(let k=0;k<=4;k++)line(a,left+pw*k/4,top-13,left+pw*k/4,top+gap*5+15,a.p.line,1,[2,5]);
    items.forEach(([label,start,duration,color],i)=>{
      const y=top+i*gap;text(a,label,18,y,a.p.ink,a.w<430?10:11,'left',sans);
      const bx=left+pw*start/finish,bw=Number.isFinite(duration)?Math.max(2,pw*duration/finish):Math.max(12,pw*.65);
      if(Number.isFinite(duration)){box(a,bx,y-5,bw,10,color,null,1);text(a,num(duration),a.w-14,y+15,a.p.muted,9,'right');}
      else{box(a,bx,y-5,bw,10,a.p.panel,a.p.warning,1);text(a,'factory unqualified',a.w-14,y+15,a.p.warning,9,'right');}
    });
    const axis=top+gap*5+29;text(a,'0',left,axis,a.p.muted,9);text(a,known?num(finish)+' μs':'time not qualified',a.w-24,axis,a.p.muted,9,'right');
    const running=s.job?.workload&&s.job.id===w.id;line(a,20,a.h-60,a.w-20,a.h-60,a.p.line);if(running)line(a,20,a.h-60,20+(a.w-40)*Math.min(1,s.job.progress/s.job.duration),a.h-60,a.p.teal,2);
    text(a,w.repetitions+' repetition'+(w.repetitions===1?'':'s')+' · '+num(b.runtime)+' μs full modeled task',a.w/2,a.h-43,a.p.ink,a.w<430?10:11,'center',sans);
    text(a,running?'Lab progress ≠ modeled wall time.':a.w<430?'Parallel stages overlap; overhead follows.':'Overlapping work takes the maximum, then sequential overhead.',a.w/2,a.h-20,a.p.muted,10,'center');
    document.getElementById('machine').setAttribute('aria-label','Selected educational workload schedule. Preparation '+w.preparation+' microseconds, operations '+num(b.gateTime)+', fresh-state production '+num(b.factoryTime)+', feedback '+num(b.feedbackTime)+', readout '+w.readout+', classical processing '+w.classical+'. '+w.repetitions+' repetitions. Full modeled runtime '+num(b.runtime)+' microseconds. Laboratory progress is a separate pacing clock.');
  }
  function measurement(a,s,m) {
    const result=s.result;if(!result&&!s.tutorial)return;
    if(result?.id==='vqe'&&s.tutorial){
      const t=s.tutorial,left=38,pw=a.w-64;const cols=[a.p.teal,a.p.copper];
      text(a,'+1 counts',left,13,cols[0],10);text(a,'−1 counts',a.w-25,13,cols[1],10,'right');
      t.groups.forEach((g,i)=>{const y=42+i*37,sum=g.plus+g.minus; text(a,g.label,8,y,a.p.ink,11);box(a,left,y-7,pw*g.plus/sum,14,cols[0],null,1);box(a,left+pw*g.plus/sum,y-7,pw*g.minus/sum,14,cols[1],null,1);text(a,num(g.plus)+' / '+num(g.minus),left+pw/2,y+16,a.p.muted,9,'center');});
      text(a,'Classical reference: −√2.44',a.w/2,151,a.p.muted,10,'center');
      document.getElementById('measurement').setAttribute('aria-label','Actual classically simulated Pauli sample groups: '+t.groups.map(g=>g.label+', '+g.plus+' plus-one and '+g.minus+' minus-one counts').join('; ')+'. Classical ground-state reference is negative square root of 2.44.');return;
    }
    const bins=result?.bins||[];
    if(bins.length){
      const isMemory=result.id==='memory',max=Math.max(1,...bins),left=38,top=17,bottom=a.h-32,pw=a.w-left-17,step=pw/bins.length,bw=Math.min(80,step*.55);
      for(let i=0;i<=2;i++){const y=bottom-(bottom-top)*i/2;line(a,left,y,a.w-16,y,a.p.line,1,[2,4]);text(a,num(max*i/2),left-7,y,a.p.muted,9,'right');}
      bins.forEach((value,i)=>{const x=left+step*i+(step-bw)/2,h=(bottom-top-9)*value/max;box(a,x,bottom-h,bw,h||1,i%2?a.p.copper:a.p.teal,null,2);text(a,num(value),x+bw/2,bottom-h-9,a.p.ink,10,'center');text(a,isMemory?'D'+(i+1):bins.length===2?String(i):i.toString(2).padStart(2,'0'),x+bw/2,bottom+17,a.p.muted,10,'center');});
      document.getElementById('measurement').setAttribute('aria-label',(isMemory?'Illustrative detection-event counts, 100 Bernoulli trials for each detector: ':'Actual sample counts from repeated known preparations: ')+bins.join(', ')+'.');return;
    }
    if(['ramsey','echo'].includes(result?.id)){
      const coherence=result.id==='ramsey'?18.4:42,left=23,top=16,pw=a.w-46,ph=a.h-43;line(a,left,top+ph/2,left+pw,top+ph/2,a.p.line);wave(a,left,top+ph/2,pw,ph*.43,t=>Math.exp(-t*48/coherence)*Math.cos(t*33),a.p.teal);text(a,'Selected '+(result.id==='ramsey'?'Ramsey T₂*':'echo T₂')+' scenario · '+coherence+' μs',a.w/2,a.h-13,a.p.muted,10,'center');document.getElementById('measurement').setAttribute('aria-label','Selected '+result.id+' coherence scenario, '+coherence+' microseconds. This trace is illustrative, not fitted hardware data.');return;
    }
    const message=result?.id==='benchmark'?'RB estimate is distinct from threshold-model noise.':result?.id==='factory'?'Rehearsal credits · no quantum-state stock.':result?.id==='gates'?'Operation readiness is checked separately from memory.':'Calibration reduces drift. Conditions remain current.';
    line(a,25,76,a.w-25,76,a.p.line);for(let i=0;i<5;i++){const xx=25+(a.w-50)*i/4;dot(a,xx,76,5,a.p.chip,i===4?a.p.copper:a.p.teal);}
    text(a,message,a.w/2,121,a.p.muted,a.w<430?9:11,'center',sans);document.getElementById('measurement').setAttribute('aria-label',message);
  }
  function evolution(a,s) {
    const narrow=a.w<540,columns=narrow?3:6,rows=narrow?2:1,cell=(a.w-28)/columns,size=Math.min(50,cell*.47),cy=narrow?58:a.h*.43;
    const labels=['Signal','Control','Circuit','Memory','Logical','Useful'];
    for(let i=0;i<6;i++){
      const row=Math.floor(i/columns),col=i%columns,cx=14+cell*(col+.5),yy=cy+row*(a.h*.43);
      if(col<columns-1)line(a,cx+size*.65,yy,cx+cell-size*.65,yy,a.p.line,1,[2,5]);
      box(a,cx-size/2,yy-size/2,size,size,a.p.chip,a.p.line,5);
      if(i===0)qubit(a,cx,yy,size*.15);
      if(i===1)wave(a,cx-size*.36,yy,size*.72,size*.15,t=>Math.exp(-t*2)*Math.sin(t*18),a.p.teal);
      if(i===2){for(let r=0;r<2;r++)for(let c=0;c<2;c++){const xx=cx+(c-.5)*size*.4,y=yy+(r-.5)*size*.4;line(a,xx,yy-size*.2,xx,yy+size*.2,a.p.copper);line(a,cx-size*.2,y,cx+size*.2,y,a.p.copper);dot(a,xx,y,2.5,a.p.chip,a.p.teal);}}
      if(i===3){for(let r=0;r<3;r++)for(let c=0;c<3;c++)dot(a,cx+(c-1)*size*.24,yy+(r-1)*size*.24,1.8,a.p.teal);for(let r=0;r<2;r++)for(let c=0;c<2;c++)box(a,cx+(c-.5)*size*.24-1.5,yy+(r-.5)*size*.24-1.5,3,3,a.p.copper,null,0);}
      if(i===4){for(let r=0;r<2;r++)for(let c=0;c<3;c++)box(a,cx+(c-1)*size*.24-3,yy+(r-.5)*size*.27-3,6,6,a.p.chip,c===2?a.p.copper:a.p.teal,1);}
      if(i===5){for(let k=0;k<3;k++)box(a,cx-size*.29,yy+(k-1)*size*.18-2,size*(k===1?.58:.38),4,k===1?a.p.copper:a.p.teal,null,1);}
      text(a,labels[i],cx,yy+size*.7,a.p.muted,narrow?10:11,'center',sans);text(a,'0'+(i+1),cx,yy-size*.8,a.p.copper,9,'center');
    }
    text(a,'ONE LABORATORY · SIX CHAPTERS',a.w/2,a.h-17,a.p.muted,a.w<430?9:10,'center');
  }
  function draw(s,opts={}) {
    const p=palette(),m=G.metrics(s),a=fit('machine',p),phase=!reduced.matches&&!s.paused&&!s.ended&&(s.job||(m.factoryOK&&s.credits<2000))?(opts.time??performance.now())/1000:0;
    if(a)[opening,control,noisy,surface,logical,(a,s,m)=>schedule(a,s,m,opts.workload)][G.stage(s)](a,s,m,phase);
    const b=fit('measurement',p);if(b)measurement(b,s,m);
    const e=fit('ending-art',p);if(e)evolution(e,s);
  }
  function postcard(s) {
    const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=720;const p={bg:'#f5f3ec',panel:'#eeeee5',ink:'#203633',muted:'#586c64',line:'#cdd4ca',copper:'#945936',teal:'#236b59',soft:'#dce7dc',chip:'#e0e5da',warning:'#925b29'},a={x:canvas.getContext('2d'),w:1200,h:720,p},m=G.metrics(s);
    a.x.fillStyle=p.bg;a.x.fillRect(0,0,1200,720);box(a,24,24,1152,672,null,p.line,9);
    text(a,'COHERENT.',64,69,p.ink,21,'left',sans);text(a,'ONE QUBIT IN RETURN',1136,69,p.copper,12,'right');
    text(a,'The machine has a purpose.',600,150,p.ink,63,'center',serif);
    text(a,'For Keir, who turned one neuron into a world.',600,219,p.ink,29,'center',serif);
    text(a,'Here is one qubit in return.',600,256,p.copper,31,'center',serif);
    a.x.save();a.x.translate(110,290);evolution({x:a.x,w:980,h:210,p},s);a.x.restore();
    const seconds=Math.floor(s.elapsed),clock=Math.floor(seconds/60)+'m '+seconds%60+'s';
    const stats=[[clock,'visible laboratory time'],[s.done.length+' / 30','research discoveries'],[num(m.active),'active physical qubits'],[String(s.completed.length),'named recipes completed']];
    stats.forEach(([value,label],i)=>{const x=168+i*288;text(a,value,x,550,p.ink,28,'center',mono);text(a,label,x,583,p.muted,12,'center',sans);});
    line(a,64,622,1136,622,p.line);text(a,'Modeled scenario completion · no large quantum result is computed.',64,656,p.muted,11,'left',sans);text(a,'Inspired by Singular Value · singularvalue.org',1136,656,p.copper,11,'right',sans);
    return canvas;
  }
  window.CoherentArt={draw,postcard};
})();
