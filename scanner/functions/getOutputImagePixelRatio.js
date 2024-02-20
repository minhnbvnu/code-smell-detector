function getOutputImagePixelRatio(width, height, format, doubleres) {
  var k = isTrue(doubleres) ? 2 : 1;
  // thresholds may be obsolete
  var warnThreshold = format == 'jpg' ? 32*1024*1024 : 5*1024*1024; // jpg and png
  var pixels = width * height * k * k;
  if (pixels > warnThreshold) {
    warn('An output image contains ~' + Math.round(pixels / 1e6) + ' million pixels -- this may cause problems on mobile devices');
  }
  return k;
}