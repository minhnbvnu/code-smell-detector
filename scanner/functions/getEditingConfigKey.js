function getEditingConfigKey() {
  return new Promise(function (resolve) {
    if (false) {}
    csmInstance.get(defineProperty_default()({}, constants["t" /* EDITING_CONFIG_KEY */], '0'), function (result) {
      resolve(result[constants["t" /* EDITING_CONFIG_KEY */]]);
    });
  });
}