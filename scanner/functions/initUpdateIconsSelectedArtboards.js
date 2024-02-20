function initUpdateIconsSelectedArtboards(context, rootObjects, params) {
  rootObjects.forEach((rootObject, index) => {

    const iconParams = {
      ...maskProvider.getMaskPropertiesFromArtboard(context, rootObject.object),
      ...artboardProvider.getPaddingAndSize(context, rootObject.object),
      ...params
    };
    const replaceBy = (params.listIcon.length === 1) ? params.listIcon[0] : params.listIcon[index];
    rootObject.object.removeAllLayers();
    iconParams.withColor = !!(iconParams.colorLib || iconParams.colorPicker || iconParams.color);

    const ext = String(replaceBy.toString().split('.').pop()).toLowerCase()
    if (ext === 'pdf') {
      addPDF(context, rootObject.object, iconParams, replaceBy)
      if (iconParams.withColor) maskProvider.addColor(context, rootObject.object, iconParams);
    }
    else if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
      addBITMAP(context, rootObject.object, iconParams, replaceBy)
    }
    else {
      const svgData = String(NSString.alloc().initWithContentsOfURL(replaceBy));
      addSVG(context, rootObject.object, iconParams, String(svgData), true);
      if (iconParams.withColor) maskProvider.addColor(context, rootObject.object, iconParams);
    }
    rootObject.object.setName(utils.getIconNameByNSUrl(replaceBy));

  });

  utils.clearSelection(context);

  return rootObjects.length
}