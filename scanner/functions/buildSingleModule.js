function buildSingleModule (app, mod, conf, args) {
  if (!mod) {
    mod = conf.moduleConf.module;
  }
  conf = getConf(app, mod);
  del.sync(path.join(conf.modulePath, 'dist'));
  var allPromise = taskList.all($, conf.appConf, conf.moduleConf, args);
  var sassPromise = taskList.sass($, conf.appConf, conf.moduleConf, args);
  var lessPromise = taskList.less($, conf.appConf, conf.moduleConf, args);
  var athenaMatePromise = taskList.athena_mate($, conf.appConf, conf.moduleConf, args);
  var stylesAllinonePromise = taskList.allinone($, conf.appConf, conf.moduleConf, args);
  var transImagesPromise = taskList.trans_images($, conf.appConf, conf.moduleConf, args);
  var stylesPromise = taskList.styles($, conf.appConf, conf.moduleConf, args);
  var scriptsPromise = taskList.scripts($, conf.appConf, conf.moduleConf, args);
  var compressPromise = taskList.compress($, conf.appConf, conf.moduleConf, args);
  var fontsPromise = taskList.fonts($, conf.appConf, conf.moduleConf, args);
  var imagesPromise = taskList.images($, conf.appConf, conf.moduleConf, args);
  var revPromise = taskList.rev($, conf.appConf, conf.moduleConf, args);
  var revNoHashPromise = taskList.rev_no_hash($, conf.appConf, conf.moduleConf, args);
  var fetchCommonPromise = taskList.fetch_common($, conf.appConf, conf.moduleConf, args);
  var tempPromise = taskList.temp($, conf.appConf, conf.moduleConf, args);

  $.util.log($.util.colors.green('开始编译模块' + mod + '！'));
  return allPromise(mod, conf.modulePath, conf.appPath)
    .then(sassPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(lessPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(athenaMatePromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(stylesAllinonePromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(transImagesPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(stylesPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(scriptsPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(imagesPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(compressPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(fontsPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(function () {
      // 是否启用md5
      return new Promise(function (resolve, reject) {
        var support = conf.moduleConf.support;
        var useHash = support.useHash ? support.useHash : {
          enable: true
        };
        var enable = useHash.enable === undefined ? true : useHash.enable;
        if (enable) {
          resolve();
        } else {
          reject();
        }
      });
    })
    .then(revPromise.bind(null, mod, conf.modulePath, conf.appPath), revNoHashPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(fetchCommonPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(tempPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(function (result) {
      $.util.log($.util.colors.green('结束编译模块' + mod + '！'));
      return Promise.resolve(result);
    }).catch(function (e) {
      if (e) {
        console.log(e.plugin);
        if (e.stack) {
          console.log(e.stack);
        }
      }
    });
}