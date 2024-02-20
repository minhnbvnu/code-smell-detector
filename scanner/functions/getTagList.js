function getTagList(definitionId, release, versionPartHandling, registry, registryPath, variant) {
    const version = getVersionFromRelease(release, definitionId);

    // If version is 'dev', there's no need to generate semver tags for the version
    // (e.g. for 1.0.2, we should also tag 1.0 and 1). So just return the tags for 'dev'.
    if (version === 'dev') {
        return getTagsForVersion(definitionId, version, registry, registryPath, variant);
    }

    // If this is a release version, split it out into the three parts of the semver
    const versionParts = version.split('.');
    if (versionParts.length !== 3) {
        throw (`Invalid version format in ${version}.`);
    }

    let versionList, updateUnversionedTags, updateLatest;
    switch(versionPartHandling) {
        case true:
        case 'all-latest':
            updateLatest = true; 
            updateUnversionedTags = true;
            versionList = [version,`${versionParts[0]}.${versionParts[1]}`, `${versionParts[0]}` ];
            break;
        case false:
        case 'all':
            updateLatest = false;
            updateUnversionedTags = true;
            versionList = [version,`${versionParts[0]}.${versionParts[1]}`, `${versionParts[0]}` ];
            break;
        case 'full-only':
            updateLatest = false;
            updateUnversionedTags = false;
            versionList = [version];
            break;
        case 'major-minor':
            updateLatest = false;
            updateUnversionedTags = false;
            versionList = [`${versionParts[0]}.${versionParts[1]}`];
            break;
        case 'major':
            updateLatest = false;
            updateUnversionedTags = false;
            versionList = [ `${versionParts[0]}`];
            break;
    }

    // Normally, we also want to return a tag without a version number, but for
    // some definitions that exist in the same repository as others, we may
    // only want to return a list of tags with part of the version number in it
    if(updateUnversionedTags && !config.definitionBuildSettings[definitionId].versionedTagsOnly) {
        // This is the equivalent of latest for qualified tags- e.g. python:3 instead of python:0.35.0-3
        versionList.push(''); 
    }

    const allVariants = getVariants(definitionId);
    const firstVariant = allVariants ? allVariants[0] : variant;
    let tagList = [];

    versionList.forEach((tagVersion) => {
        tagList = tagList.concat(getTagsForVersion(definitionId, tagVersion, registry, registryPath, variant));
    });

    // If this variant should also be used for the the latest tag, add it. The "latest" value could be
    // true, false, or a specific variant. "true" assumes the first variant is the latest.
    const definitionLatestProperty = config.definitionBuildSettings[definitionId].latest;
    return tagList.concat((updateLatest 
        && definitionLatestProperty
        && (!allVariants
            || variant === definitionLatestProperty 
            || (definitionLatestProperty === true && variant === firstVariant)))
        ? getLatestTag(definitionId, registry, registryPath)
        : []);
}