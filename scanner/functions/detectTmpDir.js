function detectTmpDir(tplPath, tmpDir) {
  if (tmpDir) { return tmpDir; }

  const baseDir = getBaseDir(tplPath);
  return path.join(baseDir, DEFAULT_LOCAL_TMP_PATH_SUFFIX);
}