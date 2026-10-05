import { build } from 'esbuild';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
await build({entryPoints:['scripts/three-entry.mjs'],bundle:true,minify:true,format:'iife',globalName:'CoherentThree',outfile:'assets/three/three-tools.min.js',target:['es2022'],legalComments:'eof'});
await copyFile('node_modules/three/LICENSE','assets/three/LICENSE.txt');
let page = (await readFile('index.html','utf8')).replace('<title>Coherent — one qubit in return</title>','<title>Coherent 3D — one qubit in return</title>').replace('<link rel="stylesheet" href="style.css">','<link rel="stylesheet" href="style.css">\n  <link rel="stylesheet" href="style-3d.css">').replace('<script src="app.js" defer></script>','<script src="assets/three/three-tools.min.js" defer></script>\n  <script src="instrument-3d.js" defer></script>\n  <script src="app.js" defer></script>');
// Promote the existing instrument and action to the full-width 3D theater.
const instrument = page.match(/            <section class="instrument"[\s\S]*?            <\/section>/);
const action = page.match(/<button class="primary-button" type="button" id="run-experiment">[\s\S]*?<\/button>/);
const next = page.match(/<div class="eyebrow" id="next-label">[\s\S]*?<\/h2>/);
const workbench = '<div class="workbench" id="workbench">';
if (!instrument || !action || !next || !page.includes(workbench)) throw new Error('Original laboratory markup could not be located.');
const theater = '<div class="lab-presentation"><div class="lab-command-bar"><div>' + next[0] + '</div>' + action[0] + '</div>\n' + instrument[0].replace('class="instrument"', 'class="instrument lab-theater"') + '<section class="campus-station" id="campus-station" aria-label="Selected facility controls"></section></div>';
page = page.replace(instrument[0], '').replace(action[0], '').replace(next[0], '').replace(workbench, theater + '\n' + workbench);
// Keep the result compact above peer control cards instead of a tall sidebar.
const summary = page.match(/            <p class="rail-copy" id="next-copy">[\s\S]*?(?=            <section class="bench-controls")/);
if (!summary) throw new Error('Original experiment summary could not be located.');
page = page.replace(summary[0], '<div class="experiment-summary">\n' + summary[0] + '</div>\n');
await writeFile('index-3d.html',page);
