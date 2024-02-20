function getAssetDestPathAndroid(asset, scale) {
  const androidFolder = assetPathUtils.getAndroidDrawableFolderName(asset, scale);
  const fileName =  assetPathUtils.getAndroidResourceIdentifier(asset);
  return path.join(androidFolder, fileName + '.' + asset.type);
}