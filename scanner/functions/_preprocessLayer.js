function _preprocessLayer(view, layer, parentLayer) {
    const source = layer.source;
    if (parentLayer && !layer.extent) {
        layer.extent = parentLayer.extent;
        if (source && !source.extent) {
            source.extent = parentLayer.extent;
        }
    }

    if (layer.isGeometryLayer && !layer.isLabelLayer) {
        // Find crs projection layer, this is projection destination
        layer.crs = view.referenceCrs;
    } else if (!layer.crs) {
        if (parentLayer && parentLayer.tileMatrixSets && parentLayer.tileMatrixSets.includes(CRS.formatToTms(source.crs))) {
            layer.crs = source.crs;
        } else {
            layer.crs = parentLayer && parentLayer.extent.crs;
        }
    }

    if (layer.isLabelLayer) {
        view.mainLoop.gfxEngine.label2dRenderer.registerLayer(layer);
    } else if (layer.labelEnabled || layer.addLabelLayer) {
        if (layer.labelEnabled) {
            // eslint-disable-next-line no-console
            console.info('layer.labelEnabled is deprecated use addLabelLayer, instead of');
        }
        // Because the features are shared between layer and labelLayer.
        layer.buildExtent = true;
        // label layer needs 3d data structure.
        layer.structure = '3d';
        const labelLayer = new LabelLayer(`${layer.id}-label`, {
            source,
            style: layer.style,
            zoom: layer.zoom,
            performance: layer.addLabelLayer.performance,
            crs: source.crs,
            visible: layer.visible,
            margin: 15,
            forceClampToTerrain: layer.addLabelLayer.forceClampToTerrain,
        });

        layer.addEventListener('visible-property-changed', () => {
            labelLayer.visible = layer.visible;
        });

        const removeLabelLayer = (e) => {
            if (e.layerId === layer.id) {
                view.removeLayer(labelLayer.id);
            }
            view.removeEventListener(VIEW_EVENTS.LAYER_REMOVED, removeLabelLayer);
        };

        view.addEventListener(VIEW_EVENTS.LAYER_REMOVED, removeLabelLayer);

        layer.whenReady = layer.whenReady.then(() => {
            view.addLayer(labelLayer);
            return layer;
        });
    }

    return layer;
}