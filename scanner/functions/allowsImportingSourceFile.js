function allowsImportingSourceFile(sourceFile, moduleSpecifierResolutionHost) {
                if (!packageJsons.length) {
                    return true;
                }
                if (!sourceFileCache) {
                    sourceFileCache = /* @__PURE__ */ new Map();
                }
                else {
                    const cached = sourceFileCache.get(sourceFile);
                    if (cached !== void 0) {
                        return cached;
                    }
                }
                const moduleSpecifier = getNodeModulesPackageNameFromFileName(sourceFile.fileName, moduleSpecifierResolutionHost);
                if (!moduleSpecifier) {
                    sourceFileCache.set(sourceFile, true);
                    return true;
                }
                const result = moduleSpecifierIsCoveredByPackageJson(moduleSpecifier);
                sourceFileCache.set(sourceFile, result);
                return result;
            }