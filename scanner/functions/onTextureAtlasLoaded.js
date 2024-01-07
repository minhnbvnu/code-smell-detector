function onTextureAtlasLoaded(atlasAsset) {
    const spriteAsset = this;
    if (spriteAsset.resource) {
        spriteAsset.resource.atlas = atlasAsset.resource;
    }
}