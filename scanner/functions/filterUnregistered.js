function filterUnregistered (pkg) {
  depTypes.forEach(function (depType) {
    Object.keys(pkg[depType]).forEach(function (depName) {
      if (/^unregistered/.test(depName)) {
        delete pkg[depType][depName]
      }
    })
  })
}