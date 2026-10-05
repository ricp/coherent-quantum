# Coherent completion gameplay audit

Independent **AI** gameplay review, 5 October 2026. Read-only audit of `feature/quantum-research-campus`; the lead owns implementation and Git. This is a completion audit of the existing deeper campus, not a proposal for a new economy. No user Chrome controls, saves, resources or laboratory time were modified.

## Recommendation

The campus now implements substantial interacting decisions and has earned complete native and legal simulated routes. It is much deeper than the original 15:33 prototype. This audit found two concrete presentation defects: the next-action rail can prescribe service income while a currently selected, fully qualified scientific workload offers a meaningful first-completion grant, and the ordinary research shortcut can focus an offscreen Audit button. Correct these visibility problems before final acceptance; retain the reviewed engine, scientific coefficients and campaign prices.

The reported longest gaps do **not** establish unavoidable waiting. One scripted policy deliberately insists on distance three and the final pulse upgrade; the other waits for Audit before starting its already qualified task. Neither policy searches all available plans. Adding filler experiments, repeatable rewards or more waiting is not justified by this evidence.

Functional completion and bounded design consensus are credible. A blind first human player's comprehension, enjoyment, and an approximately 90-minute first play remain unverified. An AI implementation-aware Chrome continuation and model simulations cannot certify that the game is outstanding to a human.

## Evidence and method

Read `CAMPUS-VERIFICATION.md`, the ten criteria in `QUANTUM-DESIGN.md`, `CAMPUS-DESIGN.md`, the Singular Value gameplay analysis, current `game.js`, `content.js`, `app.js`, public-action policy source and saved traces. The final engine already has independent AI quantum acceptance and 73 passing intent tests; this audit did not rerun that broad suite without a new cause.

`analysis-tools/campus-completion-trace-analysis.cjs` replays the two existing campus policies, captures their actual earned states immediately before each ordinary one-second engine tick, and records only accepted control changes. Both campaign clocks reproduce the saved traces exactly: local **85:32**, bulk **75:18**. Additional queries inspect current actions and explicitly declared alternate settings without altering the earned state. Counterfactual branches clone an earned state, use ordinary public configure/start actions and normal engine ticking, and verify actual completion. They are deterministic development simulations, not a browser playthrough or a globally fastest route.

Reproduce with `node analysis-tools/campus-completion-trace-analysis.cjs /Users/ricp/code/AI/singular evidence/campus-completion-trace-analysis.json`. The optional second output argument writes the detailed JSON; otherwise the script prints a compact console summary. Source hashes are included in both outputs. No raw human save is present.

## Ranked finding

### 1. Qualified work and its grant are hidden during Audit funding — fix before acceptance

In the reviewed `app.js`, `renderRail` and the `run-experiment` handler treat an unfunded Audit as ordinary service waiting. The presence of any remaining main discovery prevents the late workload guidance. `renderWorkload` shows fee, credits and apparatus seconds but omits `w.payout`. `content.workloads` explicitly gives Dynamics a **3,500 funding** first-completion grant and Molecule **2,500**; `game.tick` pays only the first success. This is an authored management reward, not a quantum-advantage claim.

Exact reproducible earned state: bulk policy at **70:42**, before its longest 3:43 recorded gap has ended. Selected **distance five / Balanced**, pulse seven, **3,358 active positions**, **600.277 funding**, **2,000 rehearsal credits**. `G.workloadStatus(s,'dynamics').ready` is true: modeled runtime **7,860 μs**, conditional risk **0.748647%**, entry fee **600**, **192 credits** and **35 apparatus seconds**. Audit still needs 9,400 funding. Starting the task with public actions completes at **71:35**, leaves 3,500 funding, records Dynamics and its Balanced schedule, and does not end because Audit is still missing. The existing script instead continues saving until Audit at **74:12**. The new task is not guaranteed to dominate every possible service allocation; it is a concrete useful choice the current rail conceals.

The accepted design proposal is a small shared app helper: when Audit still lacks funding and cannot be purchased, find a current-setting, uncompleted Dynamics or Molecule whose ordinary `workloadStatus.ready` is true. Name the scenario and its one-time grant, disclose its paid apparatus reservation, and send the primary inspection button to that existing workload card. Do not start the task, buy anything, change scientific controls or preview-optimize on behalf of the player. Audit purchase keeps priority when its requirements are ready; when no task currently qualifies, retain the current resource guidance. All workload budget cards should disclose their own finite first-completion grant alongside their fee, credits and apparatus time.

