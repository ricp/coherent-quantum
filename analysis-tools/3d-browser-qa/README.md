# Private browser QA for the 3D laboratory

These Python 3 scripts preserve the native browser verification method used for this revision. They require an installed `agent-browser` CLI with its Chromium runtime and write evidence under `evidence/immersive-lab/`. They are development tools; playing the game requires neither Python nor this CLI.

Run from any directory:

```sh
python3 analysis-tools/3d-browser-qa/native.py
python3 analysis-tools/3d-browser-qa/probes.py
python3 analysis-tools/3d-browser-qa/visibility.py
python3 analysis-tools/3d-browser-qa/observer.py after
python3 analysis-tools/3d-browser-qa/advanced.py
python3 analysis-tools/3d-browser-qa/fallback.py
```

Run native and probes sequentially because they share the private `coherent-immersive` session. The other scripts have distinct private sessions. The observer probe logs actual callback batches and repeats offscreen/return checks; its saved before-fix artifact records the old first-entry bug, while the final script asserts the corrected behavior. Native buttons perform purchases, imports, exports, pause, camera selection, fullscreen and workload actions. DOM evaluation reads presentation/diagnostics, records the canvas, and probes media, WebGL loss and lifecycle conditions; it never injects engine resources. The scripts import checked-in scenario saves, not an existing user laboratory.

The recording captures the WebGL canvas. Separate full-page viewport screenshots and `visibility.json` establish that the HTML expansion cue is visible and the reveal starts after native inspection. Constructed maximum-equipment/full-bank and chapter-modal probes test rendering bounds and visibility, not earned campaign progress. Synthetic persisted page events are retained as observations and do not establish native back/forward-cache behavior.

`advanced.py` waits in ten-second intervals for a native workload to reach the fullscreen ending. Assertion failures must be investigated before treating updated artifacts as accepted. Close only these private sessions when finished:

```sh
agent-browser --session coherent-immersive close
```
