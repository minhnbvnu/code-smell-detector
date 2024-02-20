function getEntrypointsFromPackageJsonInfo(packageJsonInfo, options, host, cache, resolveJs) {
            if (!resolveJs && packageJsonInfo.contents.resolvedEntrypoints !== void 0) {
                return packageJsonInfo.contents.resolvedEntrypoints;
            }
            let entrypoints;
            const extensions = 1 /* TypeScript */ | 4 /* Declaration */ | (resolveJs ? 2 /* JavaScript */ : 0);
            const features = getNodeResolutionFeatures(options);
            const loadPackageJsonMainState = getTemporaryModuleResolutionState(cache == null ? void 0 : cache.getPackageJsonInfoCache(), host, options);
            loadPackageJsonMainState.conditions = getConditions(options);
            loadPackageJsonMainState.requestContainingDirectory = packageJsonInfo.packageDirectory;
            const mainResolution = loadNodeModuleFromDirectoryWorker(extensions, packageJsonInfo.packageDirectory, 
            /*onlyRecordFailures*/
            false, loadPackageJsonMainState, packageJsonInfo.contents.packageJsonContent, getVersionPathsOfPackageJsonInfo(packageJsonInfo, loadPackageJsonMainState));
            entrypoints = append(entrypoints, mainResolution == null ? void 0 : mainResolution.path);
            if (features & 8 /* Exports */ && packageJsonInfo.contents.packageJsonContent.exports) {
                const conditionSets = deduplicate([getConditions(options, 
                    /*esmMode*/
                    true), getConditions(options, 
                    /*esmMode*/
                    false)], arrayIsEqualTo);
                for (const conditions of conditionSets) {
                    const loadPackageJsonExportsState = { ...loadPackageJsonMainState, failedLookupLocations: [], conditions };
                    const exportResolutions = loadEntrypointsFromExportMap(packageJsonInfo, packageJsonInfo.contents.packageJsonContent.exports, loadPackageJsonExportsState, extensions);
                    if (exportResolutions) {
                        for (const resolution of exportResolutions) {
                            entrypoints = appendIfUnique(entrypoints, resolution.path);
                        }
                    }
                }
            }
            return packageJsonInfo.contents.resolvedEntrypoints = entrypoints || false;
        }