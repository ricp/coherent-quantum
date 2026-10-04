# Coherent quantum frontier and gameplay review

**Independent AI quantum/gameplay review · primary sources checked 5 October 2026 · proposed implementation contract**

This is a focused scientific design review, not a credentialed human assessment, full literature survey, replication, hardware forecast or proof that the game is enjoyable. It reviews the existing superconducting/surface-code campaign and the proposed deeper campus mechanics. No engine or served project files were changed by this reviewer. The parent owns implementation and final verification. Design acceptance below is conditional on the stated contracts and a fresh review of actual code, numerical probes, tests and UI language.

## Why the research looked as if it stopped in 2014

The catalogue does not stop there. `PAPERS.md` and `content.js` already contain 36 papers, including Acharya et al. (2024 preprint, 2025 Nature volume), Gidney's 2025 resource estimate, and 2023–2024 experiments and classical comparisons. The currently visible hybrid tutorial cites Peruzzo et al.'s historical 2014 variational demonstration. Progression is pedagogical, not chronological. That historical demonstration used a photonic processor; Coherent's apparatus is superconducting. One experiment's early citation should not imply a literature cutoff.

Keep the important older foundations. Add a visible **2026 research frontier** and give archive entries separate preprint and journal dates, evidence type, architecture, paper finding and game abstraction. Never manufacture a 2026 source to refresh a date. A new result may improve a particular memory, decoder, control protocol or resource estimate without certifying a complete useful quantum machine.

## Verified recent sources

Suggested IDs Q37 onward are proposals; the parent must check IDs before adding them. Every quantitative game effect remains an authored scenario coefficient. Direct source links below support the paper descriptions, not the prices, reward amounts, staffing, acquisition pacing or fictional campus dimensions.

### Q37 — Throughput is not response latency

