async function isDefinitionVersionAlreadyPublished(definitionId, release, registry, registryPath, variant) {
    // See if image already exists
    const tagsToCheck = configUtils.getTagList(definitionId, release, false, registry, registryPath, variant);
    const tagParts = tagsToCheck[0].split(':');
    const registryName = registry.replace(/\..*/, '');
    return await isImageAlreadyPublished(registryName, tagParts[0].replace(/[^\/]+\//, ''), tagParts[1]);
}