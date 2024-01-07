function getLocalNpmBinPath() {
  const npmBinName = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const localNpmBinPath = path.resolve(
    repositoryRootPath,
    'script',
    'node_modules',
    '.bin',
    npmBinName
  );
  return localNpmBinPath;
}