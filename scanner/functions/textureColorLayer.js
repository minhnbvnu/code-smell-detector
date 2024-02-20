function textureColorLayer(texture, layer) {
    texture.anisotropy = 16;
    texture.premultiplyAlpha = layer.transparent;
    return textureLayer(texture, layer);
}