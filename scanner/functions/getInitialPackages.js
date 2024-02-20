function getInitialPackages() {
  return listFns()
    .concat(listFPFns())
    .concat(extraModules)
    .reduce((acc, module) => {
      acc[module.fullPath] = getModulePackage(module.fullPath)
      return acc
    }, {})
}