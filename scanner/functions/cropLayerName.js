function cropLayerName(name, space) {
    var newNameArray = cleanNameArray(name).map(function(part) {
        return part.replace(/\s+/g, space);
    });
    return newNameArray[newNameArray.length - 1];
}