async function isNotEmptyDir(path) {
  const lstat = await fs.lstat(path);
  if (lstat.isDirectory()) {
    const dirs = await fs.readdir(path);
    if (!_.isEmpty(dirs)) {
      return true;
    }
  }
  return false;
}