Use **apparatus seconds**, not a promise of that many laboratory or real seconds: the earned 35-apparatus-second branch takes 53 laboratory seconds under its captured allocation. Preserve task-feedback focus and historical ending behavior.

Acceptance probes before calling this resolved:

- The exact bulk earned fixture shows qualified Dynamics and the 3,500 grant; inspection focuses its ordinary card and preserves serialized resources, controls, job and evidence.
- A Molecule-only ready fixture chooses Molecule and its own 2,500 grant; a completed task or occupied apparatus is never offered as a fresh completion.
- Purchasable Audit retains ordinary research priority. Funding-blocked Audit with no current qualified task retains service guidance; an alternative-distance preview alone is insufficient for the ready shortcut.
- Pause and ending retain their existing primary-button behavior. Inspection has no automatic paid action or workload entry.
- Selected task budget and active captured schedule retain truthful fee, credits, reservation and one-time reward wording. Desktop and 320/375px keyboard focus remain visible and stable.

### 2. The research shortcut focuses an offscreen Audit button — native accessibility correction

The first isolated native matrix correctly retained research priority for a purchasable Audit, but at 375×900 the handler scrolled `discoveries-section` to its beginning and focused the fourth Audit button with `preventScroll:true`. Its actual focused rectangle was **y1086.375–1130.375**, outside the 900 px viewport. CSS `:focus-visible` was true, but that alone did not make the action visible. This is a concrete control defect, not an economic stall.

The lead accepted a two-site surgical correction: scroll the exact offered workload card or exact enabled research button into the viewport with `block:'center'`, then preserve that position while focusing it. No research purchase, workload entry, resource allocation or scientific setting changes. Targeted native acceptance must check rectangle visibility as well as keyboard focus, including 320/375 px short-height layouts. The initial seven-case matrix is preserved separately from the post-fix result; the initial focus case is not falsely called complete.

### 3. Explain the trace metric correctly — documentation correction, no engine tuning

The campus action wrapper tracks successful purchases, assignments, experiments, tasks, deliveries and completions. It does **not** track `G.configure`. The local 7:15 interval contains **417 accepted fabrication slider changes**, and the bulk 3:43 interval contains **213**. These arise from a script that repeatedly switches between 0.2 and 0.8 around installed/support balance. Counting them as strategic engagement would be just as misleading as calling the interval no available actions.

The metric should be called the longest gap between **tracked discrete actions**. Report control changes separately and describe the scripted oscillation. The audit found 2,860 changed controls in local and 1,955 in bulk, including only 30 and 22 analysis-duty changes respectively. These counts do not measure human engagement or require a player to make thousands of inputs.

There is a second evidence-label correction: `campusCounts.taskBusy` 408/728 counts one-second **laboratory ticks with a finite task running**, not apparatus seconds. Summing every recorded objective/request start-to-completion interval independently equals 408/728 exactly. Calibration makes apparatus time and laboratory elapsed time distinct. This should be corrected in verification prose without changing the source trace numbers.

### 4. Earlier alternative plans are meaningful — retain them and reveal the budget, not another system

The local policy spends almost its final seven-minute interval saving for pulse eight at distance three. At **77:21**, its exact earned state already supports **distance five / Balanced** at pulse seven: 4,143 active positions, 607.900 funding, 2,000 credits, **0.307692%** conditional risk and **4,180 μs** runtime. A public distance change and task start finish at **78:15**, instead of that script's **85:32** ending. This branch takes the existing ending; it does not include every optional toy workload or discovery and is not a new all-content speed record.

The bulk policy supports **Compact at distance five / pulse six** as early as **64:00**: 2,682 active positions, 603.008 funding, 2,000 credits, **3.698091%** risk and **6,580 μs**. Public recipe selection and task start finish at **64:53**, with Audit still requiring research, designs and funding. Thus the compact plan really opens an earlier paid scenario in an earned state. This supports the reviewed T128/depth320 tradeoff; it does not justify changing the unchanged Balanced recipe.

The existing plan selector, full budget and named grant disclosure are sufficient for this scope. A new automatic best-plan optimizer, extra currency or financial minigame would obscure the player's choices. Further distance/pulse/factory guidance can be evaluated in a blind human test rather than invented here.

