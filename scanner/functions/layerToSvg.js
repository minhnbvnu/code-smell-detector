function layerToSvg(layer) {
  const svgExporter = SketchSVGExporter.alloc().init();
  const svgData = svgExporter.exportLayers([layer.immutableModelObject()]);
  return NSString.alloc().initWithData_encoding(svgData, NSUTF8StringEncoding);
}