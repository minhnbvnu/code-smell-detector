function getUpdatedTag(currentTag, currentRegistry, currentRegistryPath, updatedVersion, updatedRegistry, updatedRegistryPath, variant) {
    updatedRegistry = updatedRegistry || currentRegistry;
    updatedRegistryPath = updatedRegistryPath || currentRegistryPath;

    const definition = getDefinitionFromTag(currentTag, currentRegistry, currentRegistryPath);

    // If definition not found, fall back on swapping out more generic logic - e.g. for when a image already has a version tag in it
    if (!definition) {
        const repository = new RegExp(`${currentRegistry}/${currentRegistryPath}/(.+):`).exec(currentTag)[1];
        const updatedTag = currentTag.replace(new RegExp(`${currentRegistry}/${currentRegistryPath}/${repository}:(dev-|${updatedVersion}-)?`), `${updatedRegistry}/${updatedRegistryPath}/${repository}:${updatedVersion}-`);
        console.log(`    Using RegEx to update ${currentTag}\n    to ${updatedTag}`);
        return updatedTag;
    }

    // See if definition found and no variant passed in, see if definition lookup returned a variant match
    if (!variant) {
        variant = definition.variant;
    }

    const updatedTags = getTagsForVersion(definition.id, updatedVersion, updatedRegistry, updatedRegistryPath, variant);
    if (updatedTags && updatedTags.length > 0) {
        console.log(`    Updating ${currentTag}\n    to ${updatedTags[0]}`);
        return updatedTags[0];
    }
    // In the case where this is already a tag with a version number in it,
    // we won't get an updated tag returned, so we'll just reuse the current tag.
    return currentTag;
}