function loadModuleImplementation(moduleId, module) {
  if (!module) {
    global.nativeRequire(moduleId);
    module = modules[moduleId];
  }

  if (!module) {
    throw unknownModuleError(moduleId);
  }

  if (module.hasError) {
    throw moduleThrewError(moduleId);
  }

  // `require` calls int  the require polyfill itself are not analyzed and
  // replaced so that they use numeric module IDs.
  // The systrace module will expose itself on the require function so that
  // it can be used here.
  // TODO(davidaurelio) Scan polyfills for dependencies, too (t9759686)
  if (__DEV__) {
    var {Systrace} = require;
  }

  const exports = module.exports = {};
  module.isInitialized = true;
  const {factory} = module;
  try {
    if (__DEV__) {
      Systrace.beginEvent('JS_require_' + moduleId);
    }

    const moduleObject = {exports};
    factory(global, require, moduleObject, exports);
    module.factory = undefined;

    if (__DEV__) {
      Systrace.endEvent();
    }
    return (module.exports = moduleObject.exports);
  } catch (e) {
    module.isInitialized = false;
    module.hasError = true;
    module.exports = undefined;
    throw e;
  }
}