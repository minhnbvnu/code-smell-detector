function isImportablePath(fromPath, toPath3, getCanonicalFileName, globalCachePath) {
            const toNodeModules = forEachAncestorDirectory(toPath3, (ancestor) => getBaseFileName(ancestor) === "node_modules" ? ancestor : void 0);
            const toNodeModulesParent = toNodeModules && getDirectoryPath(getCanonicalFileName(toNodeModules));
            return toNodeModulesParent === void 0 || startsWith(getCanonicalFileName(fromPath), toNodeModulesParent) || !!globalCachePath && startsWith(getCanonicalFileName(globalCachePath), toNodeModulesParent);
        }