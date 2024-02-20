function createModuleResolutionLoader(containingFile, redirectedReference, options, host, cache) {
            return {
                nameAndMode: moduleResolutionNameAndModeGetter,
                resolve: (moduleName, resolutionMode) => resolveModuleName(moduleName, containingFile, options, host, cache, redirectedReference, resolutionMode)
            };
        }