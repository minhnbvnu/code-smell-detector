function getTplSourceMap (config) {
  var result = {};
  var moduleName = config.moduleConf.module;
  var mapJSONModuleCache = mapJSONCache[moduleName];
  if (mapJSONModuleCache) {
    var rev = mapJSONModuleCache.rev;
    if (rev) {
      var jsRev = rev.js;
      for (var i in jsRev) {
        if (/_tpl.js/.test(i)) {
          result[path.basename(i)] = jsRev[i];
        }
      }
    }
  }
  return JSON.stringify(result);
}