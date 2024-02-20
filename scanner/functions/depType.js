function depType (opts) {
  if (opts.dev) {
    return 'devDependencies'
  } else if (opts.optional) {
    return 'optionalDependencies'
  } else if (opts.peer) {
    return 'peerDependencies'
  }
  return 'dependencies'
}