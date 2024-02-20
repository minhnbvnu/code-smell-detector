function captureArtboardImage(imgName, ab, masks, settings) {
  var formats = settings.image_format;
  var imgHtml;

  // This test can be expensive... consider enabling the empty artboard test only if an option is set.
  // if (testEmptyArtboard(ab)) return '';

  if (!formats.length) {
    warnOnce('No images were created because no image formats were specified.');
    return '';
  }

  if (formats[0] != 'auto' && formats[0] != 'jpg' && artboardContainsVisibleRasterImage(ab)) {
    warnOnce('An artboard contains a raster image -- consider exporting to jpg instead of ' +
        formats[0] + '.');
  }

  forEach(formats, function(fmt) {
    var html;
    fmt = resolveArtboardImageFormat(fmt, ab);
    html = exportImage(imgName, fmt, ab, masks, null, settings);
    if (!imgHtml) {
      // use embed code for first of multiple formats
      imgHtml = html;
    }
  });
  return imgHtml;
}