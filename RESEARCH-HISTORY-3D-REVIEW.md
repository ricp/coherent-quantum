# Independent AI review: toolbar, zoom and floor cable continuity

2026-10-05. Accepted within the scope below. Read-only reviewer: no project source/Git edits, no actual user Chrome/save access. Native QA used isolated `campus-zoom-review` and `campus-zoom-mobile-review` browsers, Settings imports of parser-valid saved fixtures, public controls and browser input. This is isolated QA, not an earned campaign or a physical-phone test.

## Source scope

The full desktop toolbar/zoom matrix ran on renderer `ee23487e17cb4f89be2199498b6f616a032784de7939451c6bf56ba2b3ccfc06`, stylesheet `47ce98e9b46b4323924bee4940383eaedc67bbf93f2599bc565970ae94cee20e`. The final delta reloaded renderer `87ff707b1088b6fb5f3ef3d8d2440f5492b0490f13c4efcd04b3a7407aba9835`, with the same stylesheet. The final delta comprises fine-pointer zoom synchronization and the two floor-spanning route interpolations; authored camera destinations, zoom bounds and toolbar CSS are unchanged. Concurrent research-history app/engine work belongs to its separate reviews.

## Observed results

- At 1600px, every visible toolbar button, including 2D view, lies on one physical row; the toolbar and document have no horizontal overflow. At 1300px, the row remains single and overflows only inside the toolbar. Keyboard focus brings the final 2D view button fully into the visible strip. Narrow layouts retain their existing wrapping controls and horizontal camera strip.
- Trusted native wheel over the actual canvas zooms both the full campus and a close Cryostat view. Whole campus distance 108.4158659976 → 95.8582499311 on wheel −240, then back to 108.4158659976 on +240. Cryostat distance 17.2418096498 → 15.2447216417 and back. Page scroll remains unchanged on the fine-pointer canvas. Input observations record `isTrusted:true`, target `three-canvas`, with explicit viewport coordinates.
- Oversized wheel input and repeated actual keyboard `=`/`-` inputs both reach the declared clamps: Whole campus 8.64–450; Cryostat 1.5–450. The backed-out scene stays rendered. These extreme inputs are deliberate boundary QA, not normal campaign play.
- Focused keyboard zoom works, produces the inset focus ring, disables Follow through the existing manual-inspection path, and settles after its dirty frame. Modified Control/Alt shortcuts do not change camera distance. Keys with a Settings modal open or 2D view active do not move the camera or restart the stopped renderer.
- Zoomed eye/target arrays remain exactly equal across 1600→1300px resize and a chapter 5→1 import. Re-selecting the station restores its authored eye/target and clears the manual lock. Reset continues to select the authored Overview. Early Overview and early Cryostat remain usable.
- The first coarse-pointer transition exposed a real omission: only initialization set `enableZoom`, so changing the primary pointer left the old wheel policy active. The parent added `controls.enableZoom=fine.matches` in the existing size update. Final native fine→coarse and coarse→fine transitions now update zoom correctly.
- Final cold coarse-pointer views at 375 and 320px preserve the authored whole-campus fit without page overflow. With native touch emulation held attached, `(pointer:coarse)` is true, `maxTouchPoints` is 1 and wheel zoom is disabled. A trusted touch swipe starting on the canvas scrolls the page by 178px while camera distance stays 276.0261514122. A trusted canvas wheel in coarse mode scrolls the page while distance remains unchanged. `touch-action:pan-y` is retained. This is Chrome touch emulation, not a physical iPhone.
- Paused/ended dirty rendering settles inactive. A 300ms settled observation leaves frame count unchanged. Intentional isolated `WEBGL_lose_context` fault injection hides the 3D canvas, stops its driver and displays the existing context-loss/2D-availability message. This is a deliberate graphics failure test, not a naturally occurring crash. No browser errors were reported in the wheel, keyboard, pointer, final-camera or fallback observations.

## Cable defect and correction

Independent sampling with the shipped Three toolkit confirms the original floor-spanning centripetal paths overshoot below the floor: silver readout minimum center Y −0.50547638497, copper control −0.40229137619. This explains the apparent severed ends. Waypoint heights alone did not establish route clearance.

The accepted minimal correction adds a flag to the existing cable helper and applies uniform Catmull-Rom tension 0 only to these two routes. Other replay curves retain their centripetal default. Actual final helper execution, 10,001 centerline samples and rendered TubeGeometry vertices produce:

