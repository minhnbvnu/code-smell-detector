function buildSingleModuleServer (app, mod, conf, args) {
  if (!mod) {
    mod = conf.moduleConf.module;
  }
  conf = getConf(app, mod);
  del.sync(path.join(conf.modulePath, 'dist'));
  var allPromise = taskList.all($, conf.appConf, conf.moduleConf, args);
  var sassPromise = taskList.sass($, conf.appConf, conf.moduleConf, args);
  var lessPromise = taskList.less($, conf.appConf, conf.moduleConf, args);
  var tplGetPromise = taskList.tpl_get($, conf.appConf, conf.moduleConf, args);
  var transStaticPromise = taskList.trans_static($, conf.appConf, conf.moduleConf, args);
  var athenaMateServerPromise = taskList.athena_mate_server($, conf.appConf, conf.moduleConf, args);
  var transImagesPromise = taskList.trans_images($, conf.appConf, conf.moduleConf, args);
  var scriptsServerPromise = taskList.scripts_server($, conf.appConf, conf.moduleConf, args);
  var stylesServerPromise = taskList.styles_server($, conf.appConf, conf.moduleConf, args);
  var imagesPromise = taskList.images($, conf.appConf, conf.moduleConf, args);
  var compressCSSServerPromise = taskList.compress_css_server($, conf.appConf, conf.moduleConf, args);
  var styleGetPromise = taskList.style_get($, conf.appConf, conf.moduleConf, args);
  var processorJSServerPromise = taskList.processor_js_server($, conf.appConf, conf.moduleConf, args);
  var compressJSServerPromise = taskList.compress_js_server($, conf.appConf, conf.moduleConf, args);
  var injectServerPromise = taskList.inject_server($, conf.appConf, conf.moduleConf, args);
  var revNoHashServerPromise = taskList.rev_no_hash_server($, conf.appConf, conf.moduleConf, args);
  var revServerPromise = taskList.rev_server($, conf.appConf, conf.moduleConf, args);
  var floorProcessPromise = taskList.floor_process($, conf.appConf, conf.moduleConf, args);
  var resourceConcatServerPromise = taskList.resource_concat_server($, conf.appConf, conf.moduleConf, args);
  var fetchCommonPromise = taskList.fetch_common($, conf.appConf, conf.moduleConf, args);
  var tempServerPromise = taskList.temp_server($, conf.appConf, conf.moduleConf, args);
  $.util.log($.util.colors.green('开始编译模块' + mod + '！'));
  return allPromise(mod, conf.modulePath, conf.appPath)
    .then(sassPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(lessPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(tplGetPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(transStaticPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(athenaMateServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(transImagesPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(scriptsServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(stylesServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(imagesPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(compressCSSServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(styleGetPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(processorJSServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(compressJSServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(injectServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
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
    .then(revServerPromise.bind(null, mod, conf.modulePath, conf.appPath), revNoHashServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(fetchCommonPromise.bind(null, mod, conf.modulePath, conf.appPath))
    .then(function () {
      if (args.release) {
        return floorProcessPromise(mod, conf.modulePath, conf.appPath);
      }
      return Promise.resolve();
    })
    .then(function () {
      if (args.allin) {
        return resourceConcatServerPromise(mod, conf.modulePath, conf.appPath);
      }
      return Promise.resolve();
    })
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