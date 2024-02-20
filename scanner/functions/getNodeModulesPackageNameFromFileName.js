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