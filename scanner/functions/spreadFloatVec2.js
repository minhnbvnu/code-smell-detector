function spreadFloatVec2(vec2Data) {
    let result = new Float32Array(vec2Data.length << 1);
    for (let i = 0; i*2 < vec2Data.length; i++) {
        result[4*i] = vec2Data[2*i];
        result[4*i+1] = vec2Data[2*i+1];
    }
    return result;
}