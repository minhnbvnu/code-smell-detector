function buildSingleModuleSimpleServer (app, mod, conf, args) {
  if (!mod) {
    mod = conf.moduleConf.module;
  }
  conf = getConf(app, mod);
  del.sync(path.join(conf.modulePath, 'dist'));
  var allPromise = taskList.all($, conf.appConf, conf.moduleConf, args);
  var sassPromise = taskList.sass($, conf.appConf, conf.moduleConf, args);
  var lessPromise = taskList.less($, conf.appConf, conf.moduleConf, args);
  var transStaticPromise = taskList.trans_static($, conf.appConf, conf.moduleConf, args);
  var athenaMateServerPromise = taskList.athena_mate_server($, conf.appConf, conf.moduleConf, args);
  var transImagesPromise = taskList.trans_images($, conf.appConf, conf.moduleConf, args);
  var scriptsServerPromise = taskList.scripts_server($, conf.appConf, conf.moduleConf, args);
  var stylesServerPromise = taskList.styles_server($, conf.appConf, conf.moduleConf, args);
  var processorJSServerPromise = taskList.processor_js_server($, conf.appConf, conf.moduleConf, args);
  var injectServerPromise = taskList.inject_server($, conf.appConf, conf.moduleConf, args);
  var transOutputServerPromise = taskList.trans_output_server($, conf.appConf, conf.moduleConf, args);
  var tempServerPromise = taskList.temp_server($, conf.appConf, conf.moduleConf, args);
  $.util.log($.util.colors.green('开始编译模块' + mod + '！'));
  return allPromise(mod, conf.modulePath, conf.appPath)
    .then(sassPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(lessPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(transStaticPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(athenaMateServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(transImagesPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(scriptsServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(stylesServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(processorJSServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(injectServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(transOutputServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(tempServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
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