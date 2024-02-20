function complexVectorToReadableJson(vector) {
    return seq(vector).map(e => {return {r: Complex.realPartOf(e), i: Complex.imagPartOf(e)}; }).toArray();
}