function getLocalAppDataDir() {
  return process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Yarn') : null;
}