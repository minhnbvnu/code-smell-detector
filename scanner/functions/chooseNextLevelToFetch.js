function chooseNextLevelToFetch(strategy, node, nodeLevel = node.level, currentLevel, layer, failureParams) {
    let nextLevelToFetch;
    const maxZoom = layer.source.zoom ? layer.source.zoom.max : Infinity;
    if (failureParams.lowestLevelError != Infinity) {
        nextLevelToFetch = _dichotomy(failureParams.lowestLevelError, currentLevel, layer.source);

        nextLevelToFetch = failureParams.lowestLevelError == nextLevelToFetch ? nextLevelToFetch - 1 : nextLevelToFetch;

        if (strategy == STRATEGY_GROUP) {
            nextLevelToFetch = _group(nextLevelToFetch, layer.updateStrategy.options);
        }
    } else {
        switch (strategy) {
            case STRATEGY_GROUP:
                nextLevelToFetch = _group(nodeLevel, layer.updateStrategy.options);
                break;
            case STRATEGY_PROGRESSIVE: {
                nextLevelToFetch = _progressive(nodeLevel, currentLevel, layer.updateStrategy.options);
                break;
            }
            case STRATEGY_DICHOTOMY:
                nextLevelToFetch = _dichotomy(nodeLevel, currentLevel, layer.source);
                break;
            // default strategy
            case STRATEGY_MIN_NETWORK_TRAFFIC:
            default:
                nextLevelToFetch = _minimizeNetworkTraffic(node, nodeLevel, currentLevel, layer.source);
        }
        nextLevelToFetch = Math.min(nextLevelToFetch, maxZoom);
    }
    return nextLevelToFetch;
}