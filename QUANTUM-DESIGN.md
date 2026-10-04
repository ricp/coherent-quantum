# Quantum computing game design

The proposed gift is **Coherent**, a provisional title for an incremental game about building a quantum computer that can finally do useful, reliable work. It starts with a single laboratory qubit and ends with a fault-tolerant instrument completing a named scientific workload. The player’s achievement is keeping an increasingly ambitious computation dependable.

The design borrows Singular Value’s changing bottlenecks, discoveries, automation, humor, and chapter transitions. Its economy, scientific progression, writing, and interface should be original. The visual goal is a beautiful instrument the player wants to operate: a living chip, real measurement displays, an evolving laboratory, and research discoveries presented with care.

This is a design proposal, not a claim that a playable implementation, balanced economy, or final artwork already exists. The scientific rules have undergone independent AI review; [REVIEW.md](REVIEW.md) records the outcome. [PAPERS.md](PAPERS.md) supplies the academic foundation.

## Campaign assumptions

Version one follows **superconducting qubits with a two-dimensional surface-code approach**. This makes fabrication, cooling, microwave control, connectivity, calibration, and error correction fit one coherent campaign. Dilution refrigeration and these connectivity constraints belong to this selected architecture; they are not requirements of every quantum computer. The [superconducting engineering guide](https://arxiv.org/abs/1904.06560) and [DiVincenzo criteria](https://arxiv.org/abs/quant-ph/0002077) provide the hardware context.

The simulation is an educational economy inspired by engineering relationships. It is not a quantum-device emulator, commercial resource forecast, or universal predictor of algorithm performance. Research points, prices, grants, construction times, and fictional characters are game choices. Numerical scenarios must identify their noise model and assumptions. Theoretical discoveries and real experimental results keep their paper dates; the order in which the player unlocks them is a separate campaign order.

The game should gradually reveal its variables. The opening needs one qubit, one experiment, a clear result, and an affordable next action. Detailed coherence, logical patches, and factories appear only when they matter.

## The central loop

Prepare a repeatable experiment, run shots, inspect the measured evidence, and improve the apparatus. That evidence qualifies a new research milestone or contract. Research improves control, readout, fabrication, or circuit design. Expansion makes harder experiments possible but increases calibration work and can introduce crosstalk or correlated-error risk. Eventually the player trades many physical qubits for a few reliable logical ones.

Research output must be bounded by new experimental goals, qualification tasks, or explicitly abstract research effort. Repeating the same trivial measurement should not generate unlimited scientific discovery. A lab can earn service revenue for useful access before demonstrating quantum advantage; those are distinct milestones.

The persistent headline changes with the stage:

| Stage | Main player-facing measure | Why it changes |
| --- | --- | --- |
| First apparatus | Qualified experiments | Establish control and repeatability |
| Noisy processor | Circuits meeting the requested accuracy | Width alone no longer tells the story |
| Logical memory | Protected memory slots and measured logical error | Many physical qubits become a smaller reliable resource |
| Logical computer | Workloads meeting a full error and time budget | Memory protection is insufficient without reliable gates and orchestration |
| Useful instrument | Validated tutorial results or clearly labeled scenario completions | Endgame value comes from a named task with an honest validation method |

Physical qubit count always remains available. It should never be transformed into an unsupported scalar called quantum power or an exponential money multiplier.

## Proposed chapters and discoveries

The following 30 project concepts are a proposed first campaign content set. They are not numerical balance commitments. Parentheses refer to the bibliography IDs, and a citation supports the scientific concept rather than the game's bonus or price.

| Chapter | Project concept | Actual scientific foundation | Proposed gameplay effect |
| --- | --- | --- | --- |
| First signal | Feynman’s quantum simulator | Quantum simulation motivation (Q01) | Opens the laboratory goal and first model experiment |
| First signal | Deutsch’s universal machine | Universal quantum computation (Q02) | Opens a small circuit workspace |
| First signal | DiVincenzo’s checklist | Physical requirements (Q03) | Introduces hardware qualification instead of raw count milestones |
| First signal | Nakamura’s coherent control | Historical superconducting control experiment (Q24) | Enables repeated preparation and coherent pulse experiments |
| Control | Ramsey calibration | Coherence and noise diagnostics (Q04) | Shows fringes, drift, and a fitted T2-star estimate |
| Control | Echo and relaxation tests | T1, T2, and dephasing concepts (Q04) | Separates relaxation from echo coherence and calibration drift |
| Control | Readout discrimination | Measurement engineering (Q04) | Reduces modeled measurement bias after qualification |
| Control | Randomized benchmarking | Gate characterization with assumptions (Q05) | Measures an error estimate and uncertainty |
| Control | Coupled qubits | Entangling gates and circuit QED (Q04, Q26) | Opens small multi-qubit circuits and connectivity limits |
| Noisy processor | Preskill’s NISQ era | Noisy intermediate-scale limits (Q06) | Introduces circuit-depth constraints and experiment contracts |
| Noisy processor | Hybrid eigensolver | Variational eigensolving (Q16) | Adds a small molecule tutorial with a classical optimization loop |
| Noisy processor | Structured ansatz | Certain barren-plateau limitations (Q17) | Improves a chosen tutorial circuit; no universal optimizer bonus |
| Noisy processor | Error mitigation | Sampling and bias limits (Q18) | Trades more shots and assumptions for a better estimator |
| Noisy processor | Classical challenge | Changing baseline interpretation (Q33, Q34) | A rival improves the baseline; refresh the benchmark claim |
| Correction | Shor’s protected memory | Quantum error correction (Q07) | Opens encoded-memory experiments |
| Correction | Stabilizer measurements | QEC and fault-tolerance principles (Q30) | Shows syndrome information, separate from direct data-state measurement |
| Correction | Surface-code patch | Surface-code engineering (Q08) | Trades physical footprint for protection |
| Correction | Streaming decoder | Classical processing in QEC (Q09) | Adds syndrome throughput and feedback latency constraints |
| Correction | Below-threshold qualification | Demonstrated suppression in a particular memory experiment (Q09) | Qualifies a modeled memory regime, not universal computation |
| Logical computer | Lattice surgery | Logical operations via patch arrangements (Q25) | Opens routing and operation schedules |
| Logical computer | Logical gate qualification | Fault-tolerant circuit requirements (Q30) | Establishes separate operational error budgets |
| Logical computer | Bravyi and Kitaev’s ancillas | Non-Clifford resource distillation (Q11) | Opens consumable magic states within the chosen architecture |
| Logical computer | Factory planning | Time and space tradeoffs (Q10) | Allocate scarce footprint between factories and application patches |
| Logical computer | Resource accounting | Algorithm and device estimates (Q20, Q21) | Introduces explicit per-workload feasibility previews |
| Useful work | Lloyd’s simulator | Simulation of local quantum dynamics (Q14) | Opens named dynamics experiments |
| Useful work | Better Hamiltonian simulation | Algorithmic complexity and precision (Q15) | Improves a matching workload recipe |
| Useful work | Shor’s factoring challenge | Factoring and discrete-log algorithms (Q12) | Synthetic integer challenge; full fault-tolerant costs apply |
| Useful work | Grover’s oracle | Quadratic oracle-query improvement (Q13) | Opens a fully costed toy search workload |
| Useful work | Chemical resource study | Molecular-model resource estimates (Q19) | A specified energy-estimation task, not automatic material invention |
| Useful work | Quantum speedup audit | Defining and detecting speedup (Q22) | Compares the same task and accuracy against a dated classical baseline |

QEC theory dates to 1995 even though the laboratory reaches practical encoded experiments after its noisy-device chapter. The interface should show both “published in 1995” and “unlocked in your laboratory” where appropriate. This preserves history without pretending real research followed the player's route.

A short optional epilogue can imagine future multi-module instruments or ambitious experiments. Such projects must be marked **Future scenario**. Networking requires an actual resource and error model; connecting or entangling modules does not simply pool all qubits into one unrestricted processor. No projected deployment year should be presented as a scientific prediction.

## Resource economy

The economy should expose the active bottleneck and give the player at least two meaningful ways to address it.

| Resource | How it enters | What competes for it |
| --- | --- | --- |
| Funding | Grants, demonstrations, and explicitly defined service contracts | Equipment, staff, expansion, operating reserve |
| Research effort | Staff work and milestone-qualified evidence | Theory, characterization, engineering, software |
| Installed physical qubits | Fabrication or purchased modules | Active capacity is constrained by control, calibration, and hardware qualification |
| Control and cooling capacity | Hardware upgrades | Supported simultaneous operations in this architecture |
| Experimental runtime | Available calibrated apparatus time | Calibration, research experiments, customer jobs |
| Shot budget | Runtime, reset, gate schedule, and readout | Statistical precision, mitigation overhead, repetitions |
| Classical capacity | Controllers and decoder upgrades | Streaming syndrome processing, compilation, optimization, feedback |
| Logical footprint | Qualified physical hardware allocated into code patches | Memory, operations, routing, factories, spares |
| Magic states | Factories with declared space, time, and quality | Non-Clifford operations for eligible workloads |
| Reputation | Reproduced, properly qualified results | Grants and contract access; exaggerated claims can impair it |

Staff and apparatus allocation should be reversible. The player can move a researcher from software to characterization and reserve hardware for calibration without resetting a run. Fixed purchases can still create opportunity costs, but the game should avoid Singular Value’s unassignable-staff storage trap.

Candidate player controls are experiment-versus-contract allocation, calibration duty cycle, acquisition versus fidelity research, code distance, and application-versus-factory footprint. Each appears in its chapter. Avoid putting all five sliders in the opening.

An operating reserve can create economic tension, but recurring costs must allow a transparent recovery path. A funding penalty should never silently force a reset. The game's choice of prices or insolvency behavior is separate from physics and requires later balance testing.

## Scientific equations and their limits

These are the smallest useful relationships for a paper-backed prototype. They are explicit educational models. A small tested table of qualified scenarios is preferable to elaborate pseudo-physics.

### Measurements and precision

For independent measurements of a plus-or-minus-one observable with `M` shots:

`SE = sqrt(Var(O)/M) ≤ 1/sqrt(M)`.

A Hoeffding sufficient sample bound for absolute statistical error `epsilon` with failure probability at most `delta` is:

`M ≥ 2 ln(2/delta)/epsilon²`.

This means halving an ordinary sampling error target typically requires approximately four times the shots at fixed variance. More samples reduce statistical uncertainty; they do not automatically remove readout bias, circuit noise, or model error. Multi-term Hamiltonians require variance and measurement-group accounting, rather than applying one shot count to an entire molecule. Mitigation can greatly increase sample costs; [Takagi et al.](https://arxiv.org/abs/2109.04457) establish limits under specified settings.

The UI must distinguish a confidence interval from a fidelity score. A histogram of measured bitstrings does not reveal all amplitudes of an unknown quantum state.

### Coherence and circuit noise

In a simple declared Markovian model, `1/T2 = 1/(2T1) + 1/Tphi`. Ramsey typically estimates T2-star, which includes inhomogeneous dephasing and is distinct from echo T2. For independent stochastic fault events, a tutorial may use a basic circuit no-fault proxy:

`P_no_fault = product(1 − p_i) ≈ exp(−sum(p_i))`.

The product assumes independence; Markovian evolution alone does not establish that. The exponential approximation additionally assumes small `p_i`. Label that display **No-fault proxy**. It is not a theorem that the algorithm's answer is correct with that probability. Harmless errors, coherent errors, correlations, and circuit structure change the relationship. If `p_i` already contains coherence-related errors, an additional exponential decay term must not count them again. Randomized-benchmarking average errors are not a universal substitute for the effective noise parameter of a threshold simulation. Hardware terminology follows [Krantz et al.](https://arxiv.org/abs/1904.06560) and characterization follows [Magesan et al.](https://arxiv.org/abs/1109.6887).

### Physical and logical allocation

For a standalone ideal rotated surface-code memory patch using odd distance `d`, the proposed counting convention is `d²` data qubits plus `d²−1` syndrome ancillas:

`N_patch = 2d²−1`.

| Distance | Ideal patch footprint | Main tradeoff |
| --- | --- | --- |
| 3 | 17 physical qubits | Compact; limited error suppression |
| 5 | 49 physical qubits | Fewer patches on the same apparatus |
| 7 | 97 physical qubits | More protection only within a qualified noise regime |
| 9 | 161 physical qubits | Larger space and often time costs |

The available memory-slot count is:

`floor((activePhysical − factoryFootprint − routingFootprint − spares)/N_patch)`.

Clamp the numerator to zero. This count is **logical memory slots**, not a complete computer's application-qubit capacity. Logical operations need additional space and time, and factory layouts require their own consistent accounting. The game must not combine this exact standalone-patch convention with approximate Litinski tile counts and call the result an exact machine estimate. [Fowler et al.](https://arxiv.org/abs/1208.0928), [Horsman et al.](https://arxiv.org/abs/1111.4022), and [Litinski](https://arxiv.org/abs/1808.02892) motivate the relationships.

The first repetition-code tutorial, if included, must explain that it protects against one chosen error type. It cannot be described as general protection against arbitrary quantum noise. Full QEC protects encoded information without copying an unknown quantum state; the [no-cloning paper](https://doi.org/10.1038/299802a0) and [Gottesman overview](https://arxiv.org/abs/quant-ph/0507174) support that explanation.

### Error suppression

A common simplified below-threshold fit is:

`pL(d) ≈ A × (p_eff/p_threshold)^((d+1)/2)`.

Its coefficients and threshold belong to a specified noise model, circuit, and decoder. If a prototype needs an illustrative fixed scenario, Litinski’s dated resource model uses `pL = 0.1 × (100p)^((d+1)/2)`; see [Section 4.3, equation 10](https://arxiv.org/html/1808.02892v3). Treat that as a selected toy reference model, not a universal 1% hardware threshold or a prediction from measured RB error. Apply it only in its stipulated below-threshold regime.

At or above threshold, show **No reliable scaling qualified**. The apparatus can still run research experiments, but increasing distance must not magically qualify practical long computations. Correlated events can introduce an error floor; qualification tasks should expose this limitation. [Acharya et al.](https://arxiv.org/abs/2408.13687) provide a real experimental milestone, not blanket validation of every future processor.

### Workload budgets

Each logical workload has an explicit qubit requirement, memory qubit-cycle volume `V_mem`, logical operation counts `n_g`, magic-state count `nT`, preparation overhead, algorithmic precision target, and completion criterion. A declared accounting model can use:

`B_model = min(1, V_mem×pL_mem + sum_g(n_g×pL_gate_g) + nT×pT + pPreparation + pOther)`.

Memory probabilities are per qubit-cycle and operation probabilities here are per gate. Accounting categories must avoid charging the same noise twice: a full gate model that already includes an ancilla contribution must not charge it again under `nT×pT`. The union bound itself allows overlapping events and does not require independence. If the inputs are genuine validated upper bounds, compatible event-probability accounting gives an upper bound; fitted point estimates instead yield a conditional **model budget**, not an experimentally certified guarantee.

The game must keep memory rates and operational rates separate where a schedule needs them. A measured memory error alone cannot certify a logical gate stack. Algorithmic approximation and statistical estimation errors require their own targets; they must not be silently merged into failure probability despite sharing an epsilon symbol in many papers.

A contract becomes eligible only if the modeled error budget, qualified operations, footprint, repetitions, and time all meet its requirements. An optional `exp(−V_mem×pL_mem)` animation is an IID memory-survival proxy, not a scientific certification of a correct answer.

### Factories and runtime

For streams that can overlap, a scheduling lower bound is:

`t_run ≥ max(logicalDepth×logicalGateTime, nT/magicStateRate, criticalFeedbackTime)`.

Add sequential preparation, readout, classical work, calibration downtime, and repetitions as required by the workload. A `max` is valid only for modeled parallel streams; some schedules require sums or explicit dependency scheduling. Factories also consume physical footprint and must meet the required output-state quality. Magic states are resources for non-Clifford operations in the chosen computing scheme, not physical fuel consumed by all quantum computers.

Decoder throughput must keep up with syndrome production. Feedback-critical latency can delay some operations, but a decoder need not finish each individual syndrome cycle before the next cycle starts. This distinction prevents a false hard limit; the [below-threshold experiment](https://arxiv.org/abs/2408.13687) is a useful concrete example.

### Honest advantage claims

An application score may compare:

`speedup = classicalTime / completeQuantumWallTime`.

Both times must describe the same task, accuracy, and success probability. Quantum timing includes the required preparation, repetitions, fault-tolerance overhead, classical optimization or decoding, and verification. Cost and energy are separate comparisons. The interface identifies the classical method and the baseline's date or version. Updating that baseline can reduce a previous advantage claim without deleting a legitimate experimental achievement. [Rønnow et al.](https://arxiv.org/abs/1401.2910) provide the conceptual framework.

Resource feasibility and output validation are separate. Each workload names a validation method: a factor certificate, a classically reproducible small experiment, or an explicitly bounded cross-check. Browser tutorial results can be checked by actual classical computation. Large future workloads completed by the economy must display **Modeled scenario completion**; the browser has not performed or verified a classically inaccessible quantum computation. Any speedup generated by the economy is a **modeled comparison against a named scenario baseline**, not a measurement of real-world quantum advantage.

## Application boundaries

Shor supports polynomial-time factoring and discrete logarithms relative to input size; the comparison is against best known classical algorithms, not a proof that classical polynomial factoring is impossible. Practical requirements change with circuit and hardware assumptions. The [20-million-qubit estimate](https://arxiv.org/abs/1905.09749) and the [later less-than-one-million-qubit estimate](https://arxiv.org/abs/2505.15917) belong to different dated resource scenarios. Neither is a demonstrated RSA-2048 attack or an immutable unlock count.

Grover reduces the number of calls to an oracle to order square root of the search space. A playable workload must count reversible oracle construction, data access, gate depth, and repetitions. It cannot multiply database revenue by square root of arbitrary stored records for free.

VQE is a strong noisy-era tutorial because it joins quantum measurements with classical optimization. It does not guarantee useful advantage. Ansatz choice, optimizer behavior, circuit noise, observable estimation, and the classical baseline matter. Barren plateaus affect particular regimes, not every possible VQE problem.

Simulation is the preferred scientific endgame, but a molecular energy estimate is not the same as discovering a viable catalyst, battery, or industrial process. The final task should name a Hamiltonian or model, target precision, observables, and comparison method. Start with an educational task that can be reproduced classically and distinguish it from a future resource-estimation scenario beyond the browser's actual simulation scale.

Entanglement and a large Hilbert-space dimension do not independently establish advantage. [Stabilizer circuits can be efficiently simulated classically](https://arxiv.org/abs/quant-ph/0406196), even with substantial entanglement. No-cloning, measurement limits, and classical orchestration should remain visible throughout the campaign.

## Outstanding visual direction

The visual concept is **an evolving precision laboratory**. The machine is the composition’s central object, and the UI gives the player the pleasure of learning to read it. It should feel designed for this game rather than assembled from interchangeable dashboard cards.

Use an ink-black and warm ivory base with copper hardware details, cyan for calibrated control, and amber for uncertainty or drift. Reserve a restrained red for a failed qualification. A confident display face for chapter titles, a readable humanist body face, and a sharply aligned monospace for measurements create hierarchy without turning every label into terminal text. Precise lines, generous spacing, and small typographic details should carry more of the design than glowing effects.

The desktop layout has a compact laboratory header, a large central instrument, a focused next-action area, and a thin resource rail. The instrument changes from a single resonator and pulse trace into a connected chip, then protected patches and factory routes. The active workload appears alongside its budget rather than on a distant panel.

On mobile, the next meaningful action and active bottleneck remain visible near the instrument. Research and equipment use compact sheets or dedicated views. A permanent bottom navigation can offer Lab, Research, Workloads, and Journal; these destinations appear as they become useful. Avoid reproducing the original’s long column-by-column stack.

### Scientific visual metaphors

| Visual | What it represents | Required explanation |
| --- | --- | --- |
| Pulse and Ramsey traces | Repeated experimental measurements or a labeled illustrative fit | Noise, confidence bands, and experiment type |
| Bitstring histogram | Sample counts from repeated preparations | Shot count, basis, and uncertainty |
| Chip layout | Available devices and hardware connectivity | Physical layout is an illustrative selected architecture |
| Surface-code patch | Data and syndrome roles plus detected changes | Detection events are evidence, not direct visibility into the unknown state |
| Logical allocation map | Space given to memory, routing, factories, and spares | Count memory slots separately from usable workload capacity |
| Error-budget strip | Modeled contributions to workload risk | Fit assumptions and qualification status |
| Spacetime schedule | Sequential and overlapping computation resources | Gate duration, factory throughput, and critical feedback |

Avoid orbiting-electron decoration, unlocked hidden amplitudes, faster-than-light message beams, or generic atom icons repeated across every panel. A Bloch sphere can illustrate a known prepared state or tomography result, but must be labeled as such rather than claiming to reveal an arbitrary unknown state.

### Breakthrough moments

The first stable fringe should feel like a signal emerging from noise. A second controlled qubit adds a real connection to the apparatus. The first below-threshold result replaces a chaotic trace with a visibly sustained logical memory experiment. The first factory animates a resource stream into a scheduled computation. Finishing the scientific contract transforms the instrument into a quiet view of the result, with its paper, assumptions, and achievement available for inspection.

These moments should alter composition, sound, and the useful information on screen. Keep input positions stable while routine counters update. Major chapter transitions can be deliberate scenes, with a skip option and a reduced-motion version. State-changing actions need immediate feedback, and disabled actions need a plain explanation of the limiting resource.

Sound is optional and user-initiated. A persistent mute control and saved volume preference are basic requirements. Use original or appropriately sourced sounds. Do not copy Keir's music assets merely because the HTML points to them.

### Research as a collection

Every discovery remains in a permanent archive. A card has a short title, one practical consequence, an illustration or diagram, and a citation drawer containing the original title, authors, publication/preprint year, evidence type, DOI or arXiv link, and a clear distinction between the scientific finding and the game's abstraction.

The archive should be pleasurable to browse. It can use a timeline for publication history and a separate dependency view for the player's research path. It should not block gameplay with a wall of technical text, and external paper links must remain keyboard-accessible before and after purchase.

The Journal separates breakthroughs, operational warnings, and satirical news. Important warnings stay actionable instead of disappearing after two newer messages. The player can inspect what changed in the last upgrade and what remains limiting.

### Writing and the gift

The narrative voice should be dry, curious, and humane. Suggested tone: “The histogram is prettier. The error bars remain unconvinced.” Or: “The board requests more qubits. The decoder requests a chair.” Fictional companies and researchers can provide satire without attaching invented behavior to real scientists.

The opening dedication can be discreet and the ending more personal: **For Keir, who turned one neuron into a world. Here is one qubit in return.** This is proposed gift copy. His original game should receive a visible inspiration credit and link. The ending can offer a celebratory postcard containing the run’s laboratory diagram and achievements; it should share only when the player chooses to export it.

The local work must remain private until the user decides how to reveal it. The user's surprise intent does not authorize emailing, publishing, or contacting Keir.

## Endings and replay

The main ending is **Useful at Last**: the laboratory completes a named simulation or estimation contract at its declared accuracy, reliability, and time budget. A small tutorial result uses its actual validation method; an ambitious future task explicitly celebrates a **modeled scenario completion**. The ending should make the early single-qubit experiment feel like the beginning of something substantial without claiming the player's browser executed a real fault-tolerant quantum algorithm.

A factoring-challenge completion can be a distinct application achievement. A rigorous reproduced noisy-device experiment can be another. Most of the campaign should be shared, with a few late workload specializations that offer real allocation choices. Three entirely separate simulation economies are unnecessary for version one.

A loss of funding or failed benchmark should generally open a recovery route and a memorable journal entry, not masquerade as a scientific conclusion or erase a long run. Quantum failure is an engineering constraint, not proof of consciousness or an arbitrary apocalypse.

Replay can vary late workload choices and a small number of economic decisions. A prestige/reset economy, broad hardware-modality tree, procedural paper generation, or multiplayer is outside the first design scope.

## Acceptance criteria for implementation

The game's artistic and scientific ambitions become concrete through these checks:

1. A first-time player can understand the first experiment and identify the next action without a manual. A proposed design target is the first satisfying experiment within a minute; actual pacing must be tested.
2. Every chapter introduces a new decision and retires or automates at least one earlier chore where appropriate. Unlock timing is measured through complete resource-constrained playthroughs.
3. Adding noisy qubits alone cannot pass a reliability requirement. Increasing distance reduces available patch count and improves the modeled error only in the qualified regime.
4. Statistical sampling, systematic bias, algorithm error, logical memory, and logical operations remain distinct in both calculations and wording.
5. Every academic advance has an accessible primary source and an honest evidence label. Fictional engineering projects are visibly marked future scenarios.
6. Every eligible workload fits footprint, operation qualification, error budget, factory output, decoding capacity, repetitions, and time. Advantage claims identify a matching dated classical baseline.
7. The main instrument looks and behaves meaningfully differently in at least four chapters. A static screenshot and a short interaction capture must demonstrate the difference.
8. Desktop and mobile layouts are inspected in opening, expansion, correction, factory, warning, and ending states. Keyboard focus, reduced motion, contrast, paper links, and audio controls are checked.
9. Save success is truthful; load validation handles malformed data; pause, reset, and save export behavior are explicit. Background and closed-tab progress follow one documented policy.
10. The end-to-end campaign can finish without undocumented settings, hidden interventions, or unavoidable allocation traps. Multiple strategies are tested before calling the game balanced.

Scientific consensus on this proposal clears the concept for prototyping. Specific price curves, hardware presets, workload numbers, duration targets, final artwork, and browser performance still require implementation and validation. Those outstanding choices are design work, not unresolved agreement about the scientific boundaries above.
