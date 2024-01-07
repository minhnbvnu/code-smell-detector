function uploadAssets(assets) {
    return assets.reduce(function(promise, asset) {
      return promise.then(() => uploadAsset(asset));
    }, Promise.resolve());
  }