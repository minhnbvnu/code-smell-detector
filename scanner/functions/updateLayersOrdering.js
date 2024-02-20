function updateLayersOrdering(geometryLayer, imageryLayers) {
    const sequence = ImageryLayers.getColorLayersIdOrderedBySequence(imageryLayers);
    const cO = function cO(object) {
        if (object.material?.setSequence) {
            object.material.setSequence(sequence);
        }
    };

    for (const node of geometryLayer.level0Nodes) {
        node.traverse(cO);
    }
}