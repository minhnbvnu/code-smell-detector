function normalizePathForCJSResolution(containingDirectory, moduleName) {
            const combined = combinePaths(containingDirectory, moduleName);
            const parts = getPathComponents(combined);
            const lastPart = lastOrUndefined(parts);
            const path = lastPart === "." || lastPart === ".." ? ensureTrailingDirectorySeparator(normalizePath(combined)) : normalizePath(combined);
            return { path, parts };
        }