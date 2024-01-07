function encodeFloatRG(v) {
    let encX = frac(v);
    let encY = frac(255.0 * v);

    encX -= encY / 255.0;
    encY -= encY / 255.0;

    return [encX, encY];
}