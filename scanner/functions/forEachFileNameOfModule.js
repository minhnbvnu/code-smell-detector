function forEachFileNameOfModule(importingFileName, importedFileName, host, preferSymlinks, cb) {
            var _a2;
            const getCanonicalFileName = hostGetCanonicalFileName(host);
            const cwd = host.getCurrentDirectory();
            const referenceRedirect = host.isSourceOfProjectReferenceRedirect(importedFileName) ? host.getProjectReferenceRedirect(importedFileName) : void 0;
            const importedPath = toPath(importedFileName, cwd, getCanonicalFileName);
            const redirects = host.redirectTargetsMap.get(importedPath) || emptyArray;
            const importedFileNames = [...referenceRedirect ? [referenceRedirect] : emptyArray, importedFileName, ...redirects];
            const targets = importedFileNames.map((f) => getNormalizedAbsolutePath(f, cwd));
            let shouldFilterIgnoredPaths = !every(targets, containsIgnoredPath);
            if (!preferSymlinks) {
                const result2 = forEach(targets, (p) => !(shouldFilterIgnoredPaths && containsIgnoredPath(p)) && cb(p, referenceRedirect === p));
                if (result2)
                    return result2;
            }
            const symlinkedDirectories = (_a2 = host.getSymlinkCache) == null ? void 0 : _a2.call(host).getSymlinkedDirectoriesByRealpath();
            const fullImportedFileName = getNormalizedAbsolutePath(importedFileName, cwd);
            const result = symlinkedDirectories && forEachAncestorDirectory(getDirectoryPath(fullImportedFileName), (realPathDirectory) => {
                const symlinkDirectories = symlinkedDirectories.get(ensureTrailingDirectorySeparator(toPath(realPathDirectory, cwd, getCanonicalFileName)));
                if (!symlinkDirectories)
                    return void 0;
                if (startsWithDirectory(importingFileName, realPathDirectory, getCanonicalFileName)) {
                    return false;
                }
                return forEach(targets, (target) => {
                    if (!startsWithDirectory(target, realPathDirectory, getCanonicalFileName)) {
                        return;
                    }
                    const relative = getRelativePathFromDirectory(realPathDirectory, target, getCanonicalFileName);
                    for (const symlinkDirectory of symlinkDirectories) {
                        const option = resolvePath(symlinkDirectory, relative);
                        const result2 = cb(option, target === referenceRedirect);
                        shouldFilterIgnoredPaths = true;
                        if (result2)
                            return result2;
                    }
                });
            });
            return result || (preferSymlinks ? forEach(targets, (p) => shouldFilterIgnoredPaths && containsIgnoredPath(p) ? void 0 : cb(p, p === referenceRedirect)) : void 0);
        }