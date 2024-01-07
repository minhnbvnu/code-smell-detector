function getLayerStatesArray(layers) {
  return layers.map(function (layer) {
    return layer.getLayerState();
  });
}