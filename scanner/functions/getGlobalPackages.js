function getGlobalPackages() {
  _log('Getting global packages')
  if (process.config && process.config.variables) {
    const prefix = process.config.variables.node_prefix
    if (prefix) {
      const root = path.resolve(prefix, 'lib', 'node_modules')
      _log('Getting global packages from %s', root)
      return getPackages(root)
    }
  }

  _log('No global packages to get')
  return { packages: [], dependencies: [] }
}