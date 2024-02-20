function _pathExists(path) {
  try {
    const stats = fs.statSync(path);
    return stats.isFile() || stats.isDirectory();
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    }
    throw e;
  }
}