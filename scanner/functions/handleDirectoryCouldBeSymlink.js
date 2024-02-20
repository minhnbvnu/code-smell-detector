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