function _subdivideNodeAdditive(context, layer, node, cullingTest) {
    for (const child of layer.tileset.tiles[node.tileId].children) {
        // child being downloaded => skip
        if (child.promise || child.loaded) {
            continue;
        }

        // 'child' is only metadata (it's *not* a THREE.Object3D). 'cullingTest' needs
        // a matrixWorld, so we compute it: it's node's matrixWorld x child's transform
        let overrideMatrixWorld = node.matrixWorld;
        if (child.transform) {
            overrideMatrixWorld = tmpMatrix.multiplyMatrices(node.matrixWorld, child.transform);
        }

        const isVisible = cullingTest ? !cullingTest(layer, context.camera, child, overrideMatrixWorld) : true;

        // child is not visible => skip
        if (!isVisible) {
            continue;
        }
        child.promise = requestNewTile(context.view, context.scheduler, layer, child, node, true).then((tile) => {
            node.add(tile);
            tile.updateMatrixWorld();
            layer.onTileContentLoaded(tile);

            context.view.notifyChange(child);
            child.loaded = true;
            delete child.promise;
        });
    }
}