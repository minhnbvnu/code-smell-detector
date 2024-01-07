function packTextureRGBA(qRGB, qA) {
    const colors = new Array(qA.length * 4);
    for (let i = 0; i < qA.length; i++) {
        colors[i * 4] = qRGB[i * 3];
        colors[i * 4 + 1] = qRGB[i * 3 + 1];
        colors[i * 4 + 2] = qRGB[i * 3 + 2];

        colors[i * 4 + 3] = qA[i];
    }
    return colors;
}