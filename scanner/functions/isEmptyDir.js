function isEmptyDir(path) {
  const lstat = fs.lstatSync(path);
  if (lstat.isDirectory()) {
    const dirs = fs.readdirSync(path);
    if (_.isEmpty(dirs)) {
      return true;
    }
  }
  return false;
}