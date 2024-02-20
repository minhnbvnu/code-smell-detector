function serveServer (conf, app, mod, args) {
  var isDist = args.dist ? args.dist : false;
  var appConf = conf.appConf;
  if (conf.buildType === BUILD_APP) {
    return build(app, mod, _.assign({ isSimple: !isDist }, args)).then(function () {
      var page = args ? args.page : undefined;
      var tempFolder = path.join(conf.appPath, '.temp');
      var serverParam = {
        baseDir: tempFolder,
        shortPath: appConf.app
      };
      if (page && mod) {
        if (_.isArray(mod)) {
          if (mod.length > 1) {
            gutil.log(gutil.colors.yellow('输入了多个模块，只取最后一个！'));
          }
          mod = mod[mod.length - 1];
        }
        serverParam.baseDir = tempFolder;
        serverParam.touchIndex = mod + '/' + page + '.html';
      }
      var silence = args.silence ? args.silence : false;
      var maltose = new Maltose({
        port: 35729,
        server: serverParam,
        silence: silence
      });
      maltose.serve();

      var moduleList = mod ? mod : appConf.moduleList;

      // 监听不同类型文件的改变
      // 监听page的html文件变动
      vfs.watch([
        '*/page/**/*.html'
      ], function (ev) {
        maltose.notify('正在编译，请稍等！');
        var fPath = ev.path;
        var moduleFolder = Util.getModuleInfoViaPath(fPath, conf.appPath);
        var modulePath = path.join(conf.appPath, moduleFolder);
        var moduleInnerPath = fPath.replace(modulePath, '');
        var dirname = path.dirname(moduleInnerPath);
        var dirnameArr = dirname.split(path.sep);
        var pageIndex = dirnameArr.indexOf('page');
        var pageName = dirnameArr.splice(pageIndex + 1, 1)[0];
        var moduleConf = require(path.join(modulePath, 'module-conf'));
        var args = { pageFiles: [fPath], type: ev.type };
        var copyFilePromise = taskList.copy_file($, appConf, moduleConf, {
          src: fPath,
          dest: path.join(modulePath, 'dist', '_', 'page', pageName)
        });
        var servePageServerPromise = taskList.serve_page_server($, appConf, moduleConf, args);
        copyFilePromise(mod, modulePath, conf.appPath)
          .then(servePageServerPromise.bind(null, mod, modulePath, conf.appPath))
          .then(function () {
            maltose.reload([path.join(conf.appPath, '.temp', appConf.app, moduleFolder, path.basename(fPath))]);
          });
      });

      // 监听widget的html文件变动
      vfs.watch([
        '*/widget/**/*.html'
      ], function (ev) {
        maltose.notify('正在编译，请稍等！');
        var fPath = ev.path;
        var moduleFolder = Util.getModuleInfoViaPath(fPath, conf.appPath);
        var modulePath = path.join(conf.appPath, moduleFolder);
        var moduleInnerPath = fPath.replace(modulePath, '');
        var dirname = path.dirname(moduleInnerPath);
        var dirnameArr = dirname.split(path.sep);
        var widgetIndex = dirnameArr.indexOf('widget');
        var widgetName = dirnameArr.splice(widgetIndex + 1, 1)[0];
        var currentUrl = maltose.getCurrentUrl();
        var mods = [];
        var isGbWidget = false;
        //module
        if (moduleFolder !== appConf.common) {
          mods = [moduleFolder];
        } else {
          mods = moduleList;
          isGbWidget = true;
        }
        var moduleInfoList = mods.map(function (item) {
          var dependency = null;
          var mapJsonPath = path.join(conf.appPath, item, 'dist', 'map.json');
          var staticConfPath = path.join(conf.appPath, item, 'static-conf.js');
          var staticConf = require(staticConfPath);
          var mapJson = null;
          if (Util.existsSync(mapJsonPath)) {
            mapJson = JSON.parse(fs.readFileSync(mapJsonPath).toString());
            dependency = mapJson.dependency;
          }
          var modulePath = path.join(conf.appPath, item);
          return {
            module: item,
            modulePath: modulePath,
            moduleConf: require(path.join(modulePath, 'module-conf')),
            dependency: dependency,
            staticConf: staticConf
          };
        });
        var serveTaskList = moduleInfoList.map(function (item) {
          var pages = [];
          if (item.dependency) {
            for (var i in item.dependency) {
              for (var j in item.dependency[i]) {
                if (item.dependency[i][j].widgetName === widgetName) {
                  pages.push(path.join(conf.appPath, item.module, 'page', path.basename(i, path.extname(i)), i));
                  break;
                }
              }
            }
          }
          if (isGbWidget || pages.length > 0) {
            var args = { pageFiles: pages, type: ev.type };
            var copyFilePromise = taskList.copy_file($, appConf, item.moduleConf, {
              src: fPath,
              dest: path.join(item.modulePath, 'dist', '_', 'widget', widgetName)
            });
            var servePageServerPromise = taskList.serve_page_server($, appConf, item.moduleConf, args);
            return {
              copyFile: copyFilePromise.bind(null, mod, item.modulePath, conf.appPath),
              servePage: servePageServerPromise.bind(null, mod, item.modulePath, conf.appPath)
            };
          }
        });
        serveTaskList = serveTaskList.filter(function (item) {
          if (item) {
            return item;
          }
        });
        serveTaskList.reduce(function (prev, curr, index) {
          var p;
          if (curr) {
            p = curr.copyFile().then(curr.servePage).catch(function (e) {
              if (e) {
                console.log(e.plugin);
                if (e.stack) {
                  console.log(e.stack);
                }
              }
            });
          }
          return p;
        }, Promise.resolve('start'))
          .then(function () {
            maltose.reload([path.join(conf.appPath, '.temp', appConf.app, moduleFolder, path.basename(currentUrl))]);
          })
          .catch(function (e) {
            if (e) {
              console.log(e.plugin);
              if (e.stack) {
                console.log(e.stack);
              }
            }
          });
      });

      // 监听page的sass/less/css/js文件的变动
      vfs.watch([
        '*/page/**/*.?(css|sass|scss|less|js)'
      ], function (ev) {
        maltose.notify('正在编译，请稍等！');
        var fPath = ev.path;
        var moduleFolder = Util.getModuleInfoViaPath(fPath, conf.appPath);
        var modulePath = path.join(conf.appPath, moduleFolder);
        var moduleConf = require(path.join(modulePath, 'module-conf'));
        var moduleInnerPath = fPath.replace(modulePath, '');
        var fileName = path.basename(moduleInnerPath);
        var dirname = path.dirname(moduleInnerPath);
        var dirnameArr = dirname.split(path.sep);
        var pageIndex = dirnameArr.indexOf('page');
        var pageName = dirnameArr.splice(pageIndex + 1, 1)[0];
        var fileDest = path.join(modulePath, 'dist', '_', 'page', pageName);

        var args = { fPath: fPath, type: ev.type, serveFolder: path.join('page', pageName) };
        var copyFilePromise = taskList.copy_file($, appConf, moduleConf, {
          src: fPath,
          dest: fileDest
        });
        var p = null;
        if (Util.regexps.js.test(fPath)) {
          p = taskList.serve_js_server($, appConf, moduleConf, args);
        } else {
          p = taskList.serve_css_server($, appConf, moduleConf, args);
        }
        copyFilePromise(mod, modulePath, conf.appPath)
          .then(p.bind(null, mod, modulePath, conf.appPath))
          .then(function () {
            maltose.reload([path.join(conf.appPath, '.temp', appConf.app, moduleFolder, pageName + '.html')]);
          });
      });

      // 监听widget的sass/less/css/js文件的变动
      vfs.watch([
        '*/widget/**/*.?(css|sass|scss|less|js)'
      ], function (ev) {
        maltose.notify('正在编译，请稍等！');
        var fPath = ev.path;
        var currentUrl = maltose.getCurrentUrl();
        var moduleFolder = Util.getModuleInfoViaPath(fPath, conf.appPath);
        var modulePath = path.join(conf.appPath, moduleFolder);
        var moduleConf = require(path.join(modulePath, 'module-conf'));
        var moduleInnerPath = fPath.replace(modulePath, '');
        var fileName = path.basename(moduleInnerPath);
        var dirname = path.dirname(moduleInnerPath);
        var dirnameArr = dirname.split(path.sep);
        var widgetIndex = dirnameArr.indexOf('widget');
        var widgetName = dirnameArr.splice(widgetIndex + 1, 1)[0];
        var fileDest = path.join(modulePath, 'dist', '_', 'widget', widgetName);

        var args = { fPath: fPath, type: ev.type, serveFolder: path.join('widget', widgetName) };
        var copyFilePromise = taskList.copy_file($, appConf, moduleConf, {
          src: fPath,
          dest: fileDest
        });
        var p = null;
        if (Util.regexps.js.test(fPath)) {
          p = taskList.serve_js_server($, appConf, moduleConf, args);
        } else {
          p = taskList.serve_css_server($, appConf, moduleConf, args);
        }
        copyFilePromise(mod, modulePath, conf.appPath)
          .then(p.bind(null, mod, modulePath, conf.appPath))
          .then(function () {
            maltose.reload([path.join(conf.appPath, '.temp', appConf.app, moduleFolder, path.basename(currentUrl))]);
          });
      });

      // 监听所有图片文件的变动
      vfs.watch([
        '*/page/**/images/**',
        '*/static/**/images/**',
        '*/widget/**/images/**'
      ], function (ev) {
        maltose.notify('正在编译，请稍等！');
        var fPath = ev.path;
        var moduleFolder = Util.getModuleInfoViaPath(fPath, conf.appPath);
        var modulePath = path.join(conf.appPath, moduleFolder);
        var moduleConf = require(path.join(modulePath, 'module-conf'));
        var fileTransfer = path.join(modulePath, 'dist', 'output', 'images');
        var fileDest = path.join(conf.appPath, '.temp', appConf.app, moduleFolder, 'images');
        var currentUrl = maltose.getCurrentUrl();
        if (ev.type === 'deleted') {
          var appInnerPath = fPath.replace(conf.appPath, '');
          var appInnerPathArr = appInnerPath.split(path.sep);
          var imagesIndex = appInnerPathArr.indexOf('images');
          var imagesPath = appInnerPathArr.splice(imagesIndex + 1).join(path.sep);
          del.sync(path.join(fileTransfer, imagesPath));
          del.sync(path.join(fileDest, imagesPath));
          maltose.reload([path.join(conf.appPath, '.temp', appConf.app, moduleFolder, path.basename(currentUrl))]);
        } else {
          var copyTransPromise = taskList.copy_file($, appConf, moduleConf, {
            src: fPath,
            dest: fileTransfer
          });
          var copyFilePromise = taskList.copy_file($, appConf, moduleConf, {
            src: fPath,
            dest: fileDest
          });
          copyTransPromise(mod, modulePath, conf.appPath)
            .then(copyFilePromise.bind(null, mod, modulePath, conf.appPath))
            .then(function () {
              maltose.reload([path.join(conf.appPath, '.temp', appConf.app, moduleFolder, path.basename(currentUrl))]);
            });
        }
      });

      // 修改static目录下的sass/less/css/js文件
      vfs.watch([
        '*/static/**/*.?(css|sass|scss|less|js)'
      ], function (ev) {
        maltose.notify('正在编译，请稍等！');
        var fPath = ev.path;
        var currentUrl = maltose.getCurrentUrl();
        var moduleFolder = Util.getModuleInfoViaPath(fPath, conf.appPath);
        var modulePath = path.join(conf.appPath, moduleFolder);
        var moduleConf = require(path.join(modulePath, 'module-conf'));
        var moduleInnerPath = fPath.replace(modulePath, '');
        var dirname = path.dirname(moduleInnerPath);
        var dirnameArr = dirname.split(path.sep);
        var staticIndex = dirnameArr.indexOf('static');
        var staticAfter = dirnameArr.splice(staticIndex + 1).join(path.sep);
        var fileDest = path.join(modulePath, 'dist', '_', 'static', staticAfter);

        var copyFilePromise = taskList.copy_file($, appConf, moduleConf, {
          src: fPath,
          dest: fileDest
        });
        var args = {
          fPath: fPath,
          type: ev.type,
          serveFolder: path.join('static', staticAfter),
          needConcat: true,
          needGraphCheck: true
        };
        var p = null;
        if (Util.regexps.js.test(fPath)) {
          p = taskList.serve_js_server($, appConf, moduleConf, args);
        } else {
          p = taskList.serve_css_server($, appConf, moduleConf, args);
        }
        copyFilePromise(mod, modulePath, conf.appPath)
          .then(p.bind(null, mod, modulePath, conf.appPath))
          .then(function () {
            maltose.reload([path.join(conf.appPath, '.temp', appConf.app, moduleFolder, path.basename(currentUrl))]);
          });
      });

      // 监听*-conf.js的改动，重新编译模块
      vfs.watch([
        '*/*-conf.js'
      ], function (ev) {
        maltose.notify('正在编译，请稍等！');
        var fPath = ev.path;
        var moduleFolder = Util.getModuleInfoViaPath(fPath, conf.appPath);
        var currentUrl = maltose.getCurrentUrl();
        buildSingleModuleSimpleServer(app, moduleFolder, conf, args).then(function () {
          maltose.reload([path.join(conf.appPath, '.temp', appConf.app, moduleFolder, path.basename(currentUrl))]);
        });
      });
    });
  } else if (conf.buildType === BUILD_MODULE) {
    if (!mod) {
      mod = conf.moduleConf.module;
    }
    var moduleConf = conf.moduleConf;
    var buildModuleFunction = isDist ? buildSingleModuleServer : buildSingleModuleSimpleServer;
    return buildModuleFunction(app, mod, conf, args)
      .catch(function (err) {
        console.log(err);
      })
      .then(function () {
        var dependency = null;
        var mapJsonPath = path.join(conf.modulePath, 'dist', 'map.json');
        var mapJson = null;
        var staticConfPath = path.join(conf.modulePath, 'static-conf.js');
        var staticConf = require(staticConfPath);

        if (Util.existsSync(mapJsonPath)) {
          mapJson = JSON.parse(fs.readFileSync(mapJsonPath).toString());
          dependency = mapJson.dependency;
        }
        var page = args ? args.page : undefined;
        var tempFolder = path.join(conf.appPath, '.temp');
        var serverParam = {
          baseDir: tempFolder,
          shortPath: appConf.app
        };

        if (page) {
          serverParam.baseDir = tempFolder;
          serverParam.touchIndex = conf.moduleConf.module + '/' + page + '.html';
        }
        $.util.log($.util.colors.green('预览' + mod + '模块...'));
        var silence = args.silence ? args.silence : false;
        var maltose = new Maltose({
          port: 35729,
          server: serverParam,
          silence: silence
        });
        maltose.serve();
        // 监听page的html文件变动
        vfs.watch([
          'page/**/*.html'
        ], function (ev) {
          maltose.notify('正在编译，请稍等！');
          var fPath = ev.path;
          var moduleInnerPath = fPath.replace(conf.modulePath, '');
          var dirname = path.dirname(moduleInnerPath);
          var dirnameArr = dirname.split(path.sep);
          var pageIndex = dirnameArr.indexOf('page');
          var pageName = dirnameArr.splice(pageIndex + 1, 1)[0];
          var args = { pageFiles: [fPath], type: ev.type };
          var copyFilePromise = taskList.copy_file($, appConf, moduleConf, {
            src: fPath,
            dest: path.join(conf.modulePath, 'dist', '_', 'page', pageName)
          });
          var servePageServerPromise = taskList.serve_page_server($, appConf, moduleConf, args);
          copyFilePromise(mod, conf.modulePath, conf.appPath)
            .then(servePageServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
            .then(function () {
              maltose.reload([path.join(conf.appPath, '.temp', appConf.app, mod, path.basename(fPath))]);
            });
        });

        // 监听widget的html文件变动
        vfs.watch([
          'widget/**/*.html'
        ], function (ev) {
          maltose.notify('正在编译，请稍等！');
          var fPath = ev.path;
          var moduleInnerPath = fPath.replace(conf.modulePath, '');
          var dirname = path.dirname(moduleInnerPath);
          var dirnameArr = dirname.split(path.sep);
          var widgetIndex = dirnameArr.indexOf('widget');
          var widgetName = dirnameArr.splice(widgetIndex + 1, 1)[0];
          var pages = [];
          var currentUrl = maltose.getCurrentUrl();
          if (dependency) {
            for (var i in dependency) {
              for (var j in dependency[i]) {
                if (dependency[i][j].widgetName === widgetName) {
                  pages.push(path.join(conf.modulePath, 'page', path.basename(i, path.extname(i)), i));
                  break;
                }
              }
            }
          }

          var args = { pageFiles: pages, type: ev.type };
          var copyFilePromise = taskList.copy_file($, conf.appConf, conf.moduleConf, {
            src: fPath,
            dest: path.join(conf.modulePath, 'dist', '_', 'widget', widgetName)
          });
          var servePageServerPromise = taskList.serve_page_server($, appConf, conf.moduleConf, args);
          copyFilePromise(mod, conf.modulePath, conf.appPath)
            .then(servePageServerPromise.bind(null, mod, conf.modulePath, conf.appPath))
            .then(function () {
              maltose.reload([path.join(conf.appPath, '.temp', appConf.app, mod, path.basename(currentUrl))]);
            });
        });

        // 监听page的sass/less/css/js文件的变动
        vfs.watch([
          'page/**/*.?(css|sass|scss|less|js)'
        ], function (ev) {
          maltose.notify('正在编译，请稍等！');
          var fPath = ev.path;
          var moduleInnerPath = fPath.replace(conf.modulePath, '');
          var fileName = path.basename(moduleInnerPath);
          var dirname = path.dirname(moduleInnerPath);
          var dirnameArr = dirname.split(path.sep);
          var pageIndex = dirnameArr.indexOf('page');
          var pageName = dirnameArr.splice(pageIndex + 1, 1)[0];
          var fileDest = path.join(conf.modulePath, 'dist', '_', 'page', pageName);
          var args = { fPath: fPath, type: ev.type, serveFolder: path.join('page', pageName) };
          var copyFilePromise = taskList.copy_file($, conf.appConf, conf.moduleConf, {
            src: fPath,
            dest: fileDest
          });
          var p = null;
          if (/\.js/.test(path.extname(fPath))) {
            p = taskList.serve_js_server($, appConf, conf.moduleConf, args);
          } else {
            p = taskList.serve_css_server($, appConf, conf.moduleConf, args);
          }

          copyFilePromise(mod, conf.modulePath, conf.appPath)
            .then(p.bind(null, mod, conf.modulePath, conf.appPath))
            .then(function () {
              maltose.reload([path.join(conf.appPath, '.temp', appConf.app, mod, pageName + '.html')]);
            });
        });

        // 监听widget的sass/less/css/js文件的变动
        vfs.watch([
          'widget/**/*.?(css|sass|scss|less|js)'
        ], function (ev) {
          maltose.notify('正在编译，请稍等！');
          var fPath = ev.path;
          var moduleInnerPath = fPath.replace(conf.modulePath, '');
          var fileName = path.basename(moduleInnerPath);
          var dirname = path.dirname(moduleInnerPath);
          var dirnameArr = dirname.split(path.sep);
          var widgetIndex = dirnameArr.indexOf('widget');
          var widgetName = dirnameArr.splice(widgetIndex + 1, 1)[0];
          var currentUrl = maltose.getCurrentUrl();
          var fileDest = path.join(conf.modulePath, 'dist', '_', 'widget', widgetName);
          var args = { fPath: fPath, type: ev.type, serveFolder: path.join('widget', widgetName) };
          var copyFilePromise = taskList.copy_file($, conf.appConf, conf.moduleConf, {
            src: fPath,
            dest: fileDest
          });
          var p = null;
          if (/\.js/.test(path.extname(fPath))) {
            p = taskList.serve_js_server($, appConf, conf.moduleConf, args);
          } else {
            p = taskList.serve_css_server($, appConf, conf.moduleConf, args);
          }

          copyFilePromise(mod, conf.modulePath, conf.appPath)
            .then(p.bind(null, mod, conf.modulePath, conf.appPath))
            .then(function () {
              maltose.reload([path.join(conf.appPath, '.temp', appConf.app, mod, path.basename(currentUrl))]);
            });
        });

        // 监听所有图片文件的变动
        vfs.watch([
          'page/**/images/**',
          'static/**/images/**',
          'widget/**/images/**'
        ], function (ev) {
          maltose.notify('正在编译，请稍等！');
          var fPath = ev.path;
          var fileDest = path.join(conf.appPath, '.temp', appConf.app, mod, 'images');
          var fileTransfer = path.join(conf.modulePath, 'dist', 'output', 'images');
          var currentUrl = maltose.getCurrentUrl();
          if (ev.type === 'deleted') {
            var moduleInnerPath = fPath.replace(conf.modulePath, '');
            var moduleInnerPathArr = moduleInnerPath.split(path.sep);
            var imagesIndex = moduleInnerPathArr.indexOf('images');
            var imagesPath = moduleInnerPathArr.splice(imagesIndex + 1).join(path.sep);
            del.sync(path.join(fileTransfer, imagesPath));
            del.sync(path.join(fileDest, imagesPath), { force: true });
            maltose.reload([path.join(conf.appPath, '.temp', appConf.app, mod, path.basename(currentUrl))]);
          } else {
            var copyTransPromise = taskList.copy_file($, appConf, conf.moduleConf, {
              src: fPath,
              dest: fileTransfer
            });
            var copyFilePromise = taskList.copy_file($, appConf, conf.moduleConf, {
              src: fPath,
              dest: fileDest
            });
            copyTransPromise(mod, conf.modulePath, conf.appPath)
              .then(copyFilePromise.bind(null, mod, conf.modulePath, conf.appPath))
              .then(function () {
                maltose.reload([path.join(conf.appPath, '.temp', appConf.app, mod, path.basename(currentUrl))]);
              });
          }
        });

        // 修改static目录下的sass/less/css/js文件
        vfs.watch([
          'static/**/*.?(css|sass|scss|less|js)'
        ], function (ev) {
          maltose.notify('正在编译，请稍等！');
          var fPath = ev.path;
          var moduleInnerPath = fPath.replace(conf.modulePath, '');
          var dirname = path.dirname(moduleInnerPath);
          var dirnameArr = dirname.split(path.sep);
          var staticIndex = dirnameArr.indexOf('static');
          var staticAfter = dirnameArr.splice(staticIndex + 1).join(path.sep);
          var currentUrl = maltose.getCurrentUrl();
          var fileDest = path.join(conf.modulePath, 'dist', '_', 'static', staticAfter);
          var args = {
            fPath: fPath,
            type: ev.type,
            serveFolder: path.join('static', staticAfter),
            needConcat: true,
            needGraphCheck: true
          };
          var copyFilePromise = taskList.copy_file($, conf.appConf, conf.moduleConf, {
            src: fPath,
            dest: fileDest
          });
          var p = null;
          if (/\.js/.test(path.extname(fPath))) {
            p = taskList.serve_js_server($, appConf, conf.moduleConf, args);
          } else {
            p = taskList.serve_css_server($, appConf, conf.moduleConf, args);
          }

          copyFilePromise(mod, conf.modulePath, conf.appPath)
            .then(p.bind(null, mod, conf.modulePath, conf.appPath))
            .then(function () {
              maltose.reload([path.join(conf.appPath, '.temp', appConf.app, mod, path.basename(currentUrl))]);
            });
        });

        // 监听*-conf.js的改动，重新编译模块
        vfs.watch([
          '*-conf.js'
        ], function () {
          maltose.notify('正在编译，请稍等！');
          var currentUrl = maltose.getCurrentUrl();
          buildSingleModuleSimpleServer(app, mod, conf, args).then(function () {
            maltose.reload([path.join(conf.appPath, '.temp', appConf.app, mod, path.basename(currentUrl))]);
          });
        });
      });
  }
}