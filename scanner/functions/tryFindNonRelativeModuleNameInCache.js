function tryFindNonRelativeModuleNameInCache(cache, moduleName, mode, containingDirectory, redirectedReference, state) {
            const result = cache && cache.getFromNonRelativeNameCache(moduleName, mode, containingDirectory, redirectedReference);
            if (result) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1, moduleName, containingDirectory);
                }
                state.resultFromCache = result;
                return {
                    value: result.resolvedModule && {
                        path: result.resolvedModule.resolvedFileName,
                        originalPath: result.resolvedModule.originalPath || true,
                        extension: result.resolvedModule.extension,
                        packageId: result.resolvedModule.packageId,
                        resolvedUsingTsExtension: result.resolvedModule.resolvedUsingTsExtension
                    }
                };
            }
        }