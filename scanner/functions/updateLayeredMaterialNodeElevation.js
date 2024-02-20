function updateLayeredMaterialNodeElevation(context, layer, node, parent) {
    const material = node.material;
    if (!parent || !material) {
        return;
    }

    // TODO: we need either
    //  - compound or exclusive layers
    //  - support for multiple elevation layers

    // Elevation is currently handled differently from color layers.
    // This is caused by a LayeredMaterial limitation: only 1 elevation texture
    // can be used (where a tile can have N textures x M layers)
    const extentsDestination = node.getExtentsByProjection(layer.crs);
    const zoom = extentsDestination[0].zoom;
    if (zoom > layer.zoom.max || zoom < layer.zoom.min) {
        return;
    }
    // Init elevation layer, and inherit from parent if possible
    let nodeLayer = material.getElevationLayer();
    if (!nodeLayer) {
        nodeLayer = layer.setupRasterNode(node);
    }

    if (node.layerUpdateState[layer.id] === undefined) {
        node.layerUpdateState[layer.id] = new LayerUpdateState();

        const parentLayer = parent.material?.getLayer(layer.id);
        nodeLayer.initFromParent(parentLayer, extentsDestination);

        if (nodeLayer.level >= layer.source.zoom.min) {
            context.view.notifyChange(node, false);
            return;
        }
    }

    // Possible conditions to *not* update the elevation texture
    if (layer.frozen ||
            !material.visible ||
            !node.layerUpdateState[layer.id].canTryUpdate()) {
        return;
    }

    const failureParams = node.layerUpdateState[layer.id].failureParams;
    const targetLevel = chooseNextLevelToFetch(layer.updateStrategy.type, node, extentsDestination[0].zoom, nodeLayer.level, layer, failureParams);

    if (targetLevel <= nodeLayer.level || targetLevel > extentsDestination[0].zoom) {
        node.layerUpdateState[layer.id].noMoreUpdatePossible();
        return;
    } else if (!layer.source.extentInsideLimit(node.extent, targetLevel)) {
        node.layerUpdateState[layer.id].noData({ targetLevel });
        context.view.notifyChange(node, false);
        return;
    }

    const extentsSource = extentsDestination.map(e => e.tiledExtentParent(targetLevel));
    node.layerUpdateState[layer.id].newTry();
    const command = buildCommand(context.view, layer, extentsSource, extentsDestination, node);

    return context.scheduler.execute(command).then(
        (result) => {
            // Does nothing if the layer has been removed while command was being or waiting to be executed
            if (!node.layerUpdateState[layer.id]) {
                return;
            }

            // Do not apply the new texture if its level is < than the current
            // one.  This is only needed for elevation layers, because we may
            // have several concurrent layers but we can only use one texture.
            if (targetLevel <= nodeLayer.level) {
                node.layerUpdateState[layer.id].noMoreUpdatePossible();
                return;
            }
            const pitchs = extentsDestination.map((ext, i) => ext.offsetToParent(result[i].extent, nodeLayer.offsetScales[i]));
            nodeLayer.setTextures(result, pitchs);
            node.layerUpdateState[layer.id].success();
        },
        err => handlingError(err, node, layer, targetLevel, context.view));
}