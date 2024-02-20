async function getCargoPackageInfo(imageTagOrContainerName, packages) {
    // Merge in default dependencies
    const defaultPackages = configUtils.getDefaultDependencies('go');
    if(defaultPackages) {
        const merged = defaultPackages;
        for(let package in packages) {
            merged[package] = packages[package];
        }
        packages = merged;
    }
    // Return empty array if no packages
    if (!packages) {
        return [];
    }

    const componentList = [];
    console.log(`(*) Gathering information about cargo packages...`);

    for(let crate in packages) {
        if (typeof crate === 'string') {
            const versionCommand = packages[crate] || `${crate} --version`;
            console.log(`(*) Getting version for ${crate}...`);
            const versionOutput = await getCommandOutputFromContainer(imageTagOrContainerName, versionCommand);
            const crateVersionCaptureGroup = new RegExp('[0-9]+\\.[0-9]+\\.[0-9]+','m').exec(versionOutput);
            const version = crateVersionCaptureGroup[0];
            componentList.push({
                name: crate,
                version: version
            });
        }
    }

    return componentList;
}