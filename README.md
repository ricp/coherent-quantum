# Coherent

A private gift for Keir: an incremental game about fragile superconducting qubits, careful experiments, and a machine that can finally do useful work. Inspired by [Singular Value](https://singularvalue.org/), with original writing, graphics, instrument sounds, and game code.

## Play

Open **[index-3d.html](index-3d.html)** for the growing Three.js research campus, or **[index.html](index.html)** for the 2D instrument. No installation, account, build step, or internet connection is needed to play the checked-in game. The 3D toolkit and fonts are bundled locally. Academic links open external primary sources when selected.

For a local browser preview, run this command in the repository and open [localhost](http://127.0.0.1:8000):

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Begin with the first experiment. The next-step panel points to evidence, discoveries, and engineering constraints. Six chapters introduce calibration, noisy circuits, protected memory, logical allocation, and named workload budgets. The research archive contains all 33 discoveries and 43 primary sources, including a dated 2024–2026 frontier, available before purchase. A separate collection explains 14 classical engineering advances and their game assumptions.

Research assignments and notebook storage compete for earned trust. Notes are bounded; a full bank produces engineering designs four times faster, while spending a discovery loses that bonus. Qualified customer contracts and classical analysis stations compete for shared controller capacity. Pricing, calibration, and hypothetical fabrication versus control/cooling integration introduce new investment decisions; paid workflow tools later improve their production. These loops adapt the strategies in Keir’s original game.

Six finite measurement goals and six fresh precision requests separate angle error, sampling uncertainty and residual bias. Upfront equipment quotes trade small quick deliveries against bulk commitments; received stock still needs paid workshop commissioning. Classical controller profiles trade streaming capacity against feedback latency.

Code distance trades protection against footprint and duration, while factories compete with application slots. Three plans for the same 32-site task count workspace, depth and fresh-state supply. The ending requires an audited scientific resource scenario. Toy factor and search certificates remain optional; deliberate continued play preserves the first ending and one-time rewards. Progress advances during visible, unpaused play.

Settings provide light/dark appearance, manual save, JSON export/import, and a confirmed reset. Sound is off initially and always requires a click to start. Reduced motion follows the browser/OS preference. All controls support keyboard operation.

## Saves

The game saves to this browser's local storage under `coherent.v2`, on actions, periodically, and when leaving the page. A successful status is shown only after storage accepts the save. Export JSON to move a laboratory between browsers or keep an independent backup. Files opened directly and HTTP pages may use different storage; use export/import to move between them.

Earlier `coherent.v1` runs are preserved separately and can be exported through Settings. Their short-campaign economy is not migrated into the deeper campaign. Starting or resetting the new laboratory does not delete that earlier run.

Hidden, closed, paused, and chapter-transition screens receive no progress. Reopening resumes the recorded state without offline catch-up. Imported paused games remain paused. Earlier valid version-two runs offer an explicit, idle campus opt-in; old balances and evidence remain intact and no new task rewards are inferred. Invalid imports leave the current laboratory unchanged; an unreadable stored save is preserved until an explicit import or reset replaces it. If storage is unavailable, the game remains playable in memory and clearly asks for an export.

## Scientific scope

This is an educational economy, not hardware performance prediction or a quantum advantage demonstration. The two-spin tutorial and toy certificates are actually computed classically in the browser. The larger Ising and Hubbard workloads are explicitly labeled resource scenarios; they do not manufacture a magnetization or electronic energy result.

Read [MODEL.md](MODEL.md) for equations and assumptions, [PAPERS.md](PAPERS.md) for the bibliography, and [REVIEW.md](REVIEW.md) for the independent **AI** scientific review and its limits. [QUANTUM-DESIGN.md](QUANTUM-DESIGN.md) records the design and acceptance criteria. The original reference snapshot and audits remain separate from this implementation.

## Verify

```sh
npm test
node tests/campus-playthrough.cjs
node tests/contrast.cjs
```

The deterministic engine tests cover intent: real costs and prerequisites, bounded storage and reversible trust assignments, the full-bank design tradeoff, delivered revenue, automation opportunity costs, conservation of apparatus duty, construction support, scientific distinctions, footprint/decoder tradeoffs, degraded-workload recovery, and malformed imports. Legal adaptive campaign policies check feasibility and save roundtrips. They do not establish human enjoyment or a measured human play time.

`evidence/coherent/` and [VERIFICATION.md](VERIFICATION.md) preserve the short baseline. The user's first run finished in 15:33 laboratory time with 27/30 discoveries, versus 1h33 for Singular Value. The deeper revision on `feature/campaign-depth` has independent AI game-design, quantum, and code-review acceptance. Its 20 legal matrix runs finish in 69–82 minutes; the fastest tested comparison takes 62:10. These are automated main-ending routes, not measured human playtimes. Long action gaps still reach 7:25, and explicit experiment jobs occupy only a small share of the run. [DEPTH-VERIFICATION.md](DEPTH-VERIFICATION.md) records the current checks, comparisons, recovery evidence, and limitations; [CAMPAIGN-DEPTH.md](CAMPAIGN-DEPTH.md) explains the adaptation. The provisional 90-minute first-human-play target and enjoyment remain unverified.

The research-campus revision is documented in [CAMPUS-DESIGN.md](CAMPUS-DESIGN.md) and [CAMPUS-VERIFICATION.md](CAMPUS-VERIFICATION.md). Independent **AI** implementation reviews cover [quantum models](QUANTUM-FRONTIER-REVIEW.md), [gameplay controls](CAMPUS-GAMEPLAY-UI-REVIEW.md) and [3D presentation](CAMPUS-VISUAL-REVIEW.md). [CHROME-PLAYTEST.md](CHROME-PLAYTEST.md) distinguishes the earned normal Chrome campaign from isolated QA and accelerated engine simulations. The normal Chrome campaign completed at **78:19**, with all **33 discoveries**, all **four workloads**, and all **six frontier objectives and six precision requests**, using earned resources and ordinary controls. This agent was familiar with the implementation; first-human enjoyment and physical-device performance remain unverified. Final download, paid-job preservation and ending presentation checks are recorded in [CAMPUS-EXPORT-REVIEW.md](CAMPUS-EXPORT-REVIEW.md) and [CAMPUS-ENDING-VISUAL-REVIEW.md](CAMPUS-ENDING-VISUAL-REVIEW.md).

## Structure

Static HTML, CSS, and JavaScript. `content.js` holds campaign data and citations; `game.js` is the DOM-free engine; `app.js` binds controls and persistence; `instrument.js` draws the original canvas scenes. `instrument-3d.js` presents the same engine as an original procedural campus with eight inspected stations, whole-campus and top cameras. Three.js is vendored under its [MIT license](assets/three/LICENSE.txt), with a full 2D fallback. Browser APIs supply audio, dialogs, downloads, and storage. Node's built-in test runner supplies engine verification. There are no external runtime requests or analytics.

To regenerate the checked-in 3D bundle and entry page after relevant source changes, run `npm ci` and `npm run build:3d`. No build is required just to play.

Instrument Serif is bundled under its [SIL Open Font License](assets/OFL.txt). This repository stays local: commit only, no push, publication, or contact with Keir without the user's instruction.


The final completion polish is recorded in [visual](CAMPUS-COMPLETION-VISUAL-AUDIT.md), [gameplay](CAMPUS-COMPLETION-GAMEPLAY-AUDIT.md) and [science](CAMPUS-COMPLETION-SCIENCE-AUDIT.md) audits. It improves whole-campus framing, removes stale imported milestone captions, surfaces qualified workload grants, fixes offscreen research focus, and clarifies source dates. Reproducible targeted audit tools live under `analysis-tools/`; generated QA imports stay outside Git.
