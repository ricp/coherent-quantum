# Fresh independent AI completion visual audit

2026-10-05; read-only inspection and isolated native fixture QA. Baseline renderer `f974ce18592c0b1117779d798cb2198bb68cb717918d3ac1e26094753b40a697`, app `977976b1ba6c4102c66d484797d7ee04d0a7a23f803a3c415d726056cb4da02e`. No source/Git or actual Chrome/save changes by this reviewer.

## Fresh judgment

The earned ending and twelve-camera grid show a coherent, substantial laboratory: an inhabited four-floor research atrium, cryogenic annex, processor, protected-memory court, long control hall with outdoor cooling, scheduling foundry, commissioning dock and entry gallery. The close station views reveal equipment and interior detail that the old small tabletop lacked. The existing chapter and interaction evidence establishes meaningful changing geometry and state-dependent activity; it does not establish human enjoyment or universally outstanding artistic quality.

The distant Whole campus framing remains a material weakness for the user's HUGE goal. In the actual earned ending the campus occupies roughly half the canvas width and sits below center, surrounded by a large empty field. It reads as a small model. The closer Overview preset gives more presence but clips the front plot edge, so simply using Overview as the ending camera is not a complete fit solution.

Fresh ordinary 375px native loading also shows that the existing portrait widening does not fit the entire plot horizontally. A whole-campus view should preserve the complete campus boundary while close station views serve inspection. Earlier subject/usability checks did not identify this specific map-boundary problem.

## Evidence and measurements

Authoritative earned evidence inspected: `evidence/campus/chrome-earned-ending-final.png`, `chrome-earned-camera-grid.jpg`, and `chrome-earned-overview.png`.

Fresh native `campus-completion-audit` opened the actual local entry page, imported the existing valid Molecule/Dynamics ending fixture through Settings, and selected ordinary camera controls. At 1655×965, the canvas is 1532×620. At 375×900, its current CSS height is 440px and width 337px. No CSS, game-state or renderer injection was used.

Pixel silhouette measurements use a simple color difference from the dominant canvas background; they include the visible plot/buildings and are approximate composition metrics, not performance measurements:

- Whole campus desktop: bounding box 728×424px, 47.5% of canvas width and 68.4% of height; margins 406 left, 154 top, 398 right, 42 bottom.
- Overview desktop: about 66% width and 81% visible height, touching the bottom border; the front plot is visibly clipped.
- Whole campus 375px: the visible silhouette reaches both side borders. Independent perspective projection of the actual floor corners and research/hall height bounds predicts 112.1% horizontal extent, corroborating the visible lost plot corners. At 320px the existing rule similarly predicts 112.2%.

Fresh screenshots: `/tmp/campus-completion-desktop-campus.png`, `/tmp/campus-completion-desktop-overview.png`, `/tmp/campus-completion-mobile-campus.png`. Exact native metadata: `/tmp/campus-completion-framing-results.json`. The mobile Overview screenshot was not accepted for pixel measurement because the subsequent focus action changed its page scroll; its out-of-viewport crop is not evidence of a rendering failure.

## Minimum proposed correction, pending rendered verification

Change only the Whole campus preset to `at:[16,0,20]`, `eye:[77,52,93]`. This uses a ground-level pivot on the pedestrian spine. For that preset only, scale its eye-to-target vector by `Math.max(1,1.95/ratio)`; preserve every other camera's current aspect rule, FOV, UI, geometry and lifecycle. Existing orbit and resize locking must remain unchanged.

Using the current 37° FOV and projecting the actual 110×85 plot corners (including its underside), research roof at height 15 and support-hall bounds predicts:

| Canvas | Predicted complete-campus extent | Border result |
| --- | --- | --- |
| 1532×620 | 64.2% width, 89.0% height | About 33px top and 35px bottom; all corners inside |
| 948×560 | 83.2% width, 76.8% height | All bounds inside |
| 742×560 | 86.1% width, 60.3% height | All bounds inside |
| 337×440 | 90.8% width, 35.9% height | About 18px minimum side margin |
| 282×440 | 91.9% width, 30.3% height | About 13px minimum side margin |

These are calculations, not candidate screenshots. The desktop campus becomes about 35% wider and approximately 75% larger in bounding area while retaining its full plot. Portrait displays necessarily show a wide plot within a narrow viewport; detail comes through the named station cameras. This proposal prioritizes complete borders over artificially enlarging and clipping the map.

