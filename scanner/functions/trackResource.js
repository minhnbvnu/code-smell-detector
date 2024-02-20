function trackResource(filename, value, config) {
  var dirname = path.dirname(value);
  var dirnameArr = dirname.split('/');
  // 多媒体资源都在images下
  if (Util.regexps.media.test(value)) {
    var imagesIndex = dirnameArr.indexOf('images');
    value = value.split('/').splice(imagesIndex).join('/');
  }
  var distPath = path.join(config.cwd, config.module, 'dist', '_static');
  var gDistPath = path.join(config.cwd, appConf.common, 'dist', '_static');
  var refDistPathList = config.refModuleList.map(function (item) {
    return path.join(config.cwd, item, 'dist', '_static')
  })
  var valueParse = Util.getUrlParseSplit(value);
  var splitAfter = valueParse.split;
  var newValue = valueParse.pathname;
  value = newValue;
  if (path.dirname(value).length <= 1) {
    var extname = path.extname(value);
    if (extname.indexOf('.') >= 0 && extname.length > 1) {
      value = path.join('static', extname.slice(1), value);
    }
  }
  var resourcePath = path.join(distPath, value);
  var gResourcePath = path.join(gDistPath, value);
  var refResourcePathList = refDistPathList.map(function (item) {
    return path.join(item, value)
  })
  var moduleName = '';
  // 优先判断资源是否在当前模块
  // 在当前模块找到
  if (Util.existsSync(resourcePath)) {
    moduleName = config.module;
  } else {
    // 在公共模块找到
    if (Util.existsSync(gResourcePath)) {
      moduleName = appConf.common;
    } else {
      // 若在公共模块也没有找到，则在refModuleList中寻找
      for (var i = 0; i < refResourcePathList.length; i++) {
        if (Util.existsSync(refResourcePathList[i])) {
          moduleName = config.refModuleList[i]
          value += splitAfter
          return {
            module: moduleName,
            value: value
          }
        }
      }
      // 到处都找不到，则认为资源是不存在的资源，将模块设置成公共模块
      moduleName = appConf.common;
      gutil.log(gutil.colors.red('文件 ' + filename + ' 中引用资源 ' + value + ' 没有找到！'));
    }
  }
  value += splitAfter;
  return {
    module: moduleName,
    value: value
  };
}