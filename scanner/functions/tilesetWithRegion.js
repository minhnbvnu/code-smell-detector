function tilesetWithRegion(transformMatrix) {
    const tileset = {
        root: {
            boundingVolume: {
                region: [
                    -0.01, -0.01,
                    0.01, 0.01,
                    -10, 10],
            },
        },
    };
    if (transformMatrix) {
        tileset.root.transform = transformMatrix.elements;
    }
    return tileset;
}