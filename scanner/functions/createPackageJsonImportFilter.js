function createPackageJsonImportFilter(fromFile, preferences, host) {
            const packageJsons = (host.getPackageJsonsVisibleToFile && host.getPackageJsonsVisibleToFile(fromFile.fileName) || getPackageJsonsVisibleToFile(fromFile.fileName, host)).filter((p) => p.parseable);
            let usesNodeCoreModules;
            let ambientModuleCache;
            let sourceFileCache;
            return {
                allowsImportingAmbientModule,
                allowsImportingSourceFile,
                allowsImportingSpecifier
            };
            function moduleSpecifierIsCoveredByPackageJson(specifier) {
                const packageName = getNodeModuleRootSpecifier(specifier);
                for (const packageJson of packageJsons) {
                    if (packageJson.has(packageName) || packageJson.has(getTypesPackageName(packageName))) {
                        return true;
                    }
                }
                return false;
            }
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
            function allowsImportingSpecifier(moduleSpecifier) {
                if (!packageJsons.length || isAllowedCoreNodeModulesImport(moduleSpecifier)) {
                    return true;
                }
                if (pathIsRelative(moduleSpecifier) || isRootedDiskPath(moduleSpecifier)) {
                    return true;
                }
                return moduleSpecifierIsCoveredByPackageJson(moduleSpecifier);
            }
            function isAllowedCoreNodeModulesImport(moduleSpecifier) {
                if (isSourceFileJS(fromFile) && ts_JsTyping_exports.nodeCoreModules.has(moduleSpecifier)) {
                    if (usesNodeCoreModules === void 0) {
                        usesNodeCoreModules = consumesNodeCoreModules(fromFile);
                    }
                    if (usesNodeCoreModules) {
                        return true;
                    }
                }
                return false;
            }
            function getNodeModulesPackageNameFromFileName(importedFileName, moduleSpecifierResolutionHost) {
                if (!stringContains(importedFileName, "node_modules")) {
                    return void 0;
                }
                const specifier = ts_moduleSpecifiers_exports.getNodeModulesPackageName(host.getCompilationSettings(), fromFile, importedFileName, moduleSpecifierResolutionHost, preferences);
                if (!specifier) {
                    return void 0;
                }
                if (!pathIsRelative(specifier) && !isRootedDiskPath(specifier)) {
                    return getNodeModuleRootSpecifier(specifier);
                }
            }
            function getNodeModuleRootSpecifier(fullSpecifier) {
                const components = getPathComponents(getPackageNameFromTypesPackageName(fullSpecifier)).slice(1);
                if (startsWith(components[0], "@")) {
                    return `${components[0]}/${components[1]}`;
                }
                return components[0];
            }
        }