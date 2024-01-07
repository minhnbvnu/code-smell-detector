function registerBuiltins(devMode) {
  if (
    devMode ||
    !cache.resourcePath.startsWith(`${process.resourcesPath}${path.sep}`)
  ) {
    const fs = require('fs-plus');
    const atomJsPath = path.join(cache.resourcePath, 'exports', 'atom.js');
    if (fs.isFileSync(atomJsPath)) {
      cache.builtins.atom = atomJsPath;
    }
  }
  if (cache.builtins.atom == null) {
    cache.builtins.atom = path.join(cache.resourcePath, 'exports', 'atom.js');
  }
}