function getObjectScene(object3d) {
    while (object3d.parent) {
        object3d = object3d.parent;
    }
    if (object3d.type === 'Scene') {
        return object3d;
    }
    return null;
}