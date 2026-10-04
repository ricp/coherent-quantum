from pathlib import Path
exec(Path(__file__).with_name('common.py').read_text())
result={}
call('--init-script',str(Path(__file__).with_name('capture-errors.js')),'open',root.joinpath('index-3d.html').as_uri());call('set','viewport','1440','1050','1')
for label,file in [('unstarted',out/'unstarted.json'),('paused',old/'frontier-4.json'),('ended',old/'frontier-ending.json'),('zeroFlow',out/'legal-zero-flow.json'),('fullBanks',out/'renderer-full-banks.json')]:
 load(file);scroll();wait(900);result[label]=sample(650);assert result[label]['delta']==0,label;print(label+' static',flush=True)
load(out/'legal-native-before.json');call('click','#three-pause');wait(350);result['running']=sample(900);assert 1<=result['running']['delta']<=29
# Pause during a new camera flight must leave the scene still after its final update.
focus('cryostat');call('click','#three-pause');wait(100);result['pauseCameraFlight']=sample(650);assert result['pauseCameraFlight']['delta']==0
call('click','#three-pause');call('click','[data-view=research]');wait(300);result['researchView']=sample(650);assert result['researchView']['delta']==0
call('click','[data-view=lab]');call('set','media','dark','reduced-motion');wait(300);result['reduced']=sample(650);assert result['reduced']['delta']==0
call('screenshot',str(out/'reduced-motion.png'));call('set','media','dark')
# Open the existing chapter dialog natively using the chapter bar? The app opens it only on breakthroughs.
# A constructed modal probe exercises visibility gating without claiming a campaign breakthrough.
evaluate("document.getElementById('chapter-dialog').showModal()");wait(220);result['constructedChapterModal']=sample(650);assert result['constructedChapterModal']['delta']==0
call('press','Escape');wait(150)
# Headless tabs sometimes remain visible. Record actual Page Visibility before interpreting the probe.
import re
originalTabs=call('tab');gameTab=re.search(r'→ \[(t\d+)\]',originalTabs).group(1)
evaluate("(()=>{window.coherentHiddenResult=null;setTimeout(()=>{const before=Coherent3D.diagnostics,hidden=document.hidden;setTimeout(()=>{coherentHiddenResult={before,after:Coherent3D.diagnostics,delta:Coherent3D.diagnostics.frames-before.frames,hiddenBefore:hidden,hiddenAfter:document.hidden}},650)},300);return true})()")
call('tab','new','about:blank');blankTab=re.search(r'→ \[(t\d+)\]',call('tab')).group(1);wait(2500);call('tab',gameTab);result['hiddenTab']=evaluate('coherentHiddenResult');call('tab','close',blankTab);call('tab',gameTab)
assert result['hiddenTab'] and result['hiddenTab']['hiddenBefore'] and result['hiddenTab']['hiddenAfter'] and result['hiddenTab']['delta']==0
# Constructed persisted page events verify handler behavior; native navigation caching remains unverified.
evaluate("dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}))");result['constructedPageHide']=sample(450);evaluate("dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}))");wait();result['constructedPageShow']=sample(450)
# Pause, keyboard station, transient presentation controls and 2D toggle must preserve saved game state.
load(old/'memory-d9.json');evaluate("window.coherentCameraSave=localStorage.getItem('coherent.v2')")
call('focus','[data-camera=top]');call('press','Enter');wait();result['keyboardCamera']={'diagnostics':info()['diagnostics'],'unchanged':evaluate("coherentCameraSave===localStorage.getItem('coherent.v2')"),'focused':evaluate('document.activeElement.textContent')};assert result['keyboardCamera']['unchanged']
call('click','#three-toggle');result['twoD']=evaluate("(()=>({enabled:Coherent3D.diagnostics.enabled,machine:getComputedStyle(document.getElementById('machine')).display,canvas:getComputedStyle(document.getElementById('three-canvas')).display,unchanged:coherentCameraSave===localStorage.getItem('coherent.v2')}))()");assert result['twoD']['machine']=='block' and result['twoD']['canvas']=='none' and result['twoD']['unchanged'];call('click','#three-toggle')
# Native fullscreen retains original next action; Escape returns to page.
call('click','#three-expand');wait();result['fullscreen']=evaluate("(()=>({target:document.fullscreenElement?.className,actionInFullscreen:document.fullscreenElement?.contains(document.getElementById('run-experiment')),size:[Coherent3D.diagnostics.width,Coherent3D.diagnostics.height]}))()");call('screenshot',str(out/'fullscreen.png'));call('press','Escape');wait();result['fullscreenReturned']=evaluate('document.fullscreenElement===null');assert result['fullscreen']['actionInFullscreen'] and result['fullscreenReturned']
# Desktop wheel over the canvas scrolls the document; renderer zoom is disabled.
scroll();evaluate("window.coherentScrollBefore=scrollY");bounds=evaluate("(()=>{const r=document.getElementById('three-canvas').getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()");call('mouse','move',str(round(bounds['x'])),str(round(bounds['y'])));call('mouse','wheel','250','0');wait();result['wheelScroll']=evaluate('({before:coherentScrollBefore,after:scrollY})');assert result['wheelScroll']['after']>result['wheelScroll']['before']
# Source resize and quality limits are observed in a 375px, DPR3 browser viewport.
call('set','viewport','375','1000','3');wait();scroll();result['mobile375']=info();result['mobile375']['buffer']=evaluate('[document.getElementById("three-canvas").width,document.getElementById("three-canvas").height]');call('screenshot',str(out/'mobile-375-memory-d9.png'));assert not result['mobile375']['overflow'] and result['mobile375']['diagnostics']['pixelRatio']==1.25
# Maximum valid equipment and maximum patch allocation, including source-bounded scenes.
call('set','viewport','1440','1050','1');stress=[]
for name in ['stress-maximum.json','memory-d3.json','memory-d5.json','memory-d7.json','memory-d9.json','schedule-unqualified.json']:
 load(old/name);focus('planning' if name=='schedule-unqualified.json' else 'memory' if name.startswith('memory') else 'overview');row={'fixture':name,**info()};stress.append(row)
 if name in ['stress-maximum.json','schedule-unqualified.json']:scroll();call('screenshot',str(out/name.replace('.json','.png')))
