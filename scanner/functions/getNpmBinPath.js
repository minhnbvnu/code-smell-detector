function getNpmBinPath() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}