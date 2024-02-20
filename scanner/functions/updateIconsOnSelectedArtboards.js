function updateIconsOnSelectedArtboards(context) {
  const selectedArtboardsAndSymbols = utils.getSelectedArtboardsAndSymbols(context);
  if (selectedArtboardsAndSymbols.length === 0) return modals.newErrorModal('No artboards selected', 'Please select one or more artboards to replace icons.')
  let params = {}
  params.listIcon = files.selectIconsFiles()
  if (!params.listIcon.length) return
  if (selectedArtboardsAndSymbols.length > params.listIcon.length && params.listIcon.length !== 1) return modals.newErrorModal('Too much artboards selected', 'Please select as many artboards as icons.')
  if (selectedArtboardsAndSymbols.length < params.listIcon.length && params.listIcon.length !== 1) return modals.newErrorModal('Too much icons selected', 'Please select as many icons as artboards.')
  const replacedIcons = svg.initUpdateIconsSelectedArtboards(context, selectedArtboardsAndSymbols, params)
  analytics.action(context, 'icons', 'replace', 'replace', replacedIcons)
}