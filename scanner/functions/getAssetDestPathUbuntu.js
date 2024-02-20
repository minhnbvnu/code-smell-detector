function getAssetDestPathUbuntu(asset, scale) {
  return path.join('share', asset.httpServerLocation.substr(1), asset.name + '.' + asset.type);
}