## Recorded gaps and available opportunities

| Policy interval | Recorded gap | Concrete audit result |
| --- | ---: | --- |
| Local 77:08–84:23 | 7:15 | At 77:21, a distance-five Balanced branch finishes 78:15; 417 fabrication changes occur in the original interval. |
| Local 72:16–77:07 | 4:51 | At 72:30, distance-five Balanced is affordable; task completion ends 73:23 because Audit is already owned. |
| Local 68:13–72:15 | 4:02 | At 68:28, distance-five Balanced starts and completes 69:21; Audit remains unfunded. |
| Bulk 70:29–74:12 | 3:43 | At 70:42, the already selected Balanced plan is ready; completion 71:35 gives its finite grant. |
| Bulk 63:48–67:10 | 3:22 | At 64:00, selected distance-five with Compact is an affordable passing alternative; Audit remains blocked by several resources. |
| Bulk 67:10–70:29 | 3:19 | At 67:23, Compact remains a passing alternative; the script continues funding its planned upgrades. |

Not every finance interval has a free next success. For example, local 53:02–57:20 and bulk 60:32–63:47 occur before Hamiltonian is purchased, so no Dynamics branch is permitted. All twelve finite measurement tasks are already complete at those sampled late states. There are still opportunities to allocate service/analysis, preserve or spend a full notebook bank, and later buy optional research or upgrades; those purchases consume the same funding needed by the chosen next discovery. A ready purchase is an available decision, not proof that buying it improves the campaign.

The earlier local 30:03–32:48 and bulk 30:50–33:25 gaps initially show insufficient funds/designs and unqualified logical operations. Their midpoint and end states expose affordable pulse/decoder or hardware purchases. Old toy experiments can also be rerun, but repeating already qualified evidence is not meaningful new progress. The rail's qualification reasons correctly require current protected memory, slots and feedback. This targeted sample cannot prove all waiting is avoidable, but it does disprove the claim that the recorded longest intervals contain no reachable player actions.

## Changing bottlenecks and chapter choices

| Chapter | Actual decision and linked constraint | Automation or retirement | Evidence boundary |
| --- | --- | --- | --- |
| I: signal | Prepare/control/measure, afford and record the next evidence. | The opening experiment is short; subsequent evidence advances replace it. | Both exact traces finish chapter I at 0:57; first blind-human comprehension is unmeasured. |
| II: apparatus | Chip and support must grow together; pulse error and calibration drift have distinct costs. | Circuit/benchmark evidence opens meaningful repeatable service. | Source, inherited native opening and engine intent evidence; physical count alone does not qualify reliability. |
| III: noisy processor | Angle, shots and mitigation trade ansatz error, statistical bounds, bias, acquisition expense and time. Customer service competes with explicit experiments and analysis. | Pricing and calibration can automate their own chores; one-time frontier rewards do not replace delivery revenue. | Six fresh goals and six fresh request receipts completed in both policies and normal Chrome. Twelve tasks are bounded combinations, not twelve different optimizers. |
| IV: correction | Distance trades error suppression against available footprint; decoder stream and feedback constraints differ. Trust for notebook capacity competes with researchers and full-bank design output. | Analysis stations and indexed storage expand earlier research work. | Tests and native correction evidence; optional controller crossovers are constructed model proofs, not demonstrated fastest earned policies. |
| V: operations/factories | Factory allocation consumes reserved patches, supplies fresh states and affects waiting exposure. Procurement commits cash to delayed stock that needs funded commissioning in both streams. | Workshop and prefab commissioning automate expansion with visible bottlenecks. | Local 24 versus bulk 8 orders are mixed strategy results, not an isolated causal delivery-size experiment. No active capacity arrives for free. |
| VI: useful work | The same 32-data task plans trade depth, fresh states, workspace and full risk/runtime; grant versus continuous service; choose scientific scenario and immutable first ending. | Earlier controller/service/construction chores can continue automatically; epilogue preserves the historical ending. | Actual all-content Chrome 78:19 and two complete legal policies. This chapter currently contains long policy-selected finance stretches; guidance finding 1 is material here. |

The late chapter contains 23/24 tracked discrete actions and lasts 38:42/29:21 in the local/bulk policies. This is thinner activity than the middle campaign, even after correcting the gap interpretation. The finite measurement frontier occupies 408/728 laboratory seconds, about 8.0%/16.1% of the simulated policy clocks. Those are job occupancy, not acquisition apparatus duty or human pacing satisfaction. The best next bounded improvement is to make the existing scientifically and economically useful work visible, not to lengthen or farm the frontier.

