function getHashName (filename, value, config) {
  var valueInfo = trackResource(filename, value, config);
  var moduleName = valueInfo.module;
  value = valueInfo.value.replace(/\\/ig, '/');
  var mapJSONModuleCache = mapJSONCache[moduleName];
  if (!mapJSONModuleCache || _.isEmpty(mapJSONModuleCache)) {
    mapJSONCache[moduleName] = JSON.parse(fs.readFileSync(path.join(config.cwd, moduleName, 'dist', 'map.json')).toString());
  }

  var mapJson = mapJSONCache[moduleName];
  if (mapJson) {
    value = Util.getHashNameServer(value, mapJson);
  }
  return value;
}