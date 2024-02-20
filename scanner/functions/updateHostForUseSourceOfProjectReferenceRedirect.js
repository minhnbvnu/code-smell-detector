function updateHostForUseSourceOfProjectReferenceRedirect(host) {
            let setOfDeclarationDirectories;
            const originalFileExists = host.compilerHost.fileExists;
            const originalDirectoryExists = host.compilerHost.directoryExists;
            const originalGetDirectories = host.compilerHost.getDirectories;
            const originalRealpath = host.compilerHost.realpath;
            if (!host.useSourceOfProjectReferenceRedirect)
                return { onProgramCreateComplete: noop, fileExists };
            host.compilerHost.fileExists = fileExists;
            let directoryExists;
            if (originalDirectoryExists) {
                directoryExists = host.compilerHost.directoryExists = (path) => {
                    if (originalDirectoryExists.call(host.compilerHost, path)) {
                        handleDirectoryCouldBeSymlink(path);
                        return true;
                    }
                    if (!host.getResolvedProjectReferences())
                        return false;
                    if (!setOfDeclarationDirectories) {
                        setOfDeclarationDirectories = /* @__PURE__ */ new Set();
                        host.forEachResolvedProjectReference((ref) => {
                            const out = outFile(ref.commandLine.options);
                            if (out) {
                                setOfDeclarationDirectories.add(getDirectoryPath(host.toPath(out)));
                            }
                            else {
                                const declarationDir = ref.commandLine.options.declarationDir || ref.commandLine.options.outDir;
                                if (declarationDir) {
                                    setOfDeclarationDirectories.add(host.toPath(declarationDir));
                                }
                            }
                        });
                    }
                    return fileOrDirectoryExistsUsingSource(path, 
                    /*isFile*/
                    false);
                };
            }
            if (originalGetDirectories) {
                host.compilerHost.getDirectories = (path) => !host.getResolvedProjectReferences() || originalDirectoryExists && originalDirectoryExists.call(host.compilerHost, path) ? originalGetDirectories.call(host.compilerHost, path) : [];
            }
            if (originalRealpath) {
                host.compilerHost.realpath = (s) => {
                    var _a2;
                    return ((_a2 = host.getSymlinkCache().getSymlinkedFiles()) == null ? void 0 : _a2.get(host.toPath(s))) || originalRealpath.call(host.compilerHost, s);
                };
            }
            return { onProgramCreateComplete, fileExists, directoryExists };
            function onProgramCreateComplete() {
                host.compilerHost.fileExists = originalFileExists;
                host.compilerHost.directoryExists = originalDirectoryExists;
                host.compilerHost.getDirectories = originalGetDirectories;
            }
            function fileExists(file) {
                if (originalFileExists.call(host.compilerHost, file))
                    return true;
                if (!host.getResolvedProjectReferences())
                    return false;
                if (!isDeclarationFileName(file))
                    return false;
                return fileOrDirectoryExistsUsingSource(file, 
                /*isFile*/
                true);
            }
            function fileExistsIfProjectReferenceDts(file) {
                const source = host.getSourceOfProjectReferenceRedirect(host.toPath(file));
                return source !== void 0 ? isString(source) ? originalFileExists.call(host.compilerHost, source) : true : void 0;
            }
            function directoryExistsIfProjectReferenceDeclDir(dir) {
                const dirPath = host.toPath(dir);
                const dirPathWithTrailingDirectorySeparator = `${dirPath}${directorySeparator}`;
                return forEachKey(setOfDeclarationDirectories, (declDirPath) => dirPath === declDirPath || // Any parent directory of declaration dir
                    startsWith(declDirPath, dirPathWithTrailingDirectorySeparator) || // Any directory inside declaration dir
                    startsWith(dirPath, `${declDirPath}/`));
            }
            function handleDirectoryCouldBeSymlink(directory) {
                var _a2;
                if (!host.getResolvedProjectReferences() || containsIgnoredPath(directory))
                    return;
                if (!originalRealpath || !stringContains(directory, nodeModulesPathPart))
                    return;
                const symlinkCache = host.getSymlinkCache();
                const directoryPath = ensureTrailingDirectorySeparator(host.toPath(directory));
                if ((_a2 = symlinkCache.getSymlinkedDirectories()) == null ? void 0 : _a2.has(directoryPath))
                    return;
                const real = normalizePath(originalRealpath.call(host.compilerHost, directory));
                let realPath2;
                if (real === directory || (realPath2 = ensureTrailingDirectorySeparator(host.toPath(real))) === directoryPath) {
                    symlinkCache.setSymlinkedDirectory(directoryPath, false);
                    return;
                }
                symlinkCache.setSymlinkedDirectory(directory, {
                    real: ensureTrailingDirectorySeparator(real),
                    realPath: realPath2
                });
            }
            function fileOrDirectoryExistsUsingSource(fileOrDirectory, isFile) {
                var _a2;
                const fileOrDirectoryExistsUsingSource2 = isFile ? (file) => fileExistsIfProjectReferenceDts(file) : (dir) => directoryExistsIfProjectReferenceDeclDir(dir);
                const result = fileOrDirectoryExistsUsingSource2(fileOrDirectory);
                if (result !== void 0)
                    return result;
                const symlinkCache = host.getSymlinkCache();
                const symlinkedDirectories = symlinkCache.getSymlinkedDirectories();
                if (!symlinkedDirectories)
                    return false;
                const fileOrDirectoryPath = host.toPath(fileOrDirectory);
                if (!stringContains(fileOrDirectoryPath, nodeModulesPathPart))
                    return false;
                if (isFile && ((_a2 = symlinkCache.getSymlinkedFiles()) == null ? void 0 : _a2.has(fileOrDirectoryPath)))
                    return true;
                return firstDefinedIterator(symlinkedDirectories.entries(), ([directoryPath, symlinkedDirectory]) => {
                    if (!symlinkedDirectory || !startsWith(fileOrDirectoryPath, directoryPath))
                        return void 0;
                    const result2 = fileOrDirectoryExistsUsingSource2(fileOrDirectoryPath.replace(directoryPath, symlinkedDirectory.realPath));
                    if (isFile && result2) {
                        const absolutePath = getNormalizedAbsolutePath(fileOrDirectory, host.compilerHost.getCurrentDirectory());
                        symlinkCache.setSymlinkedFile(fileOrDirectoryPath, `${symlinkedDirectory.real}${absolutePath.replace(new RegExp(directoryPath, "i"), "")}`);
                    }
                    return result2;
                }) || false;
            }
        }