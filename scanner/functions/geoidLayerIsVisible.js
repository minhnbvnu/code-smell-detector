function geoidLayerIsVisible(tilelayer) {
    return tilelayer?.attachedLayers.filter(l => l.isGeoidLayer)[0]?.visible;
}