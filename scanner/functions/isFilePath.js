function isFilePath(value) {
  return isAbsPath(value) || isRelPath(value)
}