| Route | Minimum center Y | Minimum rendered tube Y |
| --- | --- | --- |
| Copper control | 0.300000 | 0.254003 |
| Silver readout | 0.340000 | 0.299211 |

Both clear the 0.20 pedestrian/floor surface in this model. Native final Cryostat, Control, Top and Overview views show continuous above-floor runs. The straighter bends are deliberate; no extra apparatus, scientific claim or game state was added. Equipment may still naturally occlude a route from some viewpoints; this is not a promise that every metre of cable is visible from every possible orbit.

## Input-tool distinction

The installed agent-browser CLI 0.31.1 `mouse wheel` dispatched at viewport (0,0), even after mouse move; passive observation proved it missed the canvas. `press Equal` also delivered an unsupported literal key name, while literal `press '='` delivered the correct `key:'='`. These failed automation attempts are not game failures and were superseded.

To test actual wheel/touch behavior, the reviewer obtained the documented CDP URL of the private managed browser, checked its exact page URL, read that browser's own Input/Emulation protocol schema, and sent positioned native `Input.dispatchMouseEvent` / `Input.synthesizeScrollGesture`. Passive listeners confirmed trusted input and its canvas target. No JavaScript WheelEvent dispatch, game ticks, engine-state mutation or user browser connection was used. Native emulation is held attached during the touch observations, because its settings revert when the debugging client disconnects.

## Evidence whitelist

The following artifacts are suitable to preserve. Raw predecessor screenshots are accurately scoped to `ee234...`; final cable/pointer/fallback images are scoped to `87ff...`.

**Metadata / runnable checks**

- `/tmp/campus-zoom-native-results.json` — predecessor full wheel/keyboard/toolbar/bounds/manual-preservation matrix.
- `/tmp/campus-zoom-final-delta-results.json` — final camera/cable captures and trusted wheel replay.
- `/tmp/campus-zoom-final-mobile-results.json` — final cold/hot pointer and trusted touch/page-wheel observations.
- `/tmp/campus-zoom-final-resilience-results.json` — final idle and intentional context-loss fallback.
- `/tmp/campus-cable-clearance-qa.cjs` — actual final cable-helper floor-clearance/replay-default intent check; run with repository path as optional argument.
- `/tmp/campus-native-input.mjs`, `/tmp/campus-touch-zoom-qa.mjs` — private input transport / mobile reproduction scripts, explicitly native browser QA.

**Representative screenshots**

- `/tmp/campus-zoom-desktop-preset.png` — 1600px complete desktop row including 2D view.
- `/tmp/campus-zoom-toolbar-last-focused.png` — 1300px internal strip and reachable final button.
- `/tmp/campus-zoom-key-in.png` — focused keyboard zoom and ring.
- `/tmp/campus-zoom-wheel-campus-in.png`, `/tmp/campus-zoom-wheel-campus-max.png` — predecessor native wheel zoom / far bound.
- `/tmp/campus-zoom-final-campus.png`, `/tmp/campus-zoom-final-cryostat.png`, `/tmp/campus-zoom-final-control.png`, `/tmp/campus-zoom-final-top.png`, `/tmp/campus-zoom-final-overview.png` — final cameras and continuous routes.
- `/tmp/campus-zoom-final-wheel-in.png`, `/tmp/campus-zoom-final-wheel-out.png` — final trusted wheel replay.
- `/tmp/campus-zoom-final-mobile-cold375.png`, `/tmp/campus-zoom-final-mobile-cold320.png`, `/tmp/campus-zoom-final-mobile-native-touch.png` — final coarse views / page touch scrolling.
- `/tmp/campus-zoom-final-context-fallback.png` — final deliberate GPU-failure fallback.

Do not preserve earlier viewport-only mobile captures as coarse-pointer evidence: the CLI device preset initially retained a fine pointer. Do not present predecessor full matrices as a repeat of every check on final `87ff...`; the final bounded delta is separately documented.

## Consensus and limits

Accepted: one-row desktop controls, usable bounded wheel/keyboard zoom, exact manual framing preservation, coarse-pointer scrolling, stopped dirty rendering, existing fallback, and the specific continuous floor-route correction. The parent accepted and implemented both concrete findings; the final delta has native evidence. Human fun, physical-device frame rates, real phone gesture compatibility and universal artistic excellence remain unverified. Existing full campus camera/lifecycle evidence retains its original scope; this review did not repeat an entire campaign or all prior checks.
