function spreadFloatVec1(vec1Data) {
    let result = new Float32Array(vec1Data.length << 2);
    for (let i = 0; i < vec1Data.length; i++) {
        result[4*i] = vec1Data[i];
    }
    return result;
}