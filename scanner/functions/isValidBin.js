function isValidBin(bin) {
  return !path.isAbsolute(bin) && !PARENT_PATH.test(path.normalize(bin));
}