function findSourceFileWorker(fileName, isDefaultLib, ignoreNoDefaultLib, reason, packageId) {
                var _a3, _b2;
                const path = toPath3(fileName);
                if (useSourceOfProjectReferenceRedirect) {
                    let source = getSourceOfProjectReferenceRedirect(path);
                    if (!source && host.realpath && options.preserveSymlinks && isDeclarationFileName(fileName) && stringContains(fileName, nodeModulesPathPart)) {
                        const realPath2 = toPath3(host.realpath(fileName));
                        if (realPath2 !== path)
                            source = getSourceOfProjectReferenceRedirect(realPath2);
                    }
                    if (source) {
                        const file2 = isString(source) ? findSourceFile(source, isDefaultLib, ignoreNoDefaultLib, reason, packageId) : void 0;
                        if (file2)
                            addFileToFilesByName(file2, path, 
                            /*redirectedPath*/
                            void 0);
                        return file2;
                    }
                }
                const originalFileName = fileName;
                if (filesByName.has(path)) {
                    const file2 = filesByName.get(path);
                    addFileIncludeReason(file2 || void 0, reason);
                    if (file2 && !(options.forceConsistentCasingInFileNames === false)) {
                        const checkedName = file2.fileName;
                        const isRedirect = toPath3(checkedName) !== toPath3(fileName);
                        if (isRedirect) {
                            fileName = getProjectReferenceRedirect(fileName) || fileName;
                        }
                        const checkedAbsolutePath = getNormalizedAbsolutePathWithoutRoot(checkedName, currentDirectory);
                        const inputAbsolutePath = getNormalizedAbsolutePathWithoutRoot(fileName, currentDirectory);
                        if (checkedAbsolutePath !== inputAbsolutePath) {
                            reportFileNamesDifferOnlyInCasingError(fileName, file2, reason);
                        }
                    }
                    if (file2 && sourceFilesFoundSearchingNodeModules.get(file2.path) && currentNodeModulesDepth === 0) {
                        sourceFilesFoundSearchingNodeModules.set(file2.path, false);
                        if (!options.noResolve) {
                            processReferencedFiles(file2, isDefaultLib);
                            processTypeReferenceDirectives(file2);
                        }
                        if (!options.noLib) {
                            processLibReferenceDirectives(file2);
                        }
                        modulesWithElidedImports.set(file2.path, false);
                        processImportedModules(file2);
                    }
                    else if (file2 && modulesWithElidedImports.get(file2.path)) {
                        if (currentNodeModulesDepth < maxNodeModuleJsDepth) {
                            modulesWithElidedImports.set(file2.path, false);
                            processImportedModules(file2);
                        }
                    }
                    return file2 || void 0;
                }
                let redirectedPath;
                if (isReferencedFile(reason) && !useSourceOfProjectReferenceRedirect) {
                    const redirectProject = getProjectReferenceRedirectProject(fileName);
                    if (redirectProject) {
                        if (outFile(redirectProject.commandLine.options)) {
                            return void 0;
                        }
                        const redirect = getProjectReferenceOutputName(redirectProject, fileName);
                        fileName = redirect;
                        redirectedPath = toPath3(redirect);
                    }
                }
                const sourceFileOptions = getCreateSourceFileOptions(fileName, moduleResolutionCache, host, options);
                const file = host.getSourceFile(fileName, sourceFileOptions, (hostErrorMessage) => addFilePreprocessingFileExplainingDiagnostic(
                /*file*/
                void 0, reason, Diagnostics.Cannot_read_file_0_Colon_1, [fileName, hostErrorMessage]), shouldCreateNewSourceFile || ((_a3 = oldProgram == null ? void 0 : oldProgram.getSourceFileByPath(toPath3(fileName))) == null ? void 0 : _a3.impliedNodeFormat) !== sourceFileOptions.impliedNodeFormat);
                if (packageId) {
                    const packageIdKey = packageIdToString(packageId);
                    const fileFromPackageId = packageIdToSourceFile.get(packageIdKey);
                    if (fileFromPackageId) {
                        const dupFile = createRedirectedSourceFile(fileFromPackageId, file, fileName, path, toPath3(fileName), originalFileName, sourceFileOptions);
                        redirectTargetsMap.add(fileFromPackageId.path, fileName);
                        addFileToFilesByName(dupFile, path, redirectedPath);
                        addFileIncludeReason(dupFile, reason);
                        sourceFileToPackageName.set(path, packageIdToPackageName(packageId));
                        processingOtherFiles.push(dupFile);
                        return dupFile;
                    }
                    else if (file) {
                        packageIdToSourceFile.set(packageIdKey, file);
                        sourceFileToPackageName.set(path, packageIdToPackageName(packageId));
                    }
                }
                addFileToFilesByName(file, path, redirectedPath);
                if (file) {
                    sourceFilesFoundSearchingNodeModules.set(path, currentNodeModulesDepth > 0);
                    file.fileName = fileName;
                    file.path = path;
                    file.resolvedPath = toPath3(fileName);
                    file.originalFileName = originalFileName;
                    file.packageJsonLocations = ((_b2 = sourceFileOptions.packageJsonLocations) == null ? void 0 : _b2.length) ? sourceFileOptions.packageJsonLocations : void 0;
                    file.packageJsonScope = sourceFileOptions.packageJsonScope;
                    addFileIncludeReason(file, reason);
                    if (host.useCaseSensitiveFileNames()) {
                        const pathLowerCase = toFileNameLowerCase(path);
                        const existingFile = filesByNameIgnoreCase.get(pathLowerCase);
                        if (existingFile) {
                            reportFileNamesDifferOnlyInCasingError(fileName, existingFile, reason);
                        }
                        else {
                            filesByNameIgnoreCase.set(pathLowerCase, file);
                        }
                    }
                    skipDefaultLib = skipDefaultLib || file.hasNoDefaultLib && !ignoreNoDefaultLib;
                    if (!options.noResolve) {
                        processReferencedFiles(file, isDefaultLib);
                        processTypeReferenceDirectives(file);
                    }
                    if (!options.noLib) {
                        processLibReferenceDirectives(file);
                    }
                    processImportedModules(file);
                    if (isDefaultLib) {
                        processingDefaultLibFiles.push(file);
                    }
                    else {
                        processingOtherFiles.push(file);
                    }
                }
                return file;
            }