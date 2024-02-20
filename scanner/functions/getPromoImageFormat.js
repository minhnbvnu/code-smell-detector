function getPromoImageFormat(ab, settings) {
  var fmt = settings.image_format[0];
  if (fmt == 'svg' || !fmt) {
    fmt = 'png';
  } else {
    fmt = resolveArtboardImageFormat(fmt, ab);
  }
  return fmt;
}