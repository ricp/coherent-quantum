import { build } from 'esbuild';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
await build({entryPoints:['scripts/three-entry.mjs'],bundle:true,minify:true,format:'iife',globalName:'CoherentThree',outfile:'assets/three/three-tools.min.js',target:['es2022'],legalComments:'eof'});
await copyFile('node_modules/three/LICENSE','assets/three/LICENSE.txt');
const page = (await readFile('index.html','utf8')).replace('<title>Coherent — one qubit in return</title>','<title>Coherent 3D — one qubit in return</title>').replace('<link rel="stylesheet" href="style.css">','<link rel="stylesheet" href="style.css">\n  <link rel="stylesheet" href="style-3d.css">').replace('<script src="app.js" defer></script>','<script src="assets/three/three-tools.min.js" defer></script>\n  <script src="instrument-3d.js" defer></script>\n  <script src="app.js" defer></script>');
await writeFile('index-3d.html',page);
