function addSVG(context, rootObject, params, svgData, withResize) {
  let viewBox;

  const settingsParams = settingsProvider.getSettings(context, 'default');

  svgData = NSString.stringWithString(svgData);

  viewBox = getViewBox(svgData);

  if (withResize) svgData = addRectToResize(svgData, viewBox);
  const svgImporter = MSSVGImporter.svgImporter();
  svgImporter.prepareToImportFromData(svgData.dataUsingEncoding(NSUTF8StringEncoding));
  const svgLayer = svgImporter.importAsLayer();

  removeTxt(svgLayer);

  rootObject.addLayer(svgLayer);

  if (utils.svgHasStroke(rootObject) && settingsParams.convertStroke.data === '1') convertStrokeToFill(rootObject)

  if (withResize) resizeIcon(rootObject, params.iconPadding);
  if (withResize) removeDeleteMeRect(rootObject);

  center(params.artboardSize, rootObject.firstLayer());
}