function getDefinitionFromTag(tag, registry, registryPath) {
    registry = registry || '.+';
    registryPath = registryPath || '.+';
    const captureGroups = new RegExp(`${registry}/${registryPath}/(.+):(.+)`).exec(tag);
    const repo = captureGroups[1];
    const tagPart = captureGroups[2];
    const definition = definitionTagLookup[`ANY/ANY/${repo}:${tagPart}`];
    if (definition) {
        return definition;
    }

    // If lookup fails, try removing a numeric first part - dev- is already handled
    return definitionTagLookup[`ANY/ANY/${repo}:${tagPart.replace(/^\d+-/,'')}`];
}