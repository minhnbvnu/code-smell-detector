async function zipFolder(zipArchiver, folder, folders, funignore, codeUri, prefix = '') {
  folders.push(folder);
  const absCodeUri = path.resolve(codeUri);
  const dir = path.join(...folders);
  const dirItems = await fs.readdir(dir);

  const absDir = path.resolve(dir);
  const relative = path.relative(absCodeUri, absDir);

  if (!_.isEmpty(relative)) {
    zipArchiver.append(null, {
      name: relative,
      type: 'directory',
      prefix
    });
  }

  return (await Promise.all(dirItems.map(async (f) => {
    const fPath = path.join(dir, f);

    debug('before zip: lstat fPath: %s, absolute fPath is %s', fPath, path.resolve(fPath));

    let s;

    try {
      s = await fs.lstat(fPath);
    } catch (error) {
      debug(`before zip: could not found fPath ${fPath}, absolute fPath is ${path.resolve(fPath)}, exception is ${error}, skiping`);
      return 0;
    }

    if (funignore && funignore(fPath)) {
      debug('file %s is ignored.', fPath);
      return 0;
    }

    const absFilePath = path.resolve(fPath);
    const relative = path.relative(absCodeUri, absFilePath);

    const isBootstrap = isBootstrapPath(absFilePath, absCodeUri, false);
    if (s.size === 1067) {
      const content = await readLines(fPath);
      if (_.head(content) === 'XSym' && content.length === 5) {
        const target = content[3];
        zipArchiver.symlink(relative, target, {
          mode: (isBootstrap || isWindows) ? s.mode | 73 : s.mode
        });
        return 1;
      }
    }

    if (s.isFile() || s.isSymbolicLink()) {
      zipArchiver.file(fPath, {
        name: relative,
        prefix,
        mode: (isBootstrap || isWindows) ? s.mode | 73 : s.mode,
        stats: s // The archiver uses fs.stat by default, and pasing the result of lstat to ensure that the symbolic link is properly packaged
      });

      return 1;
    } else if (s.isDirectory()) {
      return await zipFolder(zipArchiver, f, folders.slice(), funignore, codeUri, prefix);
    }
    console.error(`ignore file ${absFilePath}, because it isn't a file, symbolic link or directory`);
    return 0;

  }))).reduce(((sum, curr) => sum + curr), 0);

}