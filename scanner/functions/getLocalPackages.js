async function getLocalPackages() {
  const packages = []
  const dependencies = []
  let candidate = process.cwd()
  const visited = Object.create(null)
  _log('Getting local packages')

  while (candidate) {
    _log('Checking for local packages in %s', candidate)
    const root = path.resolve(candidate, 'node_modules')
    await listPackages(root, packages)
    await listDependencies(root, dependencies, visited)
    _log('Done checking for local packages in %s', candidate)
    const last = candidate
    candidate = path.dirname(candidate)
    if (last === candidate) {
      candidate = null
    }
  }

  _log('Done getting local packages')
  return { packages, dependencies }
}