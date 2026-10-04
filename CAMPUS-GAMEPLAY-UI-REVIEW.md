# Independent AI gameplay and native interface review

Reviewed 5 October 2026 by an independent AI gameplay/economy reviewer. This is an interface review of the implemented campus mechanics, following the independently accepted engine/model review. It is not a credentialed human playtest or a claim that enjoyment is established.

## Outcome and scope

The four concrete interface defects found in the first isolated review were corrected by the parent agent and independently retested in an isolated Chromium browser. The observed corrections are accepted. The new task, procurement, controller and recipe controls fit at 320 and 375 CSS pixels without document-level horizontal overflow. Fresh known-preparation payment, receipt presentation, actual delivery/commissioning flow and the native epilogue button were exercised through public UI actions.

A small historical-ending copy edge was also corrected and independently reproduced through a legal public-action fixture and native import, as described below. All acceptance statements refer to bounded observed cases, rather than every possible campaign state.

The user's normal Chrome campaign and its browser storage were never opened, connected to, edited or imported by this review. The parent agent's continuing legal normal-Chrome campaign is separate evidence.

## Review setup and evidence boundary

- Browser: separate `agent-browser` session `campus-gameplay-e9cc742f9661`, isolated headless Chromium; no attachment to the user's Chrome, no shared save origin.
- Stable read-only QA origin: `http://127.0.0.1:5586/index-3d.html`, plain HTTP file server without Live Server's automatic reload. The initial 5500 origin was replaced because concurrent renderer edits automatically reloaded its page and made focus observations unreliable.
- Files read: current `app.js`, `index-3d.html`, `style.css`, relevant engine/content contracts, test players and their evidence. The independent visual specialist covers the renderer and camera angles separately.
- Fixture: `play('compact')` in `tests/playthrough.cjs`, using public engine actions, earned an ending at 90:16, 33 discoveries, 5,145 supported physical qubits, distance 3, recorded balanced Dynamics schedule. Its engine-earned JSON was imported through Settings only into the isolated browser. A second copy continued through public `continueLaboratory` and paused through public `pause` before export. These are legal automated engine fixtures, not a human or full browser campaign.
- All actual QA experiments, keyboard changes, order, import and epilogue actions then used the public browser UI. No resource, time, seed, reward or save-field injection was used to complete a trial. Read-only DOM and isolated localStorage reads supported observations.

## Concrete defects, corrections and independent retests

| Finding | Initial observed defect | Bounded correction | Native retest |
| --- | --- | --- | --- |
| Task focus moved to the wrong card | Start `landscape`; focus the `reference30` Tune control while it runs. On completion the first card disappears, and `html()` restored the first duplicate `data-station-target="noisy-controls"`, moving focus to `precision` instead of retaining `reference30`. | Each Tune control has a unique task-specific `data-focus-key`, recognized before the duplicate station target. | With the latest source at 320 px, focus was `objective-reference30-tune` before and after natural landscape completion and remained there through later automatic renders. Accepted. |
| Completed recipe mislabeled the result | A completed balanced Dynamics workload could select idle Parallel and show a completed Parallel budget without identifying the actual executed recipe. | The title identifies the same 32-site task. The caption separates recorded completion from the current planning preview. | Selecting Parallel in the earned epilogue displayed `Thirty-two spins. One question.` and `Recorded completion: Balanced schedule. Current planning preview: Parallel workspace.` The immutable execution remained balanced. Accepted. |
| Procurement economics were described as disclosed but omitted | Stock copy claimed the prefab rate was disclosed; UI displayed neither the 2× rate, 0.4 versus 0.8 commissioning expense, nor the split prefab/in-house streams. | Receiving dock posts the rate/cost terms and current funded rates for both streams. | At 320 px both terms and the zero-stock in-house flow were readable. After a normal local-chip order arrived naturally, stock was 34.4 with chip `1.34 prefab + 0 in-house`, support `0 prefab + 2.69 in-house`. The order left the commitments list. Accepted. |
| Fresh task success disappeared from the live announcement | The tick wrote the task-specific result, then ordinary `renderRail()` cleared it because the ordinary selected experiment differed. The measurement caption survived but the polite feedback node was empty. | An ephemeral task-result message survives automatic renders. A successful deliberate game action/control choice clears it; load/import initializes it from the captured task result. No save field was added. | Landscape completion retained its task-specific `200 funding, 25 designs and one trust assignment earned once` message in `aria-live="polite"` through subsequent renders. Keyboard angle input cleared it. A fresh desk30 request retained `800 funding paid once`; a subsequent accepted order cleared it. Accepted. |

