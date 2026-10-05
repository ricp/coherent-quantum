# Historical-study engine handoff

Independent implementation handoff, 5 October 2026. Engine source candidate SHA-256: `85da1ac8d7dff065fee62f4d40a979472ed9f8d60c618be79548fc759a765e83`.

## Implemented contract

New laboratories begin with `researchRevision:1,researchResults:[]`. All eleven 2015–2025 discoveries require their own fresh successful paid authored study, followed by a separately priced purchase. Purchases total **15,950 funding, 28,800 effort and 4,090 designs**, in addition to ordinary experiment acquisition charges. They introduce no physical-error reduction, universal output multiplier or separate study grant. Ordinary first experiment qualification and factory rehearsal rules continue; their existing payments are not described as new study rewards.

`projectStatus('audit').available` and `.ready` are false until all eleven annual purchases are owned in the revised programme. `checkEnding` and workload completion also require those eleven purchases. This guards automatic as well as research-triggered endings. The last annual purchase after a legacy Audit cannot discard a paid apparatus job; finish or explicitly cancel it first.

`studyStatus(s,id)` returns `{project,available,complete,ready,reasons,receipt,recipe}`; `startStudy(s,id)` pays the existing experiment recipe cost and captures its study ID on the existing job. VQE preparation, samples and mitigation use the existing immutable captured job settings. A changed live plan cannot rewrite those samples. Memory, gates and factory studies truthfully use the current completion context, matching ordinary engine experiment semantics, and record the inputs needed to recompute that context.

`researchStatus(s)` returns `{enabled,ready,reasons,completed,purchased,total}`. `completed` counts fresh receipts; `purchased` counts owned annual discoveries; `ready` is eligibility to enter, not eligibility to finish. `enterResearchProgramme(s)` requires an idle expanded campus that is not showing an ended campaign. Existing completed gifts require explicit Continue first. Importing a complete old v2 state with both new fields absent creates revision zero and no inferred annual evidence. Partial new blocks fail. Continued postgame research keeps the immutable first ending record.

## Authored criteria and scientific boundaries

- 2015: distance-3 qualified memory; a surface-code teaching scenario, not reproduction of Kelly's repetition experiment.
- 2016: qualified gate stack and feedback at most 20 microseconds; an authored comparison budget.
- 2017: 65-degree known preparation, mitigation, at least 16,384 samples per Pauli group; actual captured ground-reference interval must pass.
- 2018: 20-degree known preparation, the same sample floor, ansatz error above 0.5, statistical bound at most 0.12 and ground interval unqualified. Study success intentionally identifies a precise unsuitable preparation; it does not reproduce barren-plateau training.
- 2019: exactly one qualified factory with at least two application slots.
- 2020: currently qualified memory with calibration covering maintenance and planned service at most 50%.
- 2021: distance-3 qualified gates; no inference that a repetition-code paper proves a universal gate stack.
- 2022: qualified memory, feedback at most 40 microseconds and zero allocated factories. The receipt honestly records whether the separate 20-microsecond comparison passes. It never requires an irreversible decoder upgrade to be undone.
- 2023: distance-5 qualified memory and at least twelve application slots.
- 2024: qualified gates, at least 20% streaming headroom and feedback at most 20 microseconds; headroom is not decoder-accuracy improvement.
- 2025: a qualified factory, sufficient slots for the currently selected Dynamics plan, factory lane no slower than gate lane. This is a partial readiness study; full workload risk, repetition, precision and runtime remain separate.

All received VQE groups, energy, exact reference, uncertainty, bias and ansatz claims are recomputed on import. Non-VQE context values, available configurations, ownership/prerequisites and current numerical criteria are validated. Duplicate, unknown, partial, unavailable and chronologically contradictory annual receipts fail. A purchased annual discovery without its receipt fails. Active jobs validate study identity, experiment and captured VQE plan, and cannot simultaneously claim an objective or precision request.

## Verification

`npm test`: **82 passed, zero failed, zero skipped**, including nine new intent tests. Prior isolated fixtures explicitly use the pre-extension revision and foundation-only discovery set so their original scientific/economic/save contracts remain tested. No blanket tests were skipped.

New tests cover mandatory next-step availability and ending, fresh acquisition/purchase costs, ordinary historical evidence insufficiency, cancelled/failed costs, once-only purchase/evidence, immutable VQE settings, deterministic pause/restore, intentionally unsuitable ansatz, strict numerical and prerequisite imports, irreversible decoder-3 compatibility, legacy completed gifts and opt-in epilogue, paid-job preservation at the last purchase, and the rehearsal-credit ceiling.

A relevant existing defect was exposed: factory completion at 2,000 stored credits added 24 and made the resulting save invalid. Completion now clamps to the established 2,000-credit ceiling; the regression demonstrates normal paid completion remains reloadable.

Six paired deterministic public-action campus runs are recorded in `/tmp/history-pacing-matrix.json` (source scope `a37ea3b…`, immediately before the final availability-only fix). Each pair uses identical policy and seed; the comparison parses a synthetic empty pre-extension schema, rather than altering a user save. Local policy: baseline **85:32**, revised **91:30–92:06**. Bulk policy: baseline **75:18**, revised **83:54**. Additional laboratory time: **5:58–8:36**. All six revised runs earn all eleven receipts/purchases, six objectives, six precision requests and the scientific ending. All intermediate earned snapshots restore. Annual study occupancy is 220–221 seconds; longest counted successful-action gap is 6:37 local and 3:25 bulk. Seed 42 local retries one existing final-check objective; no annual study failed. These are scripted policies, not optimal-play, browser, blind human or enjoyment proof. Final-source ordinary local/bulk tests and full suite preserve these completion outcomes after the availability fix; the six-run matrix is not silently relabeled to a source it did not execute.

`/tmp/legal-before-history2015.json` through `/tmp/legal-before-history2025.json` are legal public-action pre-study fixtures for isolated native UI QA. `/tmp/legal-history-ending.json` is the corresponding bulk completion at 83:54 with 41 discoveries; three independent optional foundations remain outside that policy. These snapshots are QA-only, not the actual user's Chrome save; do not commit raw saves or import them into the user's run.

## Scope left to root

Root owns discovery metadata, sources, archive/date layout, study instructions, primary next-step navigation, native UI validation, evidence copying, documentation and local commits. Independent quantum AI reviewer accepted the actual engine model and nine intent tests; gameplay AI reviewer is still reviewing. Do not claim integrated or human enjoyment acceptance until those remaining checks are documented.
