# Project instructions

These instructions apply to every task in this repository. Follow the user's latest instructions when they explicitly override a rule. Bias toward caution on substantial work and use judgment on trivial changes.

## Project and current state

Build **Coherent** (working title), a quantum computing incremental game inspired by Keir's [Singular Value](https://singularvalue.org/). This is a private surprise gift. Preserve the original's changing bottlenecks, research, automation, humor, and dramatic progression while creating an original, outstanding interface.

The original-game analysis and independent AI quantum design review are complete. The current research-history extension implements six chapters, 44 discoveries, 51 academic sources through 2026, 14 classical engineering advances, six finite objectives, six fresh precision requests, equipment procurement/commissioning, controller and logical recipe tradeoffs, version-two persistence, and a preserved private gift ending. The default archive retains all original foundations in the full 1982–2026 timeline. All eleven new 2015–2025 discoveries require fresh paid studies and are mandatory before the gift in new campaigns; earlier completed gifts remain earned with explicit idle opt-in. `index-3d.html` presents the evolving connected Three.js campus, mouse/keyboard zoom and a desktop toolbar with 2D view on the same row; `index.html` remains the 2D edition. `RESEARCH-HISTORY-VERIFICATION.md` records 82 intent tests, legal 44/44 simulations and bounded independent AI science/gameplay/3D reviews. `CAMPUS-VERIFICATION.md` and `CHROME-PLAYTEST.md` preserve the prior edition's 73-test and earned normal-Chrome completion at 78:19 with all 33 then-existing discoveries, four workloads and twelve finite tasks. That run does not verify a fresh full normal-Chrome campaign of the expanded edition; human enjoyment and physical-device frame rates remain unverified. `DEPTH-VERIFICATION.md` preserves the earlier depth revision's engine, browser, strategy, recovery, and independent AI review evidence; `VERIFICATION.md` preserves the short baseline. `prototypes/coherent-preview.html` remains a concept preview, separate from the game in `index.html`.

The user's first playtest reached the ending in **15:33 laboratory time, with 769 qubits and 27/30 discoveries**. They took 1h33 to finish Singular Value and found Coherent much too short and simple. The deeper revision has actual independent AI game-design and quantum consensus on its implemented mechanics and stated evidence scope. Twenty legal matrix runs take 69–82 minutes; the fastest tested comparison takes 62:10. The provisional target of about 90 minutes for a first human play and human enjoyment remain unverified. Long action gaps can reach 7:25; explicit experiments occupy a small share of the campaign. Preserve these limitations, seek the next human playtest, and do not confuse longer waiting with strategic depth.

Read the relevant files before implementing:

- `ANALYSIS.md`: original mechanics, source findings, and design lessons.
- `original-project-inventory.md`: all original advances, prerequisites, costs, and effects.
- `QUANTUM-DESIGN.md`: proposed campaign, scientific assumptions, visual direction, and implementation acceptance criteria.
- `PAPERS.md`: primary academic references and discovery mapping.
- `REVIEW.md`: independent AI review, corrections, and consensus boundaries.
- `CAMPAIGN-DEPTH.md` and `DEPTH-VERIFICATION.md`: historical depth adaptation and its remaining human-play limitations.
- `CAMPUS-DESIGN.md`, `CAMPUS-VERIFICATION.md`, `CHROME-PLAYTEST.md`: current campus mechanics, earned completion and verification boundaries.
- `RESEARCH-HISTORY-DESIGN.md`, `RESEARCH-HISTORY-VERIFICATION.md`, `RESEARCH-HISTORY-ENGINE-REPORT.md`, `RESEARCH-HISTORY-SCIENCE-REVIEW.md`, `RESEARCH-HISTORY-GAMEPLAY-REVIEW.md`, `RESEARCH-HISTORY-3D-REVIEW.md`: current full timeline, eleven mandatory fresh studies, persistence, pacing, and bounded AI/native acceptance. Earlier campus completion remains historical.
- `QUANTUM-FRONTIER-REVIEW.md`, `CAMPUS-GAMEPLAY-UI-REVIEW.md`, `CAMPUS-VISUAL-REVIEW.md`, `CAMPUS-ENDING-VISUAL-REVIEW.md`, `CAMPUS-EXPORT-REVIEW.md`: actual independent AI implementation reviews and resolved findings.
- `CAMPUS-COMPLETION-SCIENCE-AUDIT.md`, `CAMPUS-COMPLETION-GAMEPLAY-AUDIT.md`, `CAMPUS-COMPLETION-VISUAL-AUDIT.md`: final bounded AI acceptance, resolved camera/caption/guidance/focus/archive findings, and reproducible evidence scopes.
- `original-game.html`: unmodified reference snapshot; do not edit it to implement the new game.
- `analysis-tools/`: executable audits of the original game.
- `evidence/` and `source-audit.json`: original-game checks, simulated states, and browser evidence.
- `prototypes/coherent-preview.html`: saved inline HTML concept preview, not the playable game or a standalone HTML document.

