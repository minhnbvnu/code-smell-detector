function getBaseDir(tplPath) {
  const idx = tplPath.indexOf(DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);

  if (idx !== -1) {
    const baseDir = tplPath.substring(0, idx);
    if (!baseDir) {
      return process.cwd();
    }
    return baseDir;
  }
  return path.resolve(path.dirname(tplPath));
}