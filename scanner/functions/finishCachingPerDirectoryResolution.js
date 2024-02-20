function finishCachingPerDirectoryResolution(newProgram, oldProgram) {
                filesWithInvalidatedNonRelativeUnresolvedImports = void 0;
                nonRelativeExternalModuleResolutions.forEach(watchFailedLookupLocationOfNonRelativeModuleResolutions);
                nonRelativeExternalModuleResolutions.clear();
                if (newProgram !== oldProgram) {
                    newProgram == null ? void 0 : newProgram.getSourceFiles().forEach((newFile) => {
                        var _a2, _b, _c;
                        const expected = isExternalOrCommonJsModule(newFile) ? (_b = (_a2 = newFile.packageJsonLocations) == null ? void 0 : _a2.length) != null ? _b : 0 : 0;
                        const existing = (_c = impliedFormatPackageJsons.get(newFile.path)) != null ? _c : emptyArray;
                        for (let i = existing.length; i < expected; i++) {
                            createFileWatcherOfAffectingLocation(newFile.packageJsonLocations[i], 
                            /*forResolution*/
                            false);
                        }
                        if (existing.length > expected) {
                            for (let i = expected; i < existing.length; i++) {
                                fileWatchesOfAffectingLocations.get(existing[i]).files--;
                            }
                        }
                        if (expected)
                            impliedFormatPackageJsons.set(newFile.path, newFile.packageJsonLocations);
                        else
                            impliedFormatPackageJsons.delete(newFile.path);
                    });
                    impliedFormatPackageJsons.forEach((existing, path) => {
                        if (!(newProgram == null ? void 0 : newProgram.getSourceFileByPath(path))) {
                            existing.forEach((location) => fileWatchesOfAffectingLocations.get(location).files--);
                            impliedFormatPackageJsons.delete(path);
                        }
                    });
                }
                directoryWatchesOfFailedLookups.forEach((watcher, path) => {
                    if (watcher.refCount === 0) {
                        directoryWatchesOfFailedLookups.delete(path);
                        watcher.watcher.close();
                    }
                });
                fileWatchesOfAffectingLocations.forEach((watcher, path) => {
                    if (watcher.files === 0 && watcher.resolutions === 0) {
                        fileWatchesOfAffectingLocations.delete(path);
                        watcher.watcher.close();
                    }
                });
                hasChangedAutomaticTypeDirectiveNames = false;
            }