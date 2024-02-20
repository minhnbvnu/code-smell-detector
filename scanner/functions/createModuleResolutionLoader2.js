function createModuleResolutionLoader2(containingFile, redirectedReference, options) {
                return {
                    nameAndMode: moduleResolutionNameAndModeGetter,
                    resolve: (moduleName, resoluionMode) => resolveModuleName2(moduleName, containingFile, options, redirectedReference, resoluionMode)
                };
            }