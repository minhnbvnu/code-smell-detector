function getAssetDestPathIOS(asset, scale) {
  const suffix = scale === 1 ? '' : '@' + scale + 'x';
  const fileName = asset.name + suffix + '.' + asset.type;
  return path.join(asset.httpServerLocation.substr(1), fileName);
}