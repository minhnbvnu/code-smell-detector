function createResolutionCache(resolutionHost, rootDirForResolution, logChangesWhenResolvingModule) {
            let filesWithChangedSetOfUnresolvedImports;
            let filesWithInvalidatedResolutions;
            let filesWithInvalidatedNonRelativeUnresolvedImports;
            const nonRelativeExternalModuleResolutions = createMultiMap();
            const resolutionsWithFailedLookups = /* @__PURE__ */ new Set();
            const resolutionsWithOnlyAffectingLocations = /* @__PURE__ */ new Set();
            const resolvedFileToResolution = /* @__PURE__ */ new Map();
            const impliedFormatPackageJsons = /* @__PURE__ */ new Map();
            let hasChangedAutomaticTypeDirectiveNames = false;
            let affectingPathChecksForFile;
            let affectingPathChecks;
            let failedLookupChecks;
            let startsWithPathChecks;
            let isInDirectoryChecks;
            const getCurrentDirectory = memoize(() => resolutionHost.getCurrentDirectory());
            const cachedDirectoryStructureHost = resolutionHost.getCachedDirectoryStructureHost();
            const resolvedModuleNames = /* @__PURE__ */ new Map();
            const moduleResolutionCache = createModuleResolutionCache(getCurrentDirectory(), resolutionHost.getCanonicalFileName, resolutionHost.getCompilationSettings());
            const resolvedTypeReferenceDirectives = /* @__PURE__ */ new Map();
            const typeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(getCurrentDirectory(), resolutionHost.getCanonicalFileName, resolutionHost.getCompilationSettings(), moduleResolutionCache.getPackageJsonInfoCache());
            const failedLookupDefaultExtensions = [".ts" /* Ts */, ".tsx" /* Tsx */, ".js" /* Js */, ".jsx" /* Jsx */, ".json" /* Json */];
            const customFailedLookupPaths = /* @__PURE__ */ new Map();
            const directoryWatchesOfFailedLookups = /* @__PURE__ */ new Map();
            const fileWatchesOfAffectingLocations = /* @__PURE__ */ new Map();
            const rootDir = rootDirForResolution && removeTrailingDirectorySeparator(getNormalizedAbsolutePath(rootDirForResolution, getCurrentDirectory()));
            const rootPath = rootDir && resolutionHost.toPath(rootDir);
            const rootSplitLength = rootPath !== void 0 ? rootPath.split(directorySeparator).length : 0;
            const typeRootsWatches = /* @__PURE__ */ new Map();
            return {
                getModuleResolutionCache: () => moduleResolutionCache,
                startRecordingFilesWithChangedResolutions,
                finishRecordingFilesWithChangedResolutions,
                // perDirectoryResolvedModuleNames and perDirectoryResolvedTypeReferenceDirectives could be non empty if there was exception during program update
                // (between startCachingPerDirectoryResolution and finishCachingPerDirectoryResolution)
                startCachingPerDirectoryResolution,
                finishCachingPerDirectoryResolution,
                resolveModuleNameLiterals,
                resolveTypeReferenceDirectiveReferences,
                resolveSingleModuleNameWithoutWatching,
                removeResolutionsFromProjectReferenceRedirects,
                removeResolutionsOfFile,
                hasChangedAutomaticTypeDirectiveNames: () => hasChangedAutomaticTypeDirectiveNames,
                invalidateResolutionOfFile,
                invalidateResolutionsOfFailedLookupLocations,
                setFilesWithInvalidatedNonRelativeUnresolvedImports,
                createHasInvalidatedResolutions,
                isFileWithInvalidatedNonRelativeUnresolvedImports,
                updateTypeRootsWatch,
                closeTypeRootsWatch,
                clear: clear2
            };
            function getResolvedModule2(resolution) {
                return resolution.resolvedModule;
            }
            function getResolvedTypeReferenceDirective2(resolution) {
                return resolution.resolvedTypeReferenceDirective;
            }
            function isInDirectoryPath(dir, file) {
                if (dir === void 0 || file.length <= dir.length) {
                    return false;
                }
                return startsWith(file, dir) && file[dir.length] === directorySeparator;
            }
            function clear2() {
                clearMap(directoryWatchesOfFailedLookups, closeFileWatcherOf);
                clearMap(fileWatchesOfAffectingLocations, closeFileWatcherOf);
                customFailedLookupPaths.clear();
                nonRelativeExternalModuleResolutions.clear();
                closeTypeRootsWatch();
                resolvedModuleNames.clear();
                resolvedTypeReferenceDirectives.clear();
                resolvedFileToResolution.clear();
                resolutionsWithFailedLookups.clear();
                resolutionsWithOnlyAffectingLocations.clear();
                failedLookupChecks = void 0;
                startsWithPathChecks = void 0;
                isInDirectoryChecks = void 0;
                affectingPathChecks = void 0;
                affectingPathChecksForFile = void 0;
                moduleResolutionCache.clear();
                typeReferenceDirectiveResolutionCache.clear();
                moduleResolutionCache.update(resolutionHost.getCompilationSettings());
                typeReferenceDirectiveResolutionCache.update(resolutionHost.getCompilationSettings());
                impliedFormatPackageJsons.clear();
                hasChangedAutomaticTypeDirectiveNames = false;
            }
            function startRecordingFilesWithChangedResolutions() {
                filesWithChangedSetOfUnresolvedImports = [];
            }
            function finishRecordingFilesWithChangedResolutions() {
                const collected = filesWithChangedSetOfUnresolvedImports;
                filesWithChangedSetOfUnresolvedImports = void 0;
                return collected;
            }
            function isFileWithInvalidatedNonRelativeUnresolvedImports(path) {
                if (!filesWithInvalidatedNonRelativeUnresolvedImports) {
                    return false;
                }
                const value = filesWithInvalidatedNonRelativeUnresolvedImports.get(path);
                return !!value && !!value.length;
            }
            function createHasInvalidatedResolutions(customHasInvalidatedResolutions) {
                invalidateResolutionsOfFailedLookupLocations();
                const collected = filesWithInvalidatedResolutions;
                filesWithInvalidatedResolutions = void 0;
                return (path) => customHasInvalidatedResolutions(path) || !!(collected == null ? void 0 : collected.has(path)) || isFileWithInvalidatedNonRelativeUnresolvedImports(path);
            }
            function startCachingPerDirectoryResolution() {
                moduleResolutionCache.clearAllExceptPackageJsonInfoCache();
                typeReferenceDirectiveResolutionCache.clearAllExceptPackageJsonInfoCache();
                nonRelativeExternalModuleResolutions.forEach(watchFailedLookupLocationOfNonRelativeModuleResolutions);
                nonRelativeExternalModuleResolutions.clear();
            }
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
            function resolveModuleName2(moduleName, containingFile, compilerOptions, redirectedReference, mode) {
                var _a2;
                const host = ((_a2 = resolutionHost.getCompilerHost) == null ? void 0 : _a2.call(resolutionHost)) || resolutionHost;
                const primaryResult = resolveModuleName(moduleName, containingFile, compilerOptions, host, moduleResolutionCache, redirectedReference, mode);
                if (!resolutionHost.getGlobalCache) {
                    return primaryResult;
                }
                const globalCache = resolutionHost.getGlobalCache();
                if (globalCache !== void 0 && !isExternalModuleNameRelative(moduleName) && !(primaryResult.resolvedModule && extensionIsTS(primaryResult.resolvedModule.extension))) {
                    const { resolvedModule, failedLookupLocations, affectingLocations, resolutionDiagnostics } = loadModuleFromGlobalCache(Debug.checkDefined(resolutionHost.globalCacheResolutionModuleName)(moduleName), resolutionHost.projectName, compilerOptions, host, globalCache, moduleResolutionCache);
                    if (resolvedModule) {
                        primaryResult.resolvedModule = resolvedModule;
                        primaryResult.failedLookupLocations = updateResolutionField(primaryResult.failedLookupLocations, failedLookupLocations);
                        primaryResult.affectingLocations = updateResolutionField(primaryResult.affectingLocations, affectingLocations);
                        primaryResult.resolutionDiagnostics = updateResolutionField(primaryResult.resolutionDiagnostics, resolutionDiagnostics);
                        return primaryResult;
                    }
                }
                return primaryResult;
            }
            function createModuleResolutionLoader2(containingFile, redirectedReference, options) {
                return {
                    nameAndMode: moduleResolutionNameAndModeGetter,
                    resolve: (moduleName, resoluionMode) => resolveModuleName2(moduleName, containingFile, options, redirectedReference, resoluionMode)
                };
            }
            function resolveNamesWithLocalCache({ entries, containingFile, containingSourceFile, redirectedReference, options, perFileCache, reusedNames, loader, getResolutionWithResolvedFileName, shouldRetryResolution, logChanges }) {
                var _a2;
                const path = resolutionHost.toPath(containingFile);
                const resolutionsInFile = perFileCache.get(path) || perFileCache.set(path, createModeAwareCache()).get(path);
                const resolvedModules = [];
                const hasInvalidatedNonRelativeUnresolvedImport = logChanges && isFileWithInvalidatedNonRelativeUnresolvedImports(path);
                const program = resolutionHost.getCurrentProgram();
                const oldRedirect = program && program.getResolvedProjectReferenceToRedirect(containingFile);
                const unmatchedRedirects = oldRedirect ? !redirectedReference || redirectedReference.sourceFile.path !== oldRedirect.sourceFile.path : !!redirectedReference;
                const seenNamesInFile = createModeAwareCache();
                for (const entry of entries) {
                    const name = loader.nameAndMode.getName(entry);
                    const mode = loader.nameAndMode.getMode(entry, containingSourceFile);
                    let resolution = resolutionsInFile.get(name, mode);
                    if (!seenNamesInFile.has(name, mode) && unmatchedRedirects || !resolution || resolution.isInvalidated || // If the name is unresolved import that was invalidated, recalculate
                        hasInvalidatedNonRelativeUnresolvedImport && !isExternalModuleNameRelative(name) && shouldRetryResolution(resolution)) {
                        const existingResolution = resolution;
                        resolution = loader.resolve(name, mode);
                        if (resolutionHost.onDiscoveredSymlink && resolutionIsSymlink(resolution)) {
                            resolutionHost.onDiscoveredSymlink();
                        }
                        resolutionsInFile.set(name, mode, resolution);
                        watchFailedLookupLocationsOfExternalModuleResolutions(name, resolution, path, getResolutionWithResolvedFileName);
                        if (existingResolution) {
                            stopWatchFailedLookupLocationOfResolution(existingResolution, path, getResolutionWithResolvedFileName);
                        }
                        if (logChanges && filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                            filesWithChangedSetOfUnresolvedImports.push(path);
                            logChanges = false;
                        }
                    }
                    else {
                        const host = ((_a2 = resolutionHost.getCompilerHost) == null ? void 0 : _a2.call(resolutionHost)) || resolutionHost;
                        if (isTraceEnabled(options, host) && !seenNamesInFile.has(name, mode)) {
                            const resolved = getResolutionWithResolvedFileName(resolution);
                            trace(host, perFileCache === resolvedModuleNames ? (resolved == null ? void 0 : resolved.resolvedFileName) ? resolved.packageId ? Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 : Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2 : Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved : (resolved == null ? void 0 : resolved.resolvedFileName) ? resolved.packageId ? Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 : Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2 : Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_not_resolved, name, containingFile, resolved == null ? void 0 : resolved.resolvedFileName, (resolved == null ? void 0 : resolved.packageId) && packageIdToString(resolved.packageId));
                        }
                    }
                    Debug.assert(resolution !== void 0 && !resolution.isInvalidated);
                    seenNamesInFile.set(name, mode, true);
                    resolvedModules.push(resolution);
                }
                reusedNames == null ? void 0 : reusedNames.forEach((entry) => seenNamesInFile.set(loader.nameAndMode.getName(entry), loader.nameAndMode.getMode(entry, containingSourceFile), true));
                if (resolutionsInFile.size() !== seenNamesInFile.size()) {
                    resolutionsInFile.forEach((resolution, name, mode) => {
                        if (!seenNamesInFile.has(name, mode)) {
                            stopWatchFailedLookupLocationOfResolution(resolution, path, getResolutionWithResolvedFileName);
                            resolutionsInFile.delete(name, mode);
                        }
                    });
                }
                return resolvedModules;
                function resolutionIsEqualTo(oldResolution, newResolution) {
                    if (oldResolution === newResolution) {
                        return true;
                    }
                    if (!oldResolution || !newResolution) {
                        return false;
                    }
                    const oldResult = getResolutionWithResolvedFileName(oldResolution);
                    const newResult = getResolutionWithResolvedFileName(newResolution);
                    if (oldResult === newResult) {
                        return true;
                    }
                    if (!oldResult || !newResult) {
                        return false;
                    }
                    return oldResult.resolvedFileName === newResult.resolvedFileName;
                }
            }
            function resolveTypeReferenceDirectiveReferences(typeDirectiveReferences, containingFile, redirectedReference, options, containingSourceFile, reusedNames) {
                var _a2;
                return resolveNamesWithLocalCache({
                    entries: typeDirectiveReferences,
                    containingFile,
                    containingSourceFile,
                    redirectedReference,
                    options,
                    reusedNames,
                    perFileCache: resolvedTypeReferenceDirectives,
                    loader: createTypeReferenceResolutionLoader(containingFile, redirectedReference, options, ((_a2 = resolutionHost.getCompilerHost) == null ? void 0 : _a2.call(resolutionHost)) || resolutionHost, typeReferenceDirectiveResolutionCache),
                    getResolutionWithResolvedFileName: getResolvedTypeReferenceDirective2,
                    shouldRetryResolution: (resolution) => resolution.resolvedTypeReferenceDirective === void 0
                });
            }
            function resolveModuleNameLiterals(moduleLiterals, containingFile, redirectedReference, options, containingSourceFile, reusedNames) {
                return resolveNamesWithLocalCache({
                    entries: moduleLiterals,
                    containingFile,
                    containingSourceFile,
                    redirectedReference,
                    options,
                    reusedNames,
                    perFileCache: resolvedModuleNames,
                    loader: createModuleResolutionLoader2(containingFile, redirectedReference, options),
                    getResolutionWithResolvedFileName: getResolvedModule2,
                    shouldRetryResolution: (resolution) => !resolution.resolvedModule || !resolutionExtensionIsTSOrJson(resolution.resolvedModule.extension),
                    logChanges: logChangesWhenResolvingModule
                });
            }
            function resolveSingleModuleNameWithoutWatching(moduleName, containingFile) {
                const path = resolutionHost.toPath(containingFile);
                const resolutionsInFile = resolvedModuleNames.get(path);
                const resolution = resolutionsInFile == null ? void 0 : resolutionsInFile.get(moduleName, 
                /*mode*/
                void 0);
                if (resolution && !resolution.isInvalidated)
                    return resolution;
                return resolveModuleName2(moduleName, containingFile, resolutionHost.getCompilationSettings());
            }
            function isNodeModulesAtTypesDirectory(dirPath) {
                return endsWith(dirPath, "/node_modules/@types");
            }
            function getDirectoryToWatchFailedLookupLocation(failedLookupLocation, failedLookupLocationPath) {
                if (isInDirectoryPath(rootPath, failedLookupLocationPath)) {
                    failedLookupLocation = isRootedDiskPath(failedLookupLocation) ? normalizePath(failedLookupLocation) : getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory());
                    const failedLookupPathSplit = failedLookupLocationPath.split(directorySeparator);
                    const failedLookupSplit = failedLookupLocation.split(directorySeparator);
                    Debug.assert(failedLookupSplit.length === failedLookupPathSplit.length, `FailedLookup: ${failedLookupLocation} failedLookupLocationPath: ${failedLookupLocationPath}`);
                    if (failedLookupPathSplit.length > rootSplitLength + 1) {
                        return {
                            dir: failedLookupSplit.slice(0, rootSplitLength + 1).join(directorySeparator),
                            dirPath: failedLookupPathSplit.slice(0, rootSplitLength + 1).join(directorySeparator)
                        };
                    }
                    else {
                        return {
                            dir: rootDir,
                            dirPath: rootPath,
                            nonRecursive: false
                        };
                    }
                }
                return getDirectoryToWatchFromFailedLookupLocationDirectory(getDirectoryPath(getNormalizedAbsolutePath(failedLookupLocation, getCurrentDirectory())), getDirectoryPath(failedLookupLocationPath));
            }
            function getDirectoryToWatchFromFailedLookupLocationDirectory(dir, dirPath) {
                while (pathContainsNodeModules(dirPath)) {
                    dir = getDirectoryPath(dir);
                    dirPath = getDirectoryPath(dirPath);
                }
                if (isNodeModulesDirectory(dirPath)) {
                    return canWatchDirectoryOrFile(getDirectoryPath(dirPath)) ? { dir, dirPath } : void 0;
                }
                let nonRecursive = true;
                let subDirectoryPath, subDirectory;
                if (rootPath !== void 0) {
                    while (!isInDirectoryPath(dirPath, rootPath)) {
                        const parentPath = getDirectoryPath(dirPath);
                        if (parentPath === dirPath) {
                            break;
                        }
                        nonRecursive = false;
                        subDirectoryPath = dirPath;
                        subDirectory = dir;
                        dirPath = parentPath;
                        dir = getDirectoryPath(dir);
                    }
                }
                return canWatchDirectoryOrFile(dirPath) ? { dir: subDirectory || dir, dirPath: subDirectoryPath || dirPath, nonRecursive } : void 0;
            }
            function isPathWithDefaultFailedLookupExtension(path) {
                return fileExtensionIsOneOf(path, failedLookupDefaultExtensions);
            }
            function watchFailedLookupLocationsOfExternalModuleResolutions(name, resolution, filePath, getResolutionWithResolvedFileName) {
                var _a2, _b;
                if (resolution.refCount) {
                    resolution.refCount++;
                    Debug.assertIsDefined(resolution.files);
                }
                else {
                    resolution.refCount = 1;
                    Debug.assert(!((_a2 = resolution.files) == null ? void 0 : _a2.size));
                    if (isExternalModuleNameRelative(name)) {
                        watchFailedLookupLocationOfResolution(resolution);
                    }
                    else {
                        nonRelativeExternalModuleResolutions.add(name, resolution);
                    }
                    const resolved = getResolutionWithResolvedFileName(resolution);
                    if (resolved && resolved.resolvedFileName) {
                        const key = resolutionHost.toPath(resolved.resolvedFileName);
                        let resolutions = resolvedFileToResolution.get(key);
                        if (!resolutions)
                            resolvedFileToResolution.set(key, resolutions = /* @__PURE__ */ new Set());
                        resolutions.add(resolution);
                    }
                }
                ((_b = resolution.files) != null ? _b : resolution.files = /* @__PURE__ */ new Set()).add(filePath);
            }
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
            function watchAffectingLocationsOfResolution(resolution, addToResolutionsWithOnlyAffectingLocations) {
                Debug.assert(!!resolution.refCount);
                const { affectingLocations } = resolution;
                if (!(affectingLocations == null ? void 0 : affectingLocations.length))
                    return;
                if (addToResolutionsWithOnlyAffectingLocations)
                    resolutionsWithOnlyAffectingLocations.add(resolution);
                for (const affectingLocation of affectingLocations) {
                    createFileWatcherOfAffectingLocation(affectingLocation, 
                    /*forResolution*/
                    true);
                }
            }
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
            function watchFailedLookupLocationOfNonRelativeModuleResolutions(resolutions, name) {
                const program = resolutionHost.getCurrentProgram();
                if (!program || !program.getTypeChecker().tryFindAmbientModuleWithoutAugmentations(name)) {
                    resolutions.forEach(watchFailedLookupLocationOfResolution);
                }
                else {
                    resolutions.forEach((resolution) => watchAffectingLocationsOfResolution(resolution, 
                    /*addToResolutionWithOnlyAffectingLocations*/
                    true));
                }
            }
            function setDirectoryWatcher(dir, dirPath, nonRecursive) {
                const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath);
                if (dirWatcher) {
                    Debug.assert(!!nonRecursive === !!dirWatcher.nonRecursive);
                    dirWatcher.refCount++;
                }
                else {
                    directoryWatchesOfFailedLookups.set(dirPath, { watcher: createDirectoryWatcher(dir, dirPath, nonRecursive), refCount: 1, nonRecursive });
                }
            }
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
            function removeDirectoryWatcher(dirPath) {
                const dirWatcher = directoryWatchesOfFailedLookups.get(dirPath);
                dirWatcher.refCount--;
            }
            function createDirectoryWatcher(directory, dirPath, nonRecursive) {
                return resolutionHost.watchDirectoryOfFailedLookupLocation(directory, (fileOrDirectory) => {
                    const fileOrDirectoryPath = resolutionHost.toPath(fileOrDirectory);
                    if (cachedDirectoryStructureHost) {
                        cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                    }
                    scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, dirPath === fileOrDirectoryPath);
                }, nonRecursive ? 0 /* None */ : 1 /* Recursive */);
            }
            function removeResolutionsOfFileFromCache(cache, filePath, getResolutionWithResolvedFileName) {
                const resolutions = cache.get(filePath);
                if (resolutions) {
                    resolutions.forEach((resolution) => stopWatchFailedLookupLocationOfResolution(resolution, filePath, getResolutionWithResolvedFileName));
                    cache.delete(filePath);
                }
            }
            function removeResolutionsFromProjectReferenceRedirects(filePath) {
                if (!fileExtensionIs(filePath, ".json" /* Json */))
                    return;
                const program = resolutionHost.getCurrentProgram();
                if (!program)
                    return;
                const resolvedProjectReference = program.getResolvedProjectReferenceByPath(filePath);
                if (!resolvedProjectReference)
                    return;
                resolvedProjectReference.commandLine.fileNames.forEach((f) => removeResolutionsOfFile(resolutionHost.toPath(f)));
            }
            function removeResolutionsOfFile(filePath) {
                removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, getResolvedModule2);
                removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, getResolvedTypeReferenceDirective2);
            }
            function invalidateResolutions(resolutions, canInvalidate) {
                if (!resolutions)
                    return false;
                let invalidated = false;
                resolutions.forEach((resolution) => {
                    if (resolution.isInvalidated || !canInvalidate(resolution))
                        return;
                    resolution.isInvalidated = invalidated = true;
                    for (const containingFilePath of Debug.checkDefined(resolution.files)) {
                        (filesWithInvalidatedResolutions != null ? filesWithInvalidatedResolutions : filesWithInvalidatedResolutions = /* @__PURE__ */ new Set()).add(containingFilePath);
                        hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames || endsWith(containingFilePath, inferredTypesContainingFile);
                    }
                });
                return invalidated;
            }
            function invalidateResolutionOfFile(filePath) {
                removeResolutionsOfFile(filePath);
                const prevHasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
                if (invalidateResolutions(resolvedFileToResolution.get(filePath), returnTrue) && hasChangedAutomaticTypeDirectiveNames && !prevHasChangedAutomaticTypeDirectiveNames) {
                    resolutionHost.onChangedAutomaticTypeDirectiveNames();
                }
            }
            function setFilesWithInvalidatedNonRelativeUnresolvedImports(filesMap) {
                Debug.assert(filesWithInvalidatedNonRelativeUnresolvedImports === filesMap || filesWithInvalidatedNonRelativeUnresolvedImports === void 0);
                filesWithInvalidatedNonRelativeUnresolvedImports = filesMap;
            }
            function scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, isCreatingWatchedDirectory) {
                if (isCreatingWatchedDirectory) {
                    (isInDirectoryChecks || (isInDirectoryChecks = /* @__PURE__ */ new Set())).add(fileOrDirectoryPath);
                }
                else {
                    const updatedPath = removeIgnoredPath(fileOrDirectoryPath);
                    if (!updatedPath)
                        return false;
                    fileOrDirectoryPath = updatedPath;
                    if (resolutionHost.fileIsOpen(fileOrDirectoryPath)) {
                        return false;
                    }
                    const dirOfFileOrDirectory = getDirectoryPath(fileOrDirectoryPath);
                    if (isNodeModulesAtTypesDirectory(fileOrDirectoryPath) || isNodeModulesDirectory(fileOrDirectoryPath) || isNodeModulesAtTypesDirectory(dirOfFileOrDirectory) || isNodeModulesDirectory(dirOfFileOrDirectory)) {
                        (failedLookupChecks || (failedLookupChecks = /* @__PURE__ */ new Set())).add(fileOrDirectoryPath);
                        (startsWithPathChecks || (startsWithPathChecks = /* @__PURE__ */ new Set())).add(fileOrDirectoryPath);
                    }
                    else {
                        if (!isPathWithDefaultFailedLookupExtension(fileOrDirectoryPath) && !customFailedLookupPaths.has(fileOrDirectoryPath)) {
                            return false;
                        }
                        if (isEmittedFileOfProgram(resolutionHost.getCurrentProgram(), fileOrDirectoryPath)) {
                            return false;
                        }
                        (failedLookupChecks || (failedLookupChecks = /* @__PURE__ */ new Set())).add(fileOrDirectoryPath);
                        const packagePath = parseNodeModuleFromPath(fileOrDirectoryPath);
                        if (packagePath)
                            (startsWithPathChecks || (startsWithPathChecks = /* @__PURE__ */ new Set())).add(packagePath);
                    }
                }
                resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
            }
            function invalidateResolutionsOfFailedLookupLocations() {
                var _a2;
                let invalidated = false;
                if (affectingPathChecksForFile) {
                    (_a2 = resolutionHost.getCurrentProgram()) == null ? void 0 : _a2.getSourceFiles().forEach((f) => {
                        if (some(f.packageJsonLocations, (location) => affectingPathChecksForFile.has(location))) {
                            (filesWithInvalidatedResolutions != null ? filesWithInvalidatedResolutions : filesWithInvalidatedResolutions = /* @__PURE__ */ new Set()).add(f.path);
                            invalidated = true;
                        }
                    });
                    affectingPathChecksForFile = void 0;
                }
                if (!failedLookupChecks && !startsWithPathChecks && !isInDirectoryChecks && !affectingPathChecks) {
                    return invalidated;
                }
                invalidated = invalidateResolutions(resolutionsWithFailedLookups, canInvalidateFailedLookupResolution) || invalidated;
                const packageJsonMap = moduleResolutionCache.getPackageJsonInfoCache().getInternalMap();
                if (packageJsonMap && (failedLookupChecks || startsWithPathChecks || isInDirectoryChecks)) {
                    packageJsonMap.forEach((_value, path) => isInvalidatedFailedLookup(path) ? packageJsonMap.delete(path) : void 0);
                }
                failedLookupChecks = void 0;
                startsWithPathChecks = void 0;
                isInDirectoryChecks = void 0;
                invalidated = invalidateResolutions(resolutionsWithOnlyAffectingLocations, canInvalidatedFailedLookupResolutionWithAffectingLocation) || invalidated;
                affectingPathChecks = void 0;
                return invalidated;
            }
            function canInvalidateFailedLookupResolution(resolution) {
                var _a2;
                if (canInvalidatedFailedLookupResolutionWithAffectingLocation(resolution))
                    return true;
                if (!failedLookupChecks && !startsWithPathChecks && !isInDirectoryChecks)
                    return false;
                return (_a2 = resolution.failedLookupLocations) == null ? void 0 : _a2.some((location) => isInvalidatedFailedLookup(resolutionHost.toPath(location)));
            }
            function isInvalidatedFailedLookup(locationPath) {
                return (failedLookupChecks == null ? void 0 : failedLookupChecks.has(locationPath)) || firstDefinedIterator((startsWithPathChecks == null ? void 0 : startsWithPathChecks.keys()) || [], (fileOrDirectoryPath) => startsWith(locationPath, fileOrDirectoryPath) ? true : void 0) || firstDefinedIterator((isInDirectoryChecks == null ? void 0 : isInDirectoryChecks.keys()) || [], (fileOrDirectoryPath) => isInDirectoryPath(fileOrDirectoryPath, locationPath) ? true : void 0);
            }
            function canInvalidatedFailedLookupResolutionWithAffectingLocation(resolution) {
                var _a2;
                return !!affectingPathChecks && ((_a2 = resolution.affectingLocations) == null ? void 0 : _a2.some((location) => affectingPathChecks.has(location)));
            }
            function closeTypeRootsWatch() {
                clearMap(typeRootsWatches, closeFileWatcher);
            }
            function getDirectoryToWatchFailedLookupLocationFromTypeRoot(typeRoot, typeRootPath) {
                if (isInDirectoryPath(rootPath, typeRootPath)) {
                    return rootPath;
                }
                const toWatch = getDirectoryToWatchFromFailedLookupLocationDirectory(typeRoot, typeRootPath);
                return toWatch && directoryWatchesOfFailedLookups.has(toWatch.dirPath) ? toWatch.dirPath : void 0;
            }
            function createTypeRootsWatch(typeRootPath, typeRoot) {
                return resolutionHost.watchTypeRootsDirectory(typeRoot, (fileOrDirectory) => {
                    const fileOrDirectoryPath = resolutionHost.toPath(fileOrDirectory);
                    if (cachedDirectoryStructureHost) {
                        cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                    }
                    hasChangedAutomaticTypeDirectiveNames = true;
                    resolutionHost.onChangedAutomaticTypeDirectiveNames();
                    const dirPath = getDirectoryToWatchFailedLookupLocationFromTypeRoot(typeRoot, typeRootPath);
                    if (dirPath) {
                        scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, dirPath === fileOrDirectoryPath);
                    }
                }, 1 /* Recursive */);
            }
            function updateTypeRootsWatch() {
                const options = resolutionHost.getCompilationSettings();
                if (options.types) {
                    closeTypeRootsWatch();
                    return;
                }
                const typeRoots = getEffectiveTypeRoots(options, { directoryExists: directoryExistsForTypeRootWatch, getCurrentDirectory });
                if (typeRoots) {
                    mutateMap(typeRootsWatches, arrayToMap(typeRoots, (tr) => resolutionHost.toPath(tr)), {
                        createNewValue: createTypeRootsWatch,
                        onDeleteValue: closeFileWatcher
                    });
                }
                else {
                    closeTypeRootsWatch();
                }
            }
            function directoryExistsForTypeRootWatch(nodeTypesDirectory) {
                const dir = getDirectoryPath(getDirectoryPath(nodeTypesDirectory));
                const dirPath = resolutionHost.toPath(dir);
                return dirPath === rootPath || canWatchDirectoryOrFile(dirPath);
            }
        }