function isKeyName(path) {
  return path==='*' || !IS_PATH.test(path);
}