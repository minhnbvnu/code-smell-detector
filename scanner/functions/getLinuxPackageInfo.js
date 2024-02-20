async function getLinuxPackageInfo(imageTagOrContainerName, packageList, linuxDistroInfo) {
    // Merge in default dependencies
    packageList = packageList || [];
    const packageManager = getLinuxPackageManagerForDistro(linuxDistroInfo.id);
    const defaultPackages = configUtils.getDefaultDependencies(packageManager) || [];
    packageList = defaultPackages.concat(packageList);

    // Return empty array if no packages
    if (packageList.length === 0) {
        return [];
    }

    // Get OS info if not passed in
    if(!linuxDistroInfo) {
        linuxDistroInfo = await getLinuxDistroInfo(imageTagOrContainerName);
    }

    // Generate a settings object from packageList
    const settings = packageList.reduce((obj, current) => {
        if(typeof current === 'string') {
            obj[current] = { name: current };
        } else {
            obj[current.name] = current;
        }
        return obj;
    }, {});

    // Space separated list of packages for use in commands
    const packageListCommandPart = packageList.reduce((prev, current) => {
        return prev += ` ${typeof current === 'string' ? current : current.name}`;
    }, '');

    // Use the appropriate package lookup settings for distro
    const extractionConfig = linuxPackageInfoExtractionConfig[packageManager];

    // Generate and exec command to get installed package versions
    console.log('(*) Gathering information about Linux package versions...');
    const packageVersionListOutput = await getCommandOutputFromContainer(imageTagOrContainerName, 
        extractionConfig.listCommand + packageListCommandPart + " || echo 'Some packages were not found.'", true);
   
    // Generate and exec command to extract download URIs
    console.log('(*) Gathering information about Linux package download URLs...');
    const packageUriCommandOutput = await getCommandOutputFromContainer(imageTagOrContainerName, 
        extractionConfig.getUriCommand + packageListCommandPart + " || echo 'Some packages were not found.'", true);

    const componentList = [];
    const packageVersionList = packageVersionListOutput.split('\n');
    packageVersionList.forEach((packageVersion) => {
        packageVersion = packageVersion.trim();
        if (packageVersion !== '') {
            const versionCaptureGroup = new RegExp(extractionConfig.lineRegEx).exec(packageVersion);
            if (!versionCaptureGroup) {
                if(packageVersion === 'Some packages were not found.') {
                    console.log('(!) Warning: Some specified packages were not found.');
                } else {
                    console.log(`(!) Warning: Unable to parse output "${packageVersion}" - skipping.`);
                }
                return;
            }
            const [, package, version ] = versionCaptureGroup;
            const packageSettings = settings[package] || {};
            const cgIgnore =  typeof packageSettings.cgIgnore === 'undefined' ? true : packageSettings.cgIgnore; // default to true
            const poolUrl = getPoolUrlFromPackageVersionListOutput(packageUriCommandOutput, extractionConfig, package, version);
            if(!cgIgnore && !poolUrl) {
                throw new Error('(!) No pool URL found to register package!');
            }
            componentList.push({
                name: package,
                version: version,
                poolUrl: poolUrl,
                poolKeyUrl: configUtils.getPoolKeyForPoolUrl(poolUrl),
                annotation: packageSettings.annotation,
                cgIgnore: cgIgnore,
                markdownIgnore: packageSettings.markdownIgnore
            });
        }
    });

    return componentList;
}