async function getPackages(root) {
  const packages = []
  const dependencies = []
  _log('Getting packages from %s', root)

  await listPackages(root, packages)
  await listDependencies(root, dependencies)
  _log('Done getting packages from %s', root)
  return { packages, dependencies }
}