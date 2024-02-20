function _convertUVtoTextureCoords(texture, u, v) {
    const width = texture.image.width;
    const height = texture.image.height;

    const up = Math.max(0, u * width - 0.5);
    const vp = Math.max(0, v * height - 0.5);

    const u1 = Math.floor(up);
    const u2 = Math.ceil(up);
    const v1 = Math.floor(vp);
    const v2 = Math.ceil(vp);

    const wu = up - u1;
    const wv = vp - v1;

    return { u1, u2, v1, v2, wu, wv };
}