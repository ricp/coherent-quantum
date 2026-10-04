# Coherent implementation model

Coherent is an educational incremental economy, not a quantum-device emulator or a hardware forecast. All costs, laboratory seconds, staffing, qualification cutoffs, and numerical scenario coefficients below are game choices. Papers motivate the concepts; they do not validate the game's prices or performance.

## Architecture and campaign

The implementation uses static HTML, CSS, and classic JavaScript. A content table, a DOM-free deterministic engine, and a browser interface are separate files. There is no framework, dependency manager requirement, build step, backend, or network API. The game works from a local file or static HTTP server. Node's built-in test runner exercises the same engine used by the browser.

Six chapters implement the 30 discoveries in `QUANTUM-DESIGN.md`: first signal, control, noisy circuits, correction, logical operations, and useful work. Research effort is explicitly abstract staff work; repeated trivial measurements do not manufacture new scientific evidence. Qualifications and demonstration grants are awarded once per named experiment. Equipment and staff allocation can be changed without resetting a run.

## Measurements

Opening experiments sample explicitly prepared states and educational measurement models. A histogram records sample counts, not unknown amplitudes. Ramsey T2-star and echo T2 remain distinct. Displayed RB error is a separate illustrative characterization estimate, never a substitution for the threshold model's effective stochastic parameter.

The two-spin tutorial uses `H = Z0 Z1 + 0.6 X0 + 0.6 X1`, and the normalized known ansatz `cos(theta)|Phi+> - sin(theta)|Psi+>`. Its exact expectation is `cos(2theta) - 1.2 sin(2theta)`; the classical ground-state reference is `-sqrt(2.44)`. Each Pauli term is sampled separately. The browser really computes these four-dimensional expectations, sample counts, and the classical reference. This is a classically simulated tutorial, not a quantum hardware experiment or advantage demonstration.

For three independent measurement groups of `M` shots each, a simultaneous 95% Hoeffding energy bound is `2.2 sqrt(2 ln(6/0.05)/M)`. Ordinary standard error is also reported separately. Residual measurement bias is budgeted separately from statistical uncertainty and ansatz error. Mitigation models four times the raw-shot overhead and reduces the declared residual bias. The browser actually samples 3M Bernoulli trials; modeled acquisition is 12M with mitigation and is labeled separately. Funding costs `35 + ceil(modeledRawShots/2048)`, so both greater precision and mitigation consume a real game resource. This is a selected estimator/overhead scenario; no universal free-precision bonus is claimed.

## Hardware and noise

Installed pools and control/cooling rack capacities are `[1, 9, 25, 81, 257, 769, 2049]`; active physical capacity is the smaller of installed and supported capacity. These are illustrative game presets.

The selected independent stochastic threshold parameter is `pEff = 0.012 * 0.5^pulseLevel * readoutFactor * echoFactor * (1 + drift)`, where pulse levels run from 0 to 8, readoutFactor is 0.85 after its discovery, and echoFactor is 0.9 after its discovery. Factors are explicitly game scenario choices. A separate RB estimate uses a separate formula. Calibration duty competes for apparatus runtime while reducing drift. Calibration does not create additional physical qubits.

The no-fault proxy uses 12 independent stochastic gate events with separately declared probability `pCircuit = 0.01 * 0.55^pulseLevel * readoutFactor * (1+0.5 drift)`; here readoutFactor is 0.8 after readout research. This is an educational IID fault channel, independent of the RB display and threshold scenario. The proxy is not algorithm correctness. Coherence is not charged again to the same gate-error term. Ramsey values are selected scenarios; memory-bin counts are illustrative Bernoulli detection events, not a decoded circuit-level surface-code simulation.

## Memory, gates, and allocation

