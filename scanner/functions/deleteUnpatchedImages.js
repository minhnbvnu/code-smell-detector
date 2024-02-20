async function deleteUnpatchedImages(patchPath, registry) {
    patchPath = path.resolve(patchPath);
    const patchConfig = await getPatchConfig(patchPath);
    if (!patchConfig.imageIds) {
        console.log('(!) Patch does not include image IDs.  Nothing to do.');
        return;
    }
    return await deleteUntaggedImages(patchConfig.imageIds, registry);
}