function loadAndRegister(idsOrModules) {
  idsOrModules = idsOrModules || [];
  idsOrModules.forEach(function(idOrModule) {
    var module = isObject(idOrModule) ?
      idOrModule :
      loadModule(idOrModule);
    register(module);
  });
}