function packTexture2Floats(qA, qB) {
    const colors = new Array(qA.length * 4);
    for (let i = 0; i < qA.length; i++) {
        colors[i * 4] = qA[i];
        colors[i * 4 + 1] = qB[i];
        colors[i * 4 + 2] = 0;
        colors[i * 4 + 3] = 0;
    }
    return colors;
}