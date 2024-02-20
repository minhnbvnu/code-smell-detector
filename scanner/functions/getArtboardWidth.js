function getArtboardWidth(ab) {
  var abSettings = getArtboardSettings(ab);
  return abSettings.width || convertAiBounds(ab.artboardRect).width;
}