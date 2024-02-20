function dotProduct(vector1, vector2) {
    let product = 0;
    for (const key in vector1) {
        if (vector2.hasOwnProperty(key)) {
            product += vector1[key] * vector2[key];
        }
    }
    return product;
}