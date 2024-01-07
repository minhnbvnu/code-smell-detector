function getCacheKeyForTileKey(tileKey) {
  const [z, x, y] = tileKey
    .substring(tileKey.lastIndexOf('/') + 1, tileKey.length)
    .split(',')
    .map(Number);
  return getKeyZXY(z, x, y);
}