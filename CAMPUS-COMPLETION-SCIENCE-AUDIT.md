# Completion audit: recent research and scientific wording

Independent AI quantum reviewer, 5 October 2026. Read-only inspection of the final `content.js`, `app.js`, `game.js`, `PAPERS.md`, `MODEL.md` and the two page shells on `feature/quantum-research-campus`, followed by an isolated native archive/dialog check. This reviewer changed no project source, Git state or user Chrome/save. The audit checks the research requirement and wording; it does not reopen the already accepted numerical model or claim another campaign, hardware-performance measurement or human playtest.

## Bounded verdict

The release satisfies the declared requirement to connect verified recent research through 2026 to meaningful optional gameplay while distinguishing paper findings from authored scenarios. The three modern discoveries produce actual controller, maintenance and schedule decisions. They do not merely add citations. No substantive scientific implementation blocker was found. The three minor presentation/reading consistency findings below were corrected and independently checked without changing physics, prices, state or schema.

## Actual inventory and archive behavior

A deterministic query of the current content gives **33 unique discoveries: 30 foundation discoveries and three optional modern studies**, and **43 primary papers/manuscripts**. Every discovery's citation ID resolves. The primary dates range from 1982 to 2026; none is dated beyond the review year.

The actual archive helper takes the greatest four-digit year in each paper's date string. The Frontier collection selects years at least 2024 and sorts descending. In the current curated content it contains **11 entries**, in this order: Q37, Q38, Q42, Q43 (2026); Q09, Q21, Q40 (2025); Q28, Q31, Q39, Q41 (2024). The latest manuscript is Q43, submitted **24 September 2026**. The collection is therefore visibly current; the historical 2014 VQE introduction is not a literature cutoff. `PAPERS.md` explicitly describes a selected bibliography rather than an exhaustive literature survey.

Both page shells expose **Frontier · 2024–2026**, the full archive and source-reading controls. `paperNotes` displays **What the source supports** separately from **What this game abstracts** for all seven new entries. Discovery dialogs additionally identify prices, timing and numerical bonuses as educational abstractions. In-game station readings connect control to Q37/Q41, cooling to Q38, planning to Q40/Q43 and memory topology to Q42.

## Modern mechanics remain consistent with the declared model

| Discovery | Actual references and unlock | Scientific boundary retained |
| --- | --- | --- |
| `controller2026` | Q37/Q41, after decoder; 250 funding, 600 effort, 60 designs; balanced, streaming and response profiles | Streaming throughput and feedback latency remain separate. Authored factors are `(1,1)`, `(2,1.5)` and `(.75,.5)`. Current physical noise, logical memory/operation error and accepted-state error do not receive a profile bonus. Atomic jobs lock the profile. |
| `adaptive2026` | Q38, after threshold and current protected-memory qualification; 1,400 funding, 4,200 effort, 400 designs | The selected maintenance requirement decreases 10%; calibration still consumes time and the drift floor remains. The experiment's conditional stability factor is not copied into every device metric. |
| `state-readiness` | Q39/Q40/Q43, after accounting; 1,800 funding, 6,000 effort, 600 designs; alternative plans for the same 32-data-site task | Balanced remains 32 registers/depth200/4,800 operations/192 states. Compact is 32/depth320/4,800/128. Parallel is 32 data plus eight workspace/depth160/6,400/256. Counts are authored resource scenarios, not compiled algorithms or paper-derived estimates. Workspace, waiting, gates, states, repetitions and complete time remain accounted. |

These declarations match `MODEL.md` and the current engine/content. The already accepted tests and probes establish profile and schedule crossovers, atomic reservations, fresh finite evidence and accounting. This completion audit does not reinterpret those fixtures as a new human playtest. Cultivation retry simulation and a heavy-hex replacement architecture are expressly outside this release; Q42 is an inspectable alternative comparison rather than an undisclosed patch multiplier.

## Primary metadata refreshed

Fresh primary-page checks found no bibliographic correction needed for Q37–Q43:

- Q37's [arXiv record](https://arxiv.org/abs/2410.05202) confirms the title, authors, 7 October 2024 submission and distinction between per-round decoding throughput and complete response. The publisher search result matches the linked [2026 journal article](https://doi.org/10.1038/s41467-026-73331-6). Direct publisher fetches were intermittently unavailable; the exact journal date remains supported by the previously saved full primary review, rather than inferred from the DOI.
- Q38's [publisher article](https://doi.org/10.1038/s41586-026-10759-2) freshly confirms publication on 8 July 2026 and a conditional injected-drift control result. The game describes its own bounded maintenance rule separately.
- Q39's [arXiv record](https://arxiv.org/abs/2409.17595) confirms 26 September 2024 submission and lists no journal reference on the inspected landing page. Its resource study is correctly distinguished from hardware certification.
- Q40's [arXiv record](https://arxiv.org/abs/2512.13908) confirms submission on 15 December 2025 and lists no journal reference. It is an experimental preprint, not a claimed 2026 peer-reviewed publication. Retained-output fidelity and acceptance yield remain different quantities.
- Q41's [publisher article](https://doi.org/10.1038/s41586-024-08148-8) confirms 20 November 2024 publication and explicitly distinguishes computation throughput from final-answer latency. The current finding does not grant learned-decoder accuracy and speed together.
- Q42's [publisher article](https://doi.org/10.1038/s41467-026-76090-6) confirms publication on 29 July 2026. The current alternative-layout wording does not substitute its connectivity or schedule for the game's native ideal patch model.
- Q43's [arXiv record](https://arxiv.org/abs/2609.29267) confirms its four authors, exact title and 24 September 2026 submission. Its preparation/runtime estimates are conditional; the game does not present a new superconducting cultivation experiment or transfer its headline percentage universally.

The earlier source review and fresh checks concern bibliographic metadata, relevant findings and implementation scope; they are not replication of the experiments.

## Concrete minor findings and surgical remedies

1. **Duplicated Q40 publication wording.** `content.js` gives Q40 both `type: "Experimental preprint"` and `date: "preprint 2025"`. `app.js::renderResearch` renders type and date in adjacent paragraphs; `paperNotes` renders both in its metadata line. This is the only entry repeating “preprint” in both fields. It is data redundancy, not a generic formatter failure. Change only Q40's type to **Experimental cultivation study** (or Experimental study), retaining its preprint date. No new formatter or publication-status inference is needed. The primary record supports that classification.