## Additional native checks

**Known-state reference and fresh receipt.** The angle range was set through keyboard Home, PageUp and ArrowRight inputs to 30°. A fresh `desk30` request ran naturally at shot setting 2 with mitigation off and service allocation 0. Its result displayed:

- Title `Service desk · 30°`.
- Exact classical reference `-0.5392`, rather than the ground energy.
- Estimate `-0.5344`, simultaneous per-trial bound `±0.0532`, bias `≤0.0176`, recorded known angle `30°`.
- `49,152 actual samples; 49,152 modeled acquisitions`.
- Qualification and one-time 800 funding payment explicitly associated with that request.

The frontier showed `1 / 6 goals · 1 / 6 requests`. The completed request card disappeared, so its fresh-run button was unavailable. Opening the public receipt disclosure exposed the two different successful trials with their times, angles, samples, estimates and bounds. This verifies the visible receipt path in addition to the engine's separate strict raw-data/identity tests; it does not establish a campaign-wide confidence guarantee.

**Captured controls and workload budgets.** During a native isolated Molecule workload, angle, acquisitions, mitigation, factory count, controller profile and service controls were disabled. This is consistent with its protected workload reservation. Ordinary VQE keeps captured measurement settings disabled but allows the unrelated controller profile: the engine's atomic reservation is workload-specific, and that profile does not change captured two-spin measurement physics. It is not reported as a defect. The three idle Dynamics plans visibly show 32/32/40 application registers, depths 200/320/160 and 192/128/256 fresh states, including Parallel workspace in the complete budget.

**Keyboard usability.** The angle range responded to Home, PageUp and ArrowRight and its readout updated accordingly. After keyboard input the focus outline was a visible 2 px solid teal outline. Task-card identity was retained during automatic rebuilding. The isolated CLI's select operation emits `change` without `input`; it could not reliably change the acquisitions select, whose app handler listens to input. This automation limitation is not evidence that a human's normal Chrome selector is broken. The parent normal-Chrome campaign covers that control separately.

**Small screens.** At both 320×812 and 375×812, document width equaled viewport width. No visible new frontier, procurement, recipe or controller control crossed the right viewport edge. Task-run and purchase buttons were 44 px high, the recipe choices 84 px in the observed 375 layout, and the controller select 42 px. The 38 px secondary Tune links remain separately operable. Cards stacked in a readable single column; commissioning captions wrapped without clipping. Horizontal camera navigation is a separate intentional strip and is outside this review's renderer coverage.

**Ending and epilogue.** Importing the separately earned first-ending fixture through Settings rendered 90:16, 33 discoveries, 5,145 supported physical qubits and distance 3. The scientific caption stated that no large-system magnetization was computed in the browser. The visible native Continue button changed `ended` to false and `epilogue` to true, returned to the laboratory and preserved the first record byte-for-byte at the observed values, including `workload:"dynamics", recipe:"balanced"`.

