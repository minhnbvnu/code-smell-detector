function usingProjectTemplate(tplPath) {
  const baseDir = getBaseDir(tplPath);
  return path.dirname(tplPath) === path.resolve(baseDir);
}