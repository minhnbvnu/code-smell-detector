function getSourceFileToImportFromResolved(importLiteral, resolved, oldToNew, sourceFiles) {
            if (!resolved)
                return void 0;
            if (resolved.resolvedModule) {
                const result2 = tryChange(resolved.resolvedModule.resolvedFileName);
                if (result2)
                    return result2;
            }
            const result = forEach(resolved.failedLookupLocations, tryChangeWithIgnoringPackageJsonExisting) || pathIsRelative(importLiteral.text) && forEach(resolved.failedLookupLocations, tryChangeWithIgnoringPackageJson);
            if (result)
                return result;
            return resolved.resolvedModule && { newFileName: resolved.resolvedModule.resolvedFileName, updated: false };
            function tryChangeWithIgnoringPackageJsonExisting(oldFileName) {
                const newFileName = oldToNew(oldFileName);
                return newFileName && find(sourceFiles, (src) => src.fileName === newFileName) ? tryChangeWithIgnoringPackageJson(oldFileName) : void 0;
            }
            function tryChangeWithIgnoringPackageJson(oldFileName) {
                return !endsWith(oldFileName, "/package.json") ? tryChange(oldFileName) : void 0;
            }
            function tryChange(oldFileName) {
                const newFileName = oldToNew(oldFileName);
                return newFileName && { newFileName, updated: true };
            }
        }