function parseProjectReferenceConfigFile(ref) {
                if (!projectReferenceRedirects) {
                    projectReferenceRedirects = /* @__PURE__ */ new Map();
                }
                const refPath = resolveProjectReferencePath(ref);
                const sourceFilePath = toPath3(refPath);
                const fromCache = projectReferenceRedirects.get(sourceFilePath);
                if (fromCache !== void 0) {
                    return fromCache || void 0;
                }
                let commandLine;
                let sourceFile;
                if (host.getParsedCommandLine) {
                    commandLine = host.getParsedCommandLine(refPath);
                    if (!commandLine) {
                        addFileToFilesByName(
                        /*sourceFile*/
                        void 0, sourceFilePath, 
                        /*redirectedPath*/
                        void 0);
                        projectReferenceRedirects.set(sourceFilePath, false);
                        return void 0;
                    }
                    sourceFile = Debug.checkDefined(commandLine.options.configFile);
                    Debug.assert(!sourceFile.path || sourceFile.path === sourceFilePath);
                    addFileToFilesByName(sourceFile, sourceFilePath, 
                    /*redirectedPath*/
                    void 0);
                }
                else {
                    const basePath = getNormalizedAbsolutePath(getDirectoryPath(refPath), host.getCurrentDirectory());
                    sourceFile = host.getSourceFile(refPath, 100 /* JSON */);
                    addFileToFilesByName(sourceFile, sourceFilePath, 
                    /*redirectedPath*/
                    void 0);
                    if (sourceFile === void 0) {
                        projectReferenceRedirects.set(sourceFilePath, false);
                        return void 0;
                    }
                    commandLine = parseJsonSourceFileConfigFileContent(sourceFile, configParsingHost, basePath, 
                    /*existingOptions*/
                    void 0, refPath);
                }
                sourceFile.fileName = refPath;
                sourceFile.path = sourceFilePath;
                sourceFile.resolvedPath = sourceFilePath;
                sourceFile.originalFileName = refPath;
                const resolvedRef = { commandLine, sourceFile };
                projectReferenceRedirects.set(sourceFilePath, resolvedRef);
                if (commandLine.projectReferences) {
                    resolvedRef.references = commandLine.projectReferences.map(parseProjectReferenceConfigFile);
                }
                return resolvedRef;
            }