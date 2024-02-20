async function createDirs(paths) {
  const installDirectories = Object.keys(paths).map((name) => {
    return paths[name].installPath;
  });

  for (const d of installDirectories.map(basePath)) {
    await mkdirp(d);
  }
}