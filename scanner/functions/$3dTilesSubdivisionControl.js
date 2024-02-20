function $3dTilesSubdivisionControl(context, layer, node) {
    if (layer.tileset.tiles[node.tileId].children === undefined) {
        return false;
    }
    if (layer.tileset.tiles[node.tileId].isTileset) {
        return true;
    }
    const sse = computeNodeSSE(context.camera, node);
    return sse > layer.sseThreshold;
}