async function getOtherPackages() {
  _log('Getting other packages')
  const other = { packages: [], dependencies: [] }

  if (!process.env.NODE_PATH) {
    return other
  }

  let paths
  if (process.platform === 'win32') {
    // why. WHY.
    paths = process.env.NODE_PATH.split(';')
  } else {
    paths = process.env.NODE_PATH.split(':')
  }
  _log('Looking for other packages in %j', paths)

  const otherPackages = await asyncEachLimit(
    paths,
    (nodePath) => {
      if (nodePath[0] !== '/') {
        nodePath = path.resolve(process.cwd(), nodePath)
      }
      _log('Getting other packages from %s', nodePath)
      return getPackages(nodePath)
    },
    2
  )

  otherPackages.forEach((pkg) => {
    other.packages.push.apply(other.packages, pkg.packages)
    other.dependencies.push.apply(other.dependencies, pkg.dependencies)
  })

  _log('Done getting other packages')
  return other
}