async function findPackages() {
  _log('Finding all packages')
  const pkgPromises = [
    time(getLocalPackages),
    time(getGlobalPackages),
    time(getOtherPackages),
    time(getHomePackages)
  ]
  const [local, global, other, home] = await Promise.all(pkgPromises)
  _log('Done finding all packages')
  const packages = local.packages
  packages.push.apply(packages, global.packages)
  packages.push.apply(packages, other.packages)

  const dependencies = local.dependencies
  dependencies.push.apply(dependencies, global.dependencies)
  dependencies.push.apply(dependencies, other.dependencies)

  if (home) {
    if (home.home) {
      packages.unshift.apply(packages, home.home.packages)
      dependencies.unshift.apply(dependencies, home.home.dependencies)
    }
    if (home.homeOld) {
      packages.unshift.apply(packages, home.homeOld.packages)
      dependencies.unshift.apply(dependencies, home.homeOld.dependencies)
    }
  }

  addSetting('Packages', flattenVersions(packages))
  addSetting('Dependencies', flattenVersions(dependencies))
}