function stopWatchFailedLookupLocationOfResolution(resolution, filePath, getResolutionWithResolvedFileName) {
                Debug.checkDefined(resolution.files).delete(filePath);
                resolution.refCount--;
                if (resolution.refCount) {
                    return;
                }
                const resolved = getResolutionWithResolvedFileName(resolution);
                if (resolved && resolved.resolvedFileName) {
                    const key = resolutionHost.toPath(resolved.resolvedFileName);
                    const resolutions = resolvedFileToResolution.get(key);
                    if ((resolutions == null ? void 0 : resolutions.delete(resolution)) && !resolutions.size)
                        resolvedFileToResolution.delete(key);
                }
                const { failedLookupLocations, affectingLocations } = resolution;
                if (resolutionsWithFailedLookups.delete(resolution)) {
                    let removeAtRoot = false;
                    for (const failedLookupLocation of failedLookupLocations) {
                        const failedLookupLocationPath = resolutionHost.toPath(failedLookupLocation);
                        const toWatch = getDirectoryToWatchFailedLookupLocation(failedLookupLocation, failedLookupLocationPath);
                        if (toWatch) {
                            const { dirPath } = toWatch;
                            const refCount = customFailedLookupPaths.get(failedLookupLocationPath);
                            if (refCount) {
                                if (refCount === 1) {
                                    customFailedLookupPaths.delete(failedLookupLocationPath);
                                }
                                else {
                                    Debug.assert(refCount > 1);
                                    customFailedLookupPaths.set(failedLookupLocationPath, refCount - 1);
                                }
                            }
                            if (dirPath === rootPath) {
                                removeAtRoot = true;
                            }
                            else {
                                removeDirectoryWatcher(dirPath);
                            }
                        }
                    }
                    if (removeAtRoot) {
                        removeDirectoryWatcher(rootPath);
                    }
                }
                else if (affectingLocations == null ? void 0 : affectingLocations.length) {
                    resolutionsWithOnlyAffectingLocations.delete(resolution);
                }
                if (affectingLocations) {
                    for (const affectingLocation of affectingLocations) {
                        const watcher = fileWatchesOfAffectingLocations.get(affectingLocation);
                        watcher.resolutions--;
                    }
                }
            }