2. **Q09 correction is documented but absent from the in-game source links.** `PAPERS.md` already records its 2026 author correction; `content.js` still exposes only the original DOI and arXiv links. The freshly inspected [publisher correction](https://doi.org/10.1038/s41586-026-10559-8), published 28 April 2026, fixes Fig.3a repetition-code and reference-marker labels. It is not a new gate-stack result. Add a clearly labeled **2026 author correction** link to Q09 and, if useful, a short finding note. Keep the original 2024/2025 paper date distinct; the correction is not another paper in the 43-entry count and must not be promoted as new quantum performance.

3. **Discovery-row years use a different convention from the paper archive.** The paper/frontier archive uses latest source dates, but the discovery archive shows the first year of the first cited source. Consequently controller2026 shows 2024, adaptive2026 shows 2025, and state-readiness shows 2024 beside their 2026 titles. Those are real historical source years, so this is a presentation consistency issue, not fabricated research. After discussing the scope with the lead, we reached consensus on one general convention: every discovery row displays the newest year among all its cited sources, using the existing source-year helper. The archive will explicitly explain, **“Discovery dates show the newest cited source; your laboratory follows prerequisites.”** This labels bibliography recency, not the historical invention date or the date of an in-game unlock. A deterministic query finds 18 of 33 rows change under this rule, including accounting (2019 to 2025) and the three modern studies (all to 2026); no citation list is empty or invalid. Full preprint/journal date strings remain in source dialogs, and the historical teaching order remains governed by prerequisites. This single convention supersedes an earlier optional-only remedy and requires no progression or scientific-model change.

The exact Q09 correction remedy is also agreed: append a clearly labeled DOI link, preserve its original preprint/journal date, and add a short finding sentence describing the Figure 3a repetition-code and reference-label correction. The primary publisher record supports that description; it does not imply a new memory or gate result. Q40's agreed classification is **Experimental cultivation study**, with its preprint 2025 date retained. The lead implemented these changes, and the final read-only inspection and native checks below confirm them.

## Final actual-source and native acceptance

All three surgical fixes are accepted on the implemented source. The discovery formatter uses the newest year across every cited source. Both HTML shells explicitly say **“Discovery years show the newest cited source; your laboratory follows prerequisites.”** Q09 retains **“preprint 2024, Nature volume publication 2025”**, adds the correctly labeled author-correction DOI, and explicitly says the correction is not a new performance result. Q40 now uses the agreed experimental-cultivation classification without repeating “preprint.” Neither the paper count nor the scientific model changed.

Final independently checked SHA-256 values:

| File | SHA-256 |
| --- | --- |
| `content.js` | `add0070e1449aa74f8cdc8b74115ccba84fa378d4ae3ae86ee3080a992b434fb` |
| `app.js` | `db007efa3808fc90aa0781c565411ea6adf1fac31bd1ec61e92e01d88de402f7` |
| `index.html` | `153d883f3f2350225fc23e516be43365961e3b568face27f6c6175ed02f23405` |
| `index-3d.html` | `feba654fae1f023deb5bf8fc20e3309e63489ec46a4ec4671550a6e0a04daf35` |

Using the agent-browser skill in a new isolated Chromium session, I checked the actual 3D page's research archive and dialogs at **1440×1000** and **390×844**. This was a pre-start reading/interaction check at LAB00:00, not another campaign. Ordinary clicks, search, Escape and scrolling were used; no engine calls, state injection or earned-resource modification occurred. The user's active Chrome session and save were not touched.

Native observations confirm **33 discovery rows**, **43 All Papers rows** and **11 Frontier rows**, including the exact frontier order recorded above. All three modern discoveries visibly show **2026**; ordinary `2026` discovery search returns those three. The controller, adaptive-control and state-readiness dialogs show separate **What the source supports** and **What this game abstracts** sections. Q09 visibly exposes its original date and exact correction link. Q40 visibly displays **“preprint 2025 · Experimental cultivation study”** once. At narrow width the page's scroll width is 390px and the dialog's client/scroll widths are both 364px; text wraps, nested scrolling works and Escape closes the dialog. Inspected screenshots show no horizontal overflow or overlapping controls. No uncaught browser errors were reported during the scoped checks; the earlier development-origin console contains its ordinary Live Reload log.

Most archive/date/correction captures were taken on `http://dev.localhost:5500/index-3d.html`. A concurrent development-server reload reset the review's pre-start view during a search action. This was not classified as a game defect. I finished the remaining study dialogs on a temporary read-only server at `http://127.0.0.1:5512/index-3d.html`, then refreshed the final frozen source and reconfirmed 33/43/11 and all three 2026 row dates. The isolated browser and temporary server were cleanly closed.

Screenshot evidence is preserved under `evidence/campus/completion-science/screenshots`, with an explicit accepted-capture list in `evidence/campus/completion-science/evidence-manifest.json`. The file `archive-desktop-modern-search.png` captured the development reload's laboratory view and is deliberately excluded from archive evidence. The manifest prevents that incidental frame from being presented as a passed archive check.

No further scientific or archive correction remains. The lead's final 73-test run, complete normal Chrome campaign, numerical comparisons, contrast measurements and other agents' broader interface checks remain their separately recorded evidence; this report does not claim to have repeated those checks.

## Acceptance boundary

The research-through-2026 requirement and finding-versus-game distinction are accepted in the current scientific scope. The source archive, modern unlocks and model boundaries agree, and the affected archive/dialog fixes passed the read-only actual-source and native checks described above. No further scientific or archive work is required for this accepted release scope. Human enjoyment, device performance and the lead's actual Chrome campaign evidence remain separate from this completion audit.

## Final source addendum: focused-action scrolling

The lead subsequently corrected a narrow-screen focus-visibility defect. I independently read the complete `app.js` diff against local checkpoint `c395f42`: only two `run-experiment` handler scroll sites changed. A ready workload opportunity now scrolls its selected ordinary workload button into the center before focusing it with `preventScroll`; the discovery path likewise centers the exact enabled discovery button, with the existing section fallback when no enabled target exists. These changes select the same targets and preserve the existing qualification checks, research priority, player choice and ordinary scheduling actions. They do not start a workload, buy research, change configuration, spend resources or award completion.

The latest independently verified `app.js` SHA-256 is **`3326544d555bc35ef42b714fcacd016634a9770c7c5dfacc106f25f575c60c43`**; it supersedes the app source hash in the native-capture table above. `content.js` remains **`add0070e1449aa74f8cdc8b74115ccba84fa378d4ae3ae86ee3080a992b434fb`**. The archive formatter, source metadata, paper dialogs and scientific model are unchanged, so the completed native archive evidence and scientific acceptance still apply. This addendum is a scoped source review; the lead and game UI reviewer's separate native focus-visibility checks establish that UI outcome. No repeated archive matrix, new scientific model check or new campaign is claimed.
