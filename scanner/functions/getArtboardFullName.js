function getArtboardFullName(ab, settings) {
  var suffix = '';
  if (settings.grouped_artboards) {
    suffix = "-" + Math.round(convertAiBounds(ab.artboardRect).width);
  }
  return getDocumentArtboardName(ab) + suffix;
}