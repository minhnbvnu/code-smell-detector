function getRootBaseDir(baseDir) {
  const idx = baseDir.indexOf(DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);
  if (idx !== -1) { // exist
    return baseDir.substring(0, idx);
  }
  return baseDir;
}