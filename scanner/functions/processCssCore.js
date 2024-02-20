function processCssCore (moduleName) {
          return new Promise(function (res, rej) {
            vfs.src(allCompiledCssFiles[moduleName], {base: path.join(appPath, moduleName, 'dist', '_')})
              .pipe(athenaMate.plumber())
              .pipe($.postcss(processors))
              .pipe(vfs.dest(path.join(appPath, moduleName, 'dist', '_static')))
              .on('finish', function () {
                var fileContents = [];
                vfs.src(path.join(appPath, moduleName, 'dist', '_static', '**', '*.css'))
                  .pipe(through2.obj(function (file, enc, cb) {
                    if (file.isNull() || file.isStream()) {
                      return cb(null, file);
                    }
                    fileContents.push('/*filepath=' + file.path + '*/\n' + file.contents.toString());
                    cb();
                  }, function (cb) {
                    var file = new $.util.File({
                      path: path.join(modulePath, 'dist', '_static', 'css', 'sprite.css'),
                      base: path.join(modulePath, 'dist', '_static', 'css'),
                      contents: new Buffer(fileContents.join('\n/*sprite_file_split*/\n'))
                    });
                    this.push(file);
                    cb();
                  }))
                  .pipe($.postcss([sprites(opts)]))
                  .pipe(through2.obj(function (file, enc, cb) {
                    if (file.isNull() || file.isStream()) {
                      return cb(null, file);
                    }
                    var content = file.contents.toString();
                    fileContents = content.split('/*sprite_file_split*/');
                    fileContents.forEach(function (item) {
                      var reg = /filepath=(.*)\*/;
                      var filepath = item.match(reg)[1];
                      var file = new $.util.File({
                        path: filepath,
                        base: path.join(modulePath, 'dist', '_static'),
                        contents: new Buffer(item)
                      });
                      this.push(file);
                    }.bind(this));
                    cb();
                  }))
                  .pipe(vfs.dest(path.join(modulePath, 'dist', '_static')))
                  .pipe(vfs.dest(path.join(appPath, moduleName, 'dist', 'output', 's')))
                  .pipe(athenaMate.replaceServer({
                    cwd: appPath,
                    module: moduleName,
                    refModuleList: moduleConf.refModuleList || [],
                    serve: true
                  }))
                  .pipe(vfs.dest(path.join(appPath, '.temp', appConf.app, moduleName)))
                  .on('end', res)
                  .on('error', rej);
              }).on('error', rej);
          });
        }