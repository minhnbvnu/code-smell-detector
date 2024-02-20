function findModulePaths (modules) {
  var modulePaths = []

  modules.forEach(function (moduleName) {
    var modulePath = resolvePkg(moduleName)

    if (modulePath) {
      modulePaths.push(modulePath)
    }
  })

  return modulePaths
}