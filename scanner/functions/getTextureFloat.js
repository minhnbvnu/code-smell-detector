function getTextureFloat(buffer, isWebGL2 = true) {
    if (isWebGL2) {
        const texture = new DataTexture(buffer, SIZE_TEXTURE_TILE, SIZE_TEXTURE_TILE, RedFormat, FloatType);
        texture.internalFormat = 'R32F';
        texture.needsUpdate = true;
        return texture;
    } else {
        const texture = new DataTexture(buffer, SIZE_TEXTURE_TILE, SIZE_TEXTURE_TILE, AlphaFormat, FloatType);
        return texture;
    }
}