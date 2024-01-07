function removeLayerMapProperty(layer) {
  if (layer instanceof Layer) {
    layer.setMapInternal(null);
    return;
  }
  if (layer instanceof LayerGroup) {
    layer.getLayers().forEach(removeLayerMapProperty);
  }
}