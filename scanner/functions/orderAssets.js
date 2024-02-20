function orderAssets (assets, options) {
  return options.manifestFirst
    ? Object.assign({}, ...sortAssets(assets))
    : assets
}