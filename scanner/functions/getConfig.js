function getConfig(editingConfigKey) {
  return new Promise(function (resolve) {
    if (false) {}
    csmInstance.get(defineProperty_default()({}, constants["y" /* JSONC_CONFIG */], {
      0: ''
    }), function (result) {
      if (typeof result[constants["y" /* JSONC_CONFIG */]] === 'string') {
        return resolve(result[constants["y" /* JSONC_CONFIG */]]);
      }
      resolve(result[constants["y" /* JSONC_CONFIG */]][editingConfigKey]);
    });
  });
}