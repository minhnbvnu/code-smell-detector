function allowsImportingAmbientModule(moduleSymbol, moduleSpecifierResolutionHost) {
                if (!packageJsons.length || !moduleSymbol.valueDeclaration) {
                    return true;
                }
                if (!ambientModuleCache) {
                    ambientModuleCache = /* @__PURE__ */ new Map();
                }
                else {
                    const cached = ambientModuleCache.get(moduleSymbol);
                    if (cached !== void 0) {
                        return cached;
                    }
                }
                const declaredModuleSpecifier = stripQuotes(moduleSymbol.getName());
                if (isAllowedCoreNodeModulesImport(declaredModuleSpecifier)) {
                    ambientModuleCache.set(moduleSymbol, true);
                    return true;
                }
                const declaringSourceFile = moduleSymbol.valueDeclaration.getSourceFile();
                const declaringNodeModuleName = getNodeModulesPackageNameFromFileName(declaringSourceFile.fileName, moduleSpecifierResolutionHost);
                if (typeof declaringNodeModuleName === "undefined") {
                    ambientModuleCache.set(moduleSymbol, true);
                    return true;
                }
                const result = moduleSpecifierIsCoveredByPackageJson(declaringNodeModuleName) || moduleSpecifierIsCoveredByPackageJson(declaredModuleSpecifier);
                ambientModuleCache.set(moduleSymbol, result);
                return result;
            }