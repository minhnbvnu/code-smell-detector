function resolveModuleName2(moduleName, containingFile, compilerOptions, redirectedReference, mode) {
                var _a2;
                const host = ((_a2 = resolutionHost.getCompilerHost) == null ? void 0 : _a2.call(resolutionHost)) || resolutionHost;
                const primaryResult = resolveModuleName(moduleName, containingFile, compilerOptions, host, moduleResolutionCache, redirectedReference, mode);
                if (!resolutionHost.getGlobalCache) {
                    return primaryResult;
                }
                const globalCache = resolutionHost.getGlobalCache();
                if (globalCache !== void 0 && !isExternalModuleNameRelative(moduleName) && !(primaryResult.resolvedModule && extensionIsTS(primaryResult.resolvedModule.extension))) {
                    const { resolvedModule, failedLookupLocations, affectingLocations, resolutionDiagnostics } = loadModuleFromGlobalCache(Debug.checkDefined(resolutionHost.globalCacheResolutionModuleName)(moduleName), resolutionHost.projectName, compilerOptions, host, globalCache, moduleResolutionCache);
                    if (resolvedModule) {
                        primaryResult.resolvedModule = resolvedModule;
                        primaryResult.failedLookupLocations = updateResolutionField(primaryResult.failedLookupLocations, failedLookupLocations);
                        primaryResult.affectingLocations = updateResolutionField(primaryResult.affectingLocations, affectingLocations);
                        primaryResult.resolutionDiagnostics = updateResolutionField(primaryResult.resolutionDiagnostics, resolutionDiagnostics);
                        return primaryResult;
                    }
                }
                return primaryResult;
            }