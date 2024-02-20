function resolveModuleNameLiterals(moduleLiterals, containingFile, redirectedReference, options, containingSourceFile, reusedNames) {
                return resolveNamesWithLocalCache({
                    entries: moduleLiterals,
                    containingFile,
                    containingSourceFile,
                    redirectedReference,
                    options,
                    reusedNames,
                    perFileCache: resolvedModuleNames,
                    loader: createModuleResolutionLoader2(containingFile, redirectedReference, options),
                    getResolutionWithResolvedFileName: getResolvedModule2,
                    shouldRetryResolution: (resolution) => !resolution.resolvedModule || !resolutionExtensionIsTSOrJson(resolution.resolvedModule.extension),
                    logChanges: logChangesWhenResolvingModule
                });
            }