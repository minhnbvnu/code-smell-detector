function getRc(filePath, customOptions) {
  if (isObject(filePath)) {
    customOptions = filePath;
    filePath = null;
  }

  var cwd = process.cwd();

  customOptions = processExtends(cwd, customOptions);

  // if user sets the "preset" we don't load any other config file
  // we assume the "preset" overrides any user settings
  if (isTopLevel(customOptions)) {
    return customOptions;
  }

  // we search for config file starting from source directory or from cwd if
  // path is not provided
  var basedir = filePath ? path.dirname(filePath) : cwd;
  var rc = findAndMergeConfigs(basedir);
  if (isEmpty(rc) && basedir !== cwd) {
    rc = findAndMergeConfigs(cwd);
  }
  var tmpConfig = !isEmpty(rc) ? rc : getGlobalConfig();
  return mergeOptions(tmpConfig, customOptions);
}