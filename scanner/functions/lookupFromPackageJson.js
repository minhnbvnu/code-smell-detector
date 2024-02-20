function lookupFromPackageJson() {
                const state = getTemporaryModuleResolutionState(packageJsonInfoCache, host, options);
                const packageJsonLocations = [];
                state.failedLookupLocations = packageJsonLocations;
                state.affectingLocations = packageJsonLocations;
                const packageJsonScope = getPackageScopeForPath(fileName, state);
                const impliedNodeFormat = (packageJsonScope == null ? void 0 : packageJsonScope.contents.packageJsonContent.type) === "module" ? 99 /* ESNext */ : 1 /* CommonJS */;
                return { impliedNodeFormat, packageJsonLocations, packageJsonScope };
            }