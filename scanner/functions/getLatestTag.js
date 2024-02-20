function getLatestTag(definitionId, registry, registryPath) {
    if (typeof config.definitionBuildSettings[definitionId] === 'undefined') {
        return null;
    }

    // Given there could be multiple registries in the tag list, get all the different latest variations
    return config.definitionBuildSettings[definitionId].tags.reduce((list, tag) => {
        const latest = `${registry}/${registryPath}/${tag.replace(/:.+/, ':latest')}`
        if (list.indexOf(latest) < 0) {
            list.push(latest);
        }
        return list;
    }, []);

}