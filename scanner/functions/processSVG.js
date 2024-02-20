function processSVG(context, rootObject, params, svgData) {
  importerProvider.addSVG(context, rootObject, params, svgData, true);
  if (params.withColor) maskProvider.addColor(context, rootObject, params);
  return context.command.setValue_forKey_onLayer(params.iconPadding, 'padding', rootObject);
}