## Comparison with Singular Value

The original review's useful lesson is changing combined constraints: compute quality, width/depth, memory, serving decisions, research and liquidity can become limiting at different times. The campus now has genuine equivalents in controller allocation, notebook capacity/full-bank generation, delivered service revenue, active/support footprint, delayed commissioned inventory and full logical recipes. Those links are causal, not raw-qubit revenue multipliers.

Singular Value's market/Bitcoin loop contributes optional price and liquidity timing in its authored economy. The reviewed campus deliberately uses final procurement commitments instead. An additional Bitcoin-like subsystem is not required to preserve the lesson and is outside this bounded final polish. The current remaining issue is visibility of existing cash-generating scientific work, not absence of another market.

Modern-paper hooks remain honestly authored scenarios: controller throughput/feedback presets do not improve decoding accuracy; adaptive maintenance does not erase calibration duty or noise floors; compact/parallel schedules are selected hypothetical resource recipes. This audit proposes no new physical/scientific rule. The primary-source archive and its 2026 verification stay under the quantum reviewer's scope.

## Acceptance judgment

Criteria 3–6 and 9 have substantial independent AI code/model and relevant native evidence. Criterion 7 has four evolving compositions and interaction captures, with the separate visual reviewer addressing the final whole-campus framing issue. Criterion 8 has the documented bounded desktop/narrow/focus/motion/contrast/offline evidence; it is not universal physical-phone or screen-reader certification.

Criterion 10 has complete legal public-action policies and a complete normal Chrome continuation, with no hidden-resource intervention. Meaningful alternate plans are supported by earned-state counterbranches and constructed profile crossovers. This does not prove exhaustive balance or fastest completion. Criterion 2 has a real new combined decision in every chapter, but late activity and human pacing remain limitations. Criterion 1 has an accessible short opening and native evidence; blind first-human understanding remains a required future measurement if making a human-comprehension claim.

My bounded recommendation: resolve findings 1–2 with the reviewed small app changes, correct the trace-label wording, complete focused native checks and preserve the practical limits above. No additional engine or economy redesign is warranted by this completion audit. Final artistic acceptance belongs with the independent visual review; human enjoyment should remain an explicit open outcome, not a reason to add speculative systems.

## Final correction status and bounded consensus

**Accepted after actual focused native verification.** The lead and this independent AI gameplay reviewer agree that findings 1–2 are resolved by the implemented presentation changes. The independent AI quantum reviewer accepts their precise scientific/accounting contract: use current complete workload readiness, retain explicit player choice, disclose one-time authored grant and paid entry/reservation, and do not claim revenue dominance or certified advantage. No engine, economy, scientific coefficient or persistence-schema change was made for these corrections.

Initial native matrix: 7 cases checked the Dynamics shortcut at 1280/320/375px, no-current-qualified plan retaining service guidance, affordable Audit retaining research priority, a legal Molecule-only opportunity and an occupied paid schedule. Paused entry remains disabled. The protected paid-entry/evidence/planner checks passed, but later rectangle inspection exposed the offscreen Audit button. The initial `:focus-visible` assertion was insufficient, so that focus case was not accepted merely because the first harness printed passed.

After the exact-target scroll fix, the tightened **seven-case target matrix passed** against final app SHA256 **`3326544d555bc35ef42b714fcacd016634a9770c7c5dfacc106f25f575c60c43`**. All focus targets fit horizontally and vertically in the actual viewport: Dynamics at 1280×900,320×740 and 375×620; Audit and Molecule separately at 320×620 and 375×620. For example, Audit now spans y287.70–331.70 at 320×620 and y287.80–331.80 at 375×620. Molecule spans y248.50–371.50 and y248.27–371.27. Focus is visibly styled and there is no document horizontal overflow. Screenshots and DOM/budget results were actually inspected; the one-time grant and reservation text is readable in the 375 px budget.

The native keyboard CTA uses selection/scroll/focus only. Job, completed scenarios and recipes, discoveries, sampling seed/trial serial, finite receipts and selected scientific controls remain equal before/after inspection. Funding and rehearsal credits are checked for no depletion; visible unpaused time legitimately advances passive income and credit regeneration. Exact full-state equality is not asserted across elapsed native time. An initially overstrict credits equality assertion saw 1999.999999999989 normalize to 2000; the harness was corrected to allow ordinary positive regeneration with 1e−8 float tolerance, then the complete targeted matrix passed. This was a QA assertion error, not a game defect or resource injection.

