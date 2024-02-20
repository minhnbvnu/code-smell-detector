function _subdivideNodeSubstractive(context, layer, node) {
    if (!node.pendingSubdivision && getChildTiles(node).length == 0) {
        const childrenTiles = layer.tileset.tiles[node.tileId].children;
        if (childrenTiles === undefined || childrenTiles.length === 0) {
            return;
        }
        node.pendingSubdivision = true;

        const promises = [];
        for (let i = 0; i < childrenTiles.length; i++) {
            promises.push(
                requestNewTile(context.view, context.scheduler, layer, childrenTiles[i], node, false).then((tile) => {
                    childrenTiles[i].loaded = true;
                    node.add(tile);
                    tile.updateMatrixWorld();
                    // TODO: remove because cannot happen?
                    if (node.additiveRefinement) {
                        context.view.notifyChange(node);
                    }
                    layer.tileset.tiles[tile.tileId].loaded = true;
                    layer.onTileContentLoaded(tile);
                }));
        }
        Promise.all(promises).then(() => {
            node.pendingSubdivision = false;
            context.view.notifyChange(node);
        });
    }
}