async function runPackager(options) {
  const packageOutputDirPaths = await electronPackager(options);

  assert(
    packageOutputDirPaths.length === 1,
    'Generated more than one electron application!'
  );

  return renamePackagedAppDir(packageOutputDirPaths[0]);
}