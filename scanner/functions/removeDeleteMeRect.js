function removeDeleteMeRect(rootObject) {
  const scope = rootObject.children(),
    predicateTextLayers = NSPredicate.predicateWithFormat('(name == %@)', 'delete-me');
  const layers = scope.filteredArrayUsingPredicate(predicateTextLayers);

  if (!layers.length)
    return rootObject
      .firstLayer()
      .lastLayer()
      .removeFromParent();

  const loop = layers.objectEnumerator();
  let layer;
  while ((layer = loop.nextObject())) {
    layer.removeFromParent();
  }
}