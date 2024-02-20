function isImportableFile(program, from, to, preferences, packageJsonFilter, moduleSpecifierResolutionHost, moduleSpecifierCache) {
            var _a2;
            if (from === to)
                return false;
            const cachedResult = moduleSpecifierCache == null ? void 0 : moduleSpecifierCache.get(from.path, to.path, preferences, {});
            if ((cachedResult == null ? void 0 : cachedResult.isBlockedByPackageJsonDependencies) !== void 0) {
                return !cachedResult.isBlockedByPackageJsonDependencies;
            }
            const getCanonicalFileName = hostGetCanonicalFileName(moduleSpecifierResolutionHost);
            const globalTypingsCache = (_a2 = moduleSpecifierResolutionHost.getGlobalTypingsCacheLocation) == null ? void 0 : _a2.call(moduleSpecifierResolutionHost);
            const hasImportablePath = !!ts_moduleSpecifiers_exports.forEachFileNameOfModule(from.fileName, to.fileName, moduleSpecifierResolutionHost, 
            /*preferSymlinks*/
            false, (toPath3) => {
                const toFile = program.getSourceFile(toPath3);
                return (toFile === to || !toFile) && isImportablePath(from.fileName, toPath3, getCanonicalFileName, globalTypingsCache);
            });
            if (packageJsonFilter) {
                const isAutoImportable = hasImportablePath && packageJsonFilter.allowsImportingSourceFile(to, moduleSpecifierResolutionHost);
                moduleSpecifierCache == null ? void 0 : moduleSpecifierCache.setBlockedByPackageJsonDependencies(from.path, to.path, preferences, {}, !isAutoImportable);
                return isAutoImportable;
            }
            return hasImportablePath;
        }