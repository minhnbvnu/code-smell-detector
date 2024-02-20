function resolveArtboardImageFormat(setting, ab) {
  var fmt;
  if (setting == 'auto') {
    fmt = artboardContainsVisibleRasterImage(ab) ? 'jpg' : 'png';
  } else {
    fmt = setting;
  }
  return fmt;
}