function getOptions() {
  return new Promise(function (resolve) {
    var _csmInstance$get6;
    if (false) { var _resolve4; }
    csmInstance.get((_csmInstance$get6 = {}, defineProperty_default()(_csmInstance$get6, constants["g" /* CLEAR_CACHE_ENABLED */], enums["b" /* Enabled */].YES), defineProperty_default()(_csmInstance$get6, constants["i" /* CORS_ENABLED_STORAGE_KEY */], enums["b" /* Enabled */].YES), _csmInstance$get6), function (result) {
      var _resolve5;
      resolve((_resolve5 = {}, defineProperty_default()(_resolve5, constants["g" /* CLEAR_CACHE_ENABLED */], result.clearCacheEnabled), defineProperty_default()(_resolve5, constants["i" /* CORS_ENABLED_STORAGE_KEY */], result.corsEnabled), _resolve5));
    });
  });
}