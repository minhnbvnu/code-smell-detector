function getPackageInfo() {
  return fse.readJSON(path.resolve(baseDir, '../../package.json'));
}