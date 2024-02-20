function detectNasBaseDir(tplPath) {
  const baseDir = getBaseDir(tplPath);

  return path.join(baseDir, DEFAULT_NAS_PATH_SUFFIX);
}