function onTextureAtlasAdded(atlasAsset) {
    const spriteAsset = this;
    spriteAsset.registry.load(atlasAsset);
}