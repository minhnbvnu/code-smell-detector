function countEmittedAssets (assets) {
  return assets.filter(function (asset) { return asset.emitted }).length
}