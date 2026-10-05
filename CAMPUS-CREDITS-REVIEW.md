# Credits review — accepted

2026-10-05. Independent AI review, isolated native file-page QA; no source/Git edits or access to the active player at localhost:5634 or user server at dev.localhost:5500.

Reviewed source hashes:

- `index.html`: `0e753b921f8cf773e5eba46c0827f2d03fe08efcf35daa04a8a295c7dfb62853`
- `index-3d.html`: `167f097dcaa33e0f2b378c0a7e550aeef423ff5d969533a0f002f8aebd25c9ff`
- `instrument.js`: `3ab67ff1762ca2e943c554c19dae0d9a45b146b80a3ead7b988d5f1b5f997c66`
- Final generic filename source, `app.js`: `25bcafe6db2f5eda9254b9e60ccabddcc9e4fb64590a2c5eaf9bba83057d989d`

Both native editions passed desktop 1600px, 375px and 320px footer checks. All six captures were inspected. The credits stay within the viewport, wrap cleanly when needed and do not cause horizontal document overflow. The visible ending/footer contains no “For Keir”. The neutral ending sentence remains legible at narrow widths.

Each footer has separate accessible links to the exact requested URLs:

- Paperclips: `https://www.decisionproblem.com/paperclips/index2.html`
- Singular Value: `https://singularvalue.org/`

Both anchors retain `_blank` and `noopener noreferrer`. The links were inspected, not followed into external websites.

Both editions exported their actual postcards through the public Save button using a parser-valid isolated ending fixture. The PNGs are 1200×720 and byte-identical (SHA256 `176e03680a4aa3a930361446f706c394c0d4aa42843dc310b3f8e265fa5fe739`). The neutral title, six-stage graphic, stats and two bottom credit lines are visible with no text overlap or clipped edges. The Paperclips line at baseline648 and Singular Value line at670 remain inside the border; the left scientific qualification text has ample horizontal separation.

The reviewer identified the old `coherent-for-keir.png` download filename. The parent changed it to `coherent-run.png`. The final entry page was reloaded and its public download completed again; the generic name is verified in the final source. The CLI writes to the reviewer's explicit artifact path, so no claim is made that its saved QA basename proves the browser's suggested basename.

Browser error list: empty. This reversible copy/layout change did not alter the engine; no engine tests or new campaign were run for this review. The fixture's stats are QA material, not an earned completion by this reviewer. Human preferences and physical-device rendering are outside this bounded check.

Artifacts to preserve:

- `/tmp/campus-credit-review-results.json`
- `/tmp/campus-credit-footer-2d-1600.png`
- `/tmp/campus-credit-footer-2d-375.png`
- `/tmp/campus-credit-footer-2d-320.png`
- `/tmp/campus-credit-footer-3d-1600.png`
- `/tmp/campus-credit-footer-3d-375.png`
- `/tmp/campus-credit-footer-3d-320.png`
- `/tmp/campus-credit-postcard-final.png` (final export; the 2D and3D predecessor exports are visually and byte-identical)

Conclusion: accepted for the requested dual inspiration credit and removal of the recipient name from visible copy/postcard/download naming. No outstanding finding in this scope.
