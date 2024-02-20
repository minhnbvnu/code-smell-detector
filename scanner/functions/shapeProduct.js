function shapeProduct(shape) {
    var dataSize = 1;
    for (var i = 0; i < shape.length; ++i) {
        dataSize *= shape[i];
    }
    return dataSize;
}