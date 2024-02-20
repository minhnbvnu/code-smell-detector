function makeRelativeToCwdIfPossible(url) {
      if (/^file:\/\//.test(url)) {
        try {
          return pathModule.relative(
            process.cwd(),
            urlTools.fileUrlToFsPath(url)
          );
        } catch (err) {
          err.message = `Error while attempting to resolve working directory relative path for ${url}: ${err.message}`;
          this.assetGraph.emit('warn', err);
          return url;
        }
      } else {
        return url;
      }
    }