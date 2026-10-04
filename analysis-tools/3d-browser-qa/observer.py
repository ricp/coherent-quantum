from pathlib import Path
exec(Path(__file__).with_name('common.py').read_text())
import sys
label=sys.argv[1] if len(sys.argv)>1 else 'after'
cmd=['agent-browser','--session','coherent-immersive-observer-debug'];call('--init-script',str(Path(__file__).with_name('capture-intersections.js')),'open',root.joinpath('index-3d.html').as_uri());call('set','viewport','1440','1050','1');load(old/'frontier-ready.json');focus('overview');call('click','#three-follow');call('click','#three-pause');call('click','[data-run-workload=dynamics]');wait(1100);focus('planning');scroll();wait(700)
rows=evaluate('({diagnostics:Coherent3D.diagnostics,history:coherentIOHistory,rect:document.getElementById("three-canvas").getBoundingClientRect().toJSON(),viewport:[innerWidth,innerHeight],errors:coherentQAErrors})')
rows['sample']=sample(650)
if label=='after':
 assert rows['diagnostics']['inViewport'] and rows['diagnostics']['camera']=='planning' and rows['sample']['delta']>0
 cycles=[]
 for i in range(4):
  evaluate('(()=>{scrollTo(0,document.documentElement.scrollHeight);return true})()');wait(250);off=sample(550);assert not off['after']['inViewport'] and off['delta']==0
  scroll();wait(500);on=sample(550);assert on['after']['inViewport'] and on['delta']>0;cycles.append({'off':off,'on':on})
 rows['scrollCycles']=cycles
 rows['historyAfterCycles']=evaluate('coherentIOHistory')
 assert not rows['errors']
(out/('observer-'+label+'.json')).write_text(json.dumps(rows,indent=2)+'\n');call('close');print(json.dumps({'phase':label,'inViewport':rows['diagnostics']['inViewport'],'frames':rows['sample']['delta'],'multiRecordBatches':[h for h in rows['history'] if len(h)>1]}),flush=True)
