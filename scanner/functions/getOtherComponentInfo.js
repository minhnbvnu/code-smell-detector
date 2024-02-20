async function getOtherComponentInfo(imageTagOrContainerName, otherComponents, otherType, imageId) {
    otherType = otherType || 'other';
    // Merge in default dependencies
    const defaultPackages = configUtils.getDefaultDependencies(otherType);
    if(defaultPackages) {
        const merged = defaultPackages;
        for(let otherName in otherComponents) {
            merged[otherName] = otherComponents[otherName];
        }
        otherComponents = merged;
    }
    // Return empty array if no components
    if (!otherComponents) {
        return [];
    }

    console.log(`(*) Gathering information about "other" components...`);
    const componentList = [];
    for(let otherName in otherComponents) {
        const otherSettings = mergeOtherDefaultSettings(otherName, otherComponents[otherName]);
        if (typeof otherSettings === 'object') {
            console.log(`(*) Getting version for ${otherName}...`);
            // Run specified command to get the version number
            const otherVersion = (await getCommandOutputFromContainer(imageTagOrContainerName, otherSettings.versionCommand, false, getUserName(imageId)));
            componentList.push({
                name: otherName,
                version: otherVersion,
                downloadUrl: otherSettings.downloadUrl,
                path: otherSettings.path,
                annotation: otherSettings.annotation,
                cgIgnore: otherSettings.cgIgnore,
                markdownIgnore: otherSettings.markdownIgnore
            });
         }
    }

    return componentList;
}