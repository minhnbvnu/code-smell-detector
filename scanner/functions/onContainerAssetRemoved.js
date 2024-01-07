function onContainerAssetRemoved(containerAsset) {
    const renderAsset = this;

    renderAsset.registry.off('load:' + containerAsset.id, onContainerAssetLoaded, renderAsset);

    if (renderAsset.resource) {
        renderAsset.resource.destroy();
    }
}