// transformGrpcGeneratedToNamedExports.cjs
const fs = require('fs');
const path = require('path');

console.log('Converting Closure CJS to named exports');

const generatedFolder = './src/generated/';
// Match ANY goog.exportSymbol('proto.<pkg>.<Name>', …)
const exportLineRe = /goog\.exportSymbol\('proto\.([A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)*)\.([A-Z][A-Za-z0-9_]*)'/g;

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/_pb\.js$/i.test(ent.name)) patch(p);
  }
}

function patch(filePath) {
  const doc = fs.readFileSync(filePath, 'utf-8');
  if (doc.includes('/* Named exports for ESM interop */')) return;

  const matches = [...doc.matchAll(exportLineRe)];
  if (!matches.length) return;

  let pkg = null;
  const names = new Set();
  for (const m of matches) {
    pkg = m[1];
    names.add(m[2]);
  }
  if (!pkg || !names.size) return;

  const block =
    '\n/* Named exports for ESM interop */\n' +
    [...names].map(n => `exports.${n} = proto.${pkg}.${n};`).join('\n') +
    '\n';

  fs.appendFileSync(filePath, block);
  console.log(`→ Patched ${path.basename(filePath)} with ${names.size} named exports`);
}

walk(generatedFolder);
console.log('Done.');
