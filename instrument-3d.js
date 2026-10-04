/* Original Three.js laboratory dioramas. The engine and exact 2D plots remain authoritative. */
(function () {
  'use strict';
  const G=window.Coherent, original=window.CoherentArt, kit=window.CoherentThree;
  if(!G||!original)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer: fine)');
  const figure=document.querySelector('.machine-figure'),machine=document.getElementById('machine');
  if(!figure||!machine)return;
  const host=document.createElement('div');host.id='three-lab';
  host.innerHTML='<div id="three-toolbar" role="group" aria-label="Instrument camera"><span class="three-render-label">Spatial instrument</span><button type="button" data-camera="oblique" aria-pressed="true">Oblique</button><button type="button" data-camera="top" aria-pressed="false">Top</button><button type="button" data-camera="reset">Reset</button><button type="button" id="three-toggle" aria-pressed="true">2D view</button></div><canvas id="three-canvas" role="img" aria-label="Illustrative three-dimensional superconducting apparatus">The full laboratory remains available in two dimensions and as text.</canvas><dl id="three-key" hidden></dl><p id="three-description"></p><p id="three-status" class="caption" role="status"></p>';
  figure.insertBefore(host,machine);
  const keyLegend=document.getElementById('three-key');let keyHTML='';
  const canvas=document.getElementById('three-canvas'),description=document.getElementById('three-description'),status=document.getElementById('three-status'),toggle=document.getElementById('three-toggle');
  const cameraButtons=[...host.querySelectorAll('[data-camera]')];
  const fmt=(n,d=0)=>Number.isFinite(n)?n.toLocaleString('en-US',{maximumFractionDigits:d}):'unqualified';
  let enabled=true,available=!!kit,renderer,scene,camera,controls,assembly,environment;
  let lastState,lastOptions={},structure='',theme='',cameraMode='oblique',model={},moving=null,frames=0,renderKey='',width=0,height=0;
  const geometries=[],materials=[],temporary=[];
  const matrix=kit?new kit.THREE.Matrix4():null,position=kit?new kit.THREE.Vector3():null,scale=kit?new kit.THREE.Vector3():null,quaternion=kit?new kit.THREE.Quaternion():null;
  let T,batches,palette,observed={id:'',progress:0,time:0};
  function setText(element,value){if(element.textContent!==value)element.textContent=value;}
  function display(){
    figure.classList.toggle('three-enabled',enabled&&available);
    figure.classList.toggle('three-fallback',!enabled||!available);
    canvas.hidden=!enabled||!available;description.hidden=!enabled||!available;
    toggle.textContent=available?(enabled?'2D view':'3D view'):'3D unavailable';
    toggle.disabled=!available;toggle.setAttribute('aria-pressed',String(enabled&&available));
    cameraButtons.forEach(button=>button.disabled=!enabled||!available);keyLegend.hidden=!enabled||!available||!['4','5'].includes(host.dataset.chapter);
    const chapter=lastState?G.stage(lastState):0;
    figure.classList.toggle('three-trace',enabled&&available&&(chapter===1||chapter===2&&G.has(lastState,'ansatz')));
  }
  function fallback(message){available=false;enabled=false;display();setText(status,message+' The complete 2D instrument remains available.');}
  function material(name,color,metalness=.5,roughness=.38){
    const value=new T.MeshStandardMaterial({color,metalness,roughness});materials.push(value);palette[name]=value;return value;
  }
  function geometry(value){geometries.push(value);return value;}
  function init(){
    if(!kit){fallback('The local 3D toolkit could not load.');return false;}
    try {
      T=kit.THREE;
      renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'low-power'});
      renderer.setPixelRatio(Math.min(1.5,window.devicePixelRatio||1));
      renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;
      renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
      scene=new T.Scene();camera=new T.OrthographicCamera(-7,7,7,-7,.1,70);
      scene.add(new T.HemisphereLight(0xd9efef,0x66523c,2.4));
      const key=new T.DirectionalLight(0xffead8,4.1);key.position.set(-3,10,6);key.castShadow=true;
      key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-8;key.shadow.camera.right=8;key.shadow.camera.top=8;key.shadow.camera.bottom=-8;key.shadow.camera.far=25;key.shadow.normalBias=.035;key.shadow.bias=-.0002;scene.add(key);
      const rim=new T.DirectionalLight(0x8abfbf,2.1);rim.position.set(5,4,-7);scene.add(rim);
      const env=document.createElement('canvas');env.width=512;env.height=256;const x=env.getContext('2d'),gradient=x.createLinearGradient(0,0,0,256);
      gradient.addColorStop(0,'#dce9e6');gradient.addColorStop(.36,'#8faaa5');gradient.addColorStop(.6,'#20302e');gradient.addColorStop(1,'#81725e');x.fillStyle=gradient;x.fillRect(0,0,512,256);
      x.fillStyle='#fff8e8';x.fillRect(30,20,65,105);x.fillStyle='#d1eeef';x.fillRect(270,34,110,62);x.fillStyle='#e8cdb0';x.fillRect(450,45,30,90);
      const texture=new T.CanvasTexture(env);texture.mapping=T.EquirectangularReflectionMapping;texture.colorSpace=T.SRGBColorSpace;
      const pmrem=new T.PMREMGenerator(renderer);environment=pmrem.fromEquirectangular(texture);scene.environment=environment.texture;texture.dispose();pmrem.dispose();
      palette={};material('graphite',0x1c2e31,.68,.4);material('edge',0x435b5f,.75,.3);material('copper',0xbf8659,.86,.3);material('gold',0xddb875,.82,.29);material('ceramic',0xe1e4d6,.18,.62);material('silicon',0x133e42,.62,.29);material('silver',0xa9b8b4,.9,.29);material('teal',0x54b4a0,.45,.32);material('ancilla',0xd49161,.6,.32);material('muted',0x667f7a,.35,.55);material('factory',0xd4a752,.62,.32);material('trace',0x8cafaa,.42,.38);palette.signal=new T.MeshBasicMaterial({color:0xb9ead6});materials.push(palette.signal);
      const shape=new T.Shape(),r=.055;shape.moveTo(-.5+r,-.5);shape.lineTo(.5-r,-.5);shape.quadraticCurveTo(.5,-.5,.5,-.5+r);shape.lineTo(.5,.5-r);shape.quadraticCurveTo(.5,.5,.5-r,.5);shape.lineTo(-.5+r,.5);shape.quadraticCurveTo(-.5,.5,-.5,.5-r);shape.lineTo(-.5,-.5+r);shape.quadraticCurveTo(-.5,-.5,-.5+r,-.5);
      geometry(new T.BoxGeometry(1,1,1));geometry(new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:3}).translate(0,0,-.5).rotateX(-Math.PI/2));geometry(new T.CylinderGeometry(1,1,1,24));geometry(new T.SphereGeometry(1,12,8));geometry(new T.TorusGeometry(1,.035,6,40).rotateX(Math.PI/2));
      assembly=new T.Group();scene.add(assembly);
      controls=new kit.OrbitControls(camera,canvas);controls.target.set(0,.55,0);controls.enableDamping=false;controls.enableZoom=false;controls.enablePan=false;controls.minPolarAngle=.025;controls.maxPolarAngle=Math.PI*.47;controls.minAzimuthAngle=-Math.PI*.42;controls.maxAzimuthAngle=Math.PI*.42;canvas.style.touchAction='pan-y';
      controls.addEventListener('change',()=>{renderKey='';renderScene();});
      canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();fallback('The 3D graphics context was lost. Reload to reinitialize the spatial instrument.');});
      window.addEventListener('pagehide',event=>{if(event.persisted)return;controls.dispose();clear();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());environment?.dispose();renderer.dispose();});
      setText(status,'Drag to inspect on desktop. Camera buttons work with touch and keyboard.');
      setCamera('oblique');return true;
    } catch(error){fallback('WebGL 2 is unavailable in this browser.');return false;}
  }
  function clear(){
    if(assembly){for(const child of [...assembly.children]){assembly.remove(child);if(child.isInstancedMesh)child.dispose();}}
    temporary.splice(0).forEach(value=>value.dispose());moving=null;
  }
  function add(geo,mat,x,y,z,sx,sy,sz,rotation){
    const key=geo.uuid+mat.uuid;let batch=batches.get(key);if(!batch){batch={geo,mat,transforms:[]};batches.set(key,batch);}
    position.set(x,y,z);scale.set(sx,sy,sz);quaternion.identity();if(rotation)quaternion.copy(rotation);matrix.compose(position,quaternion,scale);batch.transforms.push(matrix.clone());
  }
  function box(x,y,z,w,h,d,mat='graphite',bevel=true){add(geometries[bevel?1:0],palette[mat],x,y,z,w,h,d);}
  function cylinder(x,y,z,r,h,mat='silver'){add(geometries[2],palette[mat],x,y,z,r,h,r);}
  function sphere(x,y,z,r,mat='teal'){add(geometries[3],palette[mat],x,y,z,r,r,r);}
  function link(a,b,r=.022,mat='copper'){
    const vector=new T.Vector3().subVectors(b,a),q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),vector.clone().normalize()),mid=a.clone().add(b).multiplyScalar(.5);
    add(geometries[2],palette[mat],mid.x,mid.y,mid.z,r,vector.length(),r,q);
  }
  function line(x1,z1,x2,z2,y=.63,r=.022,mat='copper'){link(new T.Vector3(x1,y,z1),new T.Vector3(x2,y,z2),r,mat);}
  function cable(points,mat='silver',radius=.055){
    const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),g=new T.TubeGeometry(curve,32,radius,7,false);temporary.push(g);const mesh=new T.Mesh(g,palette[mat]);assembly.add(mesh);return curve;
  }
  function plate(x,z,w,d,y=.15){
    box(x,y,z,w,.25,d,'graphite');box(x,y+.17,z,w*.98,.075,d*.98,'edge');
    for(const xx of [-1,1])for(const zz of [-1,1]){cylinder(x+xx*(w/2-.23),y+.27,z+zz*(d/2-.23),.073,.07);line(x+xx*(w/2-.23)-.04,z+zz*(d/2-.23),x+xx*(w/2-.23)+.04,z+zz*(d/2-.23),y+.31,.009,'graphite');}
  }
  function label(value,x,z,w=2,y=.42,color='#d6e9df'){
    const c=document.createElement('canvas');c.width=512;c.height=64;const ctx=c.getContext('2d');ctx.clearRect(0,0,512,64);ctx.font='24px monospace';ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(value,256,32);
    const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;const mat=new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false});const geo=new T.PlaneGeometry(w,w/8);const mesh=new T.Mesh(geo,mat);mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);assembly.add(mesh);temporary.push(texture,mat,geo);
  }
  function substrate(x,z,w,d,y=.6){
    box(x,y-.13,z,w+.38,.18,d+.38,'copper');box(x,y,z,w,.14,d,'ceramic');box(x,y+.09,z,w*.91,.06,d*.89,'silicon');
    for(const xx of [-1,1])for(const zz of [-1,1])cylinder(x+xx*w*.47,y+.13,z+zz*d*.45,.07,.08);
  }
  function transmon(x,z,y=.76,size=1){
    box(x-.18*size,y,z,.29*size,.035,.58*size,'gold');box(x+.18*size,y,z,.29*size,.035,.58*size,'gold');
    line(x-.04*size,z,x+.04*size,z,y+.024,.012*size,'silver');box(x,y+.03,z,.045*size,.025,.07*size,'ceramic',false);
    line(x,z+.3*size,x,z+.42*size,y,.013*size,'copper');
  }
  function resonator(x,z,w=2,y=.76){
    const steps=7,step=w/steps;let previous=[x,z];
    for(let i=0;i<steps;i++){const next=[x+i*step,z+(i%2?-.55:.55)];line(previous[0],previous[1],next[0],next[1],y,.026,'gold');line(next[0],next[1],next[0]+step,next[1],y,.026,'gold');previous=[next[0]+step,next[1]];}
    line(previous[0],previous[1],x+w+.18,z,y,.026,'gold');
  }
  function coldColumn(x,z){
    for(const [y,r] of [[.6,.84],[1.15,.73],[1.75,.6]]){cylinder(x,y,z,r,.085,'copper');cylinder(x,y+.055,z,r*.7,.04,'gold');}
    for(let i=0;i<3;i++){const angle=i*Math.PI*2/3; cylinder(x+Math.cos(angle)*.51,1.15,z+Math.sin(angle)*.51,.055,1.16,'silver');}
    label('COLD STAGES',x,z+1.1,1.6,.38);
  }
  function controller(x,z){
    box(x,1.04,z,1.05,1.38,1.2,'graphite');box(x,1.05,z+.625,.94,1.16,.035,'silver',false);
    for(let i=0;i<4;i++){box(x,1.4-i*.26,z+.65,.63,.1,.028,'silicon');sphere(x-.37,1.4-i*.26,z+.695,.023,i%2?'gold':'teal');}
    for(let i=0;i<5;i++)box(x-.3+i*.15,1.77,z,.045,.015,.74,'edge',false);
  }
  function base(){plate(0,0,10,6.8);box(0,-.16,0,10.5,.16,7.3,'graphite');label('COHERENT / SUPERCONDUCTING LABORATORY',0,2.95,5,.34);}
  function opening(){
    base();substrate(.6,.25,5.8,3.25,.71);transmon(-.65,.25,.83,1.8);resonator(1,.25,1.7,.83);
    line(-2.12,.25,-1.05,.25,.83,.037,'gold');line(2.95,.25,3.23,.25,.83,.037,'gold');
    coldColumn(-3.64,-1.72);controller(3.66,-1.9);
    const controlPath=cable([[-4.3,.45,1.52],[-3.3,.54,1.5],[-3.05,.8,.25],[-2.4,.83,.25]],'copper',.058);
    const readoutPath=cable([[3.24,.83,.25],[4.25,.75,.25],[4.4,1.05,-1.4],[4.16,1.05,-1.4]],'silver');
    label('q0 / CAPACITOR + JUNCTION',-.72,1.38,2.6,.88);label('READOUT RESONATOR',1.56,1.36,2.1,.88);
    model={chapter:0,data:1,ancilla:0,subset:1};moving={kind:'prepare',position:new T.Vector3(-.65,.9,.25),controlPath,readoutPath};
  }
  function control(){
    base();controller(-3.58,-1.02);controller(-2.2,-1.02);coldColumn(3.62,-1.85);
    substrate(.72,.6,3.55,2.5,.64);transmon(.08,.59,.76,1.32);resonator(.7,.58,1.05,.76);
    const controlPath=cable([[-3.05,.54,1.33],[-2.2,1.12,1.55],[-1.63,.87,1.25],[-1.08,.77,.59]],'copper',.065);
    const readoutPath=cable([[2.5,.77,.58],[3.22,.8,.54],[3.33,.82,-.45]],'silver',.052);
    plate(-2.65,1.47,2.5,1.36,.38);for(let i=0;i<8;i++){cylinder(-3.43+i*.22,.6,1.65,.063,.095,'silver');box(-3.38+i*.22,.6,1.1,.12,.035,.17,i<4?'teal':'gold');}
    label('PULSE / DELAY / READOUT',-2.66,2.08,2.7,.61);label('KNOWN PREPARATIONS',.7,1.64,2.45,.8);
    model={chapter:1,data:1,ancilla:0,subset:1};moving={kind:'control',position:new T.Vector3(.08,.83,.59),controlPath,readoutPath};
  }
  function coupled(s,m){
    base();const count=Math.min(36,m.active),n=Math.max(1,Math.ceil(Math.sqrt(count))),step=Math.min(1.14,5.5/n),oy=-(n-1)*step/2;
    substrate(0,-.1,7.4,4.92,.59);const nodes=[];
    for(let i=0;i<count;i++){const x=(i%n-(n-1)/2)*step,z=Math.floor(i/n)*step+oy-.1;nodes.push([x,z]);transmon(x,z,.72,Math.min(1,step*.74));}
    nodes.forEach(([x,z],i)=>{if(i%n<n-1&&nodes[i+1])line(x+.25,z,nodes[i+1][0]-.25,z,.71,.017,'copper');if(nodes[i+n])line(x,z+.31,x,nodes[i+n][1]-.31,.71,.017,'copper');});
    for(let i=0;i<8;i++){const z=-2.1+i*.56;line(-4.1,z,-3.77,z,.63,.039,'gold');line(3.77,z,4.1,z,.63,.039,'gold');cylinder(-4.28,.54,z,.085,.17);cylinder(4.28,.54,z,.085,.17);}
    label('PLANAR COUPLED PROCESSOR',0,2.53,4.1,.73);model={chapter:2,data:count,ancilla:0,subset:count};moving={kind:'coupled',nodes:nodes.map(([x,z])=>new T.Vector3(x,.85,z))};
  }
  function surface(s,m){
    base();const d=s.distance,step=6.2/(d+.5),origin=-(d-1)*step/2,checks=[];substrate(0,0,8.25,5.9,.53);
    for(let r=0;r<d-1;r++)for(let c=0;c<d-1;c++)checks.push({c:c+.5,r:r+.5,type:(r+c)%2?'teal':'ancilla',data:[[c,r],[c+1,r],[c,r+1],[c+1,r+1]]});
    for(let i=0;i<d-1;i+=2){checks.push({c:i+.5,r:-.5,type:'teal',data:[[i,0],[i+1,0]]},{c:i+1.5,r:d-.5,type:'teal',data:[[i+1,d-1],[i+2,d-1]]},{c:-.5,r:i+1.5,type:'ancilla',data:[[0,i+1],[0,i+2]]},{c:d-.5,r:i+.5,type:'ancilla',data:[[d-1,i],[d-1,i+1]]});}
    const zScale=.74;
    checks.forEach(check=>{const x=origin+check.c*step,z=(origin+check.r*step)*zScale;check.data.forEach(([c,r])=>line(x,z,origin+c*step,(origin+r*step)*zScale,.64,.012,'trace'));box(x,.69,z,step*.18,.058,step*.18,check.type);});
    for(let r=0;r<d;r++)for(let c=0;c<d;c++){const x=origin+c*step,z=(origin+r*step)*zScale;cylinder(x,.69,z,step*.13,.07,'ceramic');cylinder(x,.735,z,step*.082,.018,'teal');}
    label('ROTATED PATCH / DATA + CHECK ANCILLAS',0,2.54,5.4,.67);model={chapter:3,data:d*d,ancilla:checks.length,distance:d,physical:m.patch};moving={kind:'surface',nodes:checks.map(q=>new T.Vector3(origin+q.c*step,.83,(origin+q.r*step)*zScale))};
  }
  function logical(s,m){
    base();const count=m.totalPatches,cols=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,count)*1.48))),rows=Math.max(1,Math.ceil(count/cols)),cell=Math.min(count===1?3:count<=4?2:1.1,8/cols,4.45/rows),w=cols*cell,d=rows*cell;
    plate(0,-.12,Math.max(3.2,w+.5),Math.max(2.3,d+.5),.43);const nodes=[],kinds={routing:0,spare:0,factory:0,application:0};
    for(let i=0;i<count;i++){const kind=i<m.routing?'routing':i<m.routing+m.spares?'spare':i<m.reserved?'factory':'application',mat={routing:'ancilla',spare:'muted',factory:'factory',application:'teal'}[kind],x=(i%cols-(cols-1)/2)*cell,z=(Math.floor(i/cols)-(rows-1)/2)*cell-.12;
      const body=.14+cell*.12,cap=.66+body/2+.025;box(x,.66,z,cell*.76,body,cell*.76,'graphite',count<=16);box(x,cap,z,cell*.63,.035,cell*.63,mat,false);box(x,cap+.025,z,cell*.4,.018,cell*.4,'silicon',false);
      if(count<=16){for(const side of [-1,1])for(let j=-1;j<=1;j++)box(x+side*cell*.29,cap+.036,z+j*cell*.19,cell*.085,.025,cell*.09,'gold',false);label({application:'L',routing:'R',factory:'F',spare:'S'}[kind]+(i+1),x,z,cell*.37,cap+.05);}
      kinds[kind]++;nodes.push({kind,point:new T.Vector3(x,cap+.17,z)});
    }
    if(!count)label('NO COMPLETE PATCH FITS',0,0,2.8,.73,'#eac38d');
    label('APPLICATION / ROUTING / FACTORIES / SPARE',0,2.54,5.8,.45);model={chapter:4,total:count,kinds,requested:{routing:m.routing,spare:m.spares,factory:m.factoryUnits,application:m.slots},shortage:Math.max(0,m.reserved-count),physical:m.patch,remaining:m.active-count*m.patch};
    const from=nodes.find(n=>n.kind==='factory'),to=nodes.find(n=>n.kind==='routing');if(from&&to){const path=cable([[from.point.x,from.point.y,from.point.z],[from.point.x,1.15,from.point.z],[to.point.x,1.15,to.point.z],[to.point.x,to.point.y,to.point.z]],'trace',.022);moving={kind:'rehearsal',path};}
  }
  function schedule(s,m,id){
    base();const w=G.content.workloads.find(q=>q.id===id)||G.content.workloads[0],b=G.workloadStatus(s,w.id),qualified=Number.isFinite(b.factoryTime),parallel=qualified?Math.max(b.gateTime,b.factoryTime,b.feedbackTime):Math.max(b.gateTime,b.feedbackTime),finish=w.preparation+parallel+w.readout+w.classical;
    const lanes=[['PREPARE',0,w.preparation,'muted'],['OPERATE',w.preparation,b.gateTime,'teal'],['FRESH STATES',w.preparation,b.factoryTime,'copper'],['FEEDBACK',w.preparation,b.feedbackTime,'factory'],['READOUT',w.preparation+parallel,w.readout,'muted'],['CLASSICAL',w.preparation+parallel+w.readout,w.classical,'muted']],left=-3.55,span=7.25;
    lanes.forEach(([name,start,duration,mat],i)=>{const z=-2.04+i*.75;box(0,.5,z,8.4,.2,.47,'graphite');box(0,.62,z,8.12,.035,.32,'edge');label(name,-4.3,z,.96,.68);
      if(Number.isFinite(duration)){const length=span*duration/finish;box(left+span*start/finish+length/2,.71,z,Math.max(.015,length),.16,.29,mat);}
      else {for(let j=0;j<12;j++)box(left+j*.59,.71,z,.25,.035,.23,'factory');label('UNQUALIFIED',0,z,2,.8,'#eac38d');}
    });
    for(let j=0;j<=4;j++)line(left+j*span/4,-2.34,left+j*span/4,2.0,.4,.01,'trace');
    label('ONE EXECUTION / OVERLAP, THEN OVERHEAD',0,2.68,5.55,.36);model={chapter:5,workload:w.id,qualified,finish:qualified?finish:null,runtime:b.runtime,repetitions:w.repetitions,lanes:lanes.map(([name,start,duration])=>({name,start,duration:Number.isFinite(duration)?duration:null}))};moving={kind:'schedule',workload:w.id,left,span,position:new T.Vector3(left,.98,-2.04)};
  }
  function closing(s,m,id){
    base();const labels=['01 / SIGNAL','02 / CONTROL','03 / CIRCUIT','04 / MEMORY','05 / LOGICAL','06 / USEFUL'];
    for(let i=0;i<6;i++){
      const x=(i%3-1)*3,z=(Math.floor(i/3)-.5)*2.7;substrate(x,z,2.2,1.87,.63);
      if(i===0){transmon(x-.26,z,.75,.64);resonator(x+.23,z,.57,.75);}
      if(i===1){transmon(x,z,.75,.58);for(let j=0;j<3;j++){box(x-.73+j*.1,.77,z-.52,.046,.04,.32,'gold',false);line(x-.51,z-.52,x-.2,z-.52,.77,.02,'copper');}box(x+.68,.85,z+.2,.23,.27,.55,'silver');}
      if(i===2){for(let r=0;r<2;r++)for(let c=0;c<2;c++){transmon(x+(c-.5)*.75,z+(r-.5)*.66,.75,.48);if(!c)line(x-.16,z+(r-.5)*.66,x+.16,z+(r-.5)*.66,.75,.014);if(!r)line(x+(c-.5)*.75,z-.12,x+(c-.5)*.75,z+.12,.75,.014);}}
      if(i===3){for(let r=0;r<3;r++)for(let c=0;c<3;c++)cylinder(x+(c-1)*.45,.76,z+(r-1)*.45,.06,.04,'teal');for(let r=0;r<2;r++)for(let c=0;c<2;c++)box(x+(c-.5)*.45,.76,z+(r-.5)*.45,.09,.03,.09,(r+c)%2?'teal':'ancilla');for(const [dx,dz] of [[-.225,-.675],[.225,.675],[-.675,.225],[.675,-.225]])box(x+dx,.76,z+dz,.09,.03,.09,Math.abs(dx)<.5?'teal':'ancilla');}
      if(i===4){for(let r=0;r<2;r++)for(let c=0;c<3;c++){box(x+(c-1)*.52,.78,z+(r-.5)*.52,.39,.09,.39,'graphite');box(x+(c-1)*.52,.84,z+(r-.5)*.52,.28,.025,.28,c===2?'factory':r?'teal':'ancilla',false);}}
      if(i===5){const w=G.content.workloads.find(q=>q.id===id)||G.content.workloads[0],b=G.workloadStatus(s,w.id),values=[w.preparation,b.gateTime,b.factoryTime,b.feedbackTime,w.readout,w.classical],maximum=Math.max(...values.filter(Number.isFinite));values.forEach((value,j)=>{const length=Number.isFinite(value)?1.62*value/maximum:.7;box(x-.8+length/2,.78,z+(j-2.5)*.22,Math.max(.018,length),.055,.1,j===2?'copper':'teal',false);});}
      label(labels[i],x,z+.96,1.8,.8);
    }
    model={chapter:6,ending:true,schematic:true,active:m.active};moving=null;
  }
  function flush(){
    for(const batch of batches.values()){const mesh=new T.InstancedMesh(batch.geo,batch.mat,batch.transforms.length);batch.transforms.forEach((transform,i)=>mesh.setMatrixAt(i,transform));mesh.instanceMatrix.needsUpdate=true;mesh.castShadow=batch.geo===geometries[1]||batch.geo===geometries[2];mesh.receiveShadow=true;assembly.add(mesh);}
    const ring=new T.Mesh(geometries[4],new T.MeshBasicMaterial({color:0x98d7bd,transparent:true,opacity:.8,depthWrite:false}));ring.scale.setScalar(.35);ring.visible=false;assembly.add(ring);temporary.push(ring.material);if(moving){moving.indicator=ring;const pulse=new T.Mesh(geometries[3],palette.signal);pulse.scale.setScalar(.08);pulse.visible=false;assembly.add(pulse);moving.pulse=pulse;}
  }
  function rebuild(s,m,opts,key){
    const previous=model,ending=opts.view==='ending',chapter=ending?6:G.stage(s);
    clear();batches=new Map();(ending?closing:[opening,control,coupled,surface,logical,(s,m)=>schedule(s,m,opts.workload)][chapter])(s,m,opts.workload);flush();structure=key;renderKey='';
    host.dataset.chapter=String(chapter);
    const major=previous.chapter!==chapter||previous.distance!==model.distance||chapter===4&&JSON.stringify(previous.requested)!==JSON.stringify(model.requested)||chapter===5&&previous.workload!==model.workload;
    if(major&&!reduced.matches&&!s.paused&&!s.ended){canvas.classList.remove('three-reveal');void canvas.offsetWidth;canvas.classList.add('three-reveal');}
  }
  function setCamera(mode){
    if(!camera||!controls)return;cameraMode=mode==='reset'?'oblique':mode;
    camera.position.copy(cameraMode==='top'?new T.Vector3(0,16,.05):new T.Vector3(10.5,11.4,13.8));controls.target.set(0,.55,0);camera.lookAt(controls.target);controls.update();cameraButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.camera===cameraMode)));renderKey='';renderScene();
  }
  function resize(){
    if(!renderer)return false;const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return false;
    controls.enableRotate=fine.matches&&w>=500;
    const dpr=Math.min(fine.matches&&w>=500?1.5:1.25,window.devicePixelRatio||1);
    if(w!==width||h!==height||renderer.getPixelRatio()!==dpr){width=w;height=h;renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);const aspect=w/h,half=Math.max(4.8,6.5/aspect);camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();renderKey='';}return true;
  }
  function visible(){return !document.hidden&&(!lastOptions.view||['lab','ending'].includes(lastOptions.view))&&!document.getElementById('chapter-dialog')?.open;}
  function renderScene(){
    if(!renderer||!available||!enabled||!visible()||!resize())return;
    renderer.render(scene,camera);frames++;
  }
  function legend(){
    let entries=[];
    if(model.chapter===4)entries=['application','routing','factory','spare'].map(kind=>[kind,{application:'Application',routing:'Routing',factory:'Factories',spare:'Spare'}[kind],fmt(model.kinds[kind])+(model.shortage?' / '+fmt(model.requested[kind])+' requested':'')]);
    if(model.chapter===5)entries=model.lanes.map((lane,i)=>[['preparation','operations','states','feedback','readout','classical'][i],['Preparation','Operations','Fresh states','Feedback','Readout','Classical'][i],lane.duration===null?'unqualified':fmt(lane.duration)+' μs']);
    const html=entries.map(([kind,name,value])=>'<div data-kind="'+kind+'"><dt>' +name+'</dt><dd>'+value+'</dd></div>').join('');
    if(html!==keyHTML){keyLegend.innerHTML=html;keyHTML=html;}keyLegend.hidden=!entries.length||!enabled||!available;
  }
  function annotate(s,m){
    if(lastOptions.view==='ending'){const text='Six schematic milestones: known signal, careful control, coupled circuit, protected memory, logical allocation and a named useful schedule. Your selected '+fmt(m.active)+'-qubit footprint remains an educational resource scenario. The browser did not execute a large fault-tolerant quantum computation or calculate a large quantum result.';setText(description,text);canvas.setAttribute('aria-label',text);return;}
    const chapter=G.stage(s),live=!!s.job&&!s.paused&&!s.ended;
    const values=[
      'One illustrative transmon package: capacitor pads, Josephson junction, control line and folded readout resonator. Refrigerator hardware is schematic.',
      'Control bench and known-preparation circuit. The exact selected pulse, Ramsey T₂* (18.4 μs) and echo T₂ (42 μs) scenario traces remain below; they are not fitted hardware data.',
      fmt(m.active)+' active physical qubits. '+model.subset+' sites in this illustrative planar subset. Coupling and entanglement do not imply a universal speedup.'+(G.has(s,'ansatz')?' The classically computed two-spin expectation remains below.':''),
      'Ideal rotated d = '+s.distance+' patch: '+model.data+' data + '+model.ancilla+' check ancillas = '+fmt(m.patch)+' physical qubits. Teal squares mark X checks, copper squares Z checks, and circular pads data. Connections are schematic; detection highlights never reveal the unknown data state.',
      fmt(m.totalPatches)+' complete patch-sized units. '+(model.shortage?'The requested plan exceeds this footprint by '+model.shortage+' units. Physically drawn: '+model.kinds.routing+' routing, '+model.kinds.spare+' spare and '+model.kinds.factory+' factory units; no application slot fits. Requested: '+m.routing+' routing, '+m.spares+' spare and '+m.factoryUnits+' factory units.':fmt(m.slots)+' application, '+m.routing+' routing, '+m.factoryUnits+' factory and '+m.spares+' spare units.')+' '+fmt(m.active-m.totalPatches*m.patch)+' physical qubits remain outside complete patches. These are fictional allocation units, not a real factory tile layout.',
      'One-execution stages use proportional modeled durations. Gates, fresh states and feedback overlap; preparation, readout and classical overhead follow. '+model.repetitions+' repetition'+(model.repetitions===1?'':'s')+' · '+fmt(model.runtime)+' μs for the full task. '+(model.qualified?'Laboratory progress uses a separate pacing clock.':'The factory is unqualified; dashed fresh-state cells denote missing timing, not a finite rate.')
    ];
    const memoryActivity=chapter===3&&live&&s.job.id==='memory',rehearsalActivity=chapter===4&&rehearsing(s,m),experimentActivity=live&&s.job.id!=='calibrate'&&chapter!==3&&chapter!==4&&(chapter!==5||s.job.workload&&s.job.id===model.workload);
    const activity=rehearsalActivity?(reduced.matches?' A static marker identifies the classical scheduling rehearsal route.':' The moving marker represents classical scheduling rehearsal; no quantum state is stored or transported.'):memoryActivity?' Check highlights are illustrative detection events; they never reveal the unknown data state.':experimentActivity?' Highlights follow the laboratory workflow, not unknown states or real microwave propagation timing.':'';
    const text=values[chapter]+activity;
    setText(description,text);canvas.setAttribute('aria-label',text);
  }
  function rehearsing(s,m){return m.factoryOK&&s.credits<2000&&(!s.job||s.job.id==='factory')&&!s.paused&&!s.ended;}
  function animate(s,m){
    if(!moving?.indicator)return;
    const ring=moving.indicator,pulse=moving.pulse,time=lastOptions.time||0,id=s.job?s.job.id+(s.job.workload?'workload':''):'';
    if(observed.id!==id||observed.progress!==(s.job?.progress||0))observed={id,progress:s.job?.progress||0,time};
    const interpolation=reduced.matches?0:Math.min(.1,Math.max(0,(time-observed.time)/1000))*(s.job?.id==='calibrate'?1:m.experimentDuty);
    const progress=s.job?Math.min(1,(s.job.progress+interpolation)/s.job.duration):0;
    const rehearsal=moving.kind==='rehearsal'&&rehearsing(s,m);
    const relevant=moving.kind!=='rehearsal'&&s.job&&s.job.id!=='calibrate'&&(moving.kind!=='surface'||s.job.id==='memory')&&(moving.kind!=='schedule'||s.job.workload&&s.job.id===moving.workload);
    const active=visible()&&!s.paused&&!s.ended&&(relevant||rehearsal);
    ring.visible=!!active;pulse.visible=false;if(!active)return;
    if(moving.nodes){
      const index=reduced.matches?0:Math.min(moving.nodes.length-1,Math.floor(progress*moving.nodes.length));ring.position.copy(moving.nodes[index]);ring.scale.setScalar(moving.kind==='surface'?.15:.34);
      pulse.visible=!reduced.matches&&moving.kind==='surface';pulse.position.copy(moving.nodes[index]);pulse.position.y+=.03;pulse.scale.setScalar(.06);
    }else if(moving.path){
      ring.position.copy(moving.path.getPoint(reduced.matches?0:(time/6000)%1));ring.scale.setScalar(.09);pulse.visible=!reduced.matches;pulse.position.copy(ring.position);pulse.scale.setScalar(.055);
    }else if(moving.kind==='schedule'){
      ring.position.set(moving.left+moving.span*(reduced.matches?0:progress),.92,-2.04);ring.scale.setScalar(.12);
    }else{
      ring.position.copy(moving.position);ring.scale.setScalar(.32+(reduced.matches?0:.055*Math.sin(time/180)));
      if(!reduced.matches&&moving.controlPath){
        pulse.visible=progress<.38||progress>.62;const curve=progress<.38?moving.controlPath:moving.readoutPath,local=progress<.38?progress/.38:(progress-.62)/.38;
        pulse.position.copy(curve.getPoint(Math.min(1,local)));pulse.position.y+=.08;pulse.scale.setScalar(.08);
      }
    }
  }
  function draw(s,opts={}){
    lastState=s;lastOptions=opts;const ending=opts.view==='ending',destination=ending?document.getElementById('ending-view'):figure;
    if(host.parentElement!==destination)destination.insertBefore(host,ending?document.getElementById('ending-art'):machine);host.classList.toggle('three-ending',ending);
    if(!renderer&&available&&visible())init();display();original.draw(s,opts);
    if(!renderer||!enabled||!available||!visible())return;
    resize();
    const m=G.metrics(s),chapter=G.stage(s),budget=chapter===5?G.workloadStatus(s,opts.workload||G.content.workloads[0].id):null,key=JSON.stringify([ending?'ending':chapter,chapter===2?Math.min(36,m.active):null,chapter>=3?s.distance:null,chapter===4?[m.totalPatches,m.routing,m.spares,m.factoryUnits]:null,chapter===5?[opts.workload,budget.gateTime,Number.isFinite(budget.factoryTime)?budget.factoryTime:'unqualified',budget.feedbackTime,budget.runtime]:null]);
    if(key!==structure)rebuild(s,m,opts,key);
    const nextTheme=document.documentElement.dataset.theme||'dark';if(nextTheme!==theme){theme=nextTheme;scene.background=new T.Color(theme==='light'?0xe3e8dd:0x0b171b);renderKey='';}
    legend();annotate(s,m);animate(s,m);
    const animated=!reduced.matches&&!!moving?.indicator.visible,next=JSON.stringify([key,theme,s.job?.id,reduced.matches?null:s.job?.progress,s.result?.id,s.theta,s.paused,s.ended]);
    if(animated||next!==renderKey){renderScene();renderKey=next;}
  }
  host.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button===toggle){enabled=!enabled;display();renderKey='';if(lastState)draw(lastState,lastOptions);setText(status,enabled?'3D instrument active. Drag on desktop, or choose a camera button.':'2D instrument active. Game rules, exact measurements and saved progress are unchanged.');}
    else if(button.dataset.camera)setCamera(button.dataset.camera);
  });
  reduced.addEventListener('change',()=>{renderKey='';if(lastState)draw(lastState,lastOptions);});
  fine.addEventListener('change',()=>{renderKey='';if(lastState)draw(lastState,lastOptions);});
  window.CoherentArt={draw,postcard:original.postcard};
  window.Coherent3D=Object.freeze({get diagnostics(){return Object.freeze({available,enabled,chapter:lastState?G.stage(lastState):null,camera:cameraMode,scene:lastOptions.view==='ending'?'ending':'laboratory',frames,calls:renderer?.info.render.calls||0,triangles:renderer?.info.render.triangles||0,geometries:renderer?.info.memory.geometries||0,textures:renderer?.info.memory.textures||0,width,height,pixelRatio:renderer?.getPixelRatio()||0,model:JSON.parse(JSON.stringify(model))});}});
  if(!available)fallback('The local 3D toolkit could not load.');
})();