The converse sequence was also exercised: a public-action earned first-Molecule ending recorded 90:02, 33 discoveries, 5,140 supported physical qubits and distance 3. In the isolated browser the reviewer clicked Continue, selected Dynamics and ran its complete schedule naturally through the public UI. Both workloads then appeared complete, with `ended:false`, `epilogue:true` and the original Molecule record unchanged. The browser's exact saved JSON was read without changing a field, written to scratch and reimported through Settings. The laboratory remained paused, both completions restored, and the first-Molecule record still contained the same 90:02 values. The first 25-second CLI text wait expired while the declared 35-apparatus-second schedule was still running; a second natural wait observed completion. This was a wait-duration limitation, not a failed workload.

## Historical-ending correction and proportional follow-up

The source initially chose the ending validation sentence by the first currently completed Dynamics/Molecule entry in content order, while the statistics use `endingRecord`. The parent corrected it to identify `endingRecord.workload` where the record exists, retaining the current-completed fallback only without a record. There is no engine or schema change.

The independent reproduction used a public-action policy that deliberately deferred audit research, legally completed Molecule and then Dynamics, and finally bought the audit. It earned an immutable first-Molecule record at 151:39 with both workloads completed. Native import in the isolated browser displayed `Modeled Hubbard resource-study completion. No electronic energy, catalyst, or industrial process is computed.` with the matching 151:39/33/8,193/distance3 statistics. This directly distinguishes the corrected behavior from the previous content-order choice. The long clock reflects the purpose-built audit-delay fixture and is not a pacing benchmark. This bounded correction is accepted.

The maximum unlocked fixture exposes all six goals and six requests, so mobile late-game scrolling is long. The current design already opens tasks progressively, removes completed cards, posts exact blockers, provides task-specific Tune shortcuts and collapses completed receipts. A new filtering framework or extra modal is not justified by this bounded review. A useful next human observation is whether players notice their next affordable task among the remaining cards; if they struggle, emphasize one ready task or collapse one desk within the existing layout. Do not turn a speculative readability concern into more mechanics or longer waiting.

The order notice and sticky primary action can cover part of the current card in a narrow screenshot, but the observed controls remain reachable by scrolling and the notice is dismissible. The visual specialist should judge overlay composition together with its other camera/mobile checks. This review does not declare visual perfection from DOM geometry alone.

## Consensus and limits

The parent and independent AI gameplay reviewer agree on the four corrected interface behaviors, the historical-ending caption correction and the observed fresh-reference, receipt, commissioning and epilogue semantics. No unresolved blocking native interface defect was found in these bounded cases.

Independent AI quantum acceptance of the engine, 68 passing tests with no skips, legal policy runs and numerical crossover probes is documented separately. It does not substitute for the parent's complete normal-Chrome campaign, the independent 3D visual review, a first human playtest or Keir's experience. Human enjoyment, surprise impact, first-human completion time and all keyboard/screen-reader/browser combinations remain unverified.

## Reviewed source hashes

SHA-256 at the final native retest, including the historical-sentence correction:

```
app.js         de90b7fca18cf871c0a3b7f45dd8caec289bc024d82579dde0ae11a9a64a1233
style.css      c824b019f2945d56092bc74f5cac656f801173ec844fc06b4a754f3b95543b1e
index-3d.html  2845c24193ee5c81eab8d781bf06e73c0dd5d5c57ccaf1f7f7d5f6e270c5085b
game.js        66bd3bbb40fca08b1f90194312f485a4868b8377c1fa02932803c17ff994f6dc
content.js     26181066d2a55682ec8c42fa649aa0daa954e96d868de293192c2e295a34b66f
```

Scratch visual evidence: `evidence/campus/campus-ui-frontier-320.png`, `evidence/campus/campus-ui-dock-320.png`, `evidence/campus/campus-ui-recipes-375.png` and the earlier `evidence/campus/campus-ui-frontier-375.png`. The recipe screenshot includes a normal purchase acknowledgement; the receiving-dock screenshot captures zero stock before the subsequent native delivery. Scratch save fixtures are machine-local QA inputs and should not be committed as user saves.
