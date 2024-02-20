function resolveRelativeModulePath(name, child) {
  return moduleResolver(name, getRelativeModulePath(child));
}