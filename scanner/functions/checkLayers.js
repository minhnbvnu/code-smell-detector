function checkLayers(tileLayers) {
    if (!Array.isArray(tileLayers)) {
        tileLayers = [tileLayers];
    }
    return tileLayers;
}