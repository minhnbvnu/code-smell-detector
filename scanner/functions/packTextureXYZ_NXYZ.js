function packTextureXYZ_NXYZ(qXYZ, qXYZ2) {
    const num = qXYZ.length / 3;
    const colors = new Array(num * 4);
    for (let i = 0; i < num; i++) {
        colors[i * 4] = qXYZ[i * 3];
        colors[i * 4 + 1] = qXYZ[i * 3 + 1];
        colors[i * 4 + 2] = qXYZ[i * 3 + 2];

        colors[i * 4 + 3] = pack3NFloats(qXYZ2[i * 3], qXYZ2[i * 3 + 1], qXYZ2[i * 3 + 2]);
    }
    return colors;
}