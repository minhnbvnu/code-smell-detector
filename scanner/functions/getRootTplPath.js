function getRootTplPath(tplPath) {
  const baseDir = getBaseDir(tplPath);
  return path.join(baseDir, path.basename(tplPath));
}