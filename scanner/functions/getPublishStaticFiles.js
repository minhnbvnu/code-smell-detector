function getPublishStaticFiles (staticInclude, type) {
        var filesInfo = {};
        var base = '';
        if (!staticInclude) {
          return filesInfo;
        }
        for (var i = 0; i < staticInclude.length; i++) {
          var staticName = staticInclude[i].name;
          var staticHashName = null;
          var staticModuleName = staticInclude[i].module;
          if (staticModuleName === moduleConf.module) {
            staticHashName = Util.getHashName(type + '/' + staticName, mapJson);
            base = path.join(modulePath, 'dist', 'output');
          } else {
            base = path.join(appPath, staticModuleName, 'dist', 'output');
            if (!otherMapJsons[staticModuleName]) {
              var otherMapJsonPath = path.join(appPath, staticModuleName, 'dist', 'map.json');
              if (!Util.existsSync(otherMapJsonPath)) {
                $.util.log($.util.colors.red('模块' + staticModuleName + '不存在！'));
              }
              otherMapJsons[staticModuleName] = JSON.parse(String(fs.readFileSync(otherMapJsonPath)));
            }
            staticHashName = Util.getHashName(type + '/' + staticName, otherMapJsons[staticModuleName]);
          }
          if (!filesInfo[base]) {
            filesInfo[base] = [];
          }
          filesInfo[base].push(path.join(base, type, staticName));
          filesInfo[base].push(path.join(base, staticHashName));
          if (type === 'css') {
            var originFailoverFile = path.join(base, type, 'failover_' + staticName)
            if (fs.existsSync(originFailoverFile)) {
              filesInfo[base].push(originFailoverFile)
            }
            var hashedFailoverFile = path.join(base, path.dirname(staticHashName) + '/failover_' + path.basename(staticHashName))
            if (fs.existsSync(originFailoverFile)) {
              filesInfo[base].push(hashedFailoverFile)
            }
          }
          var imagesInfo = getPublishImageFiles(staticInclude[i].images);
          filesInfo = _.mergeWith(filesInfo, imagesInfo, mergeArrayConcatCustomizer);
        }
        return filesInfo;
      }