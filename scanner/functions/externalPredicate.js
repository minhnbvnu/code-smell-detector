function externalPredicate(id) {
  const isDep = external.length > 0 && externalPattern.test(id)
  if (umd) {
    // for UMD, we want to bundle all non-peer deps
    return isDep
  }
  // for esm/cjs we want to make all node_modules external
  // TODO: support bundledDependencies if someone needs it ever...
  const isNodeModule = id.includes('node_modules')
  const isRelative = id.startsWith('.')
  return isDep || (!isRelative && !path.isAbsolute(id)) || isNodeModule
}