async function findBinNameByBinFolder(codeDir) {
  debug(`check bin/ folder exist...`);

  const binDir = path.join(codeDir, 'bin');

  if (!await fs.pathExists(binDir)) { return null; }

  const files = await fs.readdir(binDir);
  if (files.length === 1) {
    if (files[0] !== 'bootstrap') {
      return path.posix.join('bin', files[0]);
    }
  } else if (files.length === 2 && files.includes(files, 'bootstrap')) {
    for (const file of files) {
      if (file !== 'bootstrap') {
        return path.posix.join('bin', file);
      }
    }
  }

  debug('files of bin folder', files);

  return null;
}