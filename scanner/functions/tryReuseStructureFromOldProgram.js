function tryReuseStructureFromOldProgram() {
                var _a3;
                if (!oldProgram) {
                    return 0 /* Not */;
                }
                const oldOptions = oldProgram.getCompilerOptions();
                if (changesAffectModuleResolution(oldOptions, options)) {
                    return 0 /* Not */;
                }
                const oldRootNames = oldProgram.getRootFileNames();
                if (!arrayIsEqualTo(oldRootNames, rootNames)) {
                    return 0 /* Not */;
                }
                if (!canReuseProjectReferences()) {
                    return 0 /* Not */;
                }
                if (projectReferences) {
                    resolvedProjectReferences = projectReferences.map(parseProjectReferenceConfigFile);
                }
                const newSourceFiles = [];
                const modifiedSourceFiles = [];
                structureIsReused = 2 /* Completely */;
                if (oldProgram.getMissingFilePaths().some((missingFilePath) => host.fileExists(missingFilePath))) {
                    return 0 /* Not */;
                }
                const oldSourceFiles = oldProgram.getSourceFiles();
                let SeenPackageName;
                ((SeenPackageName2) => {
                    SeenPackageName2[SeenPackageName2["Exists"] = 0] = "Exists";
                    SeenPackageName2[SeenPackageName2["Modified"] = 1] = "Modified";
                })(SeenPackageName || (SeenPackageName = {}));
                const seenPackageNames = /* @__PURE__ */ new Map();
                for (const oldSourceFile of oldSourceFiles) {
                    const sourceFileOptions = getCreateSourceFileOptions(oldSourceFile.fileName, moduleResolutionCache, host, options);
                    let newSourceFile = host.getSourceFileByPath ? host.getSourceFileByPath(oldSourceFile.fileName, oldSourceFile.resolvedPath, sourceFileOptions, 
                    /*onError*/
                    void 0, shouldCreateNewSourceFile || sourceFileOptions.impliedNodeFormat !== oldSourceFile.impliedNodeFormat) : host.getSourceFile(oldSourceFile.fileName, sourceFileOptions, 
                    /*onError*/
                    void 0, shouldCreateNewSourceFile || sourceFileOptions.impliedNodeFormat !== oldSourceFile.impliedNodeFormat);
                    if (!newSourceFile) {
                        return 0 /* Not */;
                    }
                    newSourceFile.packageJsonLocations = ((_a3 = sourceFileOptions.packageJsonLocations) == null ? void 0 : _a3.length) ? sourceFileOptions.packageJsonLocations : void 0;
                    newSourceFile.packageJsonScope = sourceFileOptions.packageJsonScope;
                    Debug.assert(!newSourceFile.redirectInfo, "Host should not return a redirect source file from `getSourceFile`");
                    let fileChanged;
                    if (oldSourceFile.redirectInfo) {
                        if (newSourceFile !== oldSourceFile.redirectInfo.unredirected) {
                            return 0 /* Not */;
                        }
                        fileChanged = false;
                        newSourceFile = oldSourceFile;
                    }
                    else if (oldProgram.redirectTargetsMap.has(oldSourceFile.path)) {
                        if (newSourceFile !== oldSourceFile) {
                            return 0 /* Not */;
                        }
                        fileChanged = false;
                    }
                    else {
                        fileChanged = newSourceFile !== oldSourceFile;
                    }
                    newSourceFile.path = oldSourceFile.path;
                    newSourceFile.originalFileName = oldSourceFile.originalFileName;
                    newSourceFile.resolvedPath = oldSourceFile.resolvedPath;
                    newSourceFile.fileName = oldSourceFile.fileName;
                    const packageName = oldProgram.sourceFileToPackageName.get(oldSourceFile.path);
                    if (packageName !== void 0) {
                        const prevKind = seenPackageNames.get(packageName);
                        const newKind = fileChanged ? 1 /* Modified */ : 0 /* Exists */;
                        if (prevKind !== void 0 && newKind === 1 /* Modified */ || prevKind === 1 /* Modified */) {
                            return 0 /* Not */;
                        }
                        seenPackageNames.set(packageName, newKind);
                    }
                    if (fileChanged) {
                        if (oldSourceFile.impliedNodeFormat !== newSourceFile.impliedNodeFormat) {
                            structureIsReused = 1 /* SafeModules */;
                        }
                        else if (!arrayIsEqualTo(oldSourceFile.libReferenceDirectives, newSourceFile.libReferenceDirectives, fileReferenceIsEqualTo)) {
                            structureIsReused = 1 /* SafeModules */;
                        }
                        else if (oldSourceFile.hasNoDefaultLib !== newSourceFile.hasNoDefaultLib) {
                            structureIsReused = 1 /* SafeModules */;
                        }
                        else if (!arrayIsEqualTo(oldSourceFile.referencedFiles, newSourceFile.referencedFiles, fileReferenceIsEqualTo)) {
                            structureIsReused = 1 /* SafeModules */;
                        }
                        else {
                            collectExternalModuleReferences(newSourceFile);
                            if (!arrayIsEqualTo(oldSourceFile.imports, newSourceFile.imports, moduleNameIsEqualTo)) {
                                structureIsReused = 1 /* SafeModules */;
                            }
                            else if (!arrayIsEqualTo(oldSourceFile.moduleAugmentations, newSourceFile.moduleAugmentations, moduleNameIsEqualTo)) {
                                structureIsReused = 1 /* SafeModules */;
                            }
                            else if ((oldSourceFile.flags & 6291456 /* PermanentlySetIncrementalFlags */) !== (newSourceFile.flags & 6291456 /* PermanentlySetIncrementalFlags */)) {
                                structureIsReused = 1 /* SafeModules */;
                            }
                            else if (!arrayIsEqualTo(oldSourceFile.typeReferenceDirectives, newSourceFile.typeReferenceDirectives, fileReferenceIsEqualTo)) {
                                structureIsReused = 1 /* SafeModules */;
                            }
                        }
                        modifiedSourceFiles.push({ oldFile: oldSourceFile, newFile: newSourceFile });
                    }
                    else if (hasInvalidatedResolutions(oldSourceFile.path)) {
                        structureIsReused = 1 /* SafeModules */;
                        modifiedSourceFiles.push({ oldFile: oldSourceFile, newFile: newSourceFile });
                    }
                    newSourceFiles.push(newSourceFile);
                }
                if (structureIsReused !== 2 /* Completely */) {
                    return structureIsReused;
                }
                const modifiedFiles = modifiedSourceFiles.map((f) => f.oldFile);
                for (const oldFile of oldSourceFiles) {
                    if (!contains(modifiedFiles, oldFile)) {
                        for (const moduleName of oldFile.ambientModuleNames) {
                            ambientModuleNameToUnmodifiedFileName.set(moduleName, oldFile.fileName);
                        }
                    }
                }
                for (const { oldFile: oldSourceFile, newFile: newSourceFile } of modifiedSourceFiles) {
                    const moduleNames = getModuleNames(newSourceFile);
                    const resolutions = resolveModuleNamesReusingOldState(moduleNames, newSourceFile);
                    const resolutionsChanged = hasChangesInResolutions(moduleNames, newSourceFile, resolutions, oldSourceFile.resolvedModules, moduleResolutionIsEqualTo, moduleResolutionNameAndModeGetter);
                    if (resolutionsChanged) {
                        structureIsReused = 1 /* SafeModules */;
                        newSourceFile.resolvedModules = zipToModeAwareCache(newSourceFile, moduleNames, resolutions, moduleResolutionNameAndModeGetter);
                    }
                    else {
                        newSourceFile.resolvedModules = oldSourceFile.resolvedModules;
                    }
                    const typesReferenceDirectives = newSourceFile.typeReferenceDirectives;
                    const typeReferenceResolutions = resolveTypeReferenceDirectiveNamesReusingOldState(typesReferenceDirectives, newSourceFile);
                    const typeReferenceResolutionsChanged = hasChangesInResolutions(typesReferenceDirectives, newSourceFile, typeReferenceResolutions, oldSourceFile.resolvedTypeReferenceDirectiveNames, typeDirectiveIsEqualTo, typeReferenceResolutionNameAndModeGetter);
                    if (typeReferenceResolutionsChanged) {
                        structureIsReused = 1 /* SafeModules */;
                        newSourceFile.resolvedTypeReferenceDirectiveNames = zipToModeAwareCache(newSourceFile, typesReferenceDirectives, typeReferenceResolutions, typeReferenceResolutionNameAndModeGetter);
                    }
                    else {
                        newSourceFile.resolvedTypeReferenceDirectiveNames = oldSourceFile.resolvedTypeReferenceDirectiveNames;
                    }
                }
                if (structureIsReused !== 2 /* Completely */) {
                    return structureIsReused;
                }
                if (changesAffectingProgramStructure(oldOptions, options)) {
                    return 1 /* SafeModules */;
                }
                if (host.hasChangedAutomaticTypeDirectiveNames) {
                    if (host.hasChangedAutomaticTypeDirectiveNames())
                        return 1 /* SafeModules */;
                }
                else {
                    automaticTypeDirectiveNames = getAutomaticTypeDirectiveNames(options, host);
                    if (!arrayIsEqualTo(oldProgram.getAutomaticTypeDirectiveNames(), automaticTypeDirectiveNames))
                        return 1 /* SafeModules */;
                }
                missingFilePaths = oldProgram.getMissingFilePaths();
                Debug.assert(newSourceFiles.length === oldProgram.getSourceFiles().length);
                for (const newSourceFile of newSourceFiles) {
                    filesByName.set(newSourceFile.path, newSourceFile);
                }
                const oldFilesByNameMap = oldProgram.getFilesByNameMap();
                oldFilesByNameMap.forEach((oldFile, path) => {
                    if (!oldFile) {
                        filesByName.set(path, oldFile);
                        return;
                    }
                    if (oldFile.path === path) {
                        if (oldProgram.isSourceFileFromExternalLibrary(oldFile)) {
                            sourceFilesFoundSearchingNodeModules.set(oldFile.path, true);
                        }
                        return;
                    }
                    filesByName.set(path, filesByName.get(oldFile.path));
                });
                files = newSourceFiles;
                fileReasons = oldProgram.getFileIncludeReasons();
                fileProcessingDiagnostics = oldProgram.getFileProcessingDiagnostics();
                resolvedTypeReferenceDirectives = oldProgram.getResolvedTypeReferenceDirectives();
                automaticTypeDirectiveNames = oldProgram.getAutomaticTypeDirectiveNames();
                automaticTypeDirectiveResolutions = oldProgram.getAutomaticTypeDirectiveResolutions();
                sourceFileToPackageName = oldProgram.sourceFileToPackageName;
                redirectTargetsMap = oldProgram.redirectTargetsMap;
                usesUriStyleNodeCoreModules = oldProgram.usesUriStyleNodeCoreModules;
                return 2 /* Completely */;
            }