## Git: always save work locally

- This is a **local Git repository. Commit only; do not push**. Do not publish, create remote pull requests, or add a remote unless the user explicitly requests it.
- Create a descriptive `feature/<short-topic>` branch before starting new work. Never implement new work directly on `main`, `master`, or `develop`. Continue on an existing feature branch only when continuing that same piece of work.
- Inspect the current branch, status, and relevant diff before changing files. Preserve unrelated user changes and concurrent work. Never discard, overwrite, or stage unrelated changes merely to obtain a clean tree.
- Always save authorized project work in this repository. Copy useful previews or deliverables created outside it into an appropriate project directory so Git can preserve them.
- Make local commits at meaningful checkpoints and before handing completed work back to the user. Stage explicit paths and inspect the staged diff. Use concise commit messages describing the actual change.
- If work is partial, save a clearly labeled checkpoint and state what remains. If a commit is blocked, report the reason; never silently claim the work is committed.
- Do not merge branches, reset history, amend someone else's commits, or force operations unless explicitly authorized. Do not invent a commit-and-push workflow for this project.
- Keep secrets, machine-local files, dependencies, and temporary scratch output out of commits. Preserve the existing `.gitignore`, including its `.todos/` exclusion.

## Engineering rules

### Rule 1 — Think before coding

State assumptions explicitly. When ambiguity affects the outcome, present the plausible interpretations and ask rather than silently choosing. Continue useful independent work while clarification is pending. Push back when a simpler approach would meet the goal. If confused, stop and name what is unclear.

### Rule 2 — Simplicity first

Write the minimum elegant code that solves the requested problem. Keep it DRY without speculative abstractions or single-use frameworks. No features beyond the authorized scope. Prefer standard browser and language capabilities to dependencies. If a senior engineer would call the solution overcomplicated, simplify it.

### Rule 3 — Surgical changes

Touch only what the task requires. Clean up only your own mess. Do not improve adjacent code, comments, or formatting or refactor working code incidentally. Match the existing style.

### Rule 4 — Goal-driven execution

Define concrete success criteria and iterate until they are verified. For game changes, identify the player-visible outcome and the resource or scientific constraint that must remain true. Do not treat following a checklist as proof of success.

### Rule 5 — Use the model for judgment calls

Use AI for classification, drafting, summarization, extraction, and design judgment. Use code for deterministic calculations, transforms, routing, retries, game-state transitions, and validation. If code can answer a question reliably, use code.

### Rule 7 — Surface conflicts, do not average them

When patterns contradict, choose the more recent or better-tested one, explain why, and flag the other for cleanup. Do not blend incompatible scientific assumptions, accounting models, or implementation conventions.

### Rule 8 — Read before writing

Read relevant exports, immediate callers, shared utilities, and existing state or save contracts before adding code. Do not assume a change is orthogonal. Ask if the reason for a consequential structure remains unclear.

### Rule 9 — Tests verify intent

Test why behavior matters, not merely its implementation. A meaningful test must fail when the relevant game rule changes incorrectly. Verify resource affordability, prerequisites, allocation tradeoffs, scientific boundaries, recovery, and campaign completion where affected. Do not add tests that just mirror trivial reversible markup.

### Rule 10 — Checkpoint significant steps

Summarize what changed, what was verified, and what remains after every significant step. Save meaningful work in local commits. If you lose track, stop and restate the current state before continuing.

