# Operations and logistics: independent AI 3D/UX review

Reviewed 2026-10-05 in `/Users/ricp/code/AI/singular`. This review used only the private `campus-interaction-review` browser at the local file URL. It did not attach to the user's Chrome, `dev.localhost:5500`, or the normal player's `localhost:5634` browser or save. The reviewer made no source or Git changes. Fixtures came from the strict parser and ordinary paid/public game actions; they are isolated QA, not an earned human campaign.

## Conclusion

Accepted within the actual evidence below. Operations and the warehouse visibly fill the previously reserved rear plots, have useful live state, and are selectable through both the scene and ordinary accessible camera buttons. The logistics motion now includes visible colored pallets traveling toward commissioning, rather than relying only on small indicator lights. The balanced Fabrication view shows the full moving crane. The whole-campus composition remains a coherent substantial campus; close views and Facility controls are needed to read detailed apparatus information.

This is facility selection plus contextual controls. A component-level inspector is deferred, as the user requested. Neither human enjoyment, an "outstanding" human judgment, nor physical-device frame rates are established by this AI review. The logistics routes are schematic diagrams, not a physical traffic simulation.

## Exact source scope

- Broad 10-facility / 14-camera / responsive matrix: renderer `896bcff11f88e7ab4ea8cd7a342d5e21ff171c8cceed05392ad422a2e939bfc1`, CSS `01d03608780e441fe0f2babda5710e4790d392f56bbceb66edf1ebe286e2f189`, app `dab248252e7cb4daf2fc5c396a401e540d0ae426b13a6b90e0196cae77ae549b`.
- Stock/rate/reservation motion pairs and native coarse-pointer taps: renderer `924dc926736e2d3a15775e5c943d9fd2690e4702215ea191107a2e8a346bbb5d`. Changes from the broad matrix were honest selection wording and held-state "Planned commissioning" labels; geometry, camera destinations and pointer handlers were unchanged.
- Final delivery-import fix, fresh lifecycle/phase/fallback and selected-facility copy acceptance: renderer `6ce2109d28d662a94e4f73976d19ee91bf84f1023349819ccf2d4a4847ef7c22`; same CSS; app `893447953e62124fcfbc52db680555346974d6b946eed27fb6d910e6afd7a376`; generated index `542cf3c984969f6eddd3b24cd99ec1b1404a6935d96815fef50aa9eafbbabb7d`.
- The renderer's final change only retained delivery slots across an import of structurally identical orders. It did not change facilities, camera framing, motion gates, engine coefficients or scientific calculations. The final app changes were held-state planned-flow wording, annual-ready punctuation and selected-facility wording; navigation and engine state were unchanged.

The broad screenshots are explicitly from the first hash above. They must not be represented as final wording captures. Final caption, controls and delivery images are separately identified below.

## Findings resolved through independent review

1. The original settled Fabrication view clipped the upper crane beam. The accepted balanced pose is target `[-33,1.8,34]`, eye `[-47.112,9.0856,45.872]`. The native view includes the crane beam, trolley, hook and workshop cells. Raising only the target cropped the old stock; the balanced pose avoided that tradeoff. Actual stock now belongs in the separate warehouse bays.
2. Clicking a facility initially selected a camera while its controls could remain below the viewport. The small `Facility controls ↓` button now reaches the existing context panel; it does not force page scrolling on a scene selection. It is hidden for global cameras, ending, 2D and fallback.
3. Whole-campus motion in the first clickable checkpoint was too subtle to justify a claim of "much more animated." The successor adds three bounded schematic pallets per funded stock stream. Independent native running pairs show them change position along the research/dock side, and the close crane motion is plainly visible. They remain small at whole-campus scale, especially on narrow screens; the scene is not a constant decorative animation.
4. The user's correction about selection was propagated to scene copy and then to the context panel's remaining "inspected facility" eyebrow. Final visible wording is `Selected facility`; live controls remain reachable. No component-inspection functionality is implied.
5. A real import bug cleared delivery-slot assignments even when the same order IDs kept the same structural signature, so two vehicles overlapped. The parent removed only `deliverySlots.clear()` from the state-identity guard. The existing logistics builder already prunes disappeared IDs and assigns new IDs. Fresh pending → 40%-progress → received native snapshots now show distinct copper/silver vehicles and then no vehicles after actual receipt.

## Native controls and composition

All 10 built late-stage facilities were hovered and clicked at projected visible physical points: operations, warehouse, cryostat, control, research, processor, memory, planning, fabrication and service. Each selected the expected existing camera and refreshed its relevant paused context without changing the serialized paused save. Warehouse picking used its visible roof face; its centre can naturally sit behind the operations wall. Hover gives the correct name and a bounded footprint highlight.

All 14 authored controls passed native camera selection: those 10 facilities plus Overview, Whole campus, Top and Reset. Reset returns to Overview. The desktop 1600-wide toolbar retains one physical row with its bounded internal camera strip. At 375 and 320 widths, Whole campus, Warehouse, Operations and Fabrication were visually checked with no page overflow. The warehouse bays are both visible; the operations display and doorway are clear in the desktop close view. Narrow-screen in-world text is environmental detail; the readable HTML legend and context panel provide the actual numbers and constraints. Some warehouse floor lettering sits behind a front beam, but separate bay colour/position and the unobscured HTML stock legend carry the information.

The earliest fixture has four actually built selectable facilities and reserved foundations. Chapter three has eight, including the two new buildings; the late fixture has ten. Foundations do not falsely select the unbuilt operations or warehouse.

