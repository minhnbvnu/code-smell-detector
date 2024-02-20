function getNodeModuleRootSpecifier(fullSpecifier) {
                const components = getPathComponents(getPackageNameFromTypesPackageName(fullSpecifier)).slice(1);
                if (startsWith(components[0], "@")) {
                    return `${components[0]}/${components[1]}`;
                }
                return components[0];
            }