function setOptions(options) {
  if (true) {
    return new Promise(function (resolve) {
      csmInstance.set({
        clearCacheEnabled: options.clearCacheEnabled ? enums["b" /* Enabled */].YES : enums["b" /* Enabled */].NO,
        corsEnabled: options.corsEnabled ? enums["b" /* Enabled */].YES : enums["b" /* Enabled */].NO
      }, resolve);
    });
  }
}