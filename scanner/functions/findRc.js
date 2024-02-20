function findRc(name, cwd, parser) {
  return parseRcPaths(getRcPaths(name, cwd), parser);
}