Final native hashes: `game.js` **`9754289c53199152b2c3513a7076f0cdf0898e78f2a8849e6635d286e09da90f`**, `content.js` **`add0070e1449aa74f8cdc8b74115ccba84fa378d4ae3ae86ee3080a992b434fb`**, `index-3d.html` **`feba654fae1f023deb5bf8fc20e3309e63489ec46a4ec4671550a6e0a04daf35`**. Earlier trace and initial native hashes remain explicitly earlier evidence. The engine's previously accepted 73-test result was not substituted for native UI verification, and this child did not rerun the broad engine suite for an app-only change.

An explicit experiment-picker override was considered and rejected as an unreachable concern after reading actual exports/callers: ordinary experiments have chapters 0–4 only; `chooseExperiment(5)` has no available entries and hides the picker. The normal research handler resets the choice flag. No speculative guard or artificial hidden-DOM interaction was added.

No consequential remaining gameplay implementation defect was found within this bounded audit. The stronger combined decisions, legal completion, truthful history and focused accessibility correction meet the reviewed implementation scope. Human enjoyment, blind first-run understanding and a 90-minute first human play remain unmeasured; physical-device performance and final artistic framing belong to their stated separate evidence scopes.

## Reproducible evidence whitelist

These scratch deliverables can be preserved by the lead under `analysis-tools/` and `evidence/` with explicit paths. Scripts default to the repository parent when placed in `analysis-tools/`; pass the repository path explicitly while they remain in `/tmp`.

- `analysis-tools/campus-completion-trace-analysis.cjs` and `evidence/campus-completion-trace-analysis.json`: exact existing-policy clocks, sampled available constraints, control accounting and public-action earned-state counterbranches. This is pre-scroll app evidence; engine behavior is unchanged.
- `analysis-tools/campus-guidance-fixtures.cjs` and `evidence/campus/completion-gameplay/campus-guidance-fixtures-summary.json`: generate strictly parsed legal QA imports via public policies/actions. The small summary is evidence; **do not commit the five raw generated save files**.
- `analysis-tools/campus-guidance-browser-review.cjs` and `evidence/campus/completion-gameplay/campus-guidance-native-results.json`: final source hashes, actual viewport rectangles, truthful captured budgets and no-paid-entry/evidence/control checks. The default session is separately named; it never attaches to the user's browser. Native browser use requires the installed `agent-browser` CLI and a separately started loopback server.
- Final screenshots: `evidence/campus/completion-gameplay/campus-guidance-1280-focus.png`, `evidence/campus/completion-gameplay/campus-guidance-1280-budget.png`, `evidence/campus/completion-gameplay/campus-guidance-320-focus.png`, `evidence/campus/completion-gameplay/campus-guidance-320-budget.png`, `evidence/campus/completion-gameplay/campus-guidance-375-focus.png`, `evidence/campus/completion-gameplay/campus-guidance-375-budget.png`, `evidence/campus/completion-gameplay/campus-guidance-audit-ready-320x620.png`, `evidence/campus/completion-gameplay/campus-guidance-audit-ready-375x620.png`, `evidence/campus/completion-gameplay/campus-guidance-molecule-only-320x620.png`, `evidence/campus/completion-gameplay/campus-guidance-molecule-only-375x620.png`.

Generate fixtures: `node analysis-tools/campus-guidance-fixtures.cjs /absolute/repository /private/tmp`. With a private loopback server already running at 5586, rerun only affected final focus paths: `node analysis-tools/campus-guidance-browser-review.cjs /absolute/repository /private/tmp campus-guidance-private-qa http://127.0.0.1:5586/index-3d.html focus`. Omit final `focus` for the full narrowly scoped guidance matrix. Imports remain private test data; all browser engine/state queries are observational, while interactions use ordinary controls.

The known initial offscreen result is retained in `/tmp/campus-guidance-native-before-focus-results.json` only as superseded debugging evidence; it is not needed to establish final acceptance. No raw user save, actual user-Chrome fixture or secret is part of the whitelist. Both isolated review sessions and the child's loopback server are closed after completion.
