# Independent AI 3D and interface review — research campus

Reviewed 5 October 2026, on `feature/quantum-research-campus`. The reviewer did not edit repository source or Git, and never accessed or changed the user's earned Chrome campaign. Native interface QA ran in an isolated `agent-browser` session, initially against the development origin and then against the builder's private static server at `http://127.0.0.1:8016/index-3d.html`. Engine fixtures were explicitly imported into this isolated session. Fixture QA, constructed stress probes and the normal-player Chrome campaign are different evidence categories.

Accepted final `instrument-3d.js` SHA256: `7992d2fdf096316dfb88bcbbccdf28d575e816317e76518c08673e49138ad9c8`.

## Conclusion and agreement

The 3D builder and independent AI visual reviewer agree that the implemented campus meets the scoped visual and interaction requirements after the corrections below: the small room has become a connected, progressively occupied research site; station cameras expose their relevant equipment; default framing evolves with the campaign; commissioning displays actual delivery stock; keyboard and narrow layouts work; idle and inaccessible presentation stops its GPU scheduler; context loss leaves the full 2D instrument usable.

This is an independent AI review, not a credentialed human review. It does not establish human enjoyment, physical-device frame rate, a 90-minute first human play, or completion of the root agent's earned Chrome campaign. The outstanding-gift goal should still be judged through that campaign and the next human playtest, with this evidence supporting the visual implementation rather than claiming to prove those outcomes.

## Findings, corrections and independent rechecks

1. **The new campus could remain framed as the old small annex.** Native import from the opening into chapter VI updated the Overview title and campus geometry but left the old camera eye. `build()` replaced camera targets without applying the new selected Overview target after the first frame. The builder fixed chapter transitions to refresh untouched Overview, while respecting user orbit and other selected stations. Native recheck produced eye `[72,60,86]`, target `[0,3,0]` without another Overview click. A real mouse drag produced eye `[-21.86693282002748,19.927293749581388,29.884225771272575]`, target `[-8,2.8,11]`, `cameraOrbited=true`; the same values survived chapter-VI import and viewport resize. Reset restored the current campus Overview and cleared the orbit lock. Choosing a station remains manual inspection rather than a forced camera jump.

2. **Settings did not stop the 3D renderer.** A running native fixture behind Settings advanced renderer frames from 397 to 431 over 1.5 seconds, with a 30 Hz driver, because visibility gated only the chapter dialog. The builder now gates every open native dialog. Independent Settings recheck held frames at 3 for one second, driver false, cadence zero and visible false; closing Settings resumed 30 Hz. The all-dialog predicate also covers paper, model, reset and chapter dialogs by source inspection; those other dialog identities were not each separately timed in this review.

3. **The commissioning camera hid the important new delivery feedback.** Its foreground doorway dominated the view, and received stock crates were outside the station frame. The builder changed the camera to show the dock, workshop and staging bays together, then widened and moved the focus slightly to include both crate streams wholly. Independent final desktop and 375-pixel native imports show 64 chip assemblies and 64 support assemblies, one copper and one silver crate glyph, separate from installed hardware. Exact totals remain in the readable legend; glyphs are explicitly a schematic subset.

4. **Rack fronts needed slightly more fill.** The agreed bounded adjustment raised hemisphere light from 1.35 to 1.55 and front fill from 1.65 to 1.9, preserving the copper key light, exposure and environment. Reviewed final Control and cryostat/annex captures retain readable dark rack detail and warm copper. Earlier before-light images had different viewport crops, so this review does not claim a matched quantitative lighting comparison.

5. **Pausing could leave the CSS assembly reveal mid-animation.** The builder found and removed the lingering `three-reveal` class on paused, ended and reduced-motion states. Final source and the builder's native paused-import check show immediate opacity 1 without the reveal class, complementing the independently timed zero-frame scheduler checks.

No unresolved correctness blocker remains in this review scope.

## Camera and layout evidence

The independent native desktop sweep used real camera controls and imported paused opening, middle and late campaign fixtures. It captured all available camera buttons: 8 early, 11 middle and 12 late, including Reset. The late set comprises the eight station IDs `cryostat`, `control`, `research`, `processor`, `memory`, `planning`, `fabrication`, `service`, plus `overview`, `campus`, `top` and `reset`. Stations appear when their equipment exists; the hidden early stations do not imply missing cameras. Default views make the growing site's purpose readable while Whole campus and Top expose the complete schematic 110 × 85 site. The research atrium grows from one to four floors, control/support halls acquire equipment, and memory, scheduling and commissioning facilities become occupied at their actual stages.

The first mobile pointer sweep uncovered an automation capture problem: pointer activation during the horizontally scrolling camera strip could hit a neighboring button, and a generic idle wait did not detect that mismatch. Those mismatched images are not accepted evidence. The final independent matrix used native focus + Enter, waited for the exact selected camera identity and a settled static presentation, and inspected the resulting images. All 24 final views at widths 375 and 320 pixels matched the requested camera, had zero document horizontal overflow, pixel ratio 1.25, zero paused cadence and no active driver. The horizontal camera strip is intentional; page content does not overflow. Keyboard activation is also proof of access to stations outside the initially visible strip.

Authoritative final mobile contact sheets:

- `evidence/campus/campus-review-grid-mobile375-accepted.png`
- `evidence/campus/campus-review-grid-mobile320-accepted.png`

