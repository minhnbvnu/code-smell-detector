function organizeIcons(context) {
  const selectedLayers = context.selection;
  if (selectedLayers.length === 0) return modals.newErrorModal('No layers selected', 'Please select one or more layers.')
  utils.runFramework(context)
  const params = importModal.call({}, context)
  if (params.button !== 1000) return
  params.listIcon = selectedLayers
  artboardProvider.initImport(context, params, artboardProvider.initOrganizeIcons)
  params.listIcon.forEach(icon => icon.removeFromParent())
  const label = (params.withColor) ? 'organize-mask' : 'organize';
  analytics.action(context, 'icons', 'organize', label, params.listIcon.length)
}