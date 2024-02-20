function runDerivedFunction(derivation, f, context, extraArguments) {
  var prevTracking = __WEBPACK_IMPORTED_MODULE_2__global_state__["a" /* globalState */].trackingDerivation; // pre allocate array allocation + room for variation in deps

  derivation.newObserving = new Array(derivation.observing.length + 100);
  derivation.unboundDepsCount = 0;
  derivation.runId = ++__WEBPACK_IMPORTED_MODULE_2__global_state__["a" /* globalState */].runId;
  __WEBPACK_IMPORTED_MODULE_2__global_state__["a" /* globalState */].trackingDerivation = derivation;
  var result;

  try {
    result = extraArguments ? f.apply(context, [context].concat(extraArguments)) : f.call(context, context);
  } catch (e) {
    result = new CaughtException(e);
  }

  __WEBPACK_IMPORTED_MODULE_2__global_state__["a" /* globalState */].trackingDerivation = prevTracking;
  changeDependenciesStateTo0(derivation);
  bindDependencies(derivation);
  return result;
}