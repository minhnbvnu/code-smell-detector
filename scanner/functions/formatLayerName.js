function formatLayerName(name, space, join, options) {
    var newNameArray = cleanNameArray(name, options).map(function(part) {
        return part.replace(/\s+/g, space);
    });
    return newNameArray.join(join);
}