function onContainerAssetLoaded(containerAsset) {
    const renderAsset = this;
    if (!renderAsset.resource) return;

    const containerResource = containerAsset.resource;

    const render = containerResource.renders && containerResource.renders[renderAsset.data.renderIndex];
    if (render) {
        renderAsset.resource.meshes = render.resource.meshes;
    }
}