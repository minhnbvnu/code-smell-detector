function getAndroidResourceIdentifier(asset) {
  var folderPath = getBasePath(asset);
  return (folderPath + '/' + asset.name)
    .toLowerCase()
    .replace(/\//g, '_')           // Encode folder structure in file name
    .replace(/([^a-z0-9_])/g, '')  // Remove illegal chars
    .replace(/^assets_/, '');      // Remove "assets_" prefix
}