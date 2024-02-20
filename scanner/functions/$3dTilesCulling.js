function $3dTilesCulling(layer, camera, node, tileMatrixWorld) {
    // For viewer Request Volume
    // https://github.com/AnalyticalGraphicsInc/3d-tiles-samples/tree/master/tilesets/TilesetWithRequestVolume
    if (node.viewerRequestVolume && node.viewerRequestVolume.viewerRequestVolumeCulling(
        camera, tileMatrixWorld)) {
        return true;
    }

    // For bounding volume
    return !!(node.boundingVolume &&
        node.boundingVolume.boundingVolumeCulling(camera, tileMatrixWorld));
}