function requireImpl(id) {
  if (global.ErrorUtils && !inGuard) {
    inGuard = true;
    var returnValue;
    try {
      returnValue = requireImpl(id);
    } catch (e) {
      global.ErrorUtils.reportFatalError(e);
    }
    inGuard = false;
    return returnValue;
  }

  var mod = modules[id];
  if (!mod) {
    var msg = 'Requiring unknown module "' + id + '"';
    if (__DEV__) {
      msg += '. If you are sure the module is there, try restarting the packager or running "npm install".';
    }
    throw new Error(msg);
  }

  if (mod.hasError) {
    throw new Error(
      'Requiring module "' + id + '" which threw an exception'
    );
  }

  // `require` calls int  the require polyfill itself are not analyzed and
  // replaced so that they use numeric module IDs.
  // The systrace module will expose itself on the require function so that
  // it can be used here.
  // TODO(davidaurelio) Scan polyfills for dependencies, too (t9759686)
  if (__DEV__) {
    var {Systrace} = require;
  }

  try {
    // We must optimistically mark mod as initialized before running the factory to keep any
    // require cycles inside the factory from causing an infinite require loop.
    mod.isInitialized = true;

    if (__DEV__) {
      Systrace.beginEvent('JS_require_' + id);
    }

    // keep args in sync with with defineModuleCode in
    // packager/react-packager/src/Resolver/index.js
    mod.factory.call(global, global, require, mod.module, mod.module.exports);
    mod.factory = undefined;

    if (__DEV__) {
      Systrace.endEvent();
    }
  } catch (e) {
    mod.hasError = true;
    mod.isInitialized = false;
    throw e;
  }

  return mod.module.exports;
}