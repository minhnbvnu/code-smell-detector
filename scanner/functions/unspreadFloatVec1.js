function unspreadFloatVec1(pixelData) {
    let result = new Float32Array(pixelData.length >> 2);
    for (let i = 0; i < result.length; i++) {
        result[i] = pixelData[4*i];
    }
    return result;
}