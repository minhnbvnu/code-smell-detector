function cleanSvg(rootObject) {
  unGroup(rootObject);
  rootObject.firstLayer().setName(rootObject.name());
  if(rootObject.layers().length > 1 && String(rootObject.firstLayer().class) !== 'MSLayerGroup') mergeLayer(context, rootObject);
}