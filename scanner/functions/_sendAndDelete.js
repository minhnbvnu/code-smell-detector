function _sendAndDelete(item, cb) {
    fs.readFile(path.join(storage.cachePath, item), 'utf8', (err, cacheContents) => {
      if (err) {
        l._error('RaygunOfflineCacheProvider: error reading cache error', err);
        return;
      }

      try {
        const errorOptions = JSON.parse(cacheContents);

        errorOptions.callback = (err, _res) => {
          if (err) {
            // cannot report the error to raygun yet
            return cb && cb(err);
          }

          _deleteError(item);
          cb && cb();
        };

        raygunTransport.send(errorOptions);
      } catch (e) {
        l._error('RaygunOfflineCacheProvider:', e);
        _deleteError(item);
      }
    });
  }