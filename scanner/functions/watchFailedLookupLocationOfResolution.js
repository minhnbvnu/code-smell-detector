function watchFailedLookupLocationOfResolution(resolution) {
                Debug.assert(!!resolution.refCount);
                const { failedLookupLocations, affectingLocations } = resolution;
                if (!(failedLookupLocations == null ? void 0 : failedLookupLocations.length) && !(affectingLocations == null ? void 0 : affectingLocations.length))
                    return;
                if (failedLookupLocations == null ? void 0 : failedLookupLocations.length)
                    resolutionsWithFailedLookups.add(resolution);
                let setAtRoot = false;
                if (failedLookupLocations) {
                    for (const failedLookupLocation of failedLookupLocations) {
                        const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
                        const toWatch = getDirectoryToWatchFailedLookupLocation(failedLookupLocation, failedLookupLocationPath);
                        if (toWatch) {
                            const { dir, dirPath, nonRecursive } = toWatch;
                            if (!isPathWithDefaultFailedLookupExtension(failedLookupLocationPath)) {
                                const refCount = customFailedLookupPaths.get(failedLookupLocationPath) || 0;
                                customFailedLookupPaths.set(failedLookupLocationPath, refCount + 1);
                            }
                            if (dirPath === rootPath) {
                                Debug.assert(!nonRecursive);
                                setAtRoot = true;
                            }
                            else {
                                setDirectoryWatcher(dir, dirPath, nonRecursive);
                            }
                        }
                    }
                    if (setAtRoot) {
                        setDirectoryWatcher(rootDir, rootPath, 
                        /*nonRecursive*/
                        true);
                    }
                }
                watchAffectingLocationsOfResolution(resolution, !(failedLookupLocations == null ? void 0 : failedLookupLocations.length));
            }