Native keyboard `Facility controls ↓` focuses the context action. In paused Operations, Enter on that action then focuses `next-title`, without falling back to BODY or changing the save. Final Warehouse context says `Planned funded prefab flow`; the held-state renderer legend says `Planned commissioning / lab s`.

Actual coarse-pointer emulation held through the browser's documented CDP touch interface passed 375-wide taps on both new facilities. A real touch scroll produced trusted `pointercancel`, scrolled the page and kept Whole campus selected. At 320 width there was no overflow. Coarse pointer disabled wheel zoom as intended. This is native browser emulation, not a physical phone test.

The original clickable checkpoint separately verified drag, pressed-wheel, ordinary wheel, long hold and secondary click do not select a facility; hover settles after one dirty frame. Its unchanged handlers are documented in `CAMPUS-INTERACTION-BASELINE-REVIEW.md`. No source-science or engine changes were made for scene selection.

## Actual state and motion gates

The stock fixture was obtained with ordinary paid bulk orders and public ticks, then strict-parser round-tripped: 512 chip + 512 support stock, 3,548 active physical qubits. Stock is pending commissioning, not active installed capacity. The fixed cohort crates and six stream markers are explicitly schematic, not literal inventory counts or extra stock.

Independent native public-UI Resume/Pause pairs established:

| Case | Actual result |
|---|---|
| Both funded prefab streams, 512/512 stock | Both coloured streams move; stock falls through ordinary visible app ticks. |
| In-house-only construction, stock 0/0 | Crane/construction can run, but shipping pallets are absent. |
| Chip allocation 0, positive stock in both bays | Chip stock remains 512; only the funded support stream advances. |
| Paid atomic memory experiment, positive 512/512 stock | Both prefab rates are zero; construction is false; stock remains 512/512 while the actual memory job occupies the apparatus. |
| Pause after each running pair | Driver stops, construction flags are false, all activity is still. |

The operations display keeps syndrome demand/capacity separate from feedback latency, shows the actual apparatus job and current next-step constraint, and repeats them in readable HTML. It does not imply arbitrary state readout or measured hardware performance. Transfer markers depend on positive actual stock and positive funded prefab rates; they are absent for in-house-only construction and protected apparatus reservations. No simulation tick or resource mutation was injected into the browser to create these observations.

Two additional ordinary paid local 64-unit orders established native pending orders at 0%, two distinct vehicles at actual 40%, and receipt with stock 64/64 and no remaining vehicles. The final recheck used the same snapshots and final source; this is not a complete physical route/collision audit.

## Final native resilience

Fresh checks on the final source observed:

- Paused scene: no ongoing GPU driver or frame increase while idle.
- Running Settings dialog: frames stay constant; closing it resumes visible animation.
- Canvas scrolled offscreen: frames stay constant; returning resumes animation.
- Reduced motion: static activity indicators and constant frame count; disabling it resumes the running scene.
- 2D mode: renderer inactive and Facility controls hidden; returning to 3D resumes visible activity.
- Global cameras and ending: Facility controls hidden.
- Intentional isolated `WEBGL_lose_context`: readable fallback, unavailable renderer, stopped driver and hidden Facility controls. The expected `THREE.WebGLRenderer: Context Lost.` log is not an uncaught error.

All reviewed final native error lists were empty. Broad paused camera samples ranged from 40–107 submitted calls and 66,350–92,742 triangles, with view culling. A native first structural frame had higher shadow-pass counts (133 calls / 137,778 triangles). These are scoped renderer diagnostics, not a universal triangle ceiling, stress certification, CPU utilisation or physical-device FPS measurement. Earlier maximum-state evidence remains separately scoped.

## Evidence and limits

Primary machine-readable records:

- `evidence/campus-operations/campus-successor-native-results.json`: broad 10 picks, 14 camera controls, responsive and navigation observations.
- `evidence/campus-operations/campus-successor-flow-results.json`: native paused/running/stopped pairs for stock, zero stock, one stream and atomic reservation.
- `evidence/campus-operations/campus-successor-touch-results.json`: actual coarse taps and scroll cancellation.
- `evidence/campus-operations/campus-successor-lifecycle-results.json`: final source phases, held rendering, return, ending and context-loss observations.
- `evidence/campus-operations/campus-successor-copy-results.json`: final selected-facility wording and Operations keyboard destination.
- `evidence/campus-operations/campus-successor-orders-results.json`: final paid pending/mid/receipt replay.

Representative screenshots and the valid recording are preserved in `evidence/campus-operations/`. Raw imported QA fixtures are deliberately excluded from Git. The builder's 37.1-second native clip was recorded after importing the legal stock fixture into its newly created recording context; the earlier unrelated first recording was rejected and is excluded.

The review does not repeat the full campaign, quantum paper verification, every historical camera lifecycle test or the previous maximum-state stress probe. It does not test physical phones, real touch hardware, every vehicle collision, audio enjoyment, every browser/GPU driver, or human fun. The earlier full campus/zoom/cable reviews remain separately scoped. The normal player's continuing Chrome campaign and engine tests belong to the parent, not this isolated visual review.

Lead acceptance: the requested facilities, selection, context and purposeful motion satisfy the reviewed implementation scope. The lead resolved the reported camera framing, honest selection wording and delivery-slot findings; the independent AI reviewer accepted the resulting source. A later two-line recorded-ending navigation correction in app.js is separately checked in the fresh Chrome report, not retroactively included in this visual matrix.
