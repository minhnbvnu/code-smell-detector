function getPublishImageFiles (imagesInclude) {
        var filesInfo = {};
        var base = '';
        if (!imagesInclude) {
          return filesInfo;
        }
        for (var i = 0; i < imagesInclude.length; i++) {
          var imageName = imagesInclude[i].res;
          var imageModuleName = imagesInclude[i].module;
          var imageHashName = null;
          if (imageModuleName === moduleConf.module) {
            imageHashName = Util.getHashName(imageName, mapJson);
            base = path.join(modulePath, 'dist', 'output');
          } else {
            base = path.join(appPath, imageModuleName, 'dist', 'output');
            if (!otherMapJsons[imageModuleName]) {
              var otherMapJsonPath = path.join(appPath, imageModuleName, 'dist', 'map.json');
              if (!Util.existsSync(otherMapJsonPath)) {
                $.util.log($.util.colors.red('模块' + imageModuleName + '不存在！'));
              }
              otherMapJsons[imageModuleName] = JSON.parse(String(fs.readFileSync(otherMapJsonPath)));
            }
            imageHashName = Util.getHashName(imageName, otherMapJsons[imageModuleName]);
          }
          if (!filesInfo[base]) {
            filesInfo[base] = [];
          }
          filesInfo[base].push(path.join(base, imageName));
          filesInfo[base].push(path.join(base, imageHashName));
        }
        return filesInfo;
      }