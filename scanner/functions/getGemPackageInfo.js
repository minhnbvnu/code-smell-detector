async function getGemPackageInfo(imageTagOrContainerName, packageList) {
    // Merge in default dependencies
    packageList = packageList || [];
    const defaultPackages = configUtils.getDefaultDependencies('gem') || [];
    packageList = defaultPackages.concat(packageList);
    
    // Return empty array if no packages
    if (packageList.length === 0) {
        return [];
    }

    console.log(`(*) Gathering information about gems...`);
    const gemListOutput = await getCommandOutputFromContainer(imageTagOrContainerName, "bash -l -c 'set -e && gem list -d --local' 2>/dev/null");
    return packageList.map((gem) => {
        const gemVersionCaptureGroup = new RegExp(`^${gem}\\s\\(([^\\),]+)`,'m').exec(gemListOutput);
        if (gemVersionCaptureGroup !== null && gemVersionCaptureGroup[1] !== null) {
            const gemVersion = gemVersionCaptureGroup[1];
            return {
                name: gem,
                version: gemVersion
            }
        } else {
            return {};
        }
    });
}