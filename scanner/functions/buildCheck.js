function buildCheck (app, mod, conf, args, buildSingleFn) {
  var appConf = conf.appConf;
  if (conf.buildType === BUILD_NONE) {
    $.util.log($.util.colors.red('没要找到可编译的项目或模块，请找到正确目录重新尝试！'));
    return false;
  }

  // 如果编译项目没有指定模块，则顺序编译项目中每一个模块
  if (conf.buildType === BUILD_APP) {
    var moduleList = [];
    if (mod) {
      moduleList = mod;
    } else {
      moduleList = appConf.moduleList;
      $.util.log($.util.colors.yellow('Allo Allo! Begin to build app ' + appConf.app + '!'));
    }

    var promsies = [];
    for (var i = 0; i < moduleList.length; i ++) {
      del.sync(path.join(conf.appPath, '.temp', appConf.app, moduleList[i]));
      promsies[i] = i;
    }
    var generateIncludePromise = taskList.generate_include($, appConf, conf.moduleConf, args);
    return promsies.reduce(function (prev, curr) {
      return prev.then(function (val) {
        return buildSingleFn(app, moduleList[curr], conf, args);
      });
    }, Promise.resolve('start'))
      .then(function () {
        if (args.pack || args.compress || args.release) {
          generateIncludePromise(mod, conf.modulePath, conf.appPath)
            .then(function () {
              var archiver = require('archiver');
              var archive = archiver('zip', {});
              var zipName = appConf.app + '.zip';
              var output = fs.createWriteStream(path.join(conf.appPath, zipName));
              output.on('close', function () {
                gutil.log(gutil.colors.green('打包完毕！文件在 ' + path.join(conf.appPath, zipName)));
              });
              archive.on('error', function(err){
                throw err;
              });
              archive.pipe(output);
              archive.bulk([
                {
                  expand: true,
                  cwd: path.join(conf.appPath, '.temp'),
                  src: ['**/*']
                }
              ]);
              archive.finalize();
            });
        }
      }).catch(function (e) {
        if (e) {
          console.log(e.plugin);
          if (e.stack) {
            console.log(e.stack);
          }
        }
      });
  } else if (conf.buildType === BUILD_MODULE) {
    del.sync(path.join(conf.appPath, '.temp', appConf.app, conf.moduleConf.module), { force: true });
    return buildSingleFn(app, mod, conf, args);
  }
}