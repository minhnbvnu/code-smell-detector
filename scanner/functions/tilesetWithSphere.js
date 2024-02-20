function tilesetWithSphere(transformMatrix) {
    const tileset = {
        root: {
            boundingVolume: {
                sphere: [0, 0, 0, 1],
            },
        },
    };
    if (transformMatrix) {
        tileset.root.transform = transformMatrix.elements;
    }
    return tileset;
}