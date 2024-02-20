async function getNpmGlobalPackageInfo(imageTagOrContainerName, packageList) {
    // Merge in default dependencies
    packageList = packageList || [];
    const defaultPackages = configUtils.getDefaultDependencies('npm') || [];
    packageList = defaultPackages.concat(packageList);
    
    // Return empty array if no packages
    if (packageList.length === 0) {
        return [];
    }

    console.log(`(*) Gathering information about globally installed npm packages...`);

    const packageListString = packageList.reduce((prev, current) => prev + ' ' + current, '');
    const npmOutputRaw = await getCommandOutputFromContainer(imageTagOrContainerName, `bash -l -c 'set -e && npm ls --global --depth 1 --json ${packageListString}' 2>/dev/null`);
    const npmOutput = JSON.parse(npmOutputRaw);

    return packageList.map((package) => {
        let packageJson =  npmOutput.dependencies[package];
        if (!packageJson) {
            // Possible desired package is referenced by another top level package, so check dependencies too.
            // E.g. tslint-to-eslint-config can cause typescript to not appear at top level in npm ls
            for (let packageInNpmOutput in npmOutput.dependencies) {
                const packageDependencies = npmOutput.dependencies[packageInNpmOutput].dependencies;
                if(packageDependencies) {
                    packageJson = packageDependencies[package];
                    if(packageJson) {
                        break;
                    }    
                }
            }
        }
        if(!packageJson || !packageJson.version) {
            throw new Error(`Unable to parse version for ${package} from npm ls output: ${npmOutputRaw}`);
        }
        return {
            name: package,
            version:packageJson.version
        }
    });
}