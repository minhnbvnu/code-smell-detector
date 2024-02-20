function initAddMaskOnSelectedArtboards(context, params, rootObjects) {
  const settingsParams = settingsProvider.getSettings(context, 'default');
  rootObjects.forEach(async (rootObject) => {
    try {
      if (utils.svgHasStroke(rootObject.object) && settingsParams.convertStroke.data === '1') svgProvider.convertStrokeToFill(rootObject.object)
      // if (utils.hasMask(rootObject.object) && !utils.svgHasStroke(rootObject.object)) removeMask(context, rootObject.object);
      await addColor(context, rootObject.object, params)
    } catch (e) {
      console.log('>>>>>>>>>>>', e);
    }
  })
  utils.clearSelection(context)
}