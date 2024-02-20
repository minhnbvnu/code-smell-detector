function assertFloatEqual(float1, float2, msg, precision = 15) {
    assert.equal(Number(float1).toFixed(precision), Number(float2).toFixed(precision), msg);
}