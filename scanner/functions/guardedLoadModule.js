function guardedLoadModule(moduleId, module) {
  if (global.ErrorUtils && !inGuard) {
    inGuard = true;
    var returnValue;
    try {
      returnValue = loadModuleImplementation(moduleId, module);
    } catch (e) {
      global.ErrorUtils.reportFatalError(e);
    }
    inGuard = false;
    return returnValue;
  } else {
    return loadModuleImplementation(moduleId, module);
  }
}