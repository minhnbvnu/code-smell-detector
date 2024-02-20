function box_str() {
    // home box
    return {
        x: 0, y: 0, z: 0,
        number: 0,
        offset: 0,
        // neighbor boxes
        nn: 0,
        nei: createArray(nei_str, 26)
    };
}