function removeTxt(svgLayer) {
  const scope = svgLayer.children(),
    predicateTextLayers = NSPredicate.predicateWithFormat('(className == %@)', 'MSTextLayer');

  const layers = scope.filteredArrayUsingPredicate(predicateTextLayers);

  const loop = layers.objectEnumerator();
  let layer;
  while ((layer = loop.nextObject())) {
    layer.removeFromParent();
  }
}