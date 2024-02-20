function exportSVG(ofile, ab, masks, items, settings) {
  // Illustrator's SVG output contains all objects in a document (it doesn't
  //   clip to the current artboard), so we copy artboard objects to a temporary
  //   document for export.
  var exportDoc = copyArtboardForImageExport(ab, masks, items);
  var opts = new ExportOptionsSVG();
  if (!exportDoc) return false;

  opts.embedAllFonts         = false;
  opts.fontSubsetting        = SVGFontSubsetting.None;
  opts.compressed            = false;
  opts.documentEncoding      = SVGDocumentEncoding.UTF8;
  opts.embedRasterImages     = isTrue(settings.svg_embed_images);
  // opts.DTD                   = SVGDTDVersion.SVG1_1;
  opts.DTD                   = SVGDTDVersion.SVGTINY1_2;
  opts.cssProperties         = SVGCSSPropertyLocation.STYLEATTRIBUTES;

  // SVGTINY* DTD variants:
  //  * Smaller file size (50% on one test file)
  //  * Convert raster/vector effects to external .png images (other DTDs use jpg)

  exportDoc.exportFile(new File(ofile), ExportType.SVG, opts);
  doc.activate();
  //exportDoc.pageItems.removeAll();
  exportDoc.close(SaveOptions.DONOTSAVECHANGES);
  return true;
}