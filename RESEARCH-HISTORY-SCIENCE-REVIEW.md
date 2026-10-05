# Research history: independent AI quantum review

Date: 5 October 2026 (client date). Reviewer: independent AI quantum-design reviewer. Scope: existing archive year coverage, primary-source metadata and findings for relevant missing landmarks, and scientific acceptance criteria for an annual archive linked to existing gameplay. This is a focused source/design review, not replication or a credentialed human assessment. Implementation acceptance remains pending until the actual diff is inspected.

## Why the screenshot jumps

The discovery list follows authored campaign prerequisites and appends three optional frontier discoveries. It is not a chronological literature history. Its latest-cited-year badges collapse multiple dates into one badge, so the 2014 audit card followed by three 2026 cards gives a misleading impression of omitted intervening research.

A deterministic audit of the 43 existing `content.js` sources finds a date-string match for every year 2015–2026, but some matches are only preprints or revisions: 2016 is Reiher's preprint, 2020 is the Blais review preprint, 2021 includes a revision of a 2019 review. This does not establish a coherent annual history or complete milestone coverage. The important superconducting experimental path from repetition-code detection to repeated surface-code correction is genuinely underrepresented.

Existing year-bearing references:

| Year | Existing IDs with that date string |
| --- | --- |
| 2015 | Q15, Q36 |
| 2016 | Q19 (preprint) |
| 2017 | Q19 (journal), Q35 |
| 2018 | Q06, Q10 (preprint), Q17 |
| 2019 | Q04, Q10 (journal), Q20 (preprint), Q27 |
| 2020 | Q26 (preprint) |
| 2021 | Q04 (revision), Q18 (preprint), Q20 and Q26 (journal) |
| 2022 | Q18 (journal) |
| 2023 | Q28/Q31 (preprints), Q33/Q34 |
| 2024 | Q09/Q37/Q39 (preprints), Q28/Q31/Q41 (journal) |
| 2025 | Q09 (volume), Q21/Q38/Q40/Q42 (preprints) |
| 2026 | Q37/Q38/Q42 (journal), Q43 (preprint) |

## Verified useful additions

Primary publisher pages and author arXiv abstracts were checked live on the review date. Publisher dates below mean online publication, unless specified. Exact titles can differ between preprint and publisher versions; preserve those distinctions.

