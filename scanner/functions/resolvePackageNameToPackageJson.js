function resolvePackageNameToPackageJson(packageName, containingDirectory, options, host, cache) {
            const moduleResolutionState = getTemporaryModuleResolutionState(cache == null ? void 0 : cache.getPackageJsonInfoCache(), host, options);
            return forEachAncestorDirectory(containingDirectory, (ancestorDirectory) => {
                if (getBaseFileName(ancestorDirectory) !== "node_modules") {
                    const nodeModulesFolder = combinePaths(ancestorDirectory, "node_modules");
                    const candidate = combinePaths(nodeModulesFolder, packageName);
                    return getPackageJsonInfo(candidate, 
                    /*onlyRecordFailures*/
                    false, moduleResolutionState);
                }
            });
        }