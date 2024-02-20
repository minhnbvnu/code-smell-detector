function createPromoImage(settings) {
  var abIndex = findLargestArtboard();
  if (abIndex == -1) return; // TODO: show error
  var ab = doc.artboards[abIndex],
      format = getPromoImageFormat(ab, settings),
      imgFile = getImageFileName(getDocumentSlug() + '-promo', format),
      outputPath = docPath + imgFile,
      opts = {
        image_width: settings.promo_image_width || 1024,
        jpg_quality: settings.jpg_quality,
        png_number_of_colors: settings.png_number_of_colors,
        png_transparent: false
      };
  doc.artboards.setActiveArtboardIndex(abIndex);
  exportRasterImage(outputPath, ab, format, opts);
  alert('Promo image created\nLocation: ' + outputPath);
}