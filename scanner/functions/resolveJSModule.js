function resolveJSModule(moduleName, initialDir, host) {
            const { resolvedModule, failedLookupLocations } = tryResolveJSModuleWorker(moduleName, initialDir, host);
            if (!resolvedModule) {
                throw new Error(`Could not resolve JS module '${moduleName}' starting at '${initialDir}'. Looked in: ${failedLookupLocations == null ? void 0 : failedLookupLocations.join(", ")}`);
            }
            return resolvedModule.resolvedFileName;
        }