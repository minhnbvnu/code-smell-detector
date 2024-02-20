function _minimizeNetworkTraffic(node, nodeLevel, currentLevel, source) {
    // TO DO source.isVectorTileSource is a temp fix for pendingSubdivision.
    // see issue https://github.com/iTowns/itowns/issues/2214
    if (node.pendingSubdivision && !source.isVectorTileSource) {
        return currentLevel;
    }
    return nodeLevel;
}