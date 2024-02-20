function processImportedModules(file) {
                var _a3;
                collectExternalModuleReferences(file);
                if (file.imports.length || file.moduleAugmentations.length) {
                    const moduleNames = getModuleNames(file);
                    const resolutions = resolveModuleNamesReusingOldState(moduleNames, file);
                    Debug.assert(resolutions.length === moduleNames.length);
                    const optionsForFile = (useSourceOfProjectReferenceRedirect ? (_a3 = getRedirectReferenceForResolution(file)) == null ? void 0 : _a3.commandLine.options : void 0) || options;
                    for (let index = 0; index < moduleNames.length; index++) {
                        const resolution = resolutions[index].resolvedModule;
                        const moduleName = moduleNames[index].text;
                        const mode = getModeForUsageLocation(file, moduleNames[index]);
                        setResolvedModule(file, moduleName, resolutions[index], mode);
                        addResolutionDiagnosticsFromResolutionOrCache(file, moduleName, resolutions[index], mode);
                        if (!resolution) {
                            continue;
                        }
                        const isFromNodeModulesSearch = resolution.isExternalLibraryImport;
                        const isJsFile = !resolutionExtensionIsTSOrJson(resolution.extension);
                        const isJsFileFromNodeModules = isFromNodeModulesSearch && isJsFile;
                        const resolvedFileName = resolution.resolvedFileName;
                        if (isFromNodeModulesSearch) {
                            currentNodeModulesDepth++;
                        }
                        const elideImport = isJsFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;
                        const shouldAddFile = resolvedFileName && !getResolutionDiagnostic(optionsForFile, resolution, file) && !optionsForFile.noResolve && index < file.imports.length && !elideImport && !(isJsFile && !getAllowJSCompilerOption(optionsForFile)) && (isInJSFile(file.imports[index]) || !(file.imports[index].flags & 8388608 /* JSDoc */));
                        if (elideImport) {
                            modulesWithElidedImports.set(file.path, true);
                        }
                        else if (shouldAddFile) {
                            findSourceFile(resolvedFileName, 
                            /*isDefaultLib*/
                            false, 
                            /*ignoreNoDefaultLib*/
                            false, { kind: 3 /* Import */, file: file.path, index }, resolution.packageId);
                        }
                        if (isFromNodeModulesSearch) {
                            currentNodeModulesDepth--;
                        }
                    }
                }
                else {
                    file.resolvedModules = void 0;
                }
            }