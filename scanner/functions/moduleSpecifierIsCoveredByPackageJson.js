function moduleSpecifierIsCoveredByPackageJson(specifier) {
                const packageName = getNodeModuleRootSpecifier(specifier);
                for (const packageJson of packageJsons) {
                    if (packageJson.has(packageName) || packageJson.has(getTypesPackageName(packageName))) {
                        return true;
                    }
                }
                return false;
            }