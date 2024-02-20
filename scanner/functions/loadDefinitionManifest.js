async function loadDefinitionManifest(manifestPath, definitionId) {
    const buildJson = await jsonc.read(manifestPath);
    if (buildJson.variants) {
        config.definitionVariants[definitionId] = buildJson.variants;
    }
    if (buildJson.build) {
        config.definitionBuildSettings[definitionId] = buildJson.build;
    }
    if (buildJson.dependencies) {
        config.definitionDependencies[definitionId] = buildJson.dependencies;
    }
    if (buildJson.version) {
        config.definitionVersions[definitionId] = buildJson.version;
    }
}