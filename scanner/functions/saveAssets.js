function saveAssets(
  assets,
  platform,
  assetsDest
) {
  if (!assetsDest) {
    console.warn('Assets destination folder is not set, skipping...');
    return Promise.resolve();
  }

  const getAssetDestPath = {
      'android': getAssetDestPathAndroid,
      'ubuntu': getAssetDestPathUbuntu,
      'ios': getAssetDestPathIOS
    }[platform];

  const filesToCopy = Object.create(null); // Map src -> dest
  assets
    .filter(asset => !asset.deprecated)
    .forEach(asset =>
      asset.scales.forEach((scale, idx) => {
        const src = asset.files[idx];
        const dest = path.join(assetsDest, getAssetDestPath(asset, scale));
        filesToCopy[src] = dest;
      })
    );

  return copyAll(filesToCopy);
}