load(out/'renderer-stress-all-equipment.json');focus('overview');scroll();stress.append({'fixture':'renderer-stress-all-equipment.json',**info()});call('screenshot',str(out/'stress-all-equipment.png'));result['stress']=stress
cycles=[]
for cycle in range(2):
 for i in range(7):
  load(old/(f'frontier-{i}.json' if i<6 else 'frontier-ending.json'));d=info()['diagnostics'];cycles.append({'cycle':cycle,'chapter':i,'geometries':d['geometries'],'textures':d['textures']})
result['resourceCycles']=cycles
# Final desktop/mobile snapshots use the final source and exact native camera selectors.
for size,prefix in [(('1440','1050','1'),'desktop'),(('320','1100','1'),'mobile')]:
 call('set','viewport',*size);rows=[]
 for i in range(7):
  load(old/(f'frontier-{i}.json' if i<6 else 'frontier-ending.json'));focus('cryostat' if prefix=='mobile' and i<5 else 'overview');scroll();row={'chapter':i,**info()};assert not row['overflow'];call('screenshot',str(out/(prefix+'-'+str(i)+'.png')));rows.append(row)
 (out/(prefix+'-matrix.json')).write_text(json.dumps(rows,indent=2)+'\n')
 print(prefix+' final matrix captured',flush=True)
result['errors']=evaluate('coherentQAErrors');result['tabInventoryBefore']=originalTabs
(out/'probes.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items() if k in ['fullscreen','fullscreenReturned','wheelScroll','errors','running','hiddenTab']}),flush=True)
