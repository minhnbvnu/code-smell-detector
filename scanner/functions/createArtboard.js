function createArtboard(context, index, name, params) {

  const marginBetweenRootObject = settingsProvider.getSettings(context, 'default').marginBetweenRootObject;
  const space = utils.getSizeBetweenIcon(artboardParams.width, marginBetweenRootObject.data)

  if (index === 0) {
    artboardParams.y = params.yOrigin;
    artboardParams.x = params.xOrigin || 0;
  }
  else if (index % artboardParams.iconsByLine === 0) {
    artboardParams.y += space;
    artboardParams.x = params.xOrigin || 0;
  } else {
    artboardParams.x += space;
  }

  const rootObject = MSArtboardGroup.new();
  rootObject.setName(`${params.prefix}${name}`);

  setPositionRootObject(rootObject, artboardParams)

  context.document.currentPage().addLayers([rootObject]);

  return params.convertSymbol
    ? MSSymbolMaster.convertArtboardToSymbol(rootObject)
    : rootObject;
}