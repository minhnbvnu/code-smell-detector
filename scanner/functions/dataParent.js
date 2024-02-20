function dataParent(texture, parentTexture, parentDataElevation, pitch) {
    texture.extent.offsetToParent(parentTexture.extent, pitch);
    return i => parentDataElevation[getIndiceWithPitch(i, pitch, 256)];
}