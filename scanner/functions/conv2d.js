function conv2d(images, filters, strideY, strideX) {
    if (filters.value.shape.length !== 4) {
        throw new Error('expected 4-D filter tensor');
    }
    strideY = (strideY || 1);
    strideX = (strideX || strideY);
    var patches = imagePatches(images, filters.value.shape[0], filters.value.shape[1],
        strideY, strideX);
    var leftMatrix = reshape(patches, [shapeProduct(patches.value.shape.slice(0, 3)),
        shapeProduct(patches.value.shape.slice(3))]);
    var rightMatrix = reshape(filters, [shapeProduct(filters.value.shape.slice(0, 3)),
        filters.value.shape[3]]);
    var product = matmul(leftMatrix, rightMatrix);
    return reshape(product, patches.value.shape.slice(0, 3).concat([filters.value.shape[3]]));
}