Before accepting a source patch, verify native early/middle/late Whole campus, 320/375px and intermediate width, automatic ending entry, exact manual orbit/resize preservation, and return to close station cameras. No additional geometry, new zoom UI, or unasked redesign is required for this correction.

## Other concrete criteria and limits

The toolbar supplies distinct close-camera choices, keyboard focus, Reset, Follow and expanded viewing. Free wheel zoom is deliberately disabled; the preset stations are the current inspection affordance. Adding generic zoom is not necessary to fix the identified framing problem and would require separate distance/target/lifecycle checks.

Four differing chapter compositions and purposeful delivery/station/pause motion have actual evidence. Scientific state, schematic cohorts, real modeled timing, unknown-state limits and milestone/current-preview separation are labeled. Earlier mobile overflow/focus, reduced motion, inactive GPU, fallback, contrast and import evidence remains scoped to its actual tested states; this audit does not repeat or expand those claims. The same applies to the parent's earned campaign, downloads and modern primary references.

Human enjoyment, first-time player interpretation of scale, physical-phone performance and universal artistic excellence remain unverified. The campus is a schematic visual world; 110×85 is not a real square-metre capacity estimate. A complete legal campaign and bounded meshes do not alone make the game outstanding.

**Current conclusion:** retain the laboratory's style and evolving content. Correct the material Whole campus composition and complete-border fit before calling its presentation finished. Final acceptance of the proposed two-site source change requires the native rechecks above; no patch has been made by this reviewer.


## Implemented correction and native recheck

The parent applied the proposed two-site Whole campus camera correction. Camera review renderer: `41ad04d08db58e3e9656806d3c1a9f45c358ce8a7e78d90964e861169fff5f7f`. Subsequent one-line caption-transition correction: final renderer `e9d41cc0087f1d12d90e7983ff57f928a4d7c452a5afdb73c9542bdce909f100`. The caption guard changes no geometry, camera destinations, resource rules or save state.

Native public Settings imports, keyboard focus/Enter, viewport resizing and actual pointer orbit ran only in the isolated `campus-completion-audit` browser. The first matrix used valid saved stages 1, 3 and 5, at desktop 1655px, intermediate 1000px and narrow 375/320px; an independent reverse ending fixture supplied automatic ending entry. These are isolated QA, not the parent's earned Chrome run.

The complete campus plot and tallest earned atrium fit in all thirteen native compositions. The layout has no horizontal document overflow. The actual approximate pixel measurements are:

| Native composition | Visible silhouette | Canvas width / height | Minimum horizontal margin |
| --- | --- | --- | --- |
| Ending / late desktop, 1532×620 canvas | 983×540px | 64.2% / 87.1% | 262px |
| Early desktop | 983×483px | 64.2% / 77.9% | 262px |
| Middle desktop | 983×520px | 64.2% / 83.9% | 262px |
| Late 1000px viewport, 948×560 canvas | 787×421px | 83.0% / 75.2% | 71px |
| Late 375px viewport, 339×440 canvas | 307×156px | 90.6% / 35.5% | 14px |
| Late 320px viewport, 284×440 canvas | 260×132px | 91.5% / 30.0% | 10px |

The desktop silhouette is about 35% wider and 72% larger in bounding area than the measured baseline. Its upper/lower margins are 33/47px. It is visibly centered, with the tall research atrium, annex, control hall, commissioning dock, allocation foundry, cooling infrastructure and connecting paths together. This resolves the specific distant-miniature composition weakness without adding unrelated geometry. Portrait Whole campus necessarily remains a small map within a tall narrow viewport; its complete plot fits, while named station cameras provide detail. No claim is made that small in-world labels are readable in a 320px whole-campus view.

Exact native observations: `evidence/campus/completion-visual/campus-fit-native-matrix.json`; measured pixel bounds: `evidence/campus/completion-visual/campus-fit-silhouette-metrics.json`; original matrix captures: `/tmp/campus-fit-{early,middle,late}-{desktop,1000,375,320}.png` and `/tmp/campus-fit-ending-desktop.png`.

### All camera controls and manual orbit

The fresh late desktop sweep used all twelve controls through keyboard focus/Enter: Overview, Whole campus, Cryostat, Control / decoder, Research, Processor, Memory, Planning, Fabrication, Service gallery, Top and Reset. Every control selected the expected camera and produced a new visible native GPU frame. The eight station subjects are recognizable and inspectable; no new roof/beam obstruction hides their primary apparatus. Research shows its four floors, Memory the 9-data/8-check patch, Planning the six modeled schedule lanes, and Fabrication the integration cells and delivery staging. Overview/Reset intentionally remain closer compositions with a clipped foreground plot edge; Whole campus is now the complete-border view. Top is the complete campus plan.

