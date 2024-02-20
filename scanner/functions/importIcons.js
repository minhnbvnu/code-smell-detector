function importIcons(context) {
  utils.runFramework(context)
  const params = importModal.call({}, context)
  if (params.button !== 1000) return
  params.listIcon = files.selectIconsFiles()
  if (!params.listIcon.length) return
  const importedIcons = artboardProvider.initImport(context, params, artboardProvider.initImportIcons)
  const label = (params.withColor) ? 'import-mask' : 'import';
  analytics.action(context, 'icons', 'import', label, importedIcons)
}