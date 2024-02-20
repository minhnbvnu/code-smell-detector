async function getPatchConfig(patchPath) {
    const patchConfigFilePath = path.resolve(patchPath, 'patch.json');
    if (!await asyncUtils.exists(patchConfigFilePath)) {
        throw (`No patch.json found at ${patchConfigFilePath}`);
    }
    const patchConfig = await jsonc.read(patchConfigFilePath);

    if (typeof patchConfig.bumpVersion === 'undefined') {
        patchConfig.bumpVersion = true;
    }
    if (typeof patchConfig.deleteUntaggedImages === 'undefined') {
        patchConfig.deleteUntaggedImages = false;
    }

    return patchConfig;

}