| Landmark / proposed ID | Exact metadata and direct links | Finding, boundary and existing game connection |
| --- | --- | --- |
| 2015 / Q44 | J. Kelly et al., **State preservation by repetitive error detection in a superconducting quantum circuit**. Nature 519, 66–69; online 4 March 2015. Author preprint submitted 26 November 2014. [Nature / DOI](https://doi.org/10.1038/nature14270), [arXiv](https://arxiv.org/abs/1411.7403). | Repeated parity measurements on a nine-qubit line suppress environmental bit-flip failures for classical inputs; a GHZ-state check is also reported. This is not protection against arbitrary errors or a complete logical processor. Link to `stabilizer` and the distinction between syndromes and unknown data states. |
| 2016 / Q45 | Diego Ristè and Leonardo DiCarlo, **Digital Feedback Control**, book chapter in *Superconducting Devices in Quantum Optics*, pp. 187–216; first online 1 March 2016. The related 2015 author manuscript is titled **Digital feedback in superconducting quantum circuits**. [Publisher / DOI](https://doi.org/10.1007/978-3-319-24091-6_8), [author manuscript](https://arxiv.org/abs/1508.01385). | The authors review their projective-measurement and conditional-action feedback work, including reset and deterministic entanglement. Label **engineering chapter**, not a new 2016 experiment: central demonstrations were published in 2012–2013. Link to `readout` / `controller2026`: reading and reacting are distinct operations. |
| 2017 / Q46 | Kristan Temme, Sergey Bravyi, Jay M. Gambetta, **Error Mitigation for Short-Depth Quantum Circuits**. PRL 119, 180509; published 3 November 2017. Preprint 6 December 2016. [APS / DOI](https://doi.org/10.1103/PhysRevLett.119.180509), [arXiv](https://arxiv.org/abs/1612.02058). | Introduces zero-noise extrapolation and quasiprobability resampling for expectation-value estimates. This is a method/theory paper, not universal error correction. Sampling cost and validity assumptions remain; existing `mitigation` acquisition cost is authored, not the paper's constant. Pair with Q18 limits. |
| 2019 / Q47 | Frank Arute et al., **Quantum supremacy using a programmable superconducting processor**. Nature 574, 505–510; online 23 October 2019. [Nature / DOI](https://doi.org/10.1038/s41586-019-1666-5). | Samples random circuits on 53 superconducting qubits and compares a particular task against then-selected classical methods. The 10,000-year estimate is historically contingent, not a current universal advantage fact; avoid quoting it as present truth. Link to `classical` and Q22/Q23 benchmark boundaries. It does not validate the game's dynamics/chemistry scenarios or a service-income multiplier. |
| 2020 / Q48 | Christian Kraglund Andersen et al., **Repeated quantum error detection in a surface code**. Nature Physics 16, 875–880; online 8 June 2020. Preprint 19 December 2019. [Nature / DOI](https://doi.org/10.1038/s41567-020-0920-y), [arXiv](https://arxiv.org/abs/1912.09410). | A seven-qubit distance-two detection code repeatedly detects errors. Enhanced lifetime/coherence is conditioned on no detected errors. Detection/postselection is not unconditional correction or universal logical gates. Link to `surface`, and the memory experiment's separate qualification. |
| 2021 / Q49 | Google Quantum AI (Zijun Chen et al. on the author manuscript), **Exponential suppression of bit or phase errors with cyclic error correction**. Nature 595, 383–387; online 14 July 2021. Preprint **Exponential suppression of bit or phase flip errors with repetitive error correction**, submitted 11 February 2021. [Nature / DOI](https://doi.org/10.1038/s41586-021-03588-y), [arXiv](https://arxiv.org/abs/2102.06132). | Cyclic one-dimensional repetition codes suppress bit **or** phase errors as code size increases, with up to 50 rounds. They do not simultaneously protect both error types; a small surface-code detection experiment is separate. Link to `decoder` / `threshold`; do not imply this paper proves full surface-code threshold scaling. |
| 2022 / Q50 | Sebastian Krinner et al., **Realizing repeated quantum error correction in a distance-three surface code**. Nature 605, 669–674; online 25 May 2022. Preprint 7 December 2021. [Nature / DOI](https://doi.org/10.1038/s41586-022-04566-8), [arXiv](https://arxiv.org/abs/2112.03708). | Seventeen superconducting qubits repeatedly measure both error-syndrome types; decoding/corrections are applied in postprocessing. The reported approximately 3% error per cycle rejects leakage-detected runs. It is not proof of real-time feedback gates, arbitrary code scaling or an application-ready machine. Link to `surface` / `decoder` / `gates` distinction. |
| 2023 / Q51 | Google Quantum AI (Rajeev Acharya et al. on the author manuscript), **Suppressing quantum errors by scaling a surface code logical qubit**. Nature 614, 676–681; online 22 February 2023. Preprint 13 July 2022. [Nature / DOI](https://doi.org/10.1038/s41586-022-05434-1), [arXiv](https://arxiv.org/abs/2207.06431). | Distance five modestly outperforms the average of distance-three subsets in a specified memory experiment. Additional qubits introduce errors; improvement requires adequate physical performance. Link to `threshold` and the distance/footprint tradeoff. Keep its limited improvement separate from Q09's later below-threshold memory result. |

Eight additions bring the catalogue to 51 sources, without requiring eight new priced upgrades. A catalogue also containing chapters/reviews should be described as **academic sources** rather than implying all 51 entries are new primary experimental papers.

## Recommended continuous annual story and mechanics mapping

Use a separate visible **History · 2015–2026** view, sorted by explicitly authored landmark year, with twelve labeled years, all readable before unlocking. Each card should show a short finding, a limitation, direct source access and a button to inspect the corresponding existing discovery/decision. Keep those connections informational: no purchased state, new bonuses, scenario qualification or save mutation.

| Year | Suggested focus | References / existing decision |
| --- | --- | --- |
| 2015 | Repeated parity checks | Q44; `stabilizer` |
| 2016 | Measurement becomes a feedback decision | Q45 engineering chapter; `readout`, `controller2026` |
| 2017 | Estimate observables with mitigation | Q46 with Q19 chemistry estimate; `mitigation`, `chemistry` |
| 2018 | NISQ ambitions meet noise/training limits | Q06, Q17; `nisq`, `ansatz` |
| 2019 | Benchmark a named task; budget a logical machine | Q47, Q10; `classical`, `factories` |
| 2020 | Detection before correction | Q48; `surface` |
| 2021 | Suppress one error type, not all errors | Q49; `decoder` |
| 2022 | Repeated surface-code correction | Q50 with Q18; `surface`, `mitigation` |
| 2023 | Scale a memory code; recheck classical competitors | Q51 with Q33/Q34; `threshold`, `classical` |
| 2024 | Decode more accurately and prepare resource states | Q41, Q39; `decoder`, `state-readiness` |
| 2025 | Below-threshold memory and revised resource budgets | Q09 Nature volume 2025 (online/preprint2024), Q21/Q40; `threshold`, `accounting`, `state-readiness` |
| 2026 | Two controller clocks; drift adaptation; state readiness | Q37/Q38 journal2026 and Q43 preprint2026; current three frontier discoveries |

Do not reuse the latest-cited-year badge algorithm for these rows: publication, preprint, revision and gameplay prerequisites are separate concepts. Do not use Q09's April2026 labeling correction to imply a new performance result or make its earlier result a newly demonstrated2026achievement.

## Implementation acceptance criteria

1. Exactly every year2015–2026 is visible in chronological order; metadata labels identify the selected year convention.
2. All added papers resolve in the archive and their direct links are present; date and type match the verified primary source above.
3. Findings retain detection/postselection versus correction, repetition versus full surface code, benchmark versus practical advantage, and memory versus universal gate/application distinctions.
4. Related-discovery inspection opens existing notes even when locked; history navigation grants nothing and cannot bypass prerequisites or modify earned saves.
5. Existing engine, 33 discovery progression, workload qualification and prices remain unchanged unless the user separately requests new purchasable mechanics.
6. Scientific copy is reviewed on the actual implemented sources, not just this proposal; browser QA remains the root's separate evidence responsibility.

No scientific objection to the proposed read-only annual history and links to existing decisions. Final implementation consensus is pending actualdiff review.

## Scope update: user authorized purchasable historical discoveries

After this initial proposal, the user explicitly requested new purchasable discoveries that lengthen the campaign. Criterion5 above therefore now applies to preserving existing prices/qualification except for explicitly designed new mechanics; it does not prohibit the requested additions. The implementation must still preserve the existing completed ending and distinguish new game prerequisites from publication chronology.

Recommended scientific form for eleven annual purchases: each unlocks a new authored laboratory **decision or study**, with visible inputs, evidence criteria and a finite outcome. None of the papers implies a generic qubit/cash/quality multiplier. A new fee is a fictional management rule, not a research finding. Reusing existing fully declared measurements or resource-model constraints can be scientifically cleaner than inventing eleven physical bonuses.

| Year | Safe kind of new decision / study | Required boundary |
| --- | --- | --- |
| 2015 | Inspect repeated syndrome evidence, compare protected-memory settings against a specified modeled target | Kelly's repetition code protects bit-flip errors, not an arbitrary state against all error channels |
| 2016 | Decide when measurement acquisition/conditional action reserves the apparatus | Ristè chapter documents a feedback workflow; it does not supply a new universal error-rate reduction |
| 2017 | Choose sample budget versus mitigated residual bias for a named tutorial precision request | Keep systematic bias separate from statistical uncertainty; exact4x cost is game-authored |
| 2018 | Choose a variational preparation against a declared ansatz/precision target | Preskill is perspective; it does not certify useful speedup or easier optimization |
| 2019 | Choose complete footprint versus preparation/waiting time in a named logical resource scenario | Litinski tile/resource model needs its assumptions; random sampling benchmarks do not validate general workloads |
| 2020 | Examine detection-conditioned outcomes versus retained fraction in an educational study | An accepted subset's lifetime is not unconditional logical-memory performance |
| 2021 | Compare distance/encoded overhead in a clearly labeled bit-or-phase repetition-code teaching study, or keep the connection informational while using the existing full-memory model | Do not reuse the game's full surface-code `pL` as if it reproduced Chen's repetition experiment |
| 2022 | Qualify a fresh repeated-memory scenario; distinguish memory evidence from available logical gates | Krinner postprocessed correction and leakage selection do not demonstrate feedback-critical universal gates |
| 2023 | Choose distance3/5/7 against a named footprint/risk target under the game's existing qualified noise model | More physical qubits help only inside the modeled qualified regime; it is not a universal count benefit |
| 2024 | Compare decoder inference schedule/footprint or run a declared decoder-study objective with separate accuracy and throughput targets | Bausch's accuracy gains cannot be silently translated to faster inference, lower latency, or unchanged hardware error |
| 2025 | Compare complete preparation/yield budgets or an accounting study for a named workload | Rosenfeld's retained fidelity and8%acceptance are different; attempts, discarded shots and time must be charged. Existing factory model must remain separate if cultivation dynamics are not actually modeled |

These are allowable design directions, not yet accepted mechanics. Concrete equations, qualification rules, save changes and source labels require diff review before claiming consensus. Merely adding eleven identical purchases or additional idle funding thresholds would not substantiate the requested gameplay improvement.

## Concrete engine design review (implementation pending)

Root and engine builder supplied eleven fresh-study predicates, each attached to a purchased annual discovery. Their numbers are authored study targets. No paper-derived universal hardware modifier is proposed. I accept this design in principle, subject to actual source, receipt import and UI-copy review:

| Year | Fresh experiment and criterion |
| --- | --- |
| 2015 | Memory; distance3, currently qualified modeled memory |
| 2016 | Gate rehearsal; feedback no greater than20 in the game's declared timing model |
| 2017 | Actual classically sampled VQE tutorial; theta65°±1°, at least16,384 shots per Pauli group, mitigation enabled, tutorial ground-reference interval qualified |
| 2018 | Actual classically sampled VQE tutorial; theta20°±1°, at least16,384 shots per group, ansatz error greater than0.5 and simultaneous statistical bound at most0.12. This intentionally precise but bad preparation is valid study evidence, despite failing the ground-reference tutorial qualification |
| 2019 | Factory rehearsal; exactly one factory, currently qualified factory, at least two application slots remain |
| 2020 | Memory; calibration allocation covers current maintenance, service allocation no greater than0.5, modeled memory qualifies |
| 2021 | Gate rehearsal; distance3, full existing modeled gate stack qualifies |
| 2022 | Memory; modeled memory qualifies but20<feedback≤40 demonstrates failure of the specifically authored stricter20 response budget |
| 2023 | Memory; distance5, at least twelve application slots, modeled memory qualifies |
| 2024 | Gate rehearsal; syndromeRate≤0.8 decoderRate, feedback≤20 and the existing modeled gate stack qualifies |
| 2025 | Factory rehearsal; selected32-site Dynamics factory lane no longer than gate lane, selected recipe application width fits available slots, factory currently qualifies |

For non-VQE studies, checking the live completion configuration instead of only start configuration matches the existing engine's semantics and avoids certifying stale qualification while drift evolves. Receipts must preserve the actual completion inputs so imported evidence is recomputable. VQE uses the settings, acquisition count, bias and sampled groups captured by the paid fresh job. Receipt success may not be inferred merely from `passed:true` or a prior unrelated tutorial/result.

The2024condition measures authored streaming headroom, not learned-decoder accuracy, and never changes physical/logical error parameters. The2025condition checks the specified preparation/gate lanes and available width; it does not establish full-workload risk/runtime qualification. That remains the independent existing workload predicate. Neither condition reproduces the cited hardware/software experiment. The 2018 study identifies a poor chosen preparation, not an actual barren-plateau optimization experiment.

For new games the eleven purchases become required before the gift ending, per the user's explicit choice. Previously earned ending records remain historical evidence; legacy runs need an explicit idle opt-in before accepting new study requirements. Existing paid atomic jobs must not be discarded by extension activation or completion. Browser playability and pacing are separate from scientific acceptance.

### Resolved review finding: irreversible decoder upgrade deadlock

The initial2022criterion demanded20<feedback≤40. The reviewer first identified a late-campus throughput conflict; the engine builder then identified the stronger irreversible-upgrade issue: decoder3 or above cannot produce a feedback value greater than20 under any available profile, so existing earned late saves could never satisfy the criterion. At maximum physical growth even a lower decoder could lack throughput. This is a gameplay reachability defect, not a scientific requirement.

Reviewer and builder recommend **memoryOK && feedback≤40**, with the receipt separately recording whether the stricter authored20 budget passes. Both comparison outcomes are valid evidence. UI must display the actual result and must not assert that20fails when it passes. This supersedes the earlier proposed2022predicate. It preserves the lesson that protected-memory qualification and feedback-response qualification are distinct, without inventing a clock knob or requiring a hardware downgrade. Root confirmation and actualdiff inspection are still pending.

Root refined the resolved2022criterion to **memoryOK && feedback≤40 && factories===0**, retaining a separately truthful20 budget comparison. Reviewer accepts: removing factories is an existing reversible allocation decision and illustrates that qualified memory without currently allocated fresh-state production is not a complete universal workload. Ledger credits remain planning credits, not stored quantum states. This is the agreed criterion for implementation review, superseding both earlier2022proposals.

## Actual implementation acceptance: scientific model and evidence contracts

Reviewed source on5 October2026:

- `game.js` SHA256 `a37ea3bd1bd9cb03a82ebef5b66206d11499a127b80e642bd5c2ecc7463e5043`.
- `content.js` SHA256 `1508aff754ed1bd13b9db040416f3fd705587e018f7af5f39dfc1a450d98a86d`.
- Eight verified additions produce51academic sources;44 discoveries comprise33existing plus11annual2015–2025 purchases. All discovery-reference IDs resolve.
- Independently executed `node --test tests/research-history.test.cjs`: **9 passed,0 failed,0 skipped**. This is constructed deterministic engine evidence, not a normal-browser playthrough, pacing proof or human-enjoyment assessment.

Accepted implementation boundaries:

1. VQE study receipts retain captured preparations, shot counts, mitigation and sampled Pauli-group counts. Import recomputes measured energy, simultaneous sampling bound, exact ansatz error, bias and qualification. The2018study deliberately accepts precise poor-preparation evidence while the ground-reference tutorial remains unqualified.
2. Other studies retain the actual completion configuration and recompute the existing model predicate when loading. They do not pretend to run Kelly's, Andersen's, Chen's, Krinner's or Rosenfeld's apparatus/protocol. Configuration prerequisites and prior annual receipt chronology are checked.
3. The2022zero-factory allocation and current-memory qualification remain attainable after irreversible decoder upgrades. Its stricter20 response comparison stores the actual Boolean and is validated rather than assumed to fail.
4. The2024study checks authored throughput headroom and feedback, not increased learned-decoder accuracy. The2025study checks declared supply/gate lanes and application width, not full workload success or cultivation yield. Physical/logical error functions and existing full-workload qualification stay separate.
5. Fresh paid job completion is needed before each purchase; ordinary historical results do not retroactively grant study receipts. Cancellation/failure retains spent acquisition cost. Purchases consume authored funding, effort and designs. Studies pay no separate research grant.
6. New campaigns require all11purchases before the gift. Existing completed ending records remain earned; legacy opt-in is explicit and idle. The final purchase cannot discard paid apparatus work. The factory-rehearsal credit cap correction keeps the planning ledger inside its existing storage ceiling.

No remaining scientific model or receipt-contract objection at the listed hashes. Root and reviewer reached bounded AI consensus on these mechanics after resolving the2022reachability disagreement. **Presentation acceptance is still pending**: the current app must identify successful2018bad-ansatz evidence without advising the player to “fix” an intentionally valid study, expose the actual2022comparison, and keep illustrative memory events distinct from a decoded surface-code simulation. Final browser quality and pacing remain the root/gameplay review's separate scopes.

### Final bounded acceptance after presentation fixes

The engine's final availability-only correction makes Audit unavailable until all11required historical purchases are complete in new campaigns, so next-action routing can find annual prerequisites. Final reviewed engine SHA256: `85da1ac8d7dff065fee62f4d40a979472ed9f8d60c618be79548fc759a765e83`. The quantum model and receipt predicates are unchanged from the accepted implementation. The targeted nine intent tests were executed again:9 passed,0 failed,0 skipped; output saved to `/tmp/research-history-science-targeted-tests.txt`.

Final reviewed presentation-code SHA256: `43411ab3395495c1acb2ff25db9572a4ffd0ecddee48e2261760377b55d08220`. It resolves the pending scientific copy findings:

- The2018result now identifies an intentionally poor preparation measured precisely and explains that study success is separate from ground-energy qualification. It explicitly does not simulate barren-plateau training.
- The2022result and retained receipt display captured feedback and the actual pass/fail outcome of the authored20 μs comparison; zero allocated factories and planning credits remain distinct from stored resource states.
- Non-VQE study captions explicitly use the game's conditional model rather than historical hardware or unknown-state readout.
- Timeline rows and discovery badges use authored `historyYear`, so references with later supporting dates do not erase the selected2017/2023 landmarks. Source metadata keeps the original distinct manuscript and publication dates.

**Final conclusion: accepted within the stated independent AI scientific/source/receipt/presentation-code scope.** Root, engine builder and reviewer reached bounded consensus after resolving the irreversible-decoder2022trap and misleading2018result guidance. All source links and findings are supported by the verified primary publisher/author pages above. This acceptance does not establish physical hardware accuracy, reproduction of experimental results, human enjoyment, optimal campaign pacing, mobile frame rates or native-browser visual quality. Those are separate verification scopes; the root must report them accurately.

### User-directed correction: retain the full foundations timeline

The user subsequently clarified that the new annual history must retain the foundational discoveries. This supersedes the narrower initial 2015–2026 view proposal. Reviewed `app.js` SHA256: `b62c8d8b4df0b5156074395e5d9f98add05214273b93e005e3d3413abef7f523`. Engine and content hashes remain unchanged from the accepted implementation above.

The default full timeline now sorts **all 44 game discoveries from 1982 through 2026**. It retains the original 33 and adds the eleven annual 2015–2025 discoveries. Each annual discovery uses its explicit `historyYear`; the three declared modern discoveries use 2026; other discoveries use the earliest dated year in their first cited source. This can be a preprint year or a source's explicitly documented earlier milestone. It is an archive dating convention, not a claim that the associated concept was invented then.

The intro and row captions explicitly identify cited-source years or selected publication landmarks, separate supporting source dates, and preserve prerequisite-driven gameplay. This adequately prevents the scientific ambiguity of treating later reviews, preprints or resource estimates as invention dates. Full source dialogs retain exact preprint, journal and chapter metadata.

Independent deterministic inspection confirmed 44 rows, first row Feynman/1982, last selected landmark 2026, at least one row for **every year 2015–2026**, and no missing discovery reference IDs. Scientific dating and source-retention acceptance is reaffirmed at the new app hash. No new physics, study predicates or persistence rules were introduced, so another engine test run was unnecessary for this metadata/display-only correction. Native rendering, all 44 visible rows and interaction checks remain the separate UI reviewer's scope.

### Final recorded-entry accounting and tolerance-copy correction

Reviewed final presentation candidate `app.js` SHA256 `f243469b9fb9460c89a92c4a814374059d5d2c134ab593320844c4fba4ea39a4` and metadata candidate `content.js` SHA256 `f158bfec87b44590ff3c901da2c893334accc670b83a4f5dd06be313886bc6b2`. Engine SHA remains `85da1ac8d7dff065fee62f4d40a979472ed9f8d60c618be79548fc759a765e83`.

Accepted the fix for the independent UI review's accounting finding: a completed study now labels its entry as **Recorded entry** and derives its funding/acquisition/apparatus quote from the receipt's captured preparation, shot count and mitigation settings. Changing current controls cannot rewrite the historical quote. Future unearned entries remain explicitly **New entry** quotes. Ordinary non-VQE experiments use their constant recipe and captured configuration. A focused deterministic calculation checked the captured 16,384/65,536 shot groups with mitigation on/off and confirmed the quoted acquisition multiplier matches the existing engine. This supplements the native UI review's observation; it is not another campaign test.

The 2017 and 2018 criteria now visibly state the already implemented ±1° tolerance around 65° and 20°. No numerical predicate, cost or scientific finding changed. Disabling the adjustment button for studies whose prerequisites are incomplete prevents an unavailable study from appearing actionable; it grants no evidence and changes no physics.

Final bounded scientific and presentation-code acceptance is reaffirmed at these hashes. The full 44-discovery 1982–2026 timeline and all intervening annual studies remain intact. Native rendering confirmation remains the independent UI reviewer's scope. Repeating the nine engine tests was unnecessary for these presentation-only changes.
