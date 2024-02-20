async function getAssets(_skpmConfig) {
  if (!_skpmConfig.assets || !_skpmConfig.assets.length) {
    return []
  }

  const assets = await globby(_skpmConfig.assets, { dot: true })
  return assets
}