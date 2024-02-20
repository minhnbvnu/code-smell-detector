function updateElements(context, geometryLayer, elements) {
    if (!elements) {
        return;
    }
    for (const element of elements) {
        // update element
        // TODO find a way to notify attachedLayers when geometryLayer deletes some elements
        // and then update Debug.js:addGeometryLayerDebugFeatures
        const newElementsToUpdate = geometryLayer.update(context, geometryLayer, element);

        const sub = geometryLayer.getObjectToUpdateForAttachedLayers(element);

        if (sub) {
            if (sub.element) {
                if (__DEBUG__) {
                    if (!(sub.element.isObject3D)) {
                        throw new Error(`
                            Invalid object for attached layer to update.
                            Must be a THREE.Object and have a THREE.Material`);
                    }
                }
                // update attached layers
                for (const attachedLayer of geometryLayer.attachedLayers) {
                    if (attachedLayer.ready) {
                        attachedLayer.update(context, attachedLayer, sub.element, sub.parent);
                        attachedLayer.cache.flush();
                    }
                }
            } else if (sub.elements) {
                for (let i = 0; i < sub.elements.length; i++) {
                    if (!(sub.elements[i].isObject3D)) {
                        throw new Error(`
                            Invalid object for attached layer to update.
                            Must be a THREE.Object and have a THREE.Material`);
                    }
                    // update attached layers
                    for (const attachedLayer of geometryLayer.attachedLayers) {
                        if (attachedLayer.ready) {
                            attachedLayer.update(context, attachedLayer, sub.elements[i], sub.parent);
                            attachedLayer.cache.flush();
                        }
                    }
                }
            }
        }
        updateElements(context, geometryLayer, newElementsToUpdate);
    }
}