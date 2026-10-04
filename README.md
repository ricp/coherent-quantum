# Coherent

A private gift for Keir: an incremental game about fragile superconducting qubits, careful experiments, and a machine that can finally do useful work. Inspired by [Singular Value](https://singularvalue.org/), with original writing, graphics, instrument sounds, and game code.

## Play

Open **`index.html`** in a modern browser. No installation, account, build step, or internet connection is needed to play. Academic links open external primary sources when selected.

For a local browser preview, run this command in the repository and open [localhost](http://127.0.0.1:8000):

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Begin with the first experiment. The next-step panel points to evidence, discoveries, and engineering constraints. Six chapters introduce calibration, noisy circuits, protected memory, logical allocation, and named workload budgets. The research archive contains all 30 discoveries and 36 primary sources, available before purchase.

Funding and abstract research effort accumulate during visible, unpaused play. Automatic calibration uses apparatus time; service contracts trade research effort for funding. Later, code distance trades protection against footprint and duration, while factories compete with application slots. The ending requires an audited scientific resource scenario. Toy factor and search certificates are separate achievements.

Settings provide light/dark appearance, manual save, JSON export/import, and a confirmed reset. Sound is off initially and always requires a click to start. Reduced motion follows the browser/OS preference. All controls support keyboard operation.

## Saves

The game saves to this browser's local storage under `coherent.v1`, on actions, periodically, and when leaving the page. A successful status is shown only after storage accepts the save. Export JSON to move a laboratory between browsers or keep an independent backup. Files opened directly and HTTP pages may use different storage; use export/import to move between them.

Hidden, closed, paused, and chapter-transition screens receive no progress. Reopening resumes the recorded state without offline catch-up. Imported paused games remain paused. Invalid imports leave the current laboratory unchanged; an unreadable stored save is preserved until an explicit import or reset replaces it. If storage is unavailable, the game remains playable in memory and clearly asks for an export.

## Scientific scope

This is an educational economy, not hardware performance prediction or a quantum advantage demonstration. The two-spin tutorial and toy certificates are actually computed classically in the browser. The larger Ising and Hubbard workloads are explicitly labeled resource scenarios; they do not manufacture a magnetization or electronic energy result.

Read [MODEL.md](MODEL.md) for equations and assumptions, [PAPERS.md](PAPERS.md) for the bibliography, and [REVIEW.md](REVIEW.md) for the independent **AI** scientific review and its limits. [QUANTUM-DESIGN.md](QUANTUM-DESIGN.md) records the design and acceptance criteria. The original reference snapshot and audits remain separate from this implementation.

## Verify

```sh
node --test tests/game.test.cjs
node tests/playthrough.cjs --write-evidence
node tests/contrast.cjs
```

The deterministic engine tests cover intent: real costs and prerequisites, scientific distinctions, footprint/decoder tradeoffs, degraded-workload recovery, malformed imports, and legal complete campaigns. Automated compact and wide strategies each complete all six chapters and all 30 discoveries in 1,078 simulated laboratory seconds. A separate test completes the electronic workload ending. These are legal engine playthroughs, not human fun ratings or browser recordings.

`evidence/coherent/` contains exported legal chapter states, pacing records, rendered scene captures, and browser interaction evidence. Later-scene visual QA uses those states through the ordinary save import control; it does not establish a second human playthrough.

See [VERIFICATION.md](VERIFICATION.md) for the baseline acceptance evidence and its limits. The user's first run finished in 15:33 laboratory time with 27/30 discoveries; they found this much shorter and simpler than Singular Value. Campaign depth and pacing are being revised from that baseline.

## Small by design

Static HTML, CSS, and JavaScript. `content.js` holds campaign data and citations; `game.js` is the DOM-free engine; `app.js` binds controls and persistence; `instrument.js` draws the original canvas scenes. Browser APIs supply audio, dialogs, downloads, and storage. Node's built-in test runner supplies engine verification. There are no runtime dependencies or analytics.

Instrument Serif is bundled under its [SIL Open Font License](assets/OFL.txt). This repository stays local: commit only, no push, publication, or contact with Keir without the user's instruction.
