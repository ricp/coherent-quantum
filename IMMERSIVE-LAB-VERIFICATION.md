# Immersive laboratory verification

Date: 2026-10-05. This verifies the separate `index-3d.html` facility revision. It supersedes the rejected compact diorama captured in `3D-CHECKPOINT.md`; it does not replace the engine pacing limitations in `DEPTH-VERIFICATION.md`.

## Final implementation and preserved contracts

The independent AI 3D specialist accepted renderer SHA256 `680ea026dc64eaecf6eb9b84afb3a233e642c8d4d2175235cba9cd4bdbe2cef0` and stylesheet `7481ba7682fc816cba2e683484b02e2008dab02c4ae583da1b875c12921511e9`. Source hashes, original-runtime comparisons, packaging hashes, and validated save fixtures are in [checks.json](evidence/immersive-lab/checks.json).

- `index.html`, `style.css`, `app.js`, `instrument.js`, `game.js`, and `content.js` match baseline commit `62cf6c255d1fa053a8670d27d3c1d84b53c5d1dd` byte for byte. The original 2D entry, scientific model, research archive and persistence contract are preserved.
- All 169 original HTML IDs occur exactly once in the generated 3D page. The original single experiment action and next-action text move into its full-width theater.
- `npm run build:3d` regenerated identical `index-3d.html`, local Three.js bundle and MIT license. No runtime CDN is required. `node --check instrument-3d.js` passed.
- `npm test`: **43 passed, 0 failed, 0 skipped**. [tests.txt](evidence/immersive-lab/tests.txt) includes resource/tradeoff, recovery, citation, scientific-boundary and complete legal campaign tests. These engine checks support the unchanged mechanics; they do not prove visual quality or fun.
- Seventeen saved engine scenarios/exports in the facility evidence pass `G.parseSave`. Constructed renderer stress states are identified below; save validity alone does not make a scenario earned play.

## Actual browser play and growth

QA used isolated Chromium/WebGL 2 sessions through `agent-browser`, including direct `file:` URLs. Native buttons performed imports, purchases, pause, camera selection, exports, fullscreen and workload actions. DOM evaluation read diagnostics and presentation or exercised explicit browser/media/lifecycle probes; it did not inject resources into the browser engine. [Portable scripts and method](analysis-tools/3d-browser-qa/README.md) are saved.

The purchase sequence starts from legal engine-generated banks: [legal-growth-method.json](evidence/immersive-lab/legal-growth-method.json) and [legal-native-method.json](evidence/immersive-lab/legal-native-method.json). Visible laboratory seconds earned the funding/designs before browser purchases; this is a growth scenario, not a human pacing measurement. Native checks record:

| Action | Observed apparatus change |
| --- | --- |
| Hire researcher 3 → 4 | Fourth desk, terminal and seat appear |
| Hardware purchase | Module packages 3 → 4; installed capacity 25 → 81 |
| Control/cooling rack | Cabinets 4 → 5; supported capacity 81 → 257 |
| Pulse tooling | New control tooling and coax paths |
| Decoder purchase | Classical decoder cabinets 1 → 2 |
| Analysis automation | Individual analysis stations 3 → 4 |
| Workshop engineering and purchase | Separate fabrication/integration cell and funded robot activity |
| Commissioned construction snapshot | Actual fabricated/integrated counters add visible infrastructure cohorts |

See [native-purchases.json](evidence/immersive-lab/native-purchases.json), purchase/staff captures, [construction-active.png](evidence/immersive-lab/construction-active.png), and [legal-purchases-motion.webm](evidence/immersive-lab/legal-purchases-motion.webm). The final 15.096-second VP9 video records the canvas, including purchase/camera/construction activity and the close active Planning display. Its final native workload diagnostic verifies Planning, in-viewport visibility and an active driver; separate viewport screenshots establish the HTML purchase cue. Seven distinct native camera station captures and [focus-matrix.json](evidence/immersive-lab/focus-matrix.json) cover Cryostat, Research, Control/decoder, Processor, Memory, Planning and Fabrication.

Native fullscreen includes `main`. The original primary action scrolls to available workloads inside fullscreen; an actual Dynamics schedule runs to the gift ending while the ending remains within the fullscreen element. Escape returns successfully. [advanced.json](evidence/immersive-lab/advanced.json), [fullscreen-active.png](evidence/immersive-lab/fullscreen-active.png), and [fullscreen-ending.png](evidence/immersive-lab/fullscreen-ending.png) record this. The earlier `fullscreen.target` value in `probes.json` reads an empty class name; `advanced.json` explicitly verifies the target ID `main`.

## Visible feedback, accessibility and motion

[visibility.json](evidence/immersive-lab/visibility.json) verifies a real native hardware purchase below the theater. The fixed cue remains within the viewport, the offscreen renderer draws **0 frames in 700 ms**, and native **Inspect your expansion** returns to Processor with the new module count. The 650 ms assembly reveal is observed at 100.0 ms after returning. Visible activity resumes, with 16 GPU frames in the next 700 ms.

