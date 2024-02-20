function saveConfig(jsonc, editingConfigKey) {
  var json = JSONC2JSON(jsonc);
  if (true) {
    return new Promise(function (resolve) {
      var _csmInstance$get5;
      csmInstance.get((_csmInstance$get5 = {}, defineProperty_default()(_csmInstance$get5, constants["y" /* JSONC_CONFIG */], {}), defineProperty_default()(_csmInstance$get5, constants["z" /* JSON_CONFIG */], {}), _csmInstance$get5), function (result) {
        // migrate
        if (typeof result[constants["y" /* JSONC_CONFIG */]] === 'string') {
          result[constants["y" /* JSONC_CONFIG */]] = {};
          result[constants["z" /* JSON_CONFIG */]] = {};
        }
        result[constants["y" /* JSONC_CONFIG */]][editingConfigKey] = jsonc;
        JSON_Parse(json, function (error, parsedJSON) {
          if (!error) {
            result[constants["z" /* JSON_CONFIG */]][editingConfigKey] = parsedJSON;
            return;
          }
          result[constants["z" /* JSON_CONFIG */]][editingConfigKey] = '';
        });
        csmInstance.set(result, resolve);
      });
    });
  }
}