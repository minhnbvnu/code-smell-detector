function addMaskOnSelectedArtboards(context) {
  utils.runFramework(context)
  const selectedArtboardsAndSymbols = utils.getSelectedArtboardsAndSymbols(context);
  if (selectedArtboardsAndSymbols.length === 0) return modals.newErrorModal('No artboards selected', 'Please select one or more artboards to add a mask.')
  const params = maskModal.call({}, context)
  if (params.button !== 1000) return
  maskProvider.initAddMaskOnSelectedArtboards(context, params, selectedArtboardsAndSymbols)
  analytics.action(context, 'icons', 'mask', 'mask', selectedArtboardsAndSymbols.length)
}