function configureTile(tile, layer, metadata, parent) {
    tile.frustumCulled = false;
    tile.layer = layer;

    // parse metadata
    if (metadata.transform) {
        tile.applyMatrix4(metadata.transform);
    }
    tile.geometricError = metadata.geometricError;
    tile.tileId = metadata.tileId;
    if (metadata.refine) {
        tile.additiveRefinement = (metadata.refine.toUpperCase() === 'ADD');
    } else {
        tile.additiveRefinement = parent ? (parent.additiveRefinement) : false;
    }
    tile.viewerRequestVolume = metadata.viewerRequestVolume;
    tile.boundingVolume = metadata.boundingVolume;
    tile.updateMatrixWorld();
}