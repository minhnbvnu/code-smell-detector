function getActiveConfig(config) {
  var activeKeys = toConsumableArray_default()(jsonActiveKeys);
  var json = config['0'];
  activeKeys.forEach(function (key) {
    if (config[key] && key !== '0') {
      if (config[key][constants["L" /* PROXY_STORAGE_KEY */]]) {
        if (!json[constants["L" /* PROXY_STORAGE_KEY */]]) {
          json[constants["L" /* PROXY_STORAGE_KEY */]] = [];
        }
        json[constants["L" /* PROXY_STORAGE_KEY */]] = [].concat(toConsumableArray_default()(json[constants["L" /* PROXY_STORAGE_KEY */]]), toConsumableArray_default()(config[key][constants["L" /* PROXY_STORAGE_KEY */]]));
      }
      if (config[key][constants["j" /* CORS_STORAGE */]]) {
        if (!json[constants["j" /* CORS_STORAGE */]]) {
          json[constants["j" /* CORS_STORAGE */]] = [];
        }
        json[constants["j" /* CORS_STORAGE */]] = [].concat(toConsumableArray_default()(json[constants["j" /* CORS_STORAGE */]]), toConsumableArray_default()(config[key][constants["j" /* CORS_STORAGE */]]));
      }
    }
  });
  return json;
}