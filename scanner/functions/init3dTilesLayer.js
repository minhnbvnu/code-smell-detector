function init3dTilesLayer(view, scheduler, layer, rootTile) {
    return requestNewTile(view, scheduler, layer, rootTile, undefined, true).then(
        (tile) => {
            layer.object3d.add(tile);
            tile.updateMatrixWorld();
            layer.tileset.tiles[tile.tileId].loaded = true;
            layer.root = tile;
            layer.onTileContentLoaded(tile);
        });
}