Per-view camera identities, overflow, driver, pixel ratio and geometry counts are in `evidence/campus/campus-review-mobile-results.json`. Desktop matrix results are in `evidence/campus/campus-review-camera-results.json`; earlier desktop Fabrication captures are superseded by the final dock captures below. The settled final camera changes were limited to Overview behavior, manual orbit preservation, fill and the reviewed dock framing.

The final memory view keeps all 9 data sites and 8 check ancillas visible for distance 3; the monitor is outside the patch. In narrow Control and Planning views some surrounding architecture may enter the frame, but the relevant racks and schedule remain identifiable, with complete text and exact 2D information available below. No chosen station is reduced to a blank canvas or an obstructing roof.

## Purposeful activity and lifecycle checks

Native order motion followed actual engine orders. The imported pending-order fixture had two legal 64-unit local orders, both at 12/20 seconds remaining, progress 0.4, paused and no activity. After native Resume and 1.5 seconds of visible play, both progressed to approximately 10.4992 seconds remaining, progress 0.47504; deliveries, commissioning, services, research and calibration indicators activated under their actual metric conditions, with a 30 Hz desktop renderer. Native Pause returned it to a static state. No capacity was injected and this was an isolated fixture exercise, not the earned player campaign. The source caps delivery markers to the actual two-order queue and stock glyphs to eight per stream; no orders means no vehicles. Delivery progress and received stock remain separate from funded workshop commissioning.

Independently observed suspension/recovery:

- Running fixture with reduced motion: renderer frames 3 to 3 over one second; driver false, cadence zero; native Memory camera still worked. Clearing the preference resumed 30 Hz.
- Offscreen running fixture: frames 458 to 458 over one second; visible false, driver false, cadence zero.
- Research navigation: visible false and no renderer driver.
- Background-tab transition in the isolated browser: frame 459 at hide and again at return; hidden driver false/cadence zero, then visible driver true/cadence 30. An ephemeral QA visibility listener recorded this; it did not change engine state.
- Native 2D toggle: `enabled=false`, 3D canvas hidden, driver false, full original instrument `display:block`; toggling back restored 3D.
- Native settings modal: timed zero-frame check described above.

Desktop orbit uses actual pointer input, keeps user framing through rebuild/resize, and Reset returns deliberate authored framing. Narrow layouts retain vertical page scrolling through `touch-action: pan-y` and use station buttons rather than requiring orbit gestures. CSS and scheduler implement static reduced-motion equivalents. Physical touch-device gesture feel and frame rate were not measured on a physical phone.

## Keyboard, expanded view and recovery

Native focus on Control followed by Enter selected Control, with a visible 2-pixel teal focus outline. Tab reached Research, and Enter selected Research. The final 24-camera narrow sweep independently exercised native keyboard access to every late camera, including the horizontally displaced buttons and Reset.

Native Expand lab entered fullscreen on `main`, preserving the primary action, resources, camera controls and scrolling interface; there was no document horizontal overflow. Exit expanded lab worked. On the tested 1440 × 1100 viewport the fullscreen canvas was 1414 × 755; the full interface remains scrollable, so this is not a claim that all laboratory content fits without scrolling.

In the isolated test browser only, deliberately losing the WebGL context exercised the actual context-loss handler: `available=false`, `enabled=false`, driver false, 3D canvas hidden, explanatory status, and the original 2D instrument visible. After the next normal UI render it displayed the correct chapter-VI full resource schedule. Reload restored 3D. This was a graphics recovery test, not a save mutation or engine shortcut. No unexpected JavaScript errors appeared during the camera sweeps.

## Geometry and performance boundaries

Geometry is finite, procedural and uses pooled materials/geometries with instanced batches. The final constructed stress fixture at 8,193 active physical positions and distance 9 rendered the correct 81 data + 80 check ancillas = 161 physical sites per ideal patch. This constructed parser-valid state is not a legal playthrough.

The independent first frame after that fixture's structural rebuild measured **136 draw calls and 180,480 triangles**, including the required shadow update. A subsequent ordinary authored camera frame measured **109 calls and 124,824 triangles**, with the paused driver inactive. The distinction matters: reporting only the ordinary-frame number as the structural peak would overstate performance evidence. The shadow map updates on structural change rather than every activity frame. The existing capped 30 Hz desktop / 20 Hz narrow-device cadence and capped pixel ratio are code controls, not measured device FPS.

This review did not measure simultaneous maximum staffing, automation and notebook configurations on a physical device. Array sizes and engine caps are bounded, but renderer diagnostics are not a mobile performance certification.

## Authoritative captures for saving in the repository

- `evidence/campus/campus-independent-final-dock-desktop.png`
- `evidence/campus/campus-independent-final-dock-375.png`
- `evidence/campus/campus-review-grid-mobile375-accepted.png`
- `evidence/campus/campus-review-grid-mobile320-accepted.png`
- `evidence/campus/campus-review-grid-phase1.png`
- `evidence/campus/campus-review-grid-phase4.png`
- `evidence/campus/campus-review-grid-phase5.png` (old dock superseded by final dock images)
- `evidence/campus/campus-review-actual-moving-orders.png`
- `evidence/campus/campus-review-context-fallback.png`

The root agent should copy the useful final evidence and this review into the authorized repository and commit it locally. No publishing, messaging Keir, remote changes, or user-Chrome modifications were performed by this reviewer.
