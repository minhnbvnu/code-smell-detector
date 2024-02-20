function unGroup(svgLayer) {
  const scope = svgLayer.children(),
    predicateTextLayers = NSPredicate.predicateWithFormat('(className == %@)', 'MSLayerGroup');
  const layers = scope.filteredArrayUsingPredicate(predicateTextLayers);

  const loop = layers.objectEnumerator();
  let layer;
  while ((layer = loop.nextObject())) {
    layer.ungroup();
  }
}