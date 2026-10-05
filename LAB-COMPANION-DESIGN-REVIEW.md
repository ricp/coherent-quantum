# Lab Companion — independent AI onboarding/gameplay design review

Historical design checkpoint. The subsequent implementation and its separate acceptance evidence are documented in [LAB-COMPANION.md](LAB-COMPANION.md) and [LAB-COMPANION-IMPLEMENTATION-REVIEW.md](LAB-COMPANION-IMPLEMENTATION-REVIEW.md). The original design-only scope below is preserved.

5 October 2026. Design recommendation only. Read-only review of the current Coherent interface and engine in `/Users/ricp/code/AI/singular`; no game, source, Git, browser, user save or audio work was changed. This is an independent AI review, not a credentialed human review, implemented feature, native UI test, or proof of human comprehension.

## Recommended direction

An optional **Lab Companion** should explain the real laboratory while the player uses it. Make a compact, nonmodal Help surface that starts with three questions: **What should I do now? Why can't I do it? What did that result mean?** Pair an explanation with **Show me the control**, a small causal diagram, and optional scientific notes. It should feel like an instrument manual that understands the current page, not a second strategy engine or chat service. No network AI or new framework is needed.

The first useful release should cover the earned First Signal loop, the existing next-action/blocked explanation, and a contextual resource glossary. Reuse the real equipment inspector for instrument teaching. Additional chapter examples can follow in the same surface without building a separate equipment simulation or longer required tutorial.

## What the current game already supplies

- `app.js` `nextDiscovery`, `researchBlocker`, `qualifiedWorkOpportunity`, and `renderRail` already choose the displayed next action. The companion should expand that chosen action instead of independently ranking discoveries or workload grants.
- Engine `metrics`, `projectStatus`, `upgradeInfo`, `engineeringStatus`, `experimentStatus`, `studyStatus`, `objectiveStatus`, `precisionStatus`, `workloadStatus`, `liveWorkloadStatus`, and `procurementStatus` own requirements and budgets. Use their actual results; do not duplicate costs or qualification formulas in help.
- Existing `data-station-target` controls already navigate to relevant native controls; `data-paper` opens sources and separates the paper's finding from the game's abstraction. Reuse them. A help navigation action must never buy, run, cancel, import, grant resources, or configure a slider.
- `CoherentInspector.describe`, `preview`, and `workflow` already expose equipment roles, aggregate readings, cost-aware preview and explicitly authored experiment bands. Help should connect to this inspector rather than invent per-object telemetry. The 2D edition needs equivalent ordinary native control links, and early/locked/removed targets need a visible fallback.
- Actual job/result/study contexts retain captured settings and receipts. A result explanation must describe the trial that ran, not mistakenly substitute today's controls.

## Priority decisions to teach

1. **First Signal:** prepare and run the actual signal, inspect the result, purchase the real Feynman discovery, then learn earned trust/research effort and Deutsch's notebook. Steps complete on real engine evidence and purchases, not clicking Next. Do not promise a fixed five-minute duration. Let returning players skip or reopen the guide without resetting anything.
2. **Resources:** funding pays costs and upkeep; effort fills a finite notebook bank; designs are plans. Trust is an allocation between researchers and storage. More storage admits larger research but delays a full bank; spending effort removes the full-bank design bonus. A tiny bank/flow sketch makes this clearer than another paragraph.
3. **Hardware:** installed and supported are separate. Active capacity is their minimum. Delivered stock is not commissioned installed/support capacity. Highlight the shorter bar and link to the real chip/support control, not a universal 'buy qubits' hint.
4. **Apparatus time:** calibration is taken first, then the remaining duty is split. Five apparatus seconds need not mean five wall/laboratory seconds. Protected-memory/logical jobs reserve the relevant apparatus and pause services, classical bench automation and commissioning. Show the existing duty split and captured job progress.
5. **Measurement:** theta/preparation, sampling uncertainty and residual bias solve different problems. More shots do not remove a wrong ansatz or systematic bias. Show what a failed captured trial lacked and expose the existing controls without applying an optimal setting.
6. **Protection:** increased distance trades error suppression for footprint/time only in the declared below-threshold model. Memory qualification, logical gates, factories, decoder streaming capacity and feedback latency remain distinct. A memory is not automatically a universal processor.
7. **Research history:** source dates are chronology, prerequisites determine play order; a fresh study qualification and its subsequent discovery purchase are separate. Later-dated research does not imply every earlier archive item was purchased. Explain the current eleven fresh 2015–2025 studies and new-campaign ending requirement when relevant.

## Outstanding without extra chores

Use one calm spotlight or outline on the real control when requested, with an anchored explanation that does not conceal the cost/action. In the 3D edition, existing equipment inspection and experiment journeys supply the memorable spatial experience. Use a compact causal graphic beside the current readings, not decorative animation or another row of counters. Motion should stop on pause and obey reduced motion; every cue has a static equivalent. Chapter examples should name the decision and tradeoff, then link to the existing source notes for primary papers and model assumptions.

The companion should briefly point to the existing mute and volume controls and explain that instrument signatures are authored feedback, not recordings or measurements of real hardware. It should describe the audio setting actually visible in the current game rather than invent a different default.

Keep the companion closed until requested, apart from a discreet optional opening invitation. Never trap a player in a forced tutorial, reward tutorial chores, change their save progression, imply a live human specialist, or call a modeled workload a real quantum execution. No promises of fastest or optimal strategy.

## Acceptance for a future implementation

- Help and Show me preserve serialized resources, earned receipts, jobs, controls and ending records. Actual paid actions remain deliberate ordinary game actions.
- The same offered action appears in the rail and companion. Reasons include pause, ending, occupied/reserved apparatus and locked/hidden controls as well as engine affordability. Several engine `ready` results do not themselves express every shell disable condition.
- Explain remains an enabled, keyboard reachable adjacent control even when its purchase/run button is disabled.
- Opening, navigation, Escape/close and return focus remain visible at desktop, 320/375 px, keyboard and touch. No focus trap is created by a nonmodal pane; normal live ticks do not replace focused help nodes or collapse open details. Screen readers receive useful status changes, not every tick.
- Reopened/imported/late-game laboratories receive the current context, not a stale 'first qubit' instruction. 2D/WebGL fallback remains useful. No hidden/unearned-control navigation.
- Test one actual failed measurement and one qualified study with unpurchased discovery to prove explanations use the right evidence. Test real active/reserved jobs, no funds, notebook overflow, installed/support imbalance and paused/ended states.
- Independent AI implementation review and bounded native checks are required after coding. Blind first-human comprehension, enjoyment and device performance remain unverified until tested with people/devices.

## Consensus status

The lead and independent AI onboarding/gameplay reviewer reached **design consensus** on 5 October 2026: one optional nonmodal companion; the three current-action/blocked/captured-result prompts; an earned opening walkthrough; causal diagrams and contextual glossary; prerequisite-aware links to existing controls, inspector and primary papers; explicit shell disable conditions and enabled Explain controls; authored audio guidance; and collapsed later-chapter reference. No competing next-action ranker, paid automatic action, control adjustment, conversational AI, optimum-plan solver, tutorial reward or forced modal is recommended.

This is acceptance of a scoped recommendation only. The help feature is **not implemented** by this review and awaits the user's implementation instruction. The lead has not represented this review as native implementation acceptance or human testing.
