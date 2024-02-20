function _dichotomy(nodeLevel, currentLevel, options = {}) {
    if (currentLevel == EMPTY_TEXTURE_ZOOM) {
        return options.zoom ? options.zoom.min : 0;
    }
    return Math.min(
        nodeLevel,
        Math.ceil((currentLevel + nodeLevel) / 2));
}