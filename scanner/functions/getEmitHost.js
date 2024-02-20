function getEmitHost(writeFileCallback) {
                return {
                    getPrependNodes,
                    getCanonicalFileName,
                    getCommonSourceDirectory: program.getCommonSourceDirectory,
                    getCompilerOptions: program.getCompilerOptions,
                    getCurrentDirectory: () => currentDirectory,
                    getSourceFile: program.getSourceFile,
                    getSourceFileByPath: program.getSourceFileByPath,
                    getSourceFiles: program.getSourceFiles,
                    getLibFileFromReference: program.getLibFileFromReference,
                    isSourceFileFromExternalLibrary,
                    getResolvedProjectReferenceToRedirect,
                    getProjectReferenceRedirect,
                    isSourceOfProjectReferenceRedirect,
                    getSymlinkCache,
                    writeFile: writeFileCallback || writeFile2,
                    isEmitBlocked,
                    readFile: (f) => host.readFile(f),
                    fileExists: (f) => {
                        const path = toPath3(f);
                        if (getSourceFileByPath(path))
                            return true;
                        if (contains(missingFilePaths, path))
                            return false;
                        return host.fileExists(f);
                    },
                    useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
                    getBuildInfo: (bundle) => {
                        var _a3;
                        return (_a3 = program.getBuildInfo) == null ? void 0 : _a3.call(program, bundle);
                    },
                    getSourceFileFromReference: (file, ref) => program.getSourceFileFromReference(file, ref),
                    redirectTargetsMap,
                    getFileIncludeReasons: program.getFileIncludeReasons,
                    createHash: maybeBind(host, host.createHash)
                };
            }