# Coherent in three dimensions

Open `index-3d.html` in a modern browser. The original `index.html` remains the 2D game. Both entries share the same deterministic game engine, campaign, primary-paper archive, and version-two save contract.

Three.js and camera controls are packaged locally. Playing requires no npm installation, build command, internet connection, or runtime CDN. A WebGL2 browser can show the spatial instrument; the original diagrams remain available through its 2D-view control and serve as the working fallback. Camera inspection does not spend resources or change scientific settings.

When served from the same origin, both pages use `coherent.v2` browser storage. Directly opened files may use separate storage; Settings JSON export/import can transfer a laboratory. The old version-one baseline remains separately preserved.

The 3D page is generated from the existing 2D HTML to keep controls and accessibility in sync. Development-only packaging is reproducible:

```sh
npm ci --ignore-scripts
npm run build:3d
npm test
```

`instrument-3d.js` holds original procedural meshes and the adapter. `style-3d.css` styles only the 3D entry. `scripts/build-three.mjs` packages the pinned Three.js release and regenerates `index-3d.html`; the generated browser bundle and upstream MIT license are committed under `assets/three/`. No application framework is introduced.

Read `3D-DESIGN.md` for the independently reviewed port direction. Actual 3D verification and implementation acceptance remain in progress; this README does not claim final visual, interaction, or device-performance acceptance.
