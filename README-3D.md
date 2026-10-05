# Coherent in three dimensions

Open **`index-3d.html`** in a modern WebGL 2 browser. Reload that page if it is already open. The lab now evolves into a substantial cutaway facility: a copper cryostat, research workstations, control and decoder bays, processor and memory exhibits, construction machinery, and a complete workload planning display.

Your purchases change the apparatus within chapters. After an upgrade, **Inspect your expansion** returns to the changed equipment. **Follow experiment** brings a new experiment into view from Overview; choosing a station or dragging switches to manual inspection. Use the station buttons to explore, **Expand lab** for fullscreen, **Pause lab** to hold the scene, and **2D view** for the original instrument. Escape leaves fullscreen. Desktop wheel and mobile swipes continue to scroll the page; camera inspection spends no resources. Reduced motion uses static indicators and immediate camera changes.

The original `index.html` remains the 2D game. Both entries share the unchanged deterministic engine, six-chapter campaign, primary-paper archive, and version-two save contract. When served from the same origin, both pages use `coherent.v2` browser storage. Directly opened files may use separate storage; Settings JSON export/import transfers a laboratory.

Three.js and camera controls are packaged locally. Playing requires no npm installation, build command, internet connection, or runtime CDN. If WebGL 2 cannot start or the graphics context is lost, the complete game continues with its 2D instrument and JSON export/import. Reload reinitializes 3D after context loss.

The independent AI 3D specialist accepted the implemented facility and its browser evidence. Read [IMMERSIVE-LAB-DESIGN.md](IMMERSIVE-LAB-DESIGN.md), [IMMERSIVE-LAB-REVIEW.md](IMMERSIVE-LAB-REVIEW.md), and [IMMERSIVE-LAB-VERIFICATION.md](IMMERSIVE-LAB-VERIFICATION.md) for the exact scope. Human enjoyment, first-play pacing and physical-device performance still require playtesting.

The 3D HTML is generated from the existing 2D entry to keep native controls and accessibility in sync. Development-only packaging is reproducible:

```sh
npm ci --ignore-scripts
npm run build:3d
npm test
```

`instrument-3d.js` contains original procedural geometry and the adapter. `style-3d.css` styles only the 3D entry. `scripts/build-three.mjs` packages pinned Three.js 0.186.1 and regenerates `index-3d.html`; the offline bundle and upstream MIT license are committed under `assets/three/`. No application framework is introduced. Portable native browser QA scripts are preserved in [analysis-tools/3d-browser-qa/](analysis-tools/3d-browser-qa/README.md).

Keep this gift private. Git work is committed locally; no publishing or push is part of this project.
