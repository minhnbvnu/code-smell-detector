function changeIntensityRange(layer) {
    if (layer.material.intensityRange) {
        layer.material.intensityRange.set(layer.minIntensityRange, layer.maxIntensityRange);
    }
}