function addPDF(context, rootObject, params, icon) {
  const pdfImporter = MSPDFImporter.pdfImporter();
  pdfImporter.prepareToImportFromURL(icon);
  let pdfLayer = pdfImporter.importAsLayer();
  if (String(pdfLayer.class()) === 'MSArtboardGroup') {
    const group = MSLayerGroup.new();
    group.addLayers(pdfLayer.layers());
    group.resizeToFitChildrenWithOption(1);
    pdfLayer = group;
  }
  rootObject.addLayer(pdfLayer);
  const pdfLayerFrame = pdfLayer.frame();
  const width = pdfLayerFrame.width();
  const height = pdfLayerFrame.height();
  pdfLayerFrame.constrainProportions = true;
  if (width >= height) {
    pdfLayer.setWidthRespectingProportions((params.artboardSize - 2 * params.iconPadding) + 0.01)
  } else {
    pdfLayer.setHeightRespectingProportions((params.artboardSize - 2 * params.iconPadding) + 0.01)
  }
  pdfLayerFrame.setX((params.artboardSize - pdfLayerFrame.width()) / 2);
  pdfLayerFrame.setY((params.artboardSize - pdfLayerFrame.height()) / 2);
}