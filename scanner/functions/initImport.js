function initImport(context, params, cb) {
  const rootObjects = utils.getRootObject(context)
  params.yOrigin = setOrigin(context, rootObjects).yOrigin;
  if (params.presets) {
    const withPresetTitle = (rootObjects);
    params.presets.forEach((preset) => {
      setArtboardsSize(params, preset);
      params.xOrigin = setOrigin(context, workingRootObject).xOrigin;
      params.artboardSize = preset.artboardSize;
      params.prefix = utils.buildPrefix(context, params.artboardSize);
      if (withPresetTitle && rootObjects.length === 0) context.document.currentPage().addLayers([newText(preset, params.xOrigin)]);
      artboardParams.iconsByLine = parseInt(settingsProvider.getSettings(context, 'default').iconsByLine.data);
      cb(context, params)
    })
  } else {
    params.prefix = utils.buildPrefix(context, params.artboardSize);
    artboardParams.height = artboardParams.width = params.artboardSize;
    artboardParams.iconsByLine = parseInt(settingsProvider.getSettings(context, 'default').iconsByLine.data)
    cb(context, params)
  }
  const importedIcons = params.listIcon.length * ((Array.isArray(params.presets)) ? params.presets.length : 1)
  context.document.showMessage(
    `🎉 Tadaaa! 🎉 ${importedIcons} icon${params.listIcon.length > 1 ? 's' : ''} imported`
  );
  return importedIcons
}