At 375px width, the cue ends at 924px and the fixed experiment action starts at 942px; neither overlaps nor creates horizontal overflow. Keyboard Enter on inspection moves to the camera control and leaves the paused save unchanged. Reduced-motion first preparation follows to Cryostat immediately with **0 additional GPU frames in 650 ms**. Cue screenshots are [ordinary-purchase-cue.png](evidence/immersive-lab/ordinary-purchase-cue.png), [mobile-purchase-cue.png](evidence/immersive-lab/mobile-purchase-cue.png), and [returned-expansion-reveal.png](evidence/immersive-lab/returned-expansion-reveal.png).

All six chapter frontiers plus the ending were visually captured at desktop 1440px and narrow 320px widths, with no document overflow; 375px/DPR 3 coverage also verifies the 1.25 pixel-ratio cap. Compact mobile camera buttons scroll horizontally, with visible focus. Original research/measurement text and controls remain available below the theater. Light-theme, maximum patch and reduced-motion captures supplement the matrices. Actual desktop orbit disables follow mode and changes no paused save. Native wheel over the canvas scrolls the page by 250px; camera zoom does not capture it.

## Rendering and recovery

[probes.json](evidence/immersive-lab/probes.json) records zero additional GPU frames over 650 ms in unstarted, paused, ended, zero-flow, full-bank, reduced-motion, research-view and chapter-modal scenarios, including pause during camera flight. The chapter modal is a constructed visibility probe. A native background-tab check confirms `document.hidden` both before and after its sample and zero GPU frames.

The final regression probe records actual `[false, true]` observations in one IntersectionObserver callback. Reading the first observation previously left a visible canvas stopped; the renderer now consumes the latest observation. [observer-before.json](evidence/immersive-lab/observer-before.json) records the old mismatch, and [observer-after.json](evidence/immersive-lab/observer-after.json) records the same batch with visible Planning and 16 frames per 650 ms. Four subsequent out/in scroll cycles each yield zero offscreen frames and resume active rendering on return. This is a captured cause and correction, not an inferred browser limitation.

The driver is capped at 30 Hz on desktop and 20 Hz for smaller/touch layouts, with bounded DPR. Final sampled active rendering was 20 frames in 900 ms on desktop and 18 frames in 1,000 ms on mobile; these are observations in this QA environment, not physical-device performance promises. Screens/geometry are pooled, and repeated traversal of chapters 0–5 and ending produced identical per-chapter resource counts on both cycles: geometries/textures 17/18, 17/18, 18/19, 21/22, 23/24, 28/28, 29/29.

Constructed maximum-equipment coverage sets all allowed hardware/control/decoder/staff/automation/workshop bounds and 8,193 active physical qubits. It renders 87 draw calls and 160,208 triangles. A maximum distance-three allocation renders 481 ideal patches; distance 3/5/7/9 views retain exact data/check counts for the single patch exhibit. These renderer bounds are not a legally earned campaign or a full-machine engineering estimate. Unqualified schedule planning states keep the full modeled timing distinct from a lower-bound lane placement.

Actual `WEBGL_lose_context` stops 3D, restores the original 2D instrument, and preserves the paused save. Restoring the graphics context keeps the explicit fallback until reload; gameplay continues and exports successfully, then reload reinitializes 3D. Forced creation failure is separately observed as playable 2D, with successful export. Direct-file network-offline startup has zero HTTP resources and works through first preparation and pause. [advanced.json](evidence/immersive-lab/advanced.json), [fallback.json](evidence/immersive-lab/fallback.json), [offline.json](evidence/immersive-lab/offline.json), and the validated exports contain the observations. Final browser error arrays are empty.

## Honest limits

This is implementation and independent **AI** design consensus, not a credentialed human review or proof of enjoyment. Human first-play duration, strategic satisfaction and physical mobile/Safari performance remain unverified. The campaign engine and its known waiting/pacing limitations are unchanged by this visual revision.

Synthetic persisted `pagehide/pageshow` events are retained in `probes.json`; a still-visible page continued receiving original app draw calls, so those samples do not establish native back/forward-cache behavior. Lifecycle guards were source-reviewed; native cache restoration remains unverified. Canvas recording does not capture HTML/CSS cue motion. Full-page captures, native actions and timing samples provide that separate evidence.

All apparatus is schematic: cabinets do not imply a real qubits-per-fridge law, detector events do not expose unknown data states, factory lanes represent fresh-state supply, and workload cursors follow laboratory pacing rather than microsecond simulation. Primary paper findings, game abstractions and hypothetical future recipes remain inspectable in the unchanged research archive and `PAPERS.md`. No new experimental or quantum-advantage claim is made.
