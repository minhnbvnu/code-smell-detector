function getApmBinPath() {
  const apmBinName = process.platform === 'win32' ? 'apm.cmd' : 'apm';
  return path.join(
    apmRootPath,
    'node_modules',
    'atom-package-manager',
    'bin',
    apmBinName
  );
}