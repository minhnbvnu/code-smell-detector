function generatePublishFiles (moduleName, file, deployOptions, publishFiles) {
        var name = path.basename(file.path);
        var ext = path.extname(name);
        var p = Util.getStaticPath(file.path).path.replace(/\\/ig,'/');
        var publishP = deployOptions.assestPrefix + '/' + moduleName + '/' + p;
        if (Util.regexps.js.test(ext)
          || Util.regexps.css.test(ext)
          || Util.regexps.media.test(ext)
          && publishFiles.indexOf(publishP) < 0) {
          publishFiles.push(publishP);
        }
      }