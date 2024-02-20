function mergeLayer(context, rootObject) {
  const layers = rootObject.layers().slice().filter(layer => String(layer.class()) !== "MSSymbolMaster");
  context.document.currentPage().changeSelectionBySelectingLayers(layers);
  context.document.actionsController().actionForID("MSUnionAction").doPerformAction(null);
}