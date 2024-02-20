function buildSingleModuleSimple (app, mod, conf, args) {
  if (!mod) {
    mod = conf.moduleConf.module;
  }
  conf = getConf(app, mod);
  del.sync(path.join(conf.modulePath, 'dist'));
  var allPromise = taskList.all($, conf.appConf, conf.moduleConf, args);
  var athenaMatePromise = taskList.athena_mate($, conf.appConf, conf.moduleConf, args);
  var sassPromise = taskList.sass($, conf.appConf, conf.moduleConf, args);
  var lessPromise = taskList.less($, conf.appConf, conf.moduleConf, args);
  var transImagesPromise = taskList.trans_images($, conf.appConf, conf.moduleConf, args);
  var stylesPromise = taskList.styles($, conf.appConf, conf.moduleConf, args);
  var scriptsPromise = taskList.scripts($, conf.appConf, conf.moduleConf, args);
  var serveTransPromise = taskList.serve_trans($, conf.appConf, conf.moduleConf, args);
  var tempPromise = taskList.temp($, conf.appConf, conf.moduleConf, args);

  $.util.log($.util.colors.green('开始编译模块' + mod + '！'));
  return allPromise(mod, conf.modulePath, conf.appPath)
    .then(sassPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(lessPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(athenaMatePromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(transImagesPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(stylesPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(scriptsPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(serveTransPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(tempPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(function () {
      $.util.log($.util.colors.green('结束编译模块' + mod + '！'));
      return Promise.resolve(mod);
    }).catch(function (e) {
      if (e) {
        console.log(e.plugin);
        if (e.stack) {
          console.log(e.stack);
        }
      }
    });
}