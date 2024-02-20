function getPureDependencies(module) {
    var uri = module.uri

    return util.filter(module.dependencies, function(dep) {
      circularCheckStack = [uri]

      var isCircular = isCircularWaiting(cachedModules[dep], uri)
      if (isCircular) {
        circularCheckStack.push(uri)
        printCircularLog(circularCheckStack)
      }

      return !isCircular
    })
  }