function getPackageJsonsVisibleToFile(fileName, host) {
            if (!host.fileExists) {
                return [];
            }
            const packageJsons = [];
            forEachAncestorDirectory(getDirectoryPath(fileName), (ancestor) => {
                const packageJsonFileName = combinePaths(ancestor, "package.json");
                if (host.fileExists(packageJsonFileName)) {
                    const info = createPackageJsonInfo(packageJsonFileName, host);
                    if (info) {
                        packageJsons.push(info);
                    }
                }
            });
            return packageJsons;
        }