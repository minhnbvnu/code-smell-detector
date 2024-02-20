function unspreadFloatVec2(pixelData) {
    let result = new Float32Array(pixelData.length >> 1);
    for (let i = 0; i*2 < result.length; i++) {
        result[2*i] = pixelData[4*i];
        result[2*i+1] = pixelData[4*i+1];
    }
    return result;
}