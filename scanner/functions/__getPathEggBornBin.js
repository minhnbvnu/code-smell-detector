function __getPathEggBornBin() {
  const basePath = path.join(__dirname, '../');
  let cabloyPath = path.join(basePath, 'node_modules/egg-born-bin/bin/egg-born-bin.js');
  if (fs.existsSync(cabloyPath)) return cabloyPath;
  cabloyPath = path.join(basePath, 'packages/egg-born-bin/bin/egg-born-bin.js');
  if (fs.existsSync(cabloyPath)) return cabloyPath;
  return null;
}