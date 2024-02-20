function isImportableExportInfo(info) {
                    const moduleFile = tryCast(info.moduleSymbol.valueDeclaration, isSourceFile);
                    if (!moduleFile) {
                        const moduleName = stripQuotes(info.moduleSymbol.name);
                        if (ts_JsTyping_exports.nodeCoreModules.has(moduleName) && startsWith(moduleName, "node:") !== shouldUseUriStyleNodeCoreModules(sourceFile, program)) {
                            return false;
                        }
                        return packageJsonFilter ? packageJsonFilter.allowsImportingAmbientModule(info.moduleSymbol, getModuleSpecifierResolutionHost(info.isFromPackageJson)) : true;
                    }
                    return isImportableFile(info.isFromPackageJson ? packageJsonAutoImportProvider : program, sourceFile, moduleFile, preferences, packageJsonFilter, getModuleSpecifierResolutionHost(info.isFromPackageJson), moduleSpecifierCache);
                }