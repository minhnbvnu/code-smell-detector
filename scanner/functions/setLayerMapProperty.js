function setLayerMapProperty(layer, map) {
  if (layer instanceof Layer) {
    layer.setMapInternal(map);
    return;
  }
  if (layer instanceof LayerGroup) {
    const layers = layer.getLayers().getArray();
    for (let i = 0, ii = layers.length; i < ii; ++i) {
      setLayerMapProperty(layers[i], map);
    }
  }
}