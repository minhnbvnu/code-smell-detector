function updateLayeredMaterialNodeImagery(context, layer, node, parent) {
    const material = node.material;
    if (!parent || !material) {
        return;
    }
    const extentsDestination = node.getExtentsByProjection(layer.crs);

    const zoom = extentsDestination[0].zoom;
    if (zoom > layer.zoom.max || zoom < layer.zoom.min) {
        return;
    }

    let nodeLayer = material.getLayer(layer.id);

    // Initialisation
    if (node.layerUpdateState[layer.id] === undefined) {
        node.layerUpdateState[layer.id] = new LayerUpdateState();

        if (!layer.source.extentInsideLimit(node.extent, zoom)) {
            // we also need to check that tile's parent doesn't have a texture for this layer,
            // because even if this tile is outside of the layer, it could inherit it's
            // parent texture
            if (!layer.noTextureParentOutsideLimit &&
                parent.material &&
                parent.material.getLayer &&
                parent.material.getLayer(layer.id)) {
                // ok, we're going to inherit our parent's texture
            } else {
                node.layerUpdateState[layer.id].noMoreUpdatePossible();
                return;
            }
        }

        if (!nodeLayer) {
            // Create new raster node
            nodeLayer = layer.setupRasterNode(node);

            // Init the node by parent
            const parentLayer = parent.material?.getLayer(layer.id);
            nodeLayer.initFromParent(parentLayer, extentsDestination);
        }

        // Proposed new process, two separate processes:
        //      * FIRST PASS: initNodeXXXFromParent and get out of the function
        //      * SECOND PASS: Fetch best texture

        // The two-step allows you to filter out unnecessary requests
        // Indeed in the second pass, their state (not visible or not displayed) can block them to fetch
        if (nodeLayer.level >= layer.source.zoom.min) {
            context.view.notifyChange(node, false);
            return;
        }
    }

    // Node is hidden, no need to update it
    if (!material.visible) {
        return;
    }

    // An update is pending / or impossible -> abort
    if (!layer.visible || !node.layerUpdateState[layer.id].canTryUpdate()) {
        return;
    }

    if (nodeLayer.level >= extentsDestination[0].zoom) {
        // default decision method
        node.layerUpdateState[layer.id].noMoreUpdatePossible();
        return;
    }

    // is fetching data from this layer disabled?
    if (layer.frozen) {
        return;
    }

    const failureParams = node.layerUpdateState[layer.id].failureParams;
    const destinationLevel = extentsDestination[0].zoom || node.level;
    const targetLevel = chooseNextLevelToFetch(layer.updateStrategy.type, node, destinationLevel, nodeLayer.level, layer, failureParams);

    if ((!layer.source.isVectorSource && targetLevel <= nodeLayer.level) || targetLevel > destinationLevel) {
        if (failureParams.lowestLevelError != Infinity) {
            // this is the highest level found in case of error.
            node.layerUpdateState[layer.id].noMoreUpdatePossible();
        }
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
            // TODO: Handle error : result is undefined in provider. throw error
            const pitchs = extentsDestination.map((ext, i) => ext.offsetToParent(result[i].extent, nodeLayer.offsetScales[i]));
            nodeLayer.setTextures(result, pitchs);
            node.layerUpdateState[layer.id].success();
        },
        err => handlingError(err, node, layer, targetLevel, context.view));
}