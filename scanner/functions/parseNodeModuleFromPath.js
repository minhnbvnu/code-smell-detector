function parseNodeModuleFromPath(resolved) {
            const path = normalizePath(resolved);
            const idx = path.lastIndexOf(nodeModulesPathPart);
            if (idx === -1) {
                return void 0;
            }
            const indexAfterNodeModules = idx + nodeModulesPathPart.length;
            let indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterNodeModules);
            if (path.charCodeAt(indexAfterNodeModules) === 64 /* at */) {
                indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterPackageName);
            }
            return path.slice(0, indexAfterPackageName);
        }