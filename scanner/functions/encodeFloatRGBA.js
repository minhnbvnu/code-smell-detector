function encodeFloatRGBA(v) {
    let encX = frac(v);
    let encY = frac(255.0 * v);
    let encZ = frac(65025.0 * v);
    let encW = frac(160581375.0 * v);

    encX -= encY / 255.0;
    encY -= encZ / 255.0;
    encZ -= encW / 255.0;
    encW -= encW / 255.0;

    return [encX, encY, encZ, encW];
}