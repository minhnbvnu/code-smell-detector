function realVectorToReadableJson(vector) {
    return seq(vector).map(Complex.realPartOf).toArray();
}