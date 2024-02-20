function _readZFast(layer, texture, uv) {
    const elevationLayer = layer.attachedLayers.filter(l => l.isElevationLayer)[0];
    return _readTextureValueNearestFiltering(elevationLayer, texture, uv.x, uv.y);
}