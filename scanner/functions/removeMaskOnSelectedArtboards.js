function removeMaskOnSelectedArtboards(context) {
  const selectedArtboardsAndSymbols = utils.getSelectedArtboardsAndSymbols(context);
  if (selectedArtboardsAndSymbols.length === 0) return modals.newErrorModal('No artboards selected', 'Please select one or more artboards to add a mask.')
  selectedArtboardsAndSymbols.forEach((rootElement) => {
    maskProvider.removeColor(context, rootElement.object)
  })
  analytics.action(context, 'icons', 'remove mask', 'remove mask', selectedArtboardsAndSymbols.length)
}