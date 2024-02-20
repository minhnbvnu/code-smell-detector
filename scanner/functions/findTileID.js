function findTileID(object) {
    let currentObject = object;
    let result = currentObject.tileId;
    while (isNaN(result) && currentObject.parent) {
        currentObject = currentObject.parent;
        result = currentObject.tileId;
    }

    return result;
}