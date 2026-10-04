/* Original cutaway laboratory. Geometry is schematic; the engine and exact 2D plots remain authoritative. */
(function () {
  'use strict';
  const G=window.Coherent,original=window.CoherentArt,kit=window.CoherentThree;
  if(!G||!original)return;
  const figure=document.querySelector('.machine-figure'),machine=document.getElementById('machine');
  if(!figure||!machine)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer: fine)'),host=document.createElement('div');
  host.id='three-lab';
  const cameras=[['overview','Overview'],['cryostat','Cryostat'],['control','Control / decoder'],['research','Research'],['processor','Processor'],['memory','Memory'],['planning','Planning'],['fabrication','Fabrication'],['top','Top']];
  host.innerHTML='<div id="three-toolbar" role="group" aria-label="Explore your laboratory"><div id="three-stations" role="group" aria-label="Laboratory camera stations">'+cameras.map(([id,name])=>'<button type="button" data-camera="'+id+'" aria-pressed="'+(id==='overview')+'">'+name+'</button>').join('')+'<button type="button" data-camera="reset">Reset</button></div><button type="button" id="three-follow" aria-pressed="true">Follow experiment</button><button type="button" id="three-expand">Expand lab</button><button type="button" id="three-pause" disabled>Pause lab</button><button type="button" id="three-toggle" aria-pressed="true">2D view</button></div><div id="three-focus-heading"><span id="three-focus-title">Your quantum laboratory</span><span id="three-growth-readout"></span></div><p id="three-event-caption" role="status" aria-live="polite"></p><canvas id="three-canvas" role="img" aria-label="An evolving cutaway superconducting laboratory">The full laboratory remains available in two dimensions and as text.</canvas><dl id="three-key" hidden></dl><p id="three-description"></p><p id="three-status" class="caption" role="status"></p>';
  figure.insertBefore(host,machine);
  const $=id=>document.getElementById(id),canvas=$('three-canvas'),description=$('three-description'),status=$('three-status'),toggle=$('three-toggle'),legend=$('three-key'),cameraButtons=[...host.querySelectorAll('[data-camera]')];
  const fmt=(n,d=0)=>Number.isFinite(n)?n.toLocaleString('en-US',{maximumFractionDigits:d}):'unqualified';
  let enabled=true,available=!!kit,T,renderer,scene,camera,controls,assembly,environment,keyLight,palette,geometryPool,batches;
  let state,options={},metrics,signature='',cameraMode='overview',theme='',width=0,height=0,dirty=true,frames=0,driver=0,lastFrame=0,lastGPU=0,lastScreen=0,model={},cameraMove=null,viewEnding=false;
  let transient=[],screens={},activity={},observed={id:'',progress:0,time:0},revealAt=0,legendHTML='',driving=false,follow=true,followJob=null,autoFocused=false,completionAt=0;
  const pooledGeometries=[],pooledMaterials=[],targets={},movables={};
  let position,scale,quaternion,matrix;
  function text(element,value){if(element.textContent!==value)element.textContent=value;}
  function visible(){return !document.hidden&&(!options.view||['lab','ending'].includes(options.view))&&!$('chapter-dialog')?.open;}
  function operating(){return !!state?.started&&!state.paused&&!state.ended&&visible()&&!reduced.matches;}
  function display(){
    const on=available&&enabled;figure.classList.toggle('three-enabled',on);figure.classList.toggle('three-fallback',!on);
    figure.classList.toggle('three-trace',on&&!viewEnding&&(G.stage(state||G.newGame())===1||G.stage(state||G.newGame())===2&&G.has(state,'ansatz')));
    canvas.hidden=!on;description.hidden=!on;legend.hidden=!on||!legendHTML;$('three-focus-heading').hidden=!on;
    toggle.disabled=!available;toggle.textContent=available?(enabled?'2D view':'3D view'):'3D unavailable';toggle.setAttribute('aria-pressed',String(on));
    cameraButtons.forEach(button=>{button.disabled=!on;const id=button.dataset.camera;button.hidden=!['overview','cryostat','control','research','top','reset'].includes(id)&&!targets[id];});
    $('three-expand').disabled=!on;$('three-pause').disabled=!state?.started||state.ended;$('three-pause').textContent=state?.paused?'Resume lab':'Pause lab';
  }
  function stop(){if(driver)cancelAnimationFrame(driver);driver=0;}
  function fallback(message){available=false;enabled=false;stop();display();text(status,message+' The complete 2D instrument remains available.');}
  function material(name,color,metalness=.45,roughness=.38){const m=new T.MeshStandardMaterial({color,metalness,roughness});palette[name]=m;pooledMaterials.push(m);return m;}
  function geo(g){pooledGeometries.push(g);return g;}
  function initialize(){
    if(!kit){fallback('The local 3D toolkit could not load.');return false;}
    try {
      T=kit.THREE;position=new T.Vector3();scale=new T.Vector3();quaternion=new T.Quaternion();matrix=new T.Matrix4();
      renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(1.5,devicePixelRatio||1));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
      renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
      scene=new T.Scene();scene.add(new T.HemisphereLight(0xaad4d9,0x27352f,1.35));
      keyLight=new T.DirectionalLight(0xffebd2,4.3);keyLight.position.set(-10,22,14);keyLight.castShadow=true;keyLight.shadow.mapSize.set(1536,1536);keyLight.shadow.camera.left=-19;keyLight.shadow.camera.right=19;keyLight.shadow.camera.top=19;keyLight.shadow.camera.bottom=-19;keyLight.shadow.camera.far=70;keyLight.shadow.normalBias=.035;keyLight.shadow.bias=-.0002;scene.add(keyLight);
      const rim=new T.DirectionalLight(0x9bd6ec,2.05);rim.position.set(14,9,-12);scene.add(rim);const front=new T.DirectionalLight(0xffcb9d,1.65);front.position.set(0,8,18);scene.add(front);const workLight=new T.PointLight(0xffddb4,26,13,2);workLight.position.set(1.3,3.6,4.4);scene.add(workLight);
      const env=document.createElement('canvas');env.width=512;env.height=256;const ctx=env.getContext('2d'),gradient=ctx.createLinearGradient(0,0,0,256);gradient.addColorStop(0,'#a5c4ce');gradient.addColorStop(.45,'#3c5663');gradient.addColorStop(.75,'#182c32');gradient.addColorStop(1,'#786651');ctx.fillStyle=gradient;ctx.fillRect(0,0,512,256);ctx.fillStyle='#fff7e9';ctx.fillRect(25,18,75,90);ctx.fillStyle='#bfe8ee';ctx.fillRect(270,35,125,50);ctx.fillStyle='#eac8aa';ctx.fillRect(452,43,26,105);
      const texture=new T.CanvasTexture(env);texture.mapping=T.EquirectangularReflectionMapping;texture.colorSpace=T.SRGBColorSpace;const pmrem=new T.PMREMGenerator(renderer);environment=pmrem.fromEquirectangular(texture);scene.environment=environment.texture;scene.environmentIntensity=.85;texture.dispose();pmrem.dispose();
      palette={};material('floor',0x2b414a,.16,.6);material('wall',0x213b46,.25,.62);material('graphite',0x15282f,.57,.42);material('edge',0x526e76,.68,.3);material('copper',0xc48755,.88,.28);material('gold',0xd9ad6a,.84,.24);material('ceramic',0xdce3d8,.1,.55);material('silicon',0x0a3540,.48,.28);material('silver',0xadbcbc,.9,.27);material('teal',0x56bfa8,.42,.3);material('ancilla',0xd79765,.6,.3);material('factory',0xcfab5d,.65,.3);material('trace',0x668b97,.45,.4);material('chair',0x223e48,.14,.75);
      palette.light=new T.MeshBasicMaterial({color:0xc0f6df});palette.warmLight=new T.MeshBasicMaterial({color:0xffdbab});palette.glass=new T.MeshPhysicalMaterial({color:0x80b6bd,metalness:.08,roughness:.17,transparent:true,opacity:.16,side:T.DoubleSide,depthWrite:false});pooledMaterials.push(palette.light,palette.warmLight,palette.glass);
      const shape=new T.Shape(),r=.065;shape.moveTo(-.5+r,-.5);shape.lineTo(.5-r,-.5);shape.quadraticCurveTo(.5,-.5,.5,-.5+r);shape.lineTo(.5,.5-r);shape.quadraticCurveTo(.5,.5,.5-r,.5);shape.lineTo(-.5+r,.5);shape.quadraticCurveTo(-.5,.5,-.5,.5-r);shape.lineTo(-.5,-.5+r);shape.quadraticCurveTo(-.5,-.5,-.5+r,-.5);
      geometryPool={box:geo(new T.BoxGeometry(1,1,1)),bevel:geo(new T.ExtrudeGeometry(shape,{depth:1,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:3}).translate(0,0,-.5).rotateX(-Math.PI/2)),cylinder:geo(new T.CylinderGeometry(1,1,1,24)),sphere:geo(new T.SphereGeometry(1,12,8)),ring:geo(new T.TorusGeometry(1,.035,5,40).rotateX(Math.PI/2)),shell:geo(new T.CylinderGeometry(1,1,1,48,1,true,Math.PI*.44,Math.PI*1.16)),plane:geo(new T.PlaneGeometry(1,1))};
      assembly=new T.Group();scene.add(assembly);camera=new T.PerspectiveCamera(37,1,.1,150);
      controls=new kit.OrbitControls(camera,canvas);controls.enableDamping=false;controls.enableZoom=false;controls.enablePan=false;controls.minPolarAngle=.08;controls.maxPolarAngle=Math.PI*.47;controls.minAzimuthAngle=-Math.PI*.45;controls.maxAzimuthAngle=Math.PI*.45;canvas.style.touchAction='pan-y';
      controls.addEventListener('start',()=>{follow=false;autoFocused=false;$('three-follow').setAttribute('aria-pressed','false');$('three-follow').textContent='Manual inspection';});
      controls.addEventListener('change',()=>{dirty=true;ensureDriver();});
      canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();fallback('The 3D graphics context was lost. Reload to reinitialize the laboratory.');});
      window.addEventListener('pagehide',event=>{stop();if(event.persisted)return;controls.dispose();clear();pooledGeometries.forEach(g=>g.dispose());pooledMaterials.forEach(m=>m.dispose());Object.values(screens).forEach(s=>{s.texture.dispose();s.material.dispose();});environment.dispose();renderer.dispose();});
      window.addEventListener('pageshow',event=>{if(event.persisted){dirty=true;ensureDriver();}});
      document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else{dirty=true;ensureDriver();}});
      document.addEventListener('fullscreenchange',()=>{text($('three-expand'),document.fullscreenElement===(host.closest('.lab-presentation')||host)?'Exit expanded lab':'Expand lab');dirty=true;ensureDriver();});
      text(status,'A cutaway superconducting laboratory. Choose a wing to inspect; drag to orbit on desktop.');return true;
    }catch(error){fallback('WebGL 2 is unavailable in this browser.');return false;}
  }
  function clear(){
    for(const child of [...assembly.children]){assembly.remove(child);if(child.isInstancedMesh)child.dispose();}
    transient.splice(0).forEach(v=>v.dispose());for(const key of Object.keys(movables))delete movables[key];
  }
  function add(g,mat,x,y,z,w,h,d,rotation,shadow=false){
    const key=g.uuid+mat.uuid+shadow;let b=batches.get(key);if(!b){b={g,mat,shadow,transforms:[]};batches.set(key,b);}
    position.set(x,y,z);scale.set(w,h,d);quaternion.identity();if(rotation)quaternion.copy(rotation);matrix.compose(position,quaternion,scale);b.transforms.push(matrix.clone());
  }
  function box(x,y,z,w,h,d,mat='graphite',bevel=false,shadow=true){add(geometryPool[bevel?'bevel':'box'],palette[mat],x,y,z,w,h,d,null,shadow);}
  function cylinder(x,y,z,r,h,mat='silver',shadow=true){add(geometryPool.cylinder,palette[mat],x,y,z,r,h,r,null,shadow);}
  function line(a,b,r=.025,mat='silver'){
    const aa=new T.Vector3(...a),bb=new T.Vector3(...b),delta=bb.clone().sub(aa),q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),delta.clone().normalize()),mid=aa.add(bb).multiplyScalar(.5);add(geometryPool.cylinder,palette[mat],mid.x,mid.y,mid.z,r,delta.length(),r,q,false);
  }
  function cable(points,mat='copper',radius=.035){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),g=new T.TubeGeometry(curve,48,radius,6,false);transient.push(g);assembly.add(new T.Mesh(g,palette[mat]));return curve;}
  function plaque(value,x,y,z,w=2,vertical=false,color='#bad8d8'){
    const c=document.createElement('canvas');c.width=512;c.height=64;const ctx=c.getContext('2d');ctx.font='23px monospace';ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(value,256,32);const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;const mat=new T.MeshBasicMaterial({map,transparent:true,depthWrite:false}),g=new T.PlaneGeometry(w,w/8),mesh=new T.Mesh(g,mat);if(!vertical)mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);assembly.add(mesh);transient.push(map,mat,g);
  }
  function screen(id,x,y,z,w=1.6,h=.9){
    if(!screens[id]){const c=document.createElement('canvas');c.width=512;c.height=256;const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;const mat=new T.MeshBasicMaterial({map:texture});screens[id]={canvas:c,texture,material:mat};}
    box(x,y,z,w+.12,h+.12,.16,'graphite',true);add(geometryPool.plane,screens[id].material,x,y,z+.09,w,h,1,null,false);
  }
  function transmon(x,y,z,size=.65){box(x-.17*size,y,z,.28*size,.025,.5*size,'gold');box(x+.17*size,y,z,.28*size,.025,.5*size,'gold');line([x-.035*size,y+.02,z],[x+.035*size,y+.02,z],.012*size);box(x,y+.023,z,.045*size,.025,.065*size,'ceramic');}
  function platform(x,z,w,d,mat='graphite'){box(x,.17,z,w,.32,d,mat,true);box(x,.35,z,w*.98,.04,d*.98,'edge');for(const dx of [-1,1])for(const dz of [-1,1])cylinder(x+dx*(w/2-.2),.41,z+dz*(d/2-.2),.065,.075);}
  function partition(x,z,w){box(x,1.62,z,w,2.55,.045,'glass',false,false);box(x,.4,z,w,.08,.08,'silver');box(x,2.92,z,w,.08,.08,'silver');for(const dx of [-1,1])box(x+dx*w/2,1.62,z,.055,2.6,.07,'silver');}
  function reserve(x,z,w,d,name){
    box(x,.079,z,w,.025,d,'wall',false,false);for(const side of [-1,1]){box(x+side*w/2,.12,z,.045,.04,d,'trace',false,false);box(x,.12,z+side*d/2,w,.04,.045,'trace',false,false);}
    for(let i=0;i<6;i++)box(x-w/2+.26+i*.33,.126,z+d/2-.13,.14,.015,.23,'gold',false,false);
    box(x,1.06,z-d/2+.21,2.16,.62,.065,'graphite',true);plaque(name+' / RESERVED',x,1.08,z-d/2+.25,1.94,true);
  }
  function room(s,m){
    const expanded=G.stage(s)>=3,fw=expanded?30:24,depth=expanded?22:18;box(0,-.28,0,fw,.5,depth,'graphite',true);box(0,.015,0,fw-.3,.08,depth-.3,'floor');
    for(let x=-fw/2+2;x<fw/2;x+=2)box(x,.061,0,.015,.008,depth-.55,'edge',false,false);
    for(let z=-depth/2+2;z<depth/2;z+=2)box(0,.063,z,fw-.55,.008,.015,'edge',false,false);
    box(0,.075,depth/2-.25,fw-.45,.015,.045,'copper',false,false);box(-fw/2+.25,.075,0,.045,.015,depth-.45,'copper',false,false);
    box(0,2.9,-depth/2+.35,fw-.5,5.5,.2,'wall');box(0,5.95,-depth/2+.25,fw,.34,.45,'graphite');
    for(const x of [-fw/2+.5,0,fw/2-.5]){box(x,3,-depth/2+.3,.28,6,.4,'silver');box(x,6.05,-depth/2+3.4,.25,.25,6.4,'graphite');box(x,5.87,-depth/2+3.4,.08,.04,5.7,'light',false,false);}
    for(let i=0;i<4;i++){box(-fw/2+3.2+i*2.15,3.9,-depth/2+.47,1.8,1.65,.035,'silicon');box(-fw/2+3.2+i*2.15,4.8,-depth/2+.51,1.7,.035,.015,'light',false,false);}
    box(fw/2-3,1.6,-depth/2+.5,2.1,3.1,.08,'graphite');box(fw/2-3,2,-depth/2+.56,1.25,1.6,.04,'glass',false,false);box(fw/2-3.85,1.4,-depth/2+.65,.04,.38,.04,'copper');
    plaque('COHERENT / QUANTUM ENGINEERING',2,4.65,-depth/2+.48,7,true,'#e8b382');
    for(const x of [-8.2,8.2]){box(x,5.75,1.3,6.2,.17,.26,'graphite');box(x,5.62,1.3,5.7,.045,.08,'light',false,false);line([x-2.8,5.78,1.3],[x-2.8,5.78,-5.3],.05,'silver');}
    if(G.stage(s)<2)reserve(.2,6,6.6,4.75,'PROCESSOR');if(G.stage(s)<3)reserve(-8.27,6.2,6.4,5.65,'MEMORY');if(G.stage(s)<4)reserve(9.6,5.2,5.65,6.5,'LOGICAL PLANNING');
    platform(0,0,5.9,5.9);box(0,.43,0,5.72,.035,5.72,'silicon');
    for(const x of [-2.7,2.7]){box(x,.44,0,.04,.05,5.55,'copper',false,false);for(const z of [-2.5,2.5])cylinder(x,.49,z,.07,.12);}
    targets.overview={at:[0,2,0],eye:[22,19,25],title:'Your quantum laboratory',radius:18};targets.top={at:[0,0,0],eye:[0,34,.2],title:'The complete facility',radius:19};
  }
  function cryostat(s,m){
    const x=0,z=-.4,plates=[[.76,.68],[1.4,.92],[2.15,1.15],[3.0,1.37],[4.12,1.64],[5.6,1.93]];
    cylinder(x,6.2,z,2.15,.25,'silver');cylinder(x,6.39,z,1.93,.16,'graphite');cylinder(x,6.49,z,1.75,.09,'silver');
    for(let i=0;i<20;i++){const a=i*Math.PI*2/20;cylinder(x+Math.cos(a)*2.01,6.42,z+Math.sin(a)*2.01,.062,.19,'gold');}
    const shell=new T.Mesh(geometryPool.shell,palette.silver);shell.position.set(x,3.47,z);shell.scale.set(2.11,5.4,2.11);shell.castShadow=true;assembly.add(shell);
    plates.forEach(([y,r],j)=>{cylinder(x,y,z,r,.1,'copper');cylinder(x,y+.072,z,r*.93,.037,'gold');add(geometryPool.ring,palette.copper,x,y-.035,z,r,.65,r,null,false);for(let k=0;k<6;k++){const a=k*Math.PI/3;cylinder(x+Math.cos(a)*r*.84,y+.105,z+Math.sin(a)*r*.84,.035,.045,'silver',false);}if(j<5)add(geometryPool.shell,palette.gold,x,y+.23,z,r*.92,.34,r*.92,null,false);});
    for(let i=0;i<3;i++){const a=i*Math.PI*2/3+.45;line([Math.cos(a)*1.42,.82,z+Math.sin(a)*1.42],[Math.cos(a)*1.42,6.11,z+Math.sin(a)*1.42],.043);}
    const coax=Math.min(32,10+2*s.pulse+2*s.rack);
    for(let i=0;i<coax;i++){const a=Math.PI*.05+i*Math.PI*1.9/coax;let previous=[Math.cos(a)*1.85,6.1,z+Math.sin(a)*1.85];for(const [y,r] of [...plates].reverse()){const next=[Math.cos(a)*r*.78,y+.14,z+Math.sin(a)*r*.78];line(previous,next,.014,i%3===0?'copper':'silver');previous=next;}}
    for(const dx of [-1,1]){box(dx*2.35,3.33,z,.23,6.28,.34,'graphite',true);box(dx*2.35,6.5,z,.68,.28,.56,'silver');cylinder(dx*2.35,.62,z,.22,.34,'silver');}
    const lid=new T.Mesh(geometryPool.shell,palette.glass);lid.position.set(0,2.3,z);lid.scale.set(2.18,2.15,2.18);assembly.add(lid);
    box(.1,.92,z+.18,.9,.12,.63,'ceramic',true);box(.1,1.0,z+.18,.72,.045,.49,'silicon');transmon(.1,1.04,z+.18,.87);plaque('MIXING STAGE / SCHEMATIC',0,.56,2.02,3.8);
    for(let j=0;j<2;j++){cylinder(-3.2+j*.76,.94,-1.1,.23,1.12,'graphite');cylinder(-3.2+j*.76,1.58,-1.1,.19,.1,'silver');line([-3.2+j*.76,1.62,-1.1],[-2.75,2.1,-.4],.065,'silver');}
    movables.controlPath=cable([[-6.55,1.65,1.38],[-4.5,.3,2.05],[2.72,.3,1.8],[2.58,4.62,.2],[1.7,6.18,-.4],[.5,3.1,-.25],[.1,1.13,-.22]],'copper',.046);
    movables.readoutPath=cable([[.1,1.14,-.22],[-1.45,4.2,-.2],[-1.6,6.21,-.4],[-2.67,4.4,.4],[-2.85,.34,2.24],[-5.6,.34,2.24],[-6.65,1.9,1.42]],'silver',.043);
    targets.cryostat={at:[0,3,-.2],eye:[10,7.8,13],title:'The copper heart of the laboratory',radius:5};
    for(let i=0;i<1+s.module;i++){const x=-2.03+i*.67;box(x,.74,2.22,.51,.52,.62,'graphite',true);box(x,1.023,2.22,.38,.055,.47,'copper');box(x,.76,2.547,.31,.18,.025,'silicon');for(const side of [-1,1])box(x+side*.205,.79,2.557,.022,.14,.02,'gold',false,false);}
    plaque('INSTALLED CHIP MODULES / SCHEMATIC',0,.52,2.79,4.6);model.modulePackages=1+s.module;model.installed=m.installed;model.supported=m.capacity;model.active=m.active;model.coax=coax;
  }
  function rack(x,z,i,kind='control'){
    box(x,1.95,z,1.22,3.62,1.24,'graphite',true);box(x,1.96,z+.65,1.11,3.37,.08,'edge');
    for(let j=0;j<7;j++){box(x,3.35-j*.4,z+.715,.96,.3,.065,j===1?'silicon':'graphite');for(let k=0;k<4;k++){box(x-.29+k*.18,3.35-j*.4,z+.757,.065,.045,.025,'silver',false,false);box(x-.39,3.35-j*.4,z+.761,.025,.11,.028,j%2?'warmLight':'light',false,false);}if(j>3)for(let k=0;k<5;k++)box(x-.32+k*.14,3.34-j*.4,z+.76,.06,.014,.016,'edge',false,false);}
    screen(kind,x,2.93,z+.78,.73,.34);plaque(kind==='decoder'?'DECODER / '+(i+1):'CONTROL / '+(i+1),x,3.68,z+.7,1.05,true);
    for(const side of [-1,1])cylinder(x+side*.46,.14,z+.43,.09,.13,'silver');
  }
  function controlsWing(s,m){
    const count=1+s.rack;platform(-7.35,-1.22,5.9,5.5);for(let i=0;i<count;i++)rack(-9.65+(i%4)*1.45,-2.4-Math.floor(i/4)*1.53,i);
    box(-6.45,.87,1.23,3.25,1.65,1.26,'graphite',true);box(-6.45,1.73,1.25,3.33,.12,1.36,'silver',true);screen('control',-6.46,2.43,.93,2.42,1.17);
    for(let i=0;i<8+s.pulse;i++){const x=-7.8+i*.16;box(x,1.83,1.54,.095,.035,.13,i%3?'edge':'gold');}plaque('CONTROL / PREPARE / READOUT',-6.4,.44,1.76,4.1);
    if(G.stage(s)>=3){partition(-7.2,-4.73,5.75);for(let i=0;i<1+s.decoder;i++)rack(3.5+(i%3)*1.17,-7.3-Math.floor(i/3)*1.5,i,'decoder');platform(4.72,-7.4,3.8,3.8);plaque('SYNDROME DECODING / CLASSICAL',4.7,.43,-5.66,3.4);}
    targets.control={at:[-7,1.55,-.55],eye:[2.5,7.3,12.3],title:'Control, readout and classical decoding',radius:6};model.controlRacks=count;model.decoderRacks=G.stage(s)>=3?1+s.decoder:0;
  }
  function researchWing(s,m){
    const desks=Math.min(8,s.staff);platform(8.2,-3.8,6.35,8.6);partition(5.05,-3.3,2.5);
    for(let i=0;i<desks;i++){
      const x=6.7+(i%2)*2.5,z=-.9-Math.floor(i/2)*1.9,crew=1+Math.floor((s.staff-1-i)/8);box(x,1.15,z,2.07,.13,1.22,'ceramic',true);for(const dx of [-.78,.78])box(x+dx,.63,z,.09,1,.85,'silver');
      for(let j=0;j<crew;j++){const offset=(j-(crew-1)/2)*(.9/Math.max(1,crew-1)),size=crew===1?.94:crew===2?.59:.39;screen('research',x+offset,1.68,z-.3,size,size*.52);box(x+offset,1.25,z+.25,size*.66,.035,.22,'graphite');box(x+offset,.72,z+.99,Math.min(.61,size),.15,.53,'chair',true);box(x+offset,1.08,z+1.21,Math.min(.62,size),.68,.12,'chair',true);cylinder(x+offset,.42,z+.99,.035,.45,'silver');}
      for(let p=0;p<Math.min(3,s.notebooks);p++)box(x+.79,1.27+p*.04,z+.12,.23,.035,.34,'gold',true);
    }
    plaque('CLASSICAL RESEARCH / NOTEBOOKS',8.2,.43,.66,5.1);targets.research={at:[8.2,1.2,-2.8],eye:[17,8.2,9.6],title:'People, notebooks and classical research',radius:6};model.desks=desks;model.researchSeats=s.staff;model.researchers=s.staff;model.notebooks=s.notebooks;
  }
  function processorWing(s,m){
    if(G.stage(s)<2)return;
    platform(.2,6,6.6,4.75);box(.2,1.16,6,5.75,1.45,3.67,'graphite',true);box(.2,1.94,6,5.84,.12,3.76,'silver',true);box(.2,2.04,6,5.23,.1,3.28,'ceramic',true);box(.2,2.12,6,4.76,.035,2.93,'silicon');
    const count=Math.min(36,m.active),cols=Math.ceil(Math.sqrt(count)),step=Math.min(.68,3.8/cols),nodes=[];
    for(let i=0;i<count;i++){const x=.2+(i%cols-(cols-1)/2)*step,z=6+(Math.floor(i/cols)-(cols-1)/2)*step*.72;transmon(x,2.16,z,.55);nodes.push([x,2.23,z]);if(i%cols&&nodes[i-1])line([x-step+.12,2.17,z],[x-.12,2.17,z],.012,'copper');if(nodes[i-cols])line([x,2.17,z-step*.72+.13],[x,2.17,z-.13],.012,'copper');}
    for(let i=0;i<1+s.module;i++){box(-2.05+i*.68,.87,8.0,.42,.62,.55,'graphite',true);box(-2.05+i*.68,1.21,8.0,.32,.03,.42,'copper');}
    const chipGroups=Math.min(4,Math.floor(Math.log2(1+s.fabricated)/3)),supportGroups=Math.min(4,Math.floor(Math.log2(1+s.integrated)/3));
    for(let i=0;i<chipGroups;i++){box(-2.27,1.03,5.02+i*.4,.62,.3,.26,'gold',true);box(-2.27,1.22,5.02+i*.4,.48,.045,.17,'silicon');}
    for(let i=0;i<supportGroups;i++)box(2.62,1.13,5.02+i*.43,.31,.76,.29,'silver',true);
    plaque('PROCESSOR ISLAND / SCHEMATIC SUBSET',.2,.45,8.15,5.2);movables.processorNodes=nodes;targets.processor={at:[.2,1.72,6],eye:[10.5,8.3,17.5],title:'Installed hardware, supported capacity',radius:5};model.processorSites=count;model.installed=m.installed;model.supported=m.capacity;model.active=m.active;model.modulePackages=1+s.module;model.chipCommissioningGroups=chipGroups;model.supportCommissioningGroups=supportGroups;
  }
  function memoryWing(s,m){
    if(G.stage(s)<3)return;
    platform(-8.27,6.2,6.4,5.65);box(-8.27,1.12,6.2,5.9,1.36,4.55,'graphite',true);box(-8.27,1.85,6.2,5.92,.12,4.59,'ceramic',true);box(-8.27,1.93,6.2,5.46,.05,4.19,'silicon');
    const d=s.distance,cell=4.15/(d+.6),ox=-8.27-(d-1)*cell/2,oz=6.2-(d-1)*cell/2,checks=[];
    for(let r=0;r<d-1;r++)for(let c=0;c<d-1;c++)checks.push({c:c+.5,r:r+.5,type:(r+c)%2?'teal':'ancilla',data:[[c,r],[c+1,r],[c,r+1],[c+1,r+1]]});
    for(let i=0;i<d-1;i+=2)checks.push({c:i+.5,r:-.5,type:'teal',data:[[i,0],[i+1,0]]},{c:i+1.5,r:d-.5,type:'teal',data:[[i+1,d-1],[i+2,d-1]]},{c:-.5,r:i+1.5,type:'ancilla',data:[[0,i+1],[0,i+2]]},{c:d-.5,r:i+.5,type:'ancilla',data:[[d-1,i],[d-1,i+1]]});
    checks.forEach(check=>{const x=ox+check.c*cell,z=oz+check.r*cell;check.data.forEach(([c,r])=>line([x,1.99,z],[ox+c*cell,1.99,oz+r*cell],.009,'trace'));box(x,2.04,z,cell*.18,.048,cell*.18,check.type);});
    for(let r=0;r<d;r++)for(let c=0;c<d;c++){cylinder(ox+c*cell,2.05,oz+r*cell,cell*.095,.055,'ceramic',false);cylinder(ox+c*cell,2.085,oz+r*cell,cell*.061,.018,'teal',false);}
    screen('decoder',-8.27,2.75,4.5,2.6,.69);plaque('ROTATED PATCH / DATA + CHECK ANCILLAS',-8.27,.44,8.7,5.25);movables.checkNodes=checks.map(q=>new T.Vector3(ox+q.c*cell,2.16,oz+q.r*cell));targets.memory={at:[-8.27,1.78,6.2],eye:[1.4,8.6,16.6],title:'Protected memory, with its assumptions intact',radius:5};model.patch={distance:d,data:d*d,ancilla:checks.length,physical:m.patch};
  }
  function automationWing(s,m){
    if(!s.automation)return;platform(-.8,-7.5,4.5,3.3);
    for(let i=0;i<s.automation;i++){const x=-2.39+(i%4)*1.02,z=-8.56+Math.floor(i/4)*.73;box(x,.95,z,.74,1.33,.6,'graphite',true);box(x,1.1,z+.32,.59,.91,.03,'edge');for(let j=0;j<3;j++)box(x,1.35-j*.22,z+.35,.43,.055,.025,'silicon');box(x-.25,1.34,z+.37,.035,.09,.022,'light',false,false);}
    plaque('CLASSICAL ANALYSIS / SHARED CAPACITY',-.8,.43,-5.8,4.15);model.analysisStations=s.automation;
  }
  function manufacturingWing(s,m){
    if(!s.workshops)return;
    platform(-8.3,-7.3,6.4,4.75);const cells=s.workshops;
    for(let i=0;i<cells;i++){const x=-10.3+(i%4)*1.38,z=-8.6+Math.floor(i/4)*1.38;box(x,.78,z,1.08,1.14,1.42,'graphite',true);box(x,1.44,z,1.12,.12,1.45,'silver',true);box(x,1.54,z,.69,.06,.96,'silicon');cylinder(x-.25,1.75,z-.37,.18,.43,'copper');box(x-.25,2.07,z-.37,.18,.13,.57,'copper',true);
      const arm=new T.Mesh(geometryPool.box,palette.gold);arm.position.set(x-.04,2.23,z-.21);arm.scale.set(.62,.13,.14);assembly.add(arm);movables['arm'+i]={mesh:arm,x:x-.04,y:2.23,z:z-.21};line([x+.25,2.16,z-.18],[x+.25,1.64,z+.18],.045,'silver');}
    partition(-8.3,-5.08,6.1);screen('manufacturing',-8.2,3.03,-8.37,3.15,.88);plaque('FABRICATION / INTEGRATION',-8.3,.43,-5.4,4.8);targets.fabrication={at:[-8.3,1.35,-7.3],eye:[-16,9.4,.7],title:'Commissioning hardware and its support',radius:5};model.workshopCells=cells;model.workshops=s.workshops;
  }
  function planningWing(s,m,id){
    if(G.stage(s)<4)return;
    platform(9.8,5.2,5.65,6.5);box(9.8,1.11,4.68,4.97,1.33,4.6,'graphite',true);box(9.8,1.84,4.68,5.04,.12,4.66,'silver',true);
    const count=m.totalPatches,cols=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,count)*1.2))),rows=Math.max(1,Math.ceil(count/cols)),cell=Math.min(count<=4?1.04:.55,4.52/cols,3.87/rows),nodes=[],kinds={application:0,routing:0,factory:0,spare:0};
    for(let i=0;i<count;i++){const kind=i<m.routing?'routing':i<m.routing+m.spares?'spare':i<m.reserved?'factory':'application',mat={routing:'ancilla',spare:'edge',factory:'factory',application:'teal'}[kind],x=9.8+(i%cols-(cols-1)/2)*cell,z=4.68+(Math.floor(i/cols)-(rows-1)/2)*cell;box(x,1.96,z,cell*.78,.12,cell*.78,'graphite');box(x,2.034,z,cell*.65,.027,cell*.65,mat,false,false);kinds[kind]++;nodes.push({kind,point:new T.Vector3(x,2.14,z)});}
    const from=nodes.find(p=>p.kind==='factory'),to=nodes.find(p=>p.kind==='routing');if(from&&to)movables.rehearsalPath=cable([[from.point.x,2.17,from.point.z],[from.point.x,2.38,from.point.z],[to.point.x,2.38,to.point.z],[to.point.x,2.17,to.point.z]],'trace',.018);
    plaque('LOGICAL ALLOCATION / FICTIONAL UNITS',9.8,.44,8.17,4.9);model.allocation={total:count,kinds,requested:{application:m.slots,routing:m.routing,factory:m.factoryUnits,spare:m.spares},shortage:Math.max(0,m.reserved-count),remaining:m.active-count*m.patch};
    targets.planning={at:[9.25,1.62,4.2],eye:[20,9.2,17.5],title:'Allocation before operation',radius:6};
    if(G.stage(s)>=5){const w=G.content.workloads.find(w=>w.id===id)||G.content.workloads[0],b=G.workloadStatus(s,w.id),known=Number.isFinite(b.factoryTime),parallel=known?Math.max(b.gateTime,b.factoryTime,b.feedbackTime):Math.max(b.gateTime,b.feedbackTime),finish=w.preparation+parallel+w.readout+w.classical,lanes=[['Preparation',0,w.preparation,'edge'],['Operations',w.preparation,b.gateTime,'teal'],['Fresh states',w.preparation,b.factoryTime,'copper'],['Feedback',w.preparation,b.feedbackTime,'factory'],['Readout',w.preparation+parallel,w.readout,'edge'],['Classical',w.preparation+parallel+w.readout,w.classical,'edge']];
      box(8.7,3.15,-.25,6.8,3.8,.35,'graphite',true);for(let i=0;i<6;i++){const y=4.57-i*.5;box(8.7,y,0,6.08,.04,.045,'edge',false,false);const duration=lanes[i][2],start=lanes[i][1],left=5.65,span=5.88;if(Number.isFinite(duration)){const length=span*duration/finish;box(left+span*start/finish+length/2,y,.1,Math.max(.015,length),.15,.12,lanes[i][3],false,false);}else for(let j=0;j<11;j++)box(left+j*.52,y,.1,.22,.07,.09,'factory',false,false);}
      plaque('COMPLETE WORKLOAD / ONE EXECUTION',8.7,5.1,-.01,5.6,true);screen('workload',8.7,1.83,.02,4.3,.61);model.schedule={workload:w.id,lanes:lanes.map(([name,start,duration])=>({name,start,duration:Number.isFinite(duration)?duration:null})),qualified:known,finish:known?finish:null,runtime:b.runtime,repetitions:w.repetitions};targets.planning={at:[8.95,2.7,1.8],eye:[20,9.7,15.7],title:'The complete useful-work schedule',radius:6.2};}
  }
  function indicators(){
    if(model.schedule){const cursor=new T.Mesh(geometryPool.box,palette.warmLight);cursor.scale.set(.057,3.07,.035);cursor.position.set(5.65,3.36,.21);cursor.visible=false;assembly.add(cursor);movables.scheduleCursor=cursor;}
    const make=(name,r,mat='light')=>{const mesh=new T.Mesh(geometryPool.sphere,palette[mat]);mesh.scale.setScalar(r);mesh.visible=false;assembly.add(mesh);movables[name]=mesh;};make('controlPulse',.13);make('readoutPulse',.115,'warmLight');make('detection',.083);make('rehearsal',.071,'warmLight');
    const research=new T.Mesh(geometryPool.box,palette.light);research.scale.set(.2,.05,.11);research.visible=false;assembly.add(research);movables.research=research;
    const service=new T.Mesh(geometryPool.box,palette.warmLight);service.scale.set(.07,.3,.055);service.visible=false;assembly.add(service);movables.service=service;
    const calibration=new T.Mesh(geometryPool.ring,palette.light);calibration.position.set(0,6.55,-.4);calibration.scale.setScalar(1.78);calibration.visible=false;assembly.add(calibration);movables.calibration=calibration;
  }
  function flush(){for(const b of batches.values()){const mesh=new T.InstancedMesh(b.g,b.mat,b.transforms.length);b.transforms.forEach((m,i)=>mesh.setMatrixAt(i,m));mesh.instanceMatrix.needsUpdate=true;mesh.castShadow=b.shadow;mesh.receiveShadow=true;assembly.add(mesh);}}
  function structural(s,m,id){const w=G.content.workloads.find(w=>w.id===id)||G.content.workloads[0],b=G.stage(s)>=5?G.workloadStatus(s,w.id):null;return JSON.stringify([G.stage(s),s.module,s.rack,s.staff,s.notebooks,s.pulse,s.decoder,s.automation,s.workshops,s.distance,m.totalPatches,m.routing,m.spares,m.factoryUnits,Math.floor(Math.log2(1+s.fabricated)/3),Math.floor(Math.log2(1+s.integrated)/3),Math.min(36,m.active),b?[w.id,b.gateTime,Number.isFinite(b.factoryTime)?b.factoryTime:'unqualified',b.feedbackTime,b.runtime]:null]);}
  function build(s,m,id){
    const old=model;clear();batches=new Map();model={chapter:G.stage(s)};for(const key of Object.keys(targets))delete targets[key];room(s,m);cryostat(s,m);controlsWing(s,m);researchWing(s,m);processorWing(s,m);memoryWing(s,m);automationWing(s,m);manufacturingWing(s,m);planningWing(s,m,id);flush();indicators();renderer.shadowMap.needsUpdate=true;dirty=true;
    const major=old.chapter!==model.chapter||old.controlRacks!==model.controlRacks||old.modulePackages!==model.modulePackages||old.researchSeats!==model.researchSeats||old.notebooks!==model.notebooks||old.coax!==model.coax||old.decoderRacks!==model.decoderRacks||old.analysisStations!==model.analysisStations||old.workshops!==model.workshops||old.chipCommissioningGroups!==model.chipCommissioningGroups||old.supportCommissioningGroups!==model.supportCommissioningGroups||old.patch?.distance!==model.patch?.distance;
    if(major&&s.started&&!s.paused&&!s.ended&&!reduced.matches){revealAt=performance.now();canvas.classList.remove('three-reveal');void canvas.offsetWidth;canvas.classList.add('three-reveal');}
    if(!targets[cameraMode])setCamera('overview',true);else if(frames===0)setCamera(cameraMode,true);display();
  }
  function size(){
    if(!renderer||!enabled||!available||!visible())return false;const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return false;const dpr=Math.min(fine.matches&&w>=660?1.5:1.25,devicePixelRatio||1);controls.enableRotate=fine.matches&&w>=500;
    if(w!==width||h!==height||renderer.getPixelRatio()!==dpr){width=w;height=h;renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();dirty=true;if(!cameraMove)setCamera(cameraMode,true);}return true;
  }
  function cameraDestination(id){const target=targets[id]||targets.overview,at=new T.Vector3(...target.at),eye=new T.Vector3(...target.eye),ratio=width&&height?width/height:1.7,mobile=ratio<1.05?Math.min(1.75,1.05/ratio):1;eye.sub(at).multiplyScalar(mobile).add(at);return {at,eye,target};}
  function setCamera(id,instant=false){
    if(!camera||!controls||!targets.overview)return;cameraMode=id==='reset'?'overview':id;if(!targets[cameraMode])cameraMode='overview';const destination=cameraDestination(cameraMode);text($('three-focus-title'),destination.target.title);cameraButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.camera===cameraMode)));
    if(instant||reduced.matches||state?.paused||state?.ended){camera.position.copy(destination.eye);controls.target.copy(destination.at);camera.lookAt(destination.at);controls.update();cameraMove=null;}
    else cameraMove={from:camera.position.clone(),fromTarget:controls.target.clone(),to:destination.eye,toTarget:destination.at,start:performance.now()};dirty=true;ensureDriver();
  }
  function activityFor(s,m){const running=!!s.started&&!s.paused&&!s.ended,research=running&&(m.effortRate>0&&s.effort<m.effortCap-1e-6||m.designRate>0&&s.designs<1e9);return {research,services:running&&m.delivered>0,calibration:running&&m.calibrationDuty>0,construction:running&&(m.fabricationRate>0||m.integrationRate>0),experiment:running&&!!s.job&&(s.job.id==='calibrate'||m.experimentDuty>0),memory:running&&s.job?.id==='memory'&&m.experimentDuty>0,rehearsal:running&&m.factoryOK&&s.credits<2000&&(!s.job||s.job.id==='factory'),automation:research&&m.automationRunning>0};}
  function jobProgress(time){if(!state?.job)return 0;const id=state.job.id+(state.job.workload?'task':'');if(observed.id!==id||observed.progress!==state.job.progress)observed={id,progress:state.job.progress,time};const dt=Math.min(.1,Math.max(0,(time-observed.time)/1000)),duty=state.job.id==='calibrate'?1:metrics.experimentDuty;return Math.min(1,(state.job.progress+(reduced.matches?0:dt*duty))/state.job.duration);}
  function animate(time){
    if(movables.scheduleCursor){movables.scheduleCursor.visible=activity.experiment&&state.job.workload&&state.job.id===model.schedule.workload;movables.scheduleCursor.position.x=5.65+5.88*(reduced.matches?0:jobProgress(time));}
    if(completionAt){const age=(time-completionAt)/1100;keyLight.intensity=4.3+(age<1?.65*(1-age):0);if(age>=1)completionAt=0;}else keyLight.intensity=4.3;
    const a=activity,t=time/1000,progress=jobProgress(time),motion=operating();
    for(const name of ['controlPulse','readoutPulse','detection','rehearsal','research','service','calibration'])if(movables[name])movables[name].visible=false;
    if(a.experiment&&state.job.id!=='calibrate'&&!state.job.workload&&state.job.id!=='memory'&&state.job.id!=='gates'&&state.job.id!=='factory'){
      const p=reduced.matches?.25:progress;if(p<.56){movables.controlPulse.visible=true;movables.controlPulse.position.copy(movables.controlPath.getPoint(Math.min(1,p/.56)));}else{movables.readoutPulse.visible=true;movables.readoutPulse.position.copy(movables.readoutPath.getPoint(Math.min(1,(p-.56)/.44)));}}
    if(a.memory&&movables.checkNodes?.length){const i=reduced.matches?0:Math.min(movables.checkNodes.length-1,Math.floor(progress*movables.checkNodes.length));movables.detection.visible=true;movables.detection.position.copy(movables.checkNodes[i]);}
    if(a.rehearsal&&movables.rehearsalPath){movables.rehearsal.visible=true;movables.rehearsal.position.copy(movables.rehearsalPath.getPoint(motion?(t/6)%1:0));}
    if(a.research&&model.desks){movables.research.visible=true;movables.research.position.set(6.34+(motion?(t*.32)%1:0),1.24,-.57);}
    if(a.services){movables.service.visible=true;movables.service.position.set(-7.87,1.65+(motion?.15*Math.sin(t*3):0),1.92);}
    if(a.calibration){movables.calibration.visible=true;movables.calibration.scale.setScalar(1.78+(motion?.018*Math.sin(t*1.7):0));}
    for(let i=0;i<(model.workshopCells||0);i++){const arm=movables['arm'+i];if(arm){arm.mesh.rotation.y=a.construction&&motion?.38*Math.sin(t*1.7+i*.8):0;arm.mesh.position.y=arm.y+(a.construction&&motion?.055*Math.sin(t*2+i):0);}}
    if(cameraMove){const p=Math.min(1,(time-cameraMove.start)/800),e=p*p*(3-2*p);camera.position.lerpVectors(cameraMove.from,cameraMove.to,e);controls.target.lerpVectors(cameraMove.fromTarget,cameraMove.toTarget,e);camera.lookAt(controls.target);controls.update();if(p>=1)cameraMove=null;dirty=true;}
    if(revealAt&&motion){const p=Math.min(1,(time-revealAt)/650);assembly.position.y=-.16*(1-p);if(p>=1){revealAt=0;assembly.position.y=0;}dirty=true;}else {assembly.position.y=0;revealAt=0;}
  }
  function paintScreens(time){
    const a=activity,m=metrics,s=state,clock=operating()?time/1000:0;
    const descriptions={control:['CONTROL / READOUT',s.job?'WORKFLOW: '+s.job.id.toUpperCase():a.services?'KNOWN-PREPARATION SERVICE':'APPARATUS READY',a.experiment||a.services],research:['CLASSICAL RESEARCH',s.staff+' PEOPLE / '+s.notebooks+' NOTEBOOK SLOTS',a.research],decoder:['SYNDROME DECODER',fmt(m.syndromeRate)+' LOAD / '+fmt(m.decoderRate)+' CAPACITY',a.memory],manufacturing:['COMMISSIONING',fmt(m.fabricationRate,2)+' CHIP / '+fmt(m.integrationRate,2)+' SUPPORT',a.construction],workload:['FULL RESOURCE RECIPE',model.schedule?.qualified?fmt(model.schedule.runtime)+' μs / FULL TASK':'FRESH-STATE TIMING UNQUALIFIED',a.experiment&&!!s.job?.workload]};
    for(const [id,item] of Object.entries(screens)){const [title,subtitle,active]=descriptions[id],ctx=item.canvas.getContext('2d');ctx.fillStyle='#082129';ctx.fillRect(0,0,512,256);ctx.fillStyle='#a1dbc8';ctx.font='26px monospace';ctx.fillText(title,26,44);ctx.fillStyle='#c8a579';ctx.font='17px monospace';ctx.fillText(subtitle,26,77);ctx.strokeStyle='#21424b';ctx.lineWidth=1;for(let y=105;y<230;y+=30){ctx.beginPath();ctx.moveTo(24,y);ctx.lineTo(488,y);ctx.stroke();}
      ctx.strokeStyle=active?'#b6efce':'#4b737a';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<450;i++){const envelope=id==='control'?Math.exp(-(((i/450-.5)/.16)**2)):1,y=active?166+Math.sin(i*.075-clock*(id==='research'?1:5))*19*envelope:166;if(i)ctx.lineTo(i+26,y);else ctx.moveTo(i+26,y);}ctx.stroke();ctx.fillStyle=active?'#acd6bc':'#557077';ctx.font='16px monospace';if((id==='control'||id==='workload')&&s.job){const p=Math.min(1,s.job.progress/s.job.duration);ctx.fillStyle='#33515a';ctx.fillRect(25,209,460,8);ctx.fillStyle='#e5bc80';ctx.fillRect(25,209,460*p,8);ctx.fillStyle='#d8e8dd';ctx.fillText('LAB PACING '+Math.round(p*100)+'% / NOT μs',26,244);}else ctx.fillText(active?'SCHEMATIC ACTIVITY':'READY / NO FLOW',26,235);item.texture.needsUpdate=true;}
  }
  function annotate(){
    const m=metrics,s=state,phase=G.stage(s),held=s.paused||s.ended||!s.started;text($('three-growth-readout'),fmt(m.installed)+' installed · '+fmt(m.capacity)+' supported · '+s.staff+' researcher'+(s.staff===1?'':'s')+' · '+(1+s.rack)+' control rack'+(s.rack===0?'':'s'));
    let copy=cameraMode==='cryostat'?'A schematic dilution refrigerator: copper stages, suspended coax and a known-preparation circuit. Geometry and temperature behavior are illustrative.':cameraMode==='research'?'Every assigned researcher adds a visible seat and terminal; later hires share larger desk groups. Staff work, notebook space and engineering output are classical game abstractions.':cameraMode==='memory'&&model.patch?'Ideal d = '+s.distance+' rotated patch: '+model.patch.data+' data + '+model.patch.ancilla+' check ancillas = '+m.patch+' physical qubits. Teal X / copper Z checks. Detection highlights never reveal an unknown data state.':cameraMode==='processor'?'Installed '+fmt(m.installed)+' physical qubits, '+fmt(m.capacity)+' supported; '+fmt(m.active)+' active. '+model.processorSites+' processor sites drawn as a schematic subset. Expansion is not a universal power multiplier.':cameraMode==='fabrication'?'Construction teams commission chips and control/cooling support separately. Motion follows current funding-limited rates; equipment cells are schematic groups.':cameraMode==='planning'&&model.schedule?'Parallel operations, fresh states and feedback overlap. The six lanes use one-execution modeled durations; '+(model.schedule.qualified?model.schedule.repetitions+' repetition'+(model.schedule.repetitions===1?' gives ':'s give ')+fmt(model.schedule.runtime)+' μs full modeled time.':'Full modeled time remains unqualified because fresh-state timing is missing.')+' Laboratory seconds use a separate pacing clock; the cursor follows that clock, not the lane μs scale.':cameraMode==='planning'?'Patch-sized allocation units are fictional layout budgets. Factories, routing and spares consume real game footprint; rehearsal markers are classical planning, never stored quantum states.':'Your laboratory grows with staff, control racks, processor modules, pulse tools, decoder capacity and commissioning. Visible apparatus is schematic; exact measurements and scientific assumptions remain inspectable.';
    if(viewEnding)copy='The complete laboratory, from one known signal to a named useful resource scenario. Modeled completion: no large fault-tolerant quantum computation or large quantum answer was produced.';
    if(cameraMode==='planning'&&model.allocation?.shortage)copy+=' Requested reservations exceed the footprint by '+model.allocation.shortage+' units; only '+model.allocation.total+' units are drawn.';
    text(description,copy);canvas.setAttribute('aria-label',copy);
    let entries=[];if(cameraMode==='memory'&&model.patch)entries=[['application','Data',model.patch.data],['routing','Check ancillas',model.patch.ancilla],['spare','Physical / ideal patch',model.patch.physical]];
    else if(cameraMode==='planning'&&model.schedule)entries=model.schedule.lanes.map((l,i)=>[['preparation','operations','states','feedback','readout','classical'][i],l.name,l.duration===null?'unqualified':fmt(l.duration)+' μs']);
    else if(cameraMode==='planning'&&model.allocation)entries=['application','routing','factory','spare'].map(k=>[k,{application:'Application',routing:'Routing',factory:'Factories',spare:'Spare'}[k],model.allocation.kinds[k]+(model.allocation.shortage?' / '+model.allocation.requested[k]+' requested':'')]);
    else entries=[['application','Active physical',fmt(m.active)],['routing','Calibration duty',fmt(m.calibrationDuty*100)+'%'],['factory',held?'Planned service':'Delivered service',fmt(m.delivered,2)+' / lab s'],['spare',held?'Planned research':'Research',fmt(m.effortRate,1)+' / lab s']];
    const html=entries.map(([kind,name,value])=>'<div data-kind="'+kind+'"><dt>'+name+'</dt><dd>'+value+'</dd></div>').join('');if(html!==legendHTML){legend.innerHTML=html;legendHTML=html;}legend.hidden=!enabled||!available;
    text(status,s.paused?'Laboratory paused. Camera controls still work; all activity is still.':reduced.matches?'Reduced motion: apparatus activity is shown with static indicators.':!s.started?'Your laboratory awaits its first preparation.':s.ended?'A quiet record of the completed resource scenario.':metrics.atomic?'Protected schedule: customer service and commissioning are reserved.':'Choose a wing to inspect. Moving indicators show schematic activity, never an unknown quantum state.');
  }
  function render(time){if(!size())return;animate(time);if(time-lastScreen>=100||dirty){paintScreens(time);lastScreen=time;}renderer.render(scene,camera);frames++;dirty=false;lastGPU=time;}
  function motionActive(){return operating()&&Object.values(activity).some(Boolean);}
  function drive(time){
    driver=0;if(!renderer||!available||!enabled||!visible())return;driving=true;
    const cadence=fine.matches&&width>=660?1000/30:1000/20;if((dirty||motionActive()||cameraMove||revealAt||completionAt)&&time-lastGPU>=cadence){render(time);lastFrame=time;}
    driving=false;if((dirty||motionActive()||cameraMove||revealAt||completionAt)&&!driver)driver=requestAnimationFrame(drive);
  }
  function ensureDriver(){if(driving||!renderer||!available||!enabled||!visible()||!(dirty||motionActive()||cameraMove||revealAt||completionAt))return;if(!driver)driver=requestAnimationFrame(drive);}
  function followExperiment(s){
    if(s.job&&s.job!==followJob&&!s.paused){
      followJob=s.job;const id=s.job.workload?'planning':s.job.id==='memory'?'memory':['gates','factory'].includes(s.job.id)?'planning':'cryostat';
      text($('three-event-caption'),s.job.workload?'The complete resource recipe · cursor follows laboratory pacing':s.job.id==='memory'?'Memory qualification · only check ancillas are highlighted':s.job.id==='calibrate'?'Calibration reserve · customers and commissioning pause':'Known preparation → control → readout · schematic workflow');
      if(follow&&cameraMode==='overview'&&!reduced.matches&&targets[id]){autoFocused=true;setCamera(id);}
    }else if(!s.job&&followJob){
      followJob=null;text($('three-event-caption'),s.result?'Workflow complete · '+s.result.message:'The apparatus is available again.');
      if(!s.paused&&!s.ended&&!reduced.matches)completionAt=performance.now();
      if(autoFocused&&follow){autoFocused=false;setCamera('overview',s.ended||reduced.matches);}
      dirty=true;
    }
  }
  function draw(s,opts={}){
    state=s;options=opts;metrics=G.metrics(s);viewEnding=opts.view==='ending';const destination=viewEnding?$('ending-view'):figure;if(host.parentElement!==destination)destination.insertBefore(host,viewEnding?$('ending-art'):machine);host.classList.toggle('three-ending',viewEnding);
    if(!renderer&&available&&visible())initialize();display();original.draw(s,opts);if(!renderer||!available||!enabled||!visible()){stop();return;}
    size();const next=structural(s,metrics,opts.workload);if(next!==signature){build(s,metrics,opts.workload);signature=next;}
    const nextTheme=document.documentElement.dataset.theme||'dark';if(theme!==nextTheme){theme=nextTheme;scene.background=new T.Color(theme==='light'?0xc9d5d2:0x06141d);dirty=true;}
    const before=JSON.stringify(activity);activity=activityFor(s,metrics);if(before!==JSON.stringify(activity))dirty=true;if(s.paused||s.ended||reduced.matches){revealAt=0;completionAt=0;if(cameraMove)setCamera(cameraMode,true);}followExperiment(s);annotate();ensureDriver();
  }
  host.addEventListener('click',async event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button===toggle){enabled=!enabled;dirty=true;display();if(enabled&&state)draw(state,options);else stop();}
    else if(button.id==='three-expand'){try{const presentation=host.closest('.lab-presentation')||host;if(document.fullscreenElement===presentation)await document.exitFullscreen();else await presentation.requestFullscreen();}catch{ text(status,'Expanded view is unavailable. The wide laboratory remains available here.');}}
    else if(button.id==='three-follow'){follow=!follow;button.setAttribute('aria-pressed',String(follow));button.textContent=follow?'Follow experiment':'Manual inspection';autoFocused=false;}
    else if(button.id==='three-pause')$('pause-toggle').click();
    else if(button.dataset.camera){follow=false;autoFocused=false;$('three-follow').setAttribute('aria-pressed','false');$('three-follow').textContent='Manual inspection';setCamera(button.dataset.camera);if(state)annotate();}
  });
  reduced.addEventListener('change',()=>{cameraMove=null;revealAt=0;assembly&&(assembly.position.y=0);dirty=true;stop();if(state)draw(state,options);});fine.addEventListener('change',()=>{dirty=true;if(state)draw(state,options);});
  window.addEventListener('resize',()=>{dirty=true;if(state)draw(state,options);});
  window.CoherentArt={draw,postcard:original.postcard};
  window.Coherent3D=Object.freeze({get diagnostics(){return Object.freeze({available,enabled,scene:viewEnding?'ending':'laboratory',chapter:state?G.stage(state):null,camera:cameraMode,frames,calls:renderer?.info.render.calls||0,triangles:renderer?.info.render.triangles||0,geometries:renderer?.info.memory.geometries||0,textures:renderer?.info.memory.textures||0,width,height,pixelRatio:renderer?.getPixelRatio()||0,followExperiment:follow,cadence:motionActive()?(fine.matches&&width>=660?30:20):0,driverActive:!!driver,activity:{...activity},model:JSON.parse(JSON.stringify(model)),visible:visible()});}});
  if(!available)fallback('The local 3D toolkit could not load.');
})();
