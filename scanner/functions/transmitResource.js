function transmitResource(filename, value, moduleName, config, includeJson, needMd5) {
  var valueInfo = trackResource(filename, value, config);
  value = valueInfo.value.replace(/\\/ig, '/');
  moduleName = valueInfo.module;
  var mapJSONModuleCache = mapJSONCache[moduleName];
  if (!mapJSONModuleCache || _.isEmpty(mapJSONModuleCache)) {
    mapJSONCache[moduleName] = Util.readJsonFile(path.join(config.cwd, moduleName, 'dist', 'map.json'));
  }
  if (Util.regexps.media.test(value)) {
    includeJson[filename] = includeJson[filename] ? includeJson[filename] : [];
    var isResExist = false;
    includeJson[filename].forEach(function (item) {
      if (item.res === value) {
        isResExist = true;
      }
    });
    if (!isResExist) {
      includeJson[filename].push({
        res: value,
        module: moduleName
      });
    }
  }
  var pathname = path.join(path.join(config.cwd, moduleName, 'dist', 'output', 's', value), '..', path.basename(value));
  var query = Util.getQueryObj(pathname);
  var size;
  var _pathname = pathname.split('?')[0];
  if (Util.regexps.images.test(path.basename(_pathname)) && Util.existsSync(_pathname)) {
    // 判断是否有__inline标或者是打开了base64开关被excluded
    var baseExclude = config.base64Opts.exclude;
    if (query.__inline || config.base64Opts.enable && (!baseExclude || _.isArray(baseExclude) && baseExclude.indexOf(value) === -1)) {
      
      try {
        size = fs.statSync(_pathname).size;
        if (query.__inline || size < config.base64Opts.size) {
          return Util.transform2DataURI(_pathname);
        }
      }
      catch (e) {
        gutil.log(gutil.colors.red('无法转base64，文件' + _pathname + '没有找到！'));
        return value;
      }
    }
  }
  var mapJson = mapJSONCache[moduleName];
  if (mapJson && needMd5) {
    value = Util.getHashNameServer(value, mapJson);
  }
  value = '/' + moduleName + '/' + value;
  return value;
}