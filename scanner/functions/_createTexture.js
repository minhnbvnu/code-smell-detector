function _createTexture(device, width, height, pixelData, format = PIXELFORMAT_RGBA32F, mult8Bit, filter) {

    let mipFilter = FILTER_NEAREST;
    if (filter && format === PIXELFORMAT_RGBA8)
        mipFilter = FILTER_LINEAR;

    const texture = new Texture(device, {
        width: width,
        height: height,
        format: format,
        cubemap: false,
        mipmaps: false,
        minFilter: mipFilter,
        magFilter: mipFilter,
        addressU: ADDRESS_CLAMP_TO_EDGE,
        addressV: ADDRESS_CLAMP_TO_EDGE,
        name: 'ParticleSystemTexture'
    });

    const pixels = texture.lock();

    if (format === PIXELFORMAT_RGBA8) {
        const temp = new Uint8Array(pixelData.length);
        for (let i = 0; i < pixelData.length; i++) {
            temp[i] = pixelData[i] * mult8Bit * 255;
        }
        pixelData = temp;
    }

    pixels.set(pixelData);

    texture.unlock();

    return texture;
}