Laura Caune, Luka Skoric, Nick S. Blunt, Archibald Ruban et al., **Demonstrating real-time and low-latency quantum error correction with superconducting qubits**. Preprint 7 October 2024; Nature Communications 17, 7383, published 1 June 2026. [arXiv:2410.05202](https://arxiv.org/abs/2410.05202), [DOI:10.1038/s41467-026-73331-6](https://doi.org/10.1038/s41467-026-73331-6).

Paper finding: an integrated FPGA decoder and superconducting control system performs a small stability experiment and a fast-feedback experiment. The latter reports 9.6 microseconds full decoding response for nine measurement rounds, comprising 6.5 microseconds decoding and 3.1 microseconds communication/control. Mean computation per round below one microsecond addresses streaming backlog in the demonstrated setup. This is not a large universal logical processor, and the authors caution about comparing latency numbers across different experimental conditions.

Game use: a late discovery makes separate throughput and feedback constraints explicit at the decoder station. A game improvement may change a declared latency preset; it must not silently multiply decoder accuracy or physical fidelity. Caption: **Selected controller scenario, inspired by a small real-time decoding experiment.** Track syndrome arrivals per modeled microsecond separately from the time for a feedback-critical answer. Do not turn the paper's 9.6 microseconds into a universal per-round value.

### Q38 — Control can learn from error information

Volodymyr Sivak, Alexis Morvan, Michael Broughton et al., **Reinforcement learning control of quantum error correction**. Preprint November 2025; Nature 655, 879–884, published 8 July 2026. [arXiv:2511.08493](https://arxiv.org/abs/2511.08493), [DOI:10.1038/s41586-026-10759-2](https://doi.org/10.1038/s41586-026-10759-2).

Paper finding: a classical reinforcement-learning controller uses detection-event information to steer control parameters on a superconducting processor. Under the experiment's injected-drift comparison, control steering improves logical-error stability; adding decoder steering yields a reported 3.5-fold stability improvement. That result concerns the selected comparison and metric, not universal speed, error suppression or quantum learning from arbitrary unknown states.

Game use: an adaptive-control discovery can expose a bounded, explicitly selected reduction in maintenance reserve or drift sensitivity, with calibration/controller work still accounted for. It is classical control. Syndrome events provide error information; they do not disclose the unknown logical data state. Do not copy the 3.5 factor into all game performance. Keep physical noise, drift, decoder accuracy, detector event rate and logical-error qualification distinct. A lower displayed detection-event rate alone is not sufficient evidence of improved logical fidelity.

### Q39 — Fresh magic-state preparation has a space/time/reliability frontier

Craig Gidney, Noah Shutty, Cody Jones, **Magic state cultivation: growing T states as cheap as CNOT gates**, preprint 26 September 2024. [arXiv:2409.17595](https://arxiv.org/abs/2409.17595), [arXiv DOI:10.48550/arXiv.2409.17595](https://doi.org/10.48550/arXiv.2409.17595).

Paper finding: a protocol with code growth and checks is studied using several simulation/enumeration methods. Its resource and infidelity estimates are conditional on the stated circuit-noise and protocol assumptions. It is a resource/protocol study, not an experimental certification or a conclusion that every future architecture can eliminate distillation.

Game use: a research frontier card opens a discussion of factory alternatives and accepted-state yield. For this release, keep the existing selected factory error/throughput scenario unless the implementation explicitly adds acceptance probability, retry resources, switching footprint and current-state error. A paper purchase must not retroactively purify persistent credits or make old quantum states available. Credits remain classical rehearsal bookkeeping; actual modeled execution uses newly produced states.

### Q40 — Experimental cultivation with acceptance cost

Emma Rosenfeld et al., **Magic state cultivation on a superconducting quantum processor**, preprint 15 December 2025. [arXiv:2512.13908](https://arxiv.org/abs/2512.13908), [arXiv DOI:10.48550/arXiv.2512.13908](https://doi.org/10.48550/arXiv.2512.13908).

Paper finding: an experimental cultivation study includes switching into a surface code and a fault-tolerant fidelity-bounding measurement protocol. It reports fidelity 0.9999(1) while retaining 8% of attempts. Retained-output fidelity and acceptance yield are different quantities. The opened arXiv landing page lists no journal reference, so label this entry a 2025 experimental preprint rather than asserting 2026 peer-reviewed publication.

Game use: a compelling optional cultivation exhibit. Display successful retained outputs and rejected attempts separately if implemented. A 99.99% output fidelity cannot be read as a 99.99% success yield, and an 8% acceptance yield cannot disappear from time, attempts or cost. Do not graft its experimentally measured number onto the game's stipulated 1e-7 factory output error.

### Q41 — More accurate decoding does not automatically mean fast enough decoding

Johannes Bausch, Andrew W. Senior, Francisco J. H. Heras et al., **Learning high-accuracy error decoding for quantum processors**, Nature 635, 834–840, published 20 November 2024. [DOI:10.1038/s41586-024-08148-8](https://doi.org/10.1038/s41586-024-08148-8).

Paper finding: a learned surface-code decoder improves accuracy on the studied experimental memory datasets and larger simulated codes. Accuracy and inference runtime remain separate; the paper states the presented AlphaQubit throughput is slower than the one-microsecond target, and throughput excludes response latency.

Game use: an archive comparison or later conditional controller choice between a fast streaming preset and a more expensive analysis preset. Do not award simultaneous perfect accuracy, unlimited throughput and zero latency from an AI-themed upgrade. Offline validation and adaptation can improve an explicitly modeled controller; neither generates unknown-state copies nor quantum computational advantage.

### Q42 — Alternative layout benchmark, not a drop-in patch multiplier

Arian Vezvaee, Cesar Benito, Mario Morford-Oberst, Alejandro Bermudez, Daniel A. Lidar, **Surface code scaling on heavy-hex superconducting quantum processors**. Preprint October 2025; Nature Communications 17, 9201, published 29 July 2026. [arXiv:2510.18847](https://arxiv.org/abs/2510.18847), [DOI:10.1038/s41467-026-76090-6](https://doi.org/10.1038/s41467-026-76090-6).

Paper finding: connectivity-aware embedding and dynamical decoupling produce directional improvement for anisotropic code layouts on heavy-hex hardware. The article's discussion distinguishes this from global state-independent subthreshold scaling and examines assumptions behind fitted metrics.

Game use: archive evidence explaining why topology and comparison conditions matter. The playable campaign retains its existing native-connectivity rotated patch model. Do not reuse exact `2d²−1` patch footprints or a one-microsecond cycle as if they described the heavy-hex implementation's bridge qubits, schedule and full machine. A new hardware architecture would require a separate accounting model; it is outside this release.

### Q43 — A current runtime study connects state supply to classical latency

Jubo Xu, Abbas B. Ziad, Prakash Murali, Hongxiang Fan, **MagiCFirm: A Runtime for Magic-State Cultivation with Algorithm-Hardware Co-Design**, preprint 24 September 2026. [arXiv:2609.29267](https://arxiv.org/abs/2609.29267), [full text](https://arxiv.org/html/2609.29267v1).

Paper finding: this architecture/runtime study combines protocol control and partial/full decoding, evaluates FPGA implementation resources and models complete preparation latency including retries. Its reported preparation-time improvements and application-runtime estimate are conditional evaluation results, not a new superconducting hardware cultivation demonstration. The landing page labels the arXiv DOI registration pending, so the stable arXiv URL is preferable for the immediate game link.

Game use: a 2026 frontier card on **state readiness is a quantum–classical schedule**. It reinforces the existing max-of-lanes resource planner: speeding state supply improves total execution only while that lane limits the named task. A game discovery could expose a selected classical latency improvement or additional planning option; it must not grant the paper's headline percentage to all workloads or omit rejected-attempt costs. Actual cultivation retry dynamics are outside the proposed first release, so preserve the existing explicitly stipulated accepted-state factory model.

### Existing sources to retain and clarify

- Acharya et al., **Quantum error correction below the surface code threshold**, preprint 2024, Nature volume 2025, [DOI](https://doi.org/10.1038/s41586-024-08449-y), [arXiv:2408.13687](https://arxiv.org/abs/2408.13687). It supports a particular below-threshold memory and real-time decoding result; it does not qualify universal computation. Its live publisher page flags an author correction dated 28 April 2026, [DOI](https://doi.org/10.1038/s41586-026-10559-8). The primary publisher PDF was accessible through search extraction after direct opens failed: the correction fixes figure 3a labels identifying repetition-code distance and the reference/this-work markers. It is not a new universal gate-stack result. Distinguish repetition-code floor data from the surface-code memory result.
- Gidney, **How to factor 2048 bit RSA integers with less than a million noisy qubits**, 2025 resource preprint, [arXiv:2505.15917](https://arxiv.org/abs/2505.15917). It updates a particular conditional estimate. It is neither an implemented attack nor a hardware deployment date. The game already cites it; adding a real 2026 control result must not replace historical or estimate categories indiscriminately.
- Litinski, **A Game of Surface Codes**, 2019, [DOI](https://doi.org/10.22331/q-2019-03-05-128). Keep approximate architectural tiles separate from the game's exact ideal standalone patch count.
- Peruzzo et al., 2014 [DOI](https://doi.org/10.1038/ncomms5213), and Takagi et al., 2022 [DOI](https://doi.org/10.1038/s41534-022-00618-z), remain appropriate foundations for the small hybrid tutorial and mitigation overhead. Their papers do not set our toy Hamiltonian, rewards or laboratory-time costs.

## Agreed direction from the Singular Value audit

Keir's strongest transfer is a series of interacting, changing bottlenecks: a control changes several downstream flows; a new frontier creates recurring decisions; accumulated infrastructure enables new work; automation eventually removes earlier chores. Coherent already has coupled trust/storage/design, service/analysis, maintenance/runtime, installed/support, logical footprint/error/decoder, and fresh-state/time decisions. Its missing piece is repeated purpose for those decisions between expensive one-time discoveries.

Use a finite experiment frontier, two genuinely different service needs, task-specific logical recipe choice, and procurement commitments. The user selected **laboratory procurement and scheduled equipment deliveries**, so this release should not add Bitcoin or a second speculative treasury. Finance connects to capacity through earned cash and disclosed delivery terms; it does not create quantum capability from token price appreciation.

The enlarged campus should show the resource consequences of these decisions. Multiple cryostat halls represent commissioned footprint, not a second invented engine; decoder halls represent streaming/feedback limits; service desks show delivered/held work; construction and receiving areas show reserved versus delivered equipment. Labels must distinguish an artistic representation from exact hardware inventory when meshes are pooled or schematic subsets are displayed.

## Minimum safe contract: recurring two-spin objectives

Retain the current known, classically simulated model:

`H = Z₀Z₁ + 0.6X₀ + 0.6X₁`,
`|ψ(θ)〉 = cos θ |Φ⁺〉 − sin θ |Ψ⁺〉`,
`E(θ) = cos 2θ − 1.2 sin 2θ`,
`E₀ = −sqrt(2.44)`.

Three Pauli groups with M shots each produce 3M actual Bernoulli samples. Mitigation's chosen overhead is 12M modeled raw acquisitions, while the browser still performs 3M samples. Display actual and modeled counts distinctly. The per-trial simultaneous 95% Hoeffding bound for the weighted energy is `2.2 sqrt(2 ln(6/0.05)/M)`. Bias budget is separately `2.2b`; standard error is explanatory and must not replace the declared simultaneous bound. The ansatz's exact classical reference and error remain inspectable.

A series can contain: a coarse energy objective; a tighter energy objective; a known second-angle observable validation; and an optional high-precision objective. Use unique, finite reward IDs. Failure retains counts and identifies sampling, bias or ansatz mismatch. Repeating an already rewarded objective does not grant more reputation, currency, trust or permanent boosts. Exact task claims must not be inflated into quantum advantage.

One simple acquisition-dependent pacing formula is `apparatusSeconds = 8 + modeledAcquisitions/12288`. This is a fictional laboratory pacing rate, not a physical readout rate or an extrapolation from a paper. With M=65,536 per group, duration is 24 apparatus seconds ordinarily and 72 with the selected mitigation overhead. Calibration/service allocation can further affect wall-clock laboratory duration. Entry captures objective ID, angle, M, mitigation, bias and duration. Changing controls during an active job cannot rewrite its evidence or price.

For current discrete M values, weighted statistical bounds are approximately 0.21274, 0.10637, 0.05318 and 0.02659. At readout bias b=0.008 the budget adds 0.0176; with selected mitigation b=0.002 it adds 0.0044. Thus a 0.04 total-error objective is impossible at the maximum shots without mitigation even if the sampled estimate coincides with the exact reference: 0.02659+0.0176 exceeds 0.04. This makes mitigation a real decision. At the wrong ansatz angle, more sampling cannot remove the exact variational error. A second-angle observable check compares with that known angle's exact observable, not with the ground-state energy.

For a ground-reference objective, an optional exact-ansatz admissibility guard `ansatzError <= tolerance` prevents rare misleading sample fluctuations from rewarding a known poor ansatz. This is a separate guard, not another additive charge to the observed-error budget. A passing fixed trial provides that trial's interval statement. Repeated tuning, adaptive selection and stopping do not establish a campaign-wide 95% guarantee. UI wording should identify **this trial's simultaneous sampling bound** and avoid claiming a statistically certified real apparatus. Fresh validation after tuning is pedagogically useful; repeated trials cannot accumulate free scientific certainty without an explicit sequential method.

Required tests:

1. The exact expectation matches direct four-dimensional matrix/vector evaluation at representative angles, including the optimum near 64.9028 degrees and a clearly poor angle.
2. Larger M increases actual samples, modeled acquisitions, funding cost and declared duration; 4x mitigation affects modeled overhead without fabricating 12M browser samples.
3. Bias/statistical/ansatz floors block unsuitable precision requests with visible distinct reasons; lowering a bias term never silently improves physical pEff.
4. New objectives reward once and cannot be bypassed with an older result or another task's measurement; a second-angle trial cannot satisfy the ground-state objective merely because its histogram is narrow.
5. Save/load preserves captured job recipe and evidence. Paused or hidden time follows the existing declared policy. Cancelled/failed trials disclose spent costs and retain or clearly retire the result.

## Minimum safe contract: two service classes

Keep the existing high-throughput contract for batches of 1,024 known Bell preparations with computational-basis readout. Its output does not certify entanglement, arbitrary-state fidelity or advantage.

Add a precision class using finite named tutorial requests. Ideally each dispatched request runs an actual newly sampled job with declared bound, price and acquisition schedule. Payment occurs only after that request passes its task-specific criterion. One historical VQE qualification cannot certify every future request. If a continuous precision lane is used instead, label it a **modeled acquisition service**, account for acquisitions per unit, and do not state that the browser generated or statistically validated every paid result. The UI must distinguish a modeled service schedule from an actually computed tutorial result.

Customer preparation, classical analysis and explicit experiments cannot all consume the same controller slot simultaneously. Atomic logical schedules pause incompatible service and construction. Decide policy in one engine path, reuse it in 2D and 3D, and avoid a second scheduler hidden inside Three.js. More qubits affect a stated supported lane/footprint model; they are not a general power or revenue multiplier.

Required tests: each class wins under at least one declared capacity/precision mix; no delivery or unqualified output earns money; no duplicated reward after import/reload; analysis priority reduces actual customer capacity; precision overhead and apparatus duty are charged once; current quality rechecks are explicit; queued commitments cannot silently exceed available apparatus time.

## Minimum safe contract: compact versus faster logical recipes

Keep the same named 32-site Ising problem, initial state, evolution time, target mean magnetization and precision. A compact implementation cannot suddenly require fewer than 32 logical data registers without an explicit alternative encoding/algorithm. One defensible educational comparison is:

| Selected recipe assumption | Compact | More parallel |
| --- | ---: | ---: |
| Application registers | 32 | 40: 32 data + 8 workspace |
| Operations | 4,800 | 6,400 |
| Operation depth | 320 | 160 |
| Fresh T states | 192 | 256 |
| Task, target precision, repetitions | Same declared task | Same declared task |

These are authored resource scenarios, not compiled algorithms or counts established by the cited papers. Workspace counts as footprint and idle-memory exposure. Preserve routing/spare/factory units; all allocated patches contribute syndrome load. Preserve the existing full accounting: max of gate/factory/feedback times, sequential preparation/readout/classical terms, gate risk distinct from idle-memory risk, fresh-state output error including internal preparation faults, repetitions on all risk/time/state terms, and no double charge for factory internal faults.

At distance 5, operation time 20 microseconds, feedback 10 microseconds/depth step and selected factory throughput F/(8d), the compact gate lane is 6,400 microseconds, the parallel gate lane 3,200. With one factory the fresh-state lane is 7,680 versus 10,240: the supposedly faster recipe is actually slower. With three factories it is 2,560 versus 3,413; total parallel lanes become 6,400 versus 3,413. Including current 180 microseconds sequential overhead yields 6,580 versus about 3,593. This demonstrates a useful conditional improvement. Extra factories stop helping compact runtime once the gate lane limits it, while still occupying footprint.

At distance 5, standalone patch size 49, minimum physical footprint including width + routing/spares + four units per factory is 1,911 vs 2,303 with one factory and 2,303 vs 2,695 with three. These are ideal allocated patch totals, not refrigerator/cabling/full-machine costs. Qualification still requires current physical noise, memory/gate conditions, decoder throughput, latency, accepted-state error, risk ceiling, fee and rehearsal credits. A recipe switch during a protected job is refused or deferred; the job's selected recipe must be persisted and used for live checks.

Required tests: both routes legally qualify in at least one actual engine state; larger width fails at a footprint where compact fits; one-factory parallel route is slower while three-factory route is faster; compact extra-factory runtime plateaus; more distance lowers model error below threshold while increasing footprint/time; failed streaming throughput cannot be fixed by lower feedback alone; all memory/gate/state/preparation/other parts sum to the displayed full repeated risk; chosen precision remains a declared assumption rather than a computed 32-spin result.

## Minimum safe contract: procurement and postgame

Procurement is a management abstraction: reserve funding for a disclosed component quantity, price/design cost, lead time and cancellation/refund terms. No undelivered shipment contributes installed/support capacity. Shipment delivery should add inventory or a separate delivered-but-uncommissioned record; only the specified integration/commissioning path activates it. If direct automatic commissioning is chosen, name it a **commissioned delivery** and include all stated funding/design/support conditions. A paused job cannot age in secret, and a delivery cannot exceed caps or pay twice after save/load. Build a visible cash-flow choice; do not silently create free capacity through an arbitrarily appreciating asset.

An optional continuation after the gift ending is scientifically safe if the gift milestone remains recorded and the simulation resumes explicitly. Continued play can collect remaining discoveries or qualified tasks; it cannot rewrite the original completion record, re-award one-time grants or imply the educational machine has become real. Separate `giftSeen`/completion record from the active pause/end state if needed. Finite experiments and economic services may continue; do not force the player to repeat trivial success just to keep the campus alive.

## Review decision and remaining evidence

**Accept the proposed direction, conditionally.** It is consistent with the existing scientific model if the contracts above remain true. The minimum effective release is a visible expanded facility tied to real commissioned resources, recurring finite measurement objectives, procurement commitments, and one task-specific logical tradeoff. Two service classes add value only if qualification, acquisitions and payment remain distinct. Modern papers should motivate new frontier questions rather than validate fictional performance multipliers.

This document does not constitute final consensus on unimplemented code. The parent and gameplay specialist must confirm their concrete choices; the quantum reviewer must then review the actual diff and numerical/intent tests, resolve disagreements, and record the final scope. Complete legal campaigns, actual desktop/mobile/reduced-motion/browser interactions and a human enjoyment assessment remain separate evidence requirements. Longer waiting, more meshes or more numbers are not proof of deeper or outstanding gameplay.

## Concrete modern-discovery agreement

The lead and independent AI gameplay builder agreed the following optional campus-only discoveries before their implementation. This is design consensus; final source/test/UI acceptance remains separate.

- `controller2026`, after the existing decoder discovery, cites Q37/Q41. Cost: 250 funding,600 effort,60 designs. It enables three reversible classical controller presets: balanced `(stream×1, feedback×1)`, streaming `(stream×2, feedback×1.5)`, response `(stream×0.75, feedback×0.5)`. These are selected game scenarios, not measured performance extracted from either paper. No preset changes physical noise, logical memory error, operation error, accepted-state error or actual patch counts. Profile changes are refused during every atomic schedule.
- `adaptive2026`, after threshold and current qualified memory evidence, cites Q38. Cost:1,400 funding,4,200 effort,400 designs. It reduces the selected maintenance requirement by 10%, retaining real calibration duty, the drift floor and the same physical-noise law. The effect is a management scenario; it is not the experiment's 3.5-fold stability result.
- `state-readiness`, after accounting, cites Q39/Q40/Q43. Cost:1,800 funding,6,000 effort,600 designs. It unlocks the declared compact/parallel Dynamics alternatives, keeping balanced available. No retroactive purification, stored magic states, free factory accuracy or universal runtime multiplier occurs.

A numerical reason for the controller study's revised lower cost: the initially proposed900 funding / 2,600 effort / 240 designs entry was a poor fast-finish investment because decoder 2→3 alone costs720 funding / 120 designs and provides stronger throughput with the same useful latency as response at level 2. The final 250 / 600 / 60 entry creates a cash-versus-research/design tradeoff instead of charging more for a dominated capability. This conclusion is from the game's deterministic coefficients, not a paper.

Two declared numerical test mixes make the presets consequential. These are constructed model cases, not earned browser campaigns:

1. With 3,000 active physical qubits, distance 5, pulse 8, decoder 2 and three factories, complete-patch syndrome load is 1,464 per selected microsecond. Streaming supplies 2,048 with 30-microsecond feedback; balanced 1,024 and response 768 cannot keep up. Streaming can qualify the named Dynamics task if all other current conditions hold.
2. With 769 active physical qubits, distance 3, pulse 8, decoder 2 and two factories, syndrome load is 360 and 34 application slots remain. Response gives 768 throughput and 10-microsecond feedback; the gate lane is 2,400 microseconds. At drift .005 the current point-estimate risk is approximately .0389, within the .04 ceiling. Balanced 20-microsecond feedback and streaming 30 add waiting-memory exposure, exceeding the same risk ceiling. No error coefficient is improved by selecting response.

Actual engine probes must verify these calculations and legal policies must establish that the states are attainable. Visible station links should connect cryostat→Q38, control/decoder→Q37/Q41, factory/planning→Q39/Q40/Q43 and topology comparison→Q42. Angle-reference request success must remain distinct from ordinary ground-state tutorial qualification.

## Independent AI quantum review of the implemented campus

Reviewed 5 October 2026 on `feature/quantum-research-campus`. The independent AI quantum reviewer accepts the implemented scientific and resource contracts after reviewing `game.js`, `content.js`, the task captions in `app.js`/`instrument.js`, and the new intent tests, and after resolving the concrete findings below with the lead and gameplay builder. This conclusion concerns the declared educational model and tested implementation; it does not certify a physical quantum computer or establish that the game is outstanding to a human player.

The reviewer independently ran the integrated suite after the final compact-plan correction: **68 passed, zero failed, zero skipped**. Both campus policies also completed through public engine actions, with strict restoration of earned intermediate snapshots. These simulations use an accelerated development clock and are separate from the lead's normal-player Chrome campaign.

### Findings resolved before acceptance

1. A successful named-angle precision request could be described as an unsuccessful ground-energy experiment. Its result message, caption and measurement figure now use its captured task criterion and exact reference at the recorded preparation angle. Ordinary ground-reference qualification remains distinct. The separate energy landscape retains its explicitly labeled ground reference.
2. The first compact plan was dominated by the unchanged balanced plan. Compact now uses 128 fresh states, rather than 192, in exchange for depth 320. Its 32 data registers and 4,800 modeled operations remain explicit. Baseline-aware tests prove that different factory budgets favor different plans. These counts are authored scenarios for the same named task, not a compiled algorithm or a result extracted from a paper.
3. Saved ending metadata could invent a parallel molecular recipe or contradict the actually completed Dynamics recipe. Validation now requires the first-ending recipe to agree with captured completion history; non-Dynamics workloads retain the balanced recipe. An actual execution test completes compact Dynamics, changes the idle planner, runs another experiment and buys the final audit, proving the historical record retains compact.
4. A successful current measurement could survive removal of its earned receipt. Validation now requires matching task ID, unique trial identity, captured acquisition/bias/mitigation settings and raw sample counts. Failure/cancellation cannot pay, and successful goals and requests cannot pay twice.
5. The live in-progress rollout briefly saved a complete campus block before `completedRecipes` existed. The only accepted transition is campus revision one with every other campus field present, that field alone absent, no completed workload, null first-ending record and false epilogue. It supplies an empty map and runs all other validators, preserving every earned resource, captured job, receipt, seed and clock value. Other partial or historical blocks remain rejected. The lead separately observed the user's earned Chrome laboratory return unchanged after reloading.

### Scientific contracts checked

The two-spin Hamiltonian remains `H = ZZ + 0.6 X₀ + 0.6 X₁`, with exact classical ground reference `−√2.44`. Ground goals require an admissible exact ansatz error as well as the measured interval criterion. Named-angle checks use the exact energy at the captured angle and require the stated preparation. Sampling, residual bias and ansatz error are separate. The displayed 95% simultaneous sampling bound concerns the three groups in that single trial; it is not campaign-wide coverage or a guarantee under repeated adaptive stopping.

Actual samples are three groups of `M` Bernoulli trials. Mitigation remains a declared residual-bias scenario with fourfold modeled acquisition overhead; it does not create four times as many raw samples. Campus VQE pacing is `8 + modeled acquisitions / 12,288` apparatus seconds, separate from physical circuit microseconds. Six finite objectives and six finite requests each require fresh captured evidence; the unchanged continuous service concerns known preparations. Trust, cash and designs are classical management rewards, with no universal multiplier from physical qubit count, Hilbert-space size or entanglement.

Procurement spends the final quote immediately. Delivery creates uncommissioned stock; workshop allocation and assembly funding still produce installed chip units and supported control/cooling units through a shared stream. Paid stock and pending orders reserve the eventual 8,193-unit ceiling, including subsequent preset upgrades. Atomic apparatus jobs stop commissioning while external deliveries advance with visible laboratory time. An independent deterministic probe of **2,000 constructed fractional commissioning cases** conserved stock plus commissioned output to a maximum error of `4.5 × 10⁻¹³`, respected the ceiling and restored through the strict parser. These fixtures are accounting evidence, not earned playthroughs.

The original superconducting surface-code architecture remains in force: ideal patch footprint, reserved routing/spares/factories, all-patch syndrome throughput, feedback latency, logical memory and operation error, accepted fresh-state error, repetitions and complete workload waiting/preparation/readout costs remain distinct. Workspace consumes the actual application footprint and idle exposure. Rehearsal credits are classical scheduling resources, not stored quantum states. No 32-spin quantum calculation is performed by the browser.

### Numerical decisions verified in the actual engine

Constructed fixtures used pulse level eight, drift `0.005`, declared prerequisites and sufficient entry resources. They isolate mechanics; their arbitrary resources are not player-run evidence.

| Declared mix | Profile | Decoder capacity / syndrome load per μs | Feedback μs | Dynamics result |
| --- | --- | --- | --- | --- |
| 3,000 active, d=5, decoder 2, three factories | Streaming | 2,048 / 1,464 | 30 | Qualifies; 6,180 μs, 0.25752% risk |
| Same mix | Balanced | 1,024 / 1,464 | 20 | Fails streaming capacity |
| Same mix | Response | 768 / 1,464 | 10 | Fails streaming capacity |
| 769 active, d=3, decoder 2, two factories | Response | 768 / 360 | 10 | Qualifies; 2,580 μs, 3.8924233% risk |
| Same mix | Balanced | 1,024 / 360 | 20 | 4,180 μs, 10.542207% risk; fails 4% budget |
| Same mix | Streaming | 2,048 / 360 | 30 | 6,180 μs, 18.854437% risk; fails 4% budget |

The profile switch changes neither current physical nor logical error parameters. The authored adaptive-control study reduces selected maintenance by 10%, keeps actual calibration duty and the drift floor, and does not import the cited experiment's stability factor as a universal fidelity gain.

For the same 32-data-register task at d=5 with decoder level three:

| Plan | Application registers | Fresh states | One factory: time / risk | Three factories: time / risk |
| --- | --- | --- | --- | --- |
| Balanced | 32 | 192 | 7,860 μs / 0.31128% | 4,180 μs / 0.19352% |
| Compact | 32 | 128 | 6,580 μs / 0.26968% | 6,580 μs / 0.26968% |
| Parallel | 32 data + 8 workspace | 256 | 10,420 μs / 0.44696% | 3,593.333 μs / 0.173893% |

At d=9 with three factories and the 8,193-unit physical cap, only 35 application slots remain: parallel's 40-register footprint is refused. Balanced and compact remain feasible, and compact can enter with 128 rehearsal credits when balanced requires 192. Thus compact is useful when state supply is scarce, parallel when its extra supply and workspace fit, and balanced preserves a useful baseline.

The independently rerun legal campus policies finished in **85:32** (local delivery) and **75:18** (bulk delivery), each earning all six objectives, all six finite requests and all three modern studies. Local used 24 orders, 408 laboratory seconds of frontier-task apparatus work and a longest action gap of 7:15. Bulk used eight orders, 728 task seconds and a longest gap of 3:43. These are two mixed policies: local uses the frontier investment strategy and distance three; bulk uses the infrastructure strategy and distance five. The elapsed difference does not isolate delivery size or prove a causal bulk discount in campaign time. They are not exhaustive optimality, human pacing or enjoyment estimates.

### Modern papers and game hooks

The new Q37–Q43 metadata accurately distinguishes experimental results, simulations/resource studies and preprints. Sources were checked through **5 October 2026**. The optional controller decision links [Caune et al., journal 2026](https://doi.org/10.1038/s41467-026-73331-6) and [Bausch et al., 2024](https://doi.org/10.1038/s41586-024-08148-8); adaptive maintenance links [Sivak et al., journal 2026](https://doi.org/10.1038/s41586-026-10759-2); state-readiness planning links [Gidney, Shutty and Jones, 2024](https://arxiv.org/abs/2409.17595), [Rosenfeld et al., experimental preprint 2025](https://arxiv.org/abs/2512.13908), and [Xu et al., runtime preprint 24 September 2026](https://arxiv.org/abs/2609.29267). [Vezvaee et al., journal 2026](https://doi.org/10.1038/s41467-026-76090-6) remains an inspectable alternative-connectivity comparison; it does not silently replace the reviewed native patch model. The publisher's 2026 correction to existing Q09 is recorded separately from a new scientific result.

The papers motivate actual optional decisions while their measured or estimated numerical results remain separate from game coefficients. Visible station readings connect control to Q37/Q41, cooling to Q38, logical planning to Q40/Q43 and memory topology to Q42. The historical introductory VQE citation is from 2014 because of the teaching sequence; the prior bibliography already reached 2025 and the archive now visibly reaches 2026.

### Acceptance boundary and remaining verification

The lead, gameplay builder and independent AI quantum reviewer reached consensus on the tested engine/resource contracts and corrections above. The retained first ending and explicit continuation preserve historical results without repeating scientific workload rewards. There is no unresolved scientific implementation blocker in this reviewed scope.

At that engine-review checkpoint, the lead's normal-player Chrome ending and final camera/interaction evidence were separate requirements; they are now recorded in `CAMPUS-VERIFICATION.md` and `CHROME-PLAYTEST.md`. Broad physical-device performance, a first-human 90-minute target and human enjoyment remain unverified. The remaining multi-minute action gaps are real limitations, not evidence of strategic depth. No claim of outstanding graphics or gameplay follows merely from these unit tests, mesh counts or simulated completions.

Reviewed source SHA-256: `game.js` = `66bd3bbb40fca08b1f90194312f485a4868b8377c1fa02932803c17ff994f6dc`; `content.js` = `26181066d2a55682ec8c42fa649aa0daa954e96d868de293192c2e295a34b66f`; `instrument.js` = `20e3b9578f1cec5210f693ce60e9eb172aac800f8ac4568e60c5b20a847d14f1`.


## Final paid-job guard and source bridge

The subsequent independent AI gameplay review reproduced final Audit silently dropping a paid second scientific schedule. The lead and quantum reviewer agreed a one-condition `projectStatus` guard, limited to a non-epilogue Audit purchase that would finish an already scientifically qualified campaign. It requires natural completion or explicit cancellation with entry costs remaining spent. Early Audit and unrelated research remain available during jobs. No equation, workload budget, accounting coefficient, save schema or historical ending contract changed.

The independent quantum reviewer and lead each ran the final **73 tests, zero failed and zero skipped**, including five new intent regressions. The gameplay reviewer separately observed native refusal, natural completion and explicit cancellation. All existing numerical scenarios were reproduced unchanged with the final engine; `evidence/campus-numerical-probes.json` carries the refreshed source hashes. Prior policy matrices retain their original evidence scope; the final suite reran both legal local and bulk campus routes. [CAMPUS-EXPORT-REVIEW.md](CAMPUS-EXPORT-REVIEW.md) records bounded acceptance of this final guard.

Final `game.js` SHA256: `9754289c53199152b2c3513a7076f0cdf0898e78f2a8849e6635d286e09da90f`. `content.js` and `instrument.js` remain byte-identical to the prior reviewed hashes. The ending presentation now uses the recorded workload/recipe without mutating results or recalculating history; its separate final native review is [CAMPUS-ENDING-VISUAL-REVIEW.md](CAMPUS-ENDING-VISUAL-REVIEW.md). This is independent AI consensus on the declared implementation, not certification of quantum hardware or human enjoyment.
