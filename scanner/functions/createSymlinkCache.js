function createSymlinkCache(cwd, getCanonicalFileName) {
            let symlinkedDirectories;
            let symlinkedDirectoriesByRealpath;
            let symlinkedFiles;
            let hasProcessedResolutions = false;
            return {
                getSymlinkedFiles: () => symlinkedFiles,
                getSymlinkedDirectories: () => symlinkedDirectories,
                getSymlinkedDirectoriesByRealpath: () => symlinkedDirectoriesByRealpath,
                setSymlinkedFile: (path, real) => (symlinkedFiles || (symlinkedFiles = /* @__PURE__ */ new Map())).set(path, real),
                setSymlinkedDirectory: (symlink, real) => {
                    let symlinkPath = toPath(symlink, cwd, getCanonicalFileName);
                    if (!containsIgnoredPath(symlinkPath)) {
                        symlinkPath = ensureTrailingDirectorySeparator(symlinkPath);
                        if (real !== false && !(symlinkedDirectories == null ? void 0 : symlinkedDirectories.has(symlinkPath))) {
                            (symlinkedDirectoriesByRealpath || (symlinkedDirectoriesByRealpath = createMultiMap())).add(ensureTrailingDirectorySeparator(real.realPath), symlink);
                        }
                        (symlinkedDirectories || (symlinkedDirectories = /* @__PURE__ */ new Map())).set(symlinkPath, real);
                    }
                },
                setSymlinksFromResolutions(files, typeReferenceDirectives) {
                    var _a2, _b;
                    Debug.assert(!hasProcessedResolutions);
                    hasProcessedResolutions = true;
                    for (const file of files) {
                        (_a2 = file.resolvedModules) == null ? void 0 : _a2.forEach((resolution) => processResolution(this, resolution.resolvedModule));
                        (_b = file.resolvedTypeReferenceDirectiveNames) == null ? void 0 : _b.forEach((resolution) => processResolution(this, resolution.resolvedTypeReferenceDirective));
                    }
                    typeReferenceDirectives.forEach((resolution) => processResolution(this, resolution.resolvedTypeReferenceDirective));
                },
                hasProcessedResolutions: () => hasProcessedResolutions
            };
            function processResolution(cache, resolution) {
                if (!resolution || !resolution.originalPath || !resolution.resolvedFileName)
                    return;
                const { resolvedFileName, originalPath } = resolution;
                cache.setSymlinkedFile(toPath(originalPath, cwd, getCanonicalFileName), resolvedFileName);
                const [commonResolved, commonOriginal] = guessDirectorySymlink(resolvedFileName, originalPath, cwd, getCanonicalFileName) || emptyArray;
                if (commonResolved && commonOriginal) {
                    cache.setSymlinkedDirectory(commonOriginal, { real: commonResolved, realPath: toPath(commonResolved, cwd, getCanonicalFileName) });
                }
            }
        }