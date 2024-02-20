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