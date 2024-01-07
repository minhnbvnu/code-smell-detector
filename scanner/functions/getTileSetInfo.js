function getTileSetInfo(sourceInfo) {
  return getJSON(sourceInfo.url).then(function (tileSet) {
    return parseTileSetMetadata(sourceInfo, tileSet);
  });
}