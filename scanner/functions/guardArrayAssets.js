function guardArrayAssets(assets) {
    if (isArray(assets)) {
      var res = {};
      var i = assets.length;
      var asset;
      while (i--) {
        asset = assets[i];
        var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
        if (!id) {
          'development' !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
        } else {
          res[id] = asset;
        }
      }
      return res;
    }
    return assets;
  }