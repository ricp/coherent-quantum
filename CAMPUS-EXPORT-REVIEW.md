# Native export and final-Audit acceptance

Independent AI gameplay reviewer, 5 October 2026. Tested only the isolated Chromium session `campus-gameplay-e9cc742f9661` at the private QA origin `127.0.0.1:5586`. The user's Chrome, save, Git operations and unrelated files were not touched. Public-action earned QA fixtures were imported through Settings; these are automated engine fixtures, not human campaign evidence.

## Actual download verification

Both controls produced real browser downloads through their normal click handlers, captured with the documented isolated `agent-browser download` command.

| Download | Observed file | Verification |
| --- | --- | --- |
| Export save JSON | `/tmp/campus-native-export.json`, 13,115 bytes | Parsed with the current strict `G.parseSave`; canonical serialization exactly matches the frozen legally earned 90:16 ending fixture. Seed, balances and history were not adjusted. |
| Save run postcard | `evidence/campus/campus-native-postcard.png`, 96,325 bytes | Valid PNG signature, 1200×720 IHDR, opened and visually inspected. Text is readable; dedication, 90m16s, 33/33 discoveries, 5,145 physical qubits and distance3 match the historical milestone. Visible inspiration credit and the modeled-result caveat are present. |

Download SHA-256:

```
JSON 350c37c71e22c27c8f27349269b39b382c7a421f7aaa6f45528334134ec6f288
PNG  b9e7af1bda52f2a8318aa8460767cec1e201f10091d12663dc0b1ca3849dcaf1
```

The JSON is a scratch QA input and should not be committed as a user save. The PNG is synthetic earned-fixture evidence, not the user's personal run postcard. Download handling and the OS save experience in the user's normal Chrome remain separate from this isolated browser check.

## Confirmed silent-loss interaction

Before the correction, a legal public-action policy deferred Audit, completed Dynamics, then started a Molecule schedule. Starting Molecule paid 450 funding and 192 rehearsal credits. Native import showed its active captured job and an enabled Audit card. The card only stated that completing a scientific scenario unlocks the ending; it did not disclose discarding an in-flight paid job.

After Resume and native Audit purchase, `checkEnding()` removed the Molecule job, marked the campaign ended and retained only Dynamics as complete. Its journal had the scheduled Molecule entry followed by final research and the ending, with no cancellation explanation. This is a real silent-loss interaction defect. It does not block the main campaign and does not change the quantum model, but the paid job should not vanish as an undisclosed side effect of final research.

## Agreed surgical correction

The parent and independent AI quantum reviewer accepted a narrow readiness guard: refuse Audit while any apparatus job is active **only if** that purchase would end the ordinary campaign, meaning a Dynamics/Molecule scientific workload is already complete and the laboratory is not in its epilogue. Its reason tells the player to finish or explicitly cancel the current job, whose entry costs remain spent.

Implemented one condition in `game.js::projectStatus`. Existing `buyProject` checks readiness before spending or mutating anything. No refund system, confirmation modal, state field, migration, physical model, workload budget or ending-snapshot change was added. Harmless early Audit research and unrelated research remain available during jobs. The broader proposal of blocking every Audit during every job was rejected in favor of this narrower scope.

Five new intent regressions in `tests/campus-ending.test.cjs` verify:

- A paid second scientific workload survives rejected final Audit, with the complete serialized state unchanged.
- A paid ordinary VQE trial likewise retains its captured measurement and serialized state; natural completion then permits Audit.
- Natural completion of the second scientific workload admits Audit and retains the first executed compact Dynamics recipe.
- Explicit cancellation does not refund its funding or credits and makes finishing a deliberate, recorded choice.
- Audit before the first scientific completion and unrelated Factoring research retain their active jobs and remain purchasable.

The focused five tests passed. The complete suite passed **73 tests, zero failures, zero skips**. The independent AI quantum reviewer independently reran the same 73 tests and accepted the actual one-line diff and all five regressions. Initial new-test fixture errors were corrected to conform to the existing workshop prerequisite and the existing ordinary-job `workload:false` contract; no engine changes were made to accommodate those fixture errors.

## Independent native retest after the correction

The unchanged legal paid-Molecule fixture was reimported after reloading the final source. Audit was disabled with the explicit finish/cancel/entry-cost reason, while the original 28-apparatus-second Molecule job remained captured at progress0 and Dynamics history remained complete.

**Natural finish:** the isolated reviewer resumed the job and allowed it to run normally. The UI showed both Dynamics and Molecule completed and Audit enabled. Native Audit purchase then ended the campaign with both results retained, `job:null` and the first balanced Dynamics record preserved.

**Explicit cancel:** the same paused fixture was imported again. The public button said `Cancel schedule · costs stay spent`. Clicking it left the exact 12,496.006787121212 funding and 1,808 credits unchanged, cleared the job and added `Entry costs are not refunded` to the journal. Audit became enabled. Its native purchase ended the campaign with only the completed Dynamics result; it did not invent the cancelled Molecule result.

The CLI's default 25-second text wait expired while the natural declared schedule was still running; later DOM inspection observed natural completion before the Audit action. No job was accelerated or awarded by test code. This wait timeout is an automation-duration limitation, not an engine failure.

## Acceptance and limits

The parent and independent AI gameplay/quantum reviewers reached consensus on the narrow correction and its evidence boundaries. Actual JSON and postcard downloads, native refusal, natural completion and explicit cancellation all passed the scoped review. No unresolved blocking defect remains in this interaction. The parent's complete normal-Chrome campaign and human enjoyment are separate evidence; the long audit-delay fixture clock is not a pacing benchmark.

Final reviewed SHA-256:

```
game.js                        9754289c53199152b2c3513a7076f0cdf0898e78f2a8849e6635d286e09da90f
tests/campus-ending.test.cjs    694e8486b7029f809f4bff71d186aeae77c13b90693d5ac12400ced145b527f1
app.js                         977976b1ba6c4102c66d484797d7ee04d0a7a23f803a3c415d726056cb4da02e
instrument.js                  20e3b9578f1cec5210f693ce60e9eb172aac800f8ac4568e60c5b20a847d14f1
```

Scratch full-suite output: `/tmp/campus-ending-full-tests.txt`. Only `game.js` and the new intent-test file were edited for this follow-up. The parent owns the local checkpoint commit and copying review evidence into the repository. The isolated QA browser and its owned5586 server were closed after acceptance; the user's normal Chrome remained untouched.
