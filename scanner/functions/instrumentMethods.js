function instrumentMethods(moduleName, target) {
  for (var name in target) {
    if (!target.__lookupGetter__(name) && typeof target[name] == 'function') {
      if (
        !target[name].__super__ &&
        (target[name].prototype || (target[name].prototype && Object.keys(target[name].prototype).length == 0)) &&
        Object.keys(target[name]).length == 0
      ) {
        traceMethod(moduleName, target, name);
      }
    }
  }
}