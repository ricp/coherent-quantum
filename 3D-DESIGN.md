# Coherent: compact 3D direction — superseded

The user rejected this compact presentation after playtesting. See `IMMERSIVE-LAB-DESIGN.md` for the authorized large, evolving facility that supersedes the compositions below. This file preserves the earlier reviewed direction and does not claim acceptance of the current request.

The user requested a Three.js upgrade and an independent AI 3D specialist review. The specialist inspected the existing renderer and callers, scientific constraints, legal scenes, and desktop/mobile captures. Its proposed port is accepted as a design direction; actual implementation review remains pending.

## Design and scope

Build the upgrade in the separate `index-3d.html` requested by the user. Preserve `index.html` as the 2D version and share the complete engine, content, scientific formulas, paper archive, and version-two saves. The change concerns presentation and inspection of the scientific instrument. Copper, graphite, ceramic ivory, and mint control accents extend the existing visual identity into tangible hardware. Use stable oblique orthographic framing, a top view, deliberate experiment feedback, and static reduced-motion equivalents.

| Chapter | Three-dimensional instrument | Scientific boundary |
| --- | --- | --- |
| Signal | Packaged transmon, capacitor pads, junction, folded resonator, RF contacts and cold-stage silhouette | Known control/readout activity; actual sampled counts remain separate |
| Control | Raised pulse/Ramsey/echo tracks beside the packaged device | Selected illustrative coherence scenarios, with explicit units |
| Circuit | Planar connected processor, lithographic cells and couplers | Representative bounded subset; no universal power from entanglement or count |
| Memory | Exact rotated patch with data sites, ancillas, boundary checks | d² data plus d²−1 ancillas; illustrative detection events, no unknown-state display |
| Logical | Allocation tray for application/routing/factory/spare budget units | Fictional patch-sized resource units; rehearsal markers are not stored states |
| Useful | Parallel operations, fresh-state, and feedback lanes with sequential overhead | Actual modeled budget determines critical path; unqualified supply never gets fabricated time |

The original measurement plots, numerical controls, and gift postcard remain available. The exact variational curve remains a companion plot alongside the three-dimensional instrument after ansatz research. The existing control/Ramsey/echo traces similarly accompany chapter II; other diagrams remain available through the 2D-view control. Do not replace scientific results with decorative landscapes. Avoid globes, atom orbits, stars, constant floating particles, physics, avatars, a free-flight room, and a raycast-only interface.

## Integration

Keep CoherentArt.draw(state,{workload,view,time}) and postcard(state). A small rendering adapter owns presentation only. WebGL gets a different canvas because the existing machine canvas acquires a 2D context. Keep the original renderer as a selectable working fallback. No engine/content/save change is required.

Three.js 0.186.1 and OrbitControls are packaged once into a committed classic browser bundle; esbuild is development-only. The delivered game must still open from index.html offline, without a runtime CDN, package installation, or module-fetch/server requirement. Retain the upstream MIT license. The packaging script generates index-3d.html from the unchanged 2D entry, adding only the Three.js toolkit, adapter, and separate style-3d.css. No application framework or general scene framework is introduced.

Only rebuild geometry on structural changes; update colors/transforms for progress. Reuse geometry/materials, instance repeated sites, dispose retired resources, and cap pixel ratio. Avoid permanent competing animation loops. Hidden tabs, non-laboratory views, paused/complete laboratories, and reduced-motion mode must avoid continuous GPU work. Camera controls must not capture page-wheel or vertical touch scrolling.

Current Three.js WebGLRenderer requires WebGL2. Creation failure and context loss must reveal the original schematic while gameplay and saves continue. Context restoration may attempt the 3D renderer again without changing game state.

## Acceptance and evidence

- Six legal fixtures show six recognizable, closely framed compositions and honest warning/unqualified states.
- All current engine/persistence regressions pass and game.js/content.js remain byte-for-byte unchanged.
- Desktop 1280px and mobile 375px/320px retain readable controls, captions, focus and sources.
- Camera fitting works across resize/distance/allocation changes; no important geometry clips.
- Measure draw calls, triangles and GPU-resource stability across repeated imports; initial targets are below 100 calls/150,000 triangles and capped pixel ratio, not promises of physical-device performance.
- Verify actual experiment motion, camera inspection, keyboard, reduced motion, hidden/nonlab behavior, offline file play, fallback and forced context loss.
- Capture actual interaction video as well as images. Screenshots alone do not verify motion.
- Obtain final independent AI 3D implementation review and record its concrete conclusion and remaining limits.

## Primary technical sources

- [Three.js installation](https://threejs.org/manual/pages/installation.html)
- [WebGLRenderer and WebGL2 requirements](https://threejs.org/docs/pages/WebGLRenderer.html)
- [OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html)
- [InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [GPU resource cleanup](https://threejs.org/manual/pages/cleanup.html)

This is a private local gift. No publishing, deployment, push, external sharing, or contact with Keir is authorized.
