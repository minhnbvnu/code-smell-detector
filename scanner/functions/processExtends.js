function processExtends(basePath, config) {
  if (config && config.extends) {
    // the last item in the array will override other settings
    var extended = toArray(config.extends).reduceRight(function(temp, pathOrObject) {
      var extended;
      if (isObject(pathOrObject)) {
        extended = pathOrObject;
      } else if (_presetReg.test(pathOrObject)) {
        // load the preset relative to the cwd, that way global esformatter
        // install will still be able to load the proper preset
        var moduleId = pathOrObject.replace(_presetReg, 'esformatter-preset-');
        var resolved = resolve(moduleId, {
          basedir: path.join(process.cwd(), basePath)
        });
        extended = require(resolved);
      } else {
        extended = loadAndParseConfig(path.join(basePath, pathOrObject));
      }
      invariantNestedExtends(pathOrObject, extended);
      return mergeOptions(temp, processExtends(basePath, extended));
    }, {});
    config = mergeOptions(extended, config);
  }

  return config;
}