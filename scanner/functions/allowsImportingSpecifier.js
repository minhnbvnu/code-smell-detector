function allowsImportingSpecifier(moduleSpecifier) {
                if (!packageJsons.length || isAllowedCoreNodeModulesImport(moduleSpecifier)) {
                    return true;
                }
                if (pathIsRelative(moduleSpecifier) || isRootedDiskPath(moduleSpecifier)) {
                    return true;
                }
                return moduleSpecifierIsCoveredByPackageJson(moduleSpecifier);
            }