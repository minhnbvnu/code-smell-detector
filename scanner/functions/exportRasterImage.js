function exportRasterImage(imgPath, ab, format, settings) {
  // This constant is specified in the Illustrator Scripting Reference under ExportOptionsJPEG.
  var MAX_JPG_SCALE  = 776.19;
  var abPos = convertAiBounds(ab.artboardRect);
  var imageScale, exportOptions, fileType;

  if (settings.image_width) { // fixed width (used for promo image output)
    imageScale = 100 * settings.image_width / abPos.width;
  } else {
    imageScale =  100 * getOutputImagePixelRatio(abPos.width, abPos.height, format, settings.use_2x_images_if_possible);
  }

  if (format=='png') {
    fileType = ExportType.PNG8;
    exportOptions = new ExportOptionsPNG8();
    exportOptions.colorCount       = settings.png_number_of_colors;
    exportOptions.transparency     = isTrue(settings.png_transparent);

  } else if (format=='png24') {
    fileType = ExportType.PNG24;
    exportOptions = new ExportOptionsPNG24();
    exportOptions.transparency     = isTrue(settings.png_transparent);

  } else if (format=='jpg') {
    if (imageScale > MAX_JPG_SCALE) {
      imageScale = MAX_JPG_SCALE;
      warn(imgPath.split('/').pop() + ' was output at a smaller size than desired because of a limit on jpg exports in Illustrator.' +
        ' If the file needs to be larger, change the image format to png which does not appear to have limits.');
    }
    fileType = ExportType.JPEG;
    exportOptions = new ExportOptionsJPEG();
    exportOptions.qualitySetting = settings.jpg_quality;

  } else {
    warn('Unsupported image format: ' + format);
    return;
  }

  exportOptions.horizontalScale  = imageScale;
  exportOptions.verticalScale    = imageScale;
  exportOptions.artBoardClipping = true;
  exportOptions.antiAliasing     = false;
  app.activeDocument.exportFile(new File(imgPath), fileType, exportOptions);
}