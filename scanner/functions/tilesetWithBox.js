function tilesetWithBox(transformMatrix) {
    const tileset = {
        root: {
            boundingVolume: {
                box: [
                    0, 0, 0,
                    1, 0, 0,
                    0, 1, 0,
                    0, 0, 1],
            },
        },
    };
    if (transformMatrix) {
        tileset.root.transform = transformMatrix.elements;
    }
    return tileset;
}