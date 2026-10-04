from pathlib import Path
exec(Path(__file__).with_name('common.py').read_text())
cmd=['agent-browser','--session','coherent-immersive-fallback']
call('--init-script',str(Path(__file__).with_name('disable-webgl.js')),'open',root.joinpath('index-3d.html').as_uri());call('set','viewport','1280','1000','1');load(old/'frontier-1.json');scroll()
creation=info();creation['twoDimensionalMachine']=evaluate('getComputedStyle(document.getElementById("machine")).display');assert not creation['diagnostics']['available'] and creation['twoDimensionalMachine']=='block';call('screenshot',str(out/'webgl-unavailable.png'))
call('click','#pause-toggle');wait(1250);call('click','#pause-toggle');call('click','[data-dialog=settings-dialog]');call('download','#settings-dialog [data-action=export]',str(out/'fallback-export.json'));call('click','[data-close=settings-dialog]')
export=json.loads((out/'fallback-export.json').read_text());assert export['state']['elapsed']>json.loads((old/'frontier-1.json').read_text())['state']['elapsed']
(out/'fallback.json').write_text(json.dumps({'creationFailure':creation,'continuedGameElapsed':export['state']['elapsed'],'exportedJob':export['state']['job']},indent=2)+'\n');call('close');print('WebGL creation fallback remained playable and exported JSON',flush=True)
cmd=['agent-browser','--session','coherent-immersive-offline'];call('set','offline','on');call('open',root.joinpath('index-3d.html').as_uri());call('set','viewport','1440','1050','1');wait(150)
offline=info();offline['httpResources']=evaluate("performance.getEntriesByType('resource').map(r=>r.name).filter(n=>/^https?:/.test(n))");assert offline['diagnostics']['available'] and not offline['httpResources'];call('click','#run-experiment');wait(180);call('click','#three-pause');wait(150);offline['pauseAutomaticFlight']=sample(900);assert offline['pauseAutomaticFlight']['delta']==0;scroll();call('screenshot',str(out/'offline-first-experiment.png'))
(out/'offline.json').write_text(json.dumps(offline,indent=2)+'\n');call('close');print('Offline file and paused automatic camera flight verified',flush=True)
