async function getGoPackageInfo(imageTagOrContainerName, packages) {
    // Merge in default dependencies
    const defaultPackages = configUtils.getDefaultDependencies('go');
    if(defaultPackages) {
        const merged = defaultPackages;
        for(let package in packages) {
            merged[package] = packages[package];
        }
        packages = merged;
    }
    // Return empty array if no components
    if (!packages) {
        return [];
    }

    console.log(`(*) Gathering information about go modules and packages...`);
    const componentList = [];
    const packageInstallOutput = await getCommandOutputFromContainer(imageTagOrContainerName, "cat /usr/local/etc/vscode-dev-containers/go.log");
    for(let package in packages) {
        if (typeof package === 'string') {
            const versionCommand = packages[package];
            let version;
            if(versionCommand) {
                version = await getCommandOutputFromContainer(imageTagOrContainerName, versionCommand);
            } else {
                const versionCaptureGroup = new RegExp(`downloading\\s*${package}\\s*v([0-9]+\\.[0-9]+\\.[0-9]+.*)\\n`).exec(packageInstallOutput);
                version = versionCaptureGroup ? versionCaptureGroup[1] : 'latest';
            }
            componentList.push({
                name: package,
                version: version
            });
        }
    }

    return componentList;
}