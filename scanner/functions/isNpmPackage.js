function isNpmPackage (path) {
  return path[0] !== '.' && path[0] !== '/'
}