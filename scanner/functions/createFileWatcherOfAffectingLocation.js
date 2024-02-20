function createFileWatcherOfAffectingLocation(affectingLocation, forResolution) {
                const fileWatcher = fileWatchesOfAffectingLocations.get(affectingLocation);
                if (fileWatcher) {
                    if (forResolution)
                        fileWatcher.resolutions++;
                    else
                        fileWatcher.files++;
                    return;
                }
                let locationToWatch = affectingLocation;
                if (resolutionHost.realpath) {
                    locationToWatch = resolutionHost.realpath(affectingLocation);
                    if (affectingLocation !== locationToWatch) {
                        const fileWatcher2 = fileWatchesOfAffectingLocations.get(locationToWatch);
                        if (fileWatcher2) {
                            if (forResolution)
                                fileWatcher2.resolutions++;
                            else
                                fileWatcher2.files++;
                            fileWatcher2.paths.add(affectingLocation);
                            fileWatchesOfAffectingLocations.set(affectingLocation, fileWatcher2);
                            return;
                        }
                    }
                }
                const paths = /* @__PURE__ */ new Set();
                paths.add(locationToWatch);
                let actualWatcher = canWatchDirectoryOrFile(resolutionHost.toPath(locationToWatch)) ? resolutionHost.watchAffectingFileLocation(locationToWatch, (fileName, eventKind) => {
                    cachedDirectoryStructureHost == null ? void 0 : cachedDirectoryStructureHost.addOrDeleteFile(fileName, resolutionHost.toPath(locationToWatch), eventKind);
                    const packageJsonMap = moduleResolutionCache.getPackageJsonInfoCache().getInternalMap();
                    paths.forEach((path) => {
                        if (watcher.resolutions)
                            (affectingPathChecks != null ? affectingPathChecks : affectingPathChecks = /* @__PURE__ */ new Set()).add(path);
                        if (watcher.files)
                            (affectingPathChecksForFile != null ? affectingPathChecksForFile : affectingPathChecksForFile = /* @__PURE__ */ new Set()).add(path);
                        packageJsonMap == null ? void 0 : packageJsonMap.delete(resolutionHost.toPath(path));
                    });
                    resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
                }) : noopFileWatcher;
                const watcher = {
                    watcher: actualWatcher !== noopFileWatcher ? {
                        close: () => {
                            actualWatcher.close();
                            actualWatcher = noopFileWatcher;
                        }
                    } : actualWatcher,
                    resolutions: forResolution ? 1 : 0,
                    files: forResolution ? 0 : 1,
                    paths
                };
                fileWatchesOfAffectingLocations.set(locationToWatch, watcher);
                if (affectingLocation !== locationToWatch) {
                    fileWatchesOfAffectingLocations.set(affectingLocation, watcher);
                    paths.add(affectingLocation);
                }
            }