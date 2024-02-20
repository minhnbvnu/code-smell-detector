function getBundleAsset(release) {
  return release.assets.find(asset => {
    return asset.name.match(/^yarn-[0-9]+\.[0-9]+\.[0-9]+\.js$/);
  });
}