# An active, selectable campus

User scope, 5 October 2026: make the laboratory less static, add clickable facilities and more purposeful animation, fill the back plot with a delivery warehouse and operations centre, and obtain independent AI 3D review. Work continues on `feature/campus-operations-logistics`, from the interaction checkpoint `19eb0b6`.

## Implemented facilities

Visible built facilities can be selected directly on the canvas. A named hover highlight identifies the target; selection uses the existing camera button and updates the existing live facility controls. Dragging, wheel input, long presses and touch scrolling are excluded from selection. Existing station buttons supply the keyboard equivalent. The on-canvas **Facility controls ↓** shortcut deliberately opens the controls below; selecting a facility does not automatically scroll or spend resources.

**Historical scope:** the following selection-only limitation describes the operations/logistics checkpoint. The later authorized [working instrument inspector](INSTRUMENT-INSPECTOR.md) supersedes this deferral, adds actual equipment inspection and opens existing controls when clicking an already-selected facility floor.

The user clarified that facility selection is not true component inspection. Current tooltips say **Click to select**. An individual-component inspector is explicitly deferred: a future panel should identify the clicked rack, processor, factory or other item and show its actual status, metrics and relevant actions. Do not describe the current camera selection as that completed inspector.

The new back-plot buildings emerge in Chapter IV; earlier chapters show named planned plots. The operations centre has a large live apparatus display, real job progress, syndrome demand, decoder capacity, separate feedback latency and the current next-action guidance. It receives that guidance directly from the existing interface, rather than computing a competing recommendation. Its facility action focuses the actual next-action heading and budget.

The warehouse separates received chip and support stock into labeled bays. Delivery vehicles follow actual order progress. Bounded crate cohorts and six schematic transfer markers visualize inventory and funded prefab commissioning; they are not literal crate counts or quantum states. Empty stock, unfunded construction or atomic reservations stop the corresponding transfer stream. In-house commissioning remains distinct. The warehouse's controls lead to the existing equipment quotes, delivery timers, stocks and commissioning rates.

Additional motion includes calibration-duty support fans, research/control/decoder activity indicators, larger preparation/readout highlights, known-preparation service workflows, and a moving commissioning trolley and hook. Motion respects pause, reduced motion, hidden/offscreen/modal suspension and 2D fallback. Scientific/economic coefficients, costs, rewards, receipt contracts and persistence schemas are unchanged.

## Verification scope

The independent AI reviewer accepted the initial eight-facility pointer/keyboard-context contracts while identifying two presentation limitations: distant motion remained subtle, and the live controls could fall below the viewport. [Baseline review](CAMPUS-INTERACTION-BASELINE-REVIEW.md) preserves that checkpoint's hashes and actual observations. The successor adds larger logistics flows and the explicit controls shortcut. Its final native acceptance is recorded separately; do not relabel the predecessor matrix to the successor.

The successor’s [independent AI visual review](CAMPUS-OPERATIONS-LOGISTICS-VISUAL-REVIEW.md) accepts all ten facility selections, fourteen camera controls, 375/320 layouts, coarse taps/scroll cancellation, paid delivery progress, actual stock/funded commissioning, apparatus reservations, pause/reduced-motion/lifecycle guards and readable operations guidance. Review findings about crane framing, honest selection wording and overlapping delivery vehicles were resolved and rechecked. The lead and reviewer reached consensus within that stated scope. Screenshots, compact observations and a valid native motion clip are preserved in `evidence/campus-operations/`; imported raw QA saves are excluded.

The separate [fresh Chrome campaign](RESEARCH-HISTORY-CHROME-PLAYTEST.md) started from one qubit, 60 funding and zero discoveries, then earned all 44 discoveries, eleven annual receipts, four workloads and twelve finite tasks at **93:05**. It used ordinary controls, earned resources and visible unpaused time, without imported fixtures, internal engine actions or accelerated time. It exposed a ready-hint punctuation defect and a missing route back to the preserved first ending after Continue; these were corrected and receive focused native acceptance in that report. No scientific/economic coefficients or save schemas changed.

The AI player knew the implementation. Human enjoyment, blind human pacing and physical-device performance remain unverified; whole-campus details are small on narrow screens and readable HTML carries the exact information. At this historical checkpoint, facility selection was contextual navigation; subsequent component inspection is documented separately.
