function posixSplitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
}