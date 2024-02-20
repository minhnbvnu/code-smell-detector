function addMaterialLayerProperty(layer, key, value) {
    layer.defineLayerProperty(key, value, () => {
        const root = layer.parent ? layer.parent.object3d : layer.object3d;
        root.traverse((object) => {
            if (object.layer == layer && object.material) {
                object.material[key] = layer[key];
            } else if (object.content && object.content.layer == layer) {
                object.content.traverse((o) => {
                    if (o.material) {
                        o.material[key] = layer[key];
                    }
                });
            }
        });
    });
}