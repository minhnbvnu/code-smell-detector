function addSVGNew(context, rootObject, params, svgData) {
  svgData = NSString.stringWithString(svgData);
  const svgImporter = MSSVGImporter.svgImporter();
  svgImporter.prepareToImportFromData(svgData.dataUsingEncoding(NSUTF8StringEncoding));
  const svgLayer = svgImporter.importAsLayer();
  rootObject.addLayers([svgLayer]);
  const svgLayerFrame = svgLayer.frame();
  const width = svgLayerFrame.width();
  const height = svgLayerFrame.height();

  svgLayerFrame.constrainProportions = true;

  if (width >= height) {
    svgLayer.setWidthRespectingProportions((params.artboardSize - 2 * params.iconPadding) + 0.01)
  } else {
    svgLayer.setHeightRespectingProportions((params.artboardSize - 2 * params.iconPadding) + 0.01)
  }
  svgLayerFrame.setX((params.artboardSize - svgLayerFrame.width()) / 2);
  svgLayerFrame.setY((params.artboardSize - svgLayerFrame.height()) / 2);
}