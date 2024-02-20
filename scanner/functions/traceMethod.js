function traceMethod(moduleName, target, name) {
  var method = target[name];
  if (method && !method.__ddInstrumented__) {
    var fullName = moduleName + '.' + name;
    //      logger.debug( "instrumenting method", fullName );
    instrument(target, name, method, fullName);

    var p = target[name].prototype;
    for (var item in p) {
      if (
        typeof p[item] == 'function' &&
        Object.keys(p[item]).length == 0 &&
        Object.keys(p[item].prototype).length == 0
      ) {
        var itemName = fullName + '.' + item;
        instrument(p, item, p[item], itemName);
      }
    }
  }
}