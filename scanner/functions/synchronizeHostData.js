function synchronizeHostData() {
                var _a3, _b, _c;
                Debug.assert(languageServiceMode !== 2 /* Syntactic */);
                if (host.getProjectVersion) {
                    const hostProjectVersion = host.getProjectVersion();
                    if (hostProjectVersion) {
                        if (lastProjectVersion === hostProjectVersion && !((_a3 = host.hasChangedAutomaticTypeDirectiveNames) == null ? void 0 : _a3.call(host))) {
                            return;
                        }
                        lastProjectVersion = hostProjectVersion;
                    }
                }
                const typeRootsVersion = host.getTypeRootsVersion ? host.getTypeRootsVersion() : 0;
                if (lastTypesRootVersion !== typeRootsVersion) {
                    log("TypeRoots version has changed; provide new program");
                    program = void 0;
                    lastTypesRootVersion = typeRootsVersion;
                }
                const rootFileNames = host.getScriptFileNames().slice();
                const newSettings = host.getCompilationSettings() || getDefaultCompilerOptions2();
                const hasInvalidatedResolutions = host.hasInvalidatedResolutions || returnFalse;
                const hasChangedAutomaticTypeDirectiveNames = maybeBind(host, host.hasChangedAutomaticTypeDirectiveNames);
                const projectReferences = (_b = host.getProjectReferences) == null ? void 0 : _b.call(host);
                let parsedCommandLines;
                let compilerHost = {
                    getSourceFile: getOrCreateSourceFile,
                    getSourceFileByPath: getOrCreateSourceFileByPath,
                    getCancellationToken: () => cancellationToken,
                    getCanonicalFileName,
                    useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
                    getNewLine: () => getNewLineCharacter(newSettings),
                    getDefaultLibFileName: (options2) => host.getDefaultLibFileName(options2),
                    writeFile: noop,
                    getCurrentDirectory: () => currentDirectory,
                    fileExists: (fileName) => host.fileExists(fileName),
                    readFile: (fileName) => host.readFile && host.readFile(fileName),
                    getSymlinkCache: maybeBind(host, host.getSymlinkCache),
                    realpath: maybeBind(host, host.realpath),
                    directoryExists: (directoryName) => {
                        return directoryProbablyExists(directoryName, host);
                    },
                    getDirectories: (path) => {
                        return host.getDirectories ? host.getDirectories(path) : [];
                    },
                    readDirectory: (path, extensions, exclude, include, depth) => {
                        Debug.checkDefined(host.readDirectory, "'LanguageServiceHost.readDirectory' must be implemented to correctly process 'projectReferences'");
                        return host.readDirectory(path, extensions, exclude, include, depth);
                    },
                    onReleaseOldSourceFile,
                    onReleaseParsedCommandLine,
                    hasInvalidatedResolutions,
                    hasChangedAutomaticTypeDirectiveNames,
                    trace: maybeBind(host, host.trace),
                    resolveModuleNames: maybeBind(host, host.resolveModuleNames),
                    getModuleResolutionCache: maybeBind(host, host.getModuleResolutionCache),
                    createHash: maybeBind(host, host.createHash),
                    resolveTypeReferenceDirectives: maybeBind(host, host.resolveTypeReferenceDirectives),
                    resolveModuleNameLiterals: maybeBind(host, host.resolveModuleNameLiterals),
                    resolveTypeReferenceDirectiveReferences: maybeBind(host, host.resolveTypeReferenceDirectiveReferences),
                    useSourceOfProjectReferenceRedirect: maybeBind(host, host.useSourceOfProjectReferenceRedirect),
                    getParsedCommandLine
                };
                const originalGetSourceFile = compilerHost.getSourceFile;
                const { getSourceFileWithCache } = changeCompilerHostLikeToUseCache(compilerHost, (fileName) => toPath(fileName, currentDirectory, getCanonicalFileName), (...args) => originalGetSourceFile.call(compilerHost, ...args));
                compilerHost.getSourceFile = getSourceFileWithCache;
                (_c = host.setCompilerHost) == null ? void 0 : _c.call(host, compilerHost);
                const parseConfigHost = {
                    useCaseSensitiveFileNames,
                    fileExists: (fileName) => compilerHost.fileExists(fileName),
                    readFile: (fileName) => compilerHost.readFile(fileName),
                    readDirectory: (...args) => compilerHost.readDirectory(...args),
                    trace: compilerHost.trace,
                    getCurrentDirectory: compilerHost.getCurrentDirectory,
                    onUnRecoverableConfigFileDiagnostic: noop
                };
                const documentRegistryBucketKey = documentRegistry.getKeyForCompilationSettings(newSettings);
                if (isProgramUptoDate(program, rootFileNames, newSettings, (_path, fileName) => host.getScriptVersion(fileName), (fileName) => compilerHost.fileExists(fileName), hasInvalidatedResolutions, hasChangedAutomaticTypeDirectiveNames, getParsedCommandLine, projectReferences)) {
                    return;
                }
                const options = {
                    rootNames: rootFileNames,
                    options: newSettings,
                    host: compilerHost,
                    oldProgram: program,
                    projectReferences
                };
                program = createProgram(options);
                compilerHost = void 0;
                parsedCommandLines = void 0;
                sourceMapper.clearCache();
                program.getTypeChecker();
                return;
                function getParsedCommandLine(fileName) {
                    const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                    const existing = parsedCommandLines == null ? void 0 : parsedCommandLines.get(path);
                    if (existing !== void 0)
                        return existing || void 0;
                    const result = host.getParsedCommandLine ? host.getParsedCommandLine(fileName) : getParsedCommandLineOfConfigFileUsingSourceFile(fileName);
                    (parsedCommandLines || (parsedCommandLines = /* @__PURE__ */ new Map())).set(path, result || false);
                    return result;
                }
                function getParsedCommandLineOfConfigFileUsingSourceFile(configFileName) {
                    const result = getOrCreateSourceFile(configFileName, 100 /* JSON */);
                    if (!result)
                        return void 0;
                    result.path = toPath(configFileName, currentDirectory, getCanonicalFileName);
                    result.resolvedPath = result.path;
                    result.originalFileName = result.fileName;
                    return parseJsonSourceFileConfigFileContent(result, parseConfigHost, getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory), 
                    /*optionsToExtend*/
                    void 0, getNormalizedAbsolutePath(configFileName, currentDirectory));
                }
                function onReleaseParsedCommandLine(configFileName, oldResolvedRef, oldOptions) {
                    var _a4;
                    if (host.getParsedCommandLine) {
                        (_a4 = host.onReleaseParsedCommandLine) == null ? void 0 : _a4.call(host, configFileName, oldResolvedRef, oldOptions);
                    }
                    else if (oldResolvedRef) {
                        onReleaseOldSourceFile(oldResolvedRef.sourceFile, oldOptions);
                    }
                }
                function onReleaseOldSourceFile(oldSourceFile, oldOptions) {
                    const oldSettingsKey = documentRegistry.getKeyForCompilationSettings(oldOptions);
                    documentRegistry.releaseDocumentWithKey(oldSourceFile.resolvedPath, oldSettingsKey, oldSourceFile.scriptKind, oldSourceFile.impliedNodeFormat);
                }
                function getOrCreateSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) {
                    return getOrCreateSourceFileByPath(fileName, toPath(fileName, currentDirectory, getCanonicalFileName), languageVersionOrOptions, onError, shouldCreateNewSourceFile);
                }
                function getOrCreateSourceFileByPath(fileName, path, languageVersionOrOptions, _onError, shouldCreateNewSourceFile) {
                    Debug.assert(compilerHost, "getOrCreateSourceFileByPath called after typical CompilerHost lifetime, check the callstack something with a reference to an old host.");
                    const scriptSnapshot = host.getScriptSnapshot(fileName);
                    if (!scriptSnapshot) {
                        return void 0;
                    }
                    const scriptKind = getScriptKind(fileName, host);
                    const scriptVersion = host.getScriptVersion(fileName);
                    if (!shouldCreateNewSourceFile) {
                        const oldSourceFile = program && program.getSourceFileByPath(path);
                        if (oldSourceFile) {
                            if (scriptKind === oldSourceFile.scriptKind) {
                                return documentRegistry.updateDocumentWithKey(fileName, path, host, documentRegistryBucketKey, scriptSnapshot, scriptVersion, scriptKind, languageVersionOrOptions);
                            }
                            else {
                                documentRegistry.releaseDocumentWithKey(oldSourceFile.resolvedPath, documentRegistry.getKeyForCompilationSettings(program.getCompilerOptions()), oldSourceFile.scriptKind, oldSourceFile.impliedNodeFormat);
                            }
                        }
                    }
                    return documentRegistry.acquireDocumentWithKey(fileName, path, host, documentRegistryBucketKey, scriptSnapshot, scriptVersion, scriptKind, languageVersionOrOptions);
                }
            }