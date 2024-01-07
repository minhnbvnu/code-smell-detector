function getAltitudeProperty(layer) {
    let altitudeProperty = 'altitude';
    if (layer) {
        const layerOpts = layer.options;
        altitudeProperty = layerOpts['altitudeProperty'];
    }
    return altitudeProperty;
}