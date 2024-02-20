function initOrganizeIcons(context, params) {

  params.listIcon.forEach(async (icon, index) => {
    try {
      const newRootObject = createArtboard(context, index, icon.name(), params);
      if (String(icon.class()) === 'MSBitmapLayer') return importerProvider.addBITMAP(context, newRootObject, params, icon)
      const ancestry = MSImmutableLayerAncestry.ancestryWithMSLayer_(icon);
      const exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_(ancestry).firstObject();
      exportRequest.format = 'svg';
      const exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest, NSColorSpace.sRGBColorSpace());
      const svgData = NSString.alloc().initWithData_encoding(exporter.data(), NSUTF8StringEncoding);
      // await processSVG(context, newRootObject, params, String(svgData));
      importerProvider.addSVGNew(context, newRootObject, params, svgData, true);
      if (params.withColor) maskProvider.addColor(context, newRootObject, params);
      workingRootObject.push(newRootObject)
    } catch (e) {
      logger.error(e);
    }
  })
}