### Rule 11 — Match the codebase's conventions

Conformance takes precedence over personal taste. Read the current implementation before choosing a structure. If a convention is harmful, surface the issue instead of silently creating a competing pattern. The project currently has no selected framework; do not invent one without a task-driven reason.

### Rule 12 — Fail loud

Do not say completed if required work was skipped. Do not say tests pass if checks were skipped or failed. Distinguish code checks, simulated playthroughs, actual browser observations, and unverified claims. Report uncertainties and material limitations plainly.

## Scientific integrity

- Use the reviewed superconducting hardware and surface-code campaign unless the user explicitly changes the scope. Cooling, control, readout, and layout claims must identify their architecture and assumptions.
- Cite primary academic papers with accessible DOI or arXiv links. Each research discovery must distinguish the paper's finding from the game's abstraction, dated resource estimate, or fictional future scenario. Do not fabricate papers, authors, results, or references.
- Raw physical qubit count, entanglement, or Hilbert-space size must not become a universal power, success, or revenue multiplier.
- Keep statistical sampling, systematic bias, physical errors, logical memory, logical gates, and complete workload qualification distinct.
- Syndrome detection events do not reveal an unknown data state. Do not imply arbitrary state readout, free copying of quantum information, or faster-than-light communication.
- Keep ideal patch counts separate from approximate tile budgets and full-machine costs. A protected memory slot is not automatically a universal logical processor. Increasing distance helps only within the declared qualified model.
- Keep decoder streaming throughput separate from feedback-critical latency. Account for memory, gates, factories, preparation, repetitions, footprint, and runtime without double charging.
- Label sample UI numbers and educational models honestly. A browser resource simulation is not a real fault-tolerant quantum computation, experimentally certified reliability, or proof of quantum advantage.
- Describe the existing reviewer accurately as an independent **AI** reviewer. For substantive changes to the scientific model, obtain independent quantum review, address disagreements, and record the actual conclusion before claiming consensus. Do not imply a credentialed human reviewed the game unless that happened.

## Interface and verification

- **Graphics, animation, and gameplay must be outstanding. This is a gift for Keir.** Treat all three as acceptance requirements, not optional polish. A beautiful static mockup does not satisfy the task.
- Aim for a distinctive scientific instrument that evolves with the campaign. Use appropriate pulse traces, measurement histograms, chip connectivity, syndrome events, and allocation diagrams. Avoid misleading atom decoration and unreadable counter grids.
- Make motion purposeful: experiments provide immediate visual feedback, and major breakthroughs transform the instrument through memorable, deliberate transitions. Keep routine inputs stable, maintain readable state during motion, and provide reduced-motion equivalents. Do not substitute constant decorative animation for meaningful feedback.
- Give players a clear next action and visible limiting resources. Each chapter should introduce a meaningful decision and automate or retire earlier chores where appropriate.
- Verify gameplay through complete playthroughs and pacing checks. Progress must feel earned through understandable tradeoffs, satisfying experiments, and changing bottlenecks. Avoid repetitive clicking, unexplained stalls, and upgrades that only inflate counters. The original game's audits do not establish the new game's fun or balance.
- Keep academic references available through an accessible research archive. Use concise in-game explanations; retain detailed assumptions in inspectable notes.
- Check affected desktop and mobile states visually, including narrow widths, keyboard operation, focus, reduced motion, and contrast. Functional tests alone do not prove visual quality. Do not add audio that starts without user interaction.
- Before calling the game complete, verify the acceptance criteria in `QUANTUM-DESIGN.md`, including a legal end-to-end campaign, meaningful strategy choices, recovery, and truthful save/load behavior.
- Original-game audits: `node analysis-tools/analyze-original.cjs` and `node analysis-tools/run-playthrough.cjs`. These regenerate audit evidence and verify the **original** engine; they do not test the new game's implementation.

## The surprise and source credit

Keep the gift private. Do not contact Keir, send messages to anyone, publish, deploy, or share the work without explicit user authorization. Include visible inspiration credit and a link to Singular Value. Use original writing and assets for the new game; public source availability does not by itself establish permission to reuse artwork, music, or other assets.
