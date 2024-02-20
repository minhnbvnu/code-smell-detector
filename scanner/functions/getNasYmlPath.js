function getNasYmlPath(tplPath) {
  const baseDir = getBaseDir(tplPath);
  return path.join(baseDir, '.nas.yml');
}