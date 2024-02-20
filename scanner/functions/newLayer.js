function newLayer(line) {
            layer = {
                type: {},
                layer: layers.length,
                z: line.z,
            };
            layers.push(layer);
        }