function hasWritePerm(num, stats, nasPath) {
  if (stats.isDir && !stats.isFile) {
    // -wx, num | 100 === 7
    return ((num | 4) === 7);
  } else if (stats.isFile && !stats.isDir) {
    // -w-, num | 101
    return ((num | 5) === 7);
  } else if (stats.isFile && stats.isDir) {
    throw new Error(`isFile and isDir attributes of ${nasPath} are true simultaneously`);
  }
}