The twelve-camera grid `evidence/campus/completion-visual/campus-fit-final-angle-grid.jpg` contains only documented crops of the native canvas with camera labels. It was captured on renderer `41ad...` before the caption guard. The corresponding full-page images `/tmp/campus-fit-final-angle-<camera>.png` still contain the subsequently identified stale imported milestone caption; they must not be presented as post-caption-fix page evidence. The canvas-only grid remains valid camera/geometry evidence because the guard changes only caption/follow history. Native camera metadata is `evidence/campus/completion-visual/campus-fit-final-angle-results.json`.

A real pointer drag changed the Whole campus eye to `[-25.34418385250585,88.58118698080398,66.88317155058988]`, target `[16,0,20]`. Both arrays stayed exactly equal after resize 1655→1440px and an imported chapter change 5→1. Explicit Whole campus cleared the orbit lock and restored the authored destination. Automatic ending entry selected Whole campus; subsequent manual camera selection remained possible. These observations preserve the user's control rather than silently overriding it during growth or resize.

### Caption resilience defect and final fix

The first matrix revealed a real presentation defect: importing an early or middle lab after an ending retained the old `Recorded milestone` caption. The parent accepted the finding and added one draw guard: leaving ending or replacing the state clears the caption and resets the prior followed job. Current `followExperiment` or ending annotation then supplies the new caption, avoiding a false completion from an unrelated imported job.

Final native regression reloaded the actual entry file and waited for the imported model chapter and a new GPU frame, rather than accepting an old paused frame. It verified:

- Ending reload: recorded Molecule milestone, Molecule schedule, automatic Whole campus.
- Return to laboratory from ended state: caption cleared, settled static renderer.
- Ending→early Settings import: caption cleared, actual stage-one apparatus rebuilt.
- Paused occupied workload import: no false prior completion; Resume labels the complete resource recipe and activates the current Planning experiment.
- Active workload→early import: caption cleared; resuming the existing Ramsey job labels the current known-preparation workflow and follows Cryostat.
- Pause: current workflow caption remains appropriate and the GPU driver settles inactive.
- Job→ending import: recorded Molecule milestone and schedule replace the unrelated latest job; automatic Whole campus is restored.
- Final ending at 375px: full campus borders, correct milestone, no overflow, inactive driver.

No browser errors were reported. Final stopped observations have `driverActive:false`; running actual jobs have the expected experiment activity. An earlier test read the new state before its deferred geometry frame, so those intermediate observations were superseded by the settled-frame replay; they are not final rendering evidence.

Final caption evidence: `evidence/campus/completion-visual/campus-fit-caption-final-results.json`, `evidence/campus/completion-visual/campus-fit-final-clean-early.png`, `evidence/campus/completion-visual/campus-fit-ending-final-desktop.png`, `evidence/campus/completion-visual/campus-fit-ending-final-375.png`. These screenshots were visually inspected and replace the stale-caption page captures for final presentation.

The app during the initial focused caption work was `db007efa3808fc90aa0781c565411ea6adf1fac31bd1ec61e92e01d88de402f7`. The parent then applied a separately reviewed two-site offscreen-focus scroll correction; final app hash is `3326544d555bc35ef42b714fcacd016634a9770c7c5dfacc106f25f575c60c43`. The final settled caption replay reloaded the entry page after that correction. This reviewer does not independently claim the Audit-focus behavior was reviewed here; that belongs to the gameplay reviewer.

**Final bounded conclusion:** accepted. The specific whole-campus framing weakness and stale import milestone are resolved. The final native camera, orbit/resize and caption observations support a substantially larger, composed campus with useful close inspections, stable controls and truthful milestone labeling. No additional geometry or redesign is needed to satisfy the concrete findings from this audit. Earlier full lifecycle, motion, offline and four-chapter evidence remains scoped to its recorded tests. Human fun, physical-phone performance, first-time player interpretation of scale and universal artistic excellence remain unverified. No source/Git or actual Chrome/save changes were made by this reviewer.


## Repository preservation note from the lead

The canvas-only camera grid, native matrix, silhouette measurements, final caption metadata and three clean final page captures are preserved under `evidence/campus/completion-visual/`. Earlier temporary full-page matrix captures contain the identified stale caption and are excluded from final presentation evidence. Their original temporary paths above identify the historical inspection; they are not promised as committed files. The earned actual Chrome image is separate at `evidence/campus/chrome-earned-campus-polished.png`.
