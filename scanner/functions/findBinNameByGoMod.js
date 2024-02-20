async function findBinNameByGoMod(codeDir) {
  const modFile = path.join(codeDir, 'go.mod');
  if (!await fs.pathExists(modFile)) { return null; }
  
  const contents = await fs.readFile(modFile, 'utf8');
  for (const line of contents.split(/\r?\n/)) {
    const idx = line.indexOf('module ');
    if (idx >= 0) {
      let moduleName = _.trim(line.substring(idx + 'module '.length));
      const guessBinName = path.basename(moduleName);
      const guessPaths = ['.', 'bin'];
      for (const guessPath of guessPaths) {
        const guessBinAbsPath = path.join(codeDir, guessPath, guessBinName);
        debug(`checking file ${guessBinAbsPath} exists...`);
        if (await fs.pathExists(guessBinAbsPath)) {
          return path.posix.join(guessPath, guessBinName);
        }
      }
    }
  }

  return null;
}