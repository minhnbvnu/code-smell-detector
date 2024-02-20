async function initImportIcons(context, params) {
  utils.clearSelection(context);
  params.listIcon.forEach((icon, index) => {
    try {
      const name = utils.getIconNameByNSUrl(icon)
      const newRootObject = createArtboard(context, index, name, params);
      const ext = String(icon.toString().split('.').pop()).toLowerCase()
      if (ext === 'pdf') return importerProvider.addPDF(context, newRootObject, params, icon);
      if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') return importerProvider.addBITMAP(context, newRootObject, params, icon)
      const svgData = String(NSString.alloc().initWithContentsOfURL(icon));
      processSVG(context, newRootObject, params, svgData)
      workingRootObject.push(newRootObject)
    } catch (e) {
      logger.error(e);
    }
  });
  utils.clearSelection(context);
}