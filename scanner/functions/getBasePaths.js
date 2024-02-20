function getBasePaths(path, includes, useCaseSensitiveFileNames) {
            const basePaths = [path];
            if (includes) {
                const includeBasePaths = [];
                for (const include of includes) {
                    const absolute = isRootedDiskPath(include) ? include : normalizePath(combinePaths(path, include));
                    includeBasePaths.push(getIncludeBasePath(absolute));
                }
                includeBasePaths.sort(getStringComparer(!useCaseSensitiveFileNames));
                for (const includeBasePath of includeBasePaths) {
                    if (every(basePaths, (basePath) => !containsPath(basePath, includeBasePath, path, !useCaseSensitiveFileNames))) {
                        basePaths.push(includeBasePath);
                    }
                }
            }
            return basePaths;
        }