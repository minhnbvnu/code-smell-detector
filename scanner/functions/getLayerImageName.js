function getLayerImageName(lyr, ab, settings) {
  return getArtboardImageName(ab, settings) + '-' + getLayerName(lyr);
}