For odd distance 3, 5, 7, or 9, an ideal rotated memory patch uses `2 d^2 - 1` physical qubits. Below the selected threshold 0.01, use the dated toy fit `pL = max(1e-8, 0.1 (100 pEff)^((d+1)/2))`. The residual floor is an illustrative assumption. At or above threshold, reliable scaling is unqualified. The coefficients are inspired by [Litinski's selected resource model](https://arxiv.org/abs/1808.02892), not a universal hardware threshold or a fit to our RB display.

Protected memory, a historical discovery, and a currently qualified logical gate stack are distinct. Current drift, distance, footprint, and decoding capacity are checked whenever qualification or workload eligibility is requested. An unlocked paper never permanently certifies degraded hardware.

Logical operations reserve two standalone-patch-sized allocation units for routing and one for spares. Each factory reserves four additional units. Application memory slots are the remaining complete patches. This is a **fictional educational allocation**, not an exact real factory or Litinski tile layout. All allocated complete patches, including routing, factories, and spares, contribute syndrome load `(d^2 - 1)` measurements per selected 1-microsecond cycle. Decoder capacity uses measurements per microsecond; feedback latency uses microseconds and is checked separately.

Logical-operation error is a separately qualified scenario contribution `2 pL` per operation. It charges operation faults outside the idle-memory accounting and excludes magic-state preparation. Factory output error `pT` is a stipulated total accepted-output error, including internal factory faults: 1e-3 before distillation and 1e-7 after. Neither value is derived from a real distillation protocol.

## Factories and time

Persistent factory progress is **rehearsal credits**, a scheduling/economy abstraction. Credits are not stored magic states and carry no quantum-state quality. They cannot establish hardware readiness. Physical resource scenarios use freshly produced states with current qualified output error and footprint. A discovery never retroactively purifies quantum stock because no quantum stock is simulated.

Selected factory throughput is `factoryCount / (8 d)` accepted states per microsecond. This timing is a fictional scenario choice, not Litinski's actual 11-tile protocol. Credits accrue at a separate gameplay rate in laboratory seconds. Game project durations are pacing choices, distinct from the modeled quantum wall time.

Each resource recipe declares application width, gate count, gate depth, operation precision, magic-state count, repetitions, preparation/readout/classical times, and a total modeled time ceiling. An operation lasts `4 d` microseconds. Overlapping gate execution, fresh state production, and critical feedback take their maximum. Sequential preparation, readout, and classical work are added, and the result is multiplied by repetitions.

Idle memory exposure per repetition is `max(0, width * gateDepth - gateCount) * 4 d` qubit-cycles plus `width * max(0, parallelTime - gateTime)` qubit-cycles, using the selected 1-microsecond cycle. The recipe treats gate counts as single-application-qubit occupancy slots in its educational schedule; routing and multiqubit-operation overhead live in the separately qualified operation model and reserved layout. Additional factory or feedback waits therefore increase memory risk. This is a declared recipe convention, not a compiled circuit resource estimate.

Per-execution modeled risk is the sum of idle qubit-cycles times memory error, operation count times operation error, fresh state count times accepted-output error, preparation, and other terms. The entire repeated task uses `B_model = min(1, repetitions * perExecutionRisk)`. All inputs are point estimates/scenario assumptions; this is **not an experimentally certified upper bound**. Time, fresh states, and pacing credits are also multiplied by repetitions.

## Workloads and validation

The main ending's future recipe is a 32-site periodic nonintegrable Ising model: `H = sum Z_i Z_(i+1) + 0.7 sum X_i + 0.3 sum Z_i`, starting from all-zero computational-basis spins, evolution time 1 in units with coupling and hbar equal to 1, and target observable mean magnetization `sum <Z_i>/32`, precision 0.02. The game recipe selects 4,800 operations, depth 200, 192 freshly produced states, and one execution. These counts and its precision assignment are **educational recipe assumptions**, not a compiled algorithm or paper-derived estimate. The browser does not compute this large result. Finishing it displays **Modeled scenario completion** and no invented numerical magnetization.

Small factoring and search tutorials validate classical certificates in the browser. Their logical execution economics remain modeled; the browser does not pretend to execute Shor or Grover on a quantum device. The electronic-energy resource scenario uses a six-site periodic Hubbard ring, nearest-neighbor hopping t=1, on-site U=4, six electrons with balanced spin, and 12 spin orbitals; its target is ground-state energy per site within 0.01. Its resource recipe and precision assignment are educational assumptions, and no energy or catalyst is computed. No real-world speedup is claimed. The speedup-audit discovery explains why a matched task, accuracy, success probability, and dated classical baseline would be required.

## Persistence and time policy

Progress advances only while this game is visible and unpaused. Hidden and closed tabs receive no offline progress. Jobs retain their progress when saved. Save/load uses an explicit versioned JSON schema, bounded values, known project IDs, and validated job/configuration data. Import failures preserve the current game. Storage failures remain visible and export remains available. Reset requires an explicit confirmation. Sound is off until the player enables it; volume and mute are saved.

## Verification

Engine checks must cover qualification, accounting, affordability, allocation reversibility, malformed saves, and whole-campaign completion with multiple legal strategies. Browser checks cover opening, expansion, correction, factory, warning, and ending states at desktop and mobile widths, plus keyboard, motion, sound, paper access, and persistence. Independent AI review must approve the implemented scientific model before its consensus is recorded.
