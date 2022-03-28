// I dont like ts-node; this is an approach that I prefer, and I plan to publish
// a module on npm that performs this operation it automatically.

/// <reference types="node" />
const fs = require('fs');
const childProc = require('child_process');
const globby = require('globby');
let needsCompilation = false;
let compiledStats;
try {
  compiledStats = fs.statSync(__dirname + '/config/webpack.config.js');
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
  needsCompilation = true;
}

if (compiledStats) {
  const configTsFiles = globby.sync('config/**/*.ts', { cwd: __dirname });
  for (const tsFile of configTsFiles) {
    if (fs.statSync(tsFile).mtimeMs > compiledStats.mtimeMs) {
      needsCompilation = true;
      break;
    }
  }
}

if (needsCompilation) {
  childProc.execFileSync(
    process.execPath,
    [__dirname + '/node_modules/.bin/tsc', '--incremental'],
    { cwd: __dirname + '/config' }
  );
}

module.exports = require('./config/webpack.config');
