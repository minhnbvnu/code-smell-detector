function _deleteError(item) {
    fs.unlink(path.join(storage.cachePath, item), err => {
      if (err) {
        l._error('RaygunOfflineCacheProvider: error removing old cache error', err);
      }
    });
  }