function removeLayeredMaterialNodeLayer(layerId) {
    return function removeLayeredMaterialNodeLayer(node) {
        if (node.material?.removeLayer) {
            node.material.removeLayer(layerId);
            if (node.material.elevationLayerIds[0] == layerId) {
                node.setBBoxZ({ min: 0, max: 0 });
            }
        }
        if (node.layerUpdateState && node.layerUpdateState[layerId]) {
            delete node.layerUpdateState[layerId];
        }
    };
}