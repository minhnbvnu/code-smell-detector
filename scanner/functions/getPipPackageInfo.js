async function getPipPackageInfo(imageTagOrContainerName, packageList, usePipx, imageId) {
    // Merge in default dependencies
    packageList = packageList || [];
    const defaultPackages = configUtils.getDefaultDependencies(usePipx ? 'pipx' : 'pip') || [];
    packageList = defaultPackages.concat(packageList);
    
    // Return empty array if no packages
    if (packageList.length === 0) {
        return [];
    }

    // Generate and exec command to get installed package versions
    console.log('(*) Gathering information about pip packages...');
    const versionLookup = usePipx ? await getPipxVersionLookup(imageTagOrContainerName) : await getPipVersionLookup(imageTagOrContainerName, imageId);

    return packageList.map((package) => {
        return {
            name: package,
            version: versionLookup[package]
        };
    });
}