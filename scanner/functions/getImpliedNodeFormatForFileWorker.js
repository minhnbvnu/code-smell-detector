function getImpliedNodeFormatForFileWorker(fileName, packageJsonInfoCache, host, options) {
            switch (getEmitModuleResolutionKind(options)) {
                case 3 /* Node16 */:
                case 99 /* NodeNext */:
                    return fileExtensionIsOneOf(fileName, [".d.mts" /* Dmts */, ".mts" /* Mts */, ".mjs" /* Mjs */]) ? 99 /* ESNext */ : fileExtensionIsOneOf(fileName, [".d.cts" /* Dcts */, ".cts" /* Cts */, ".cjs" /* Cjs */]) ? 1 /* CommonJS */ : fileExtensionIsOneOf(fileName, [".d.ts" /* Dts */, ".ts" /* Ts */, ".tsx" /* Tsx */, ".js" /* Js */, ".jsx" /* Jsx */]) ? lookupFromPackageJson() : void 0;
                default:
                    return void 0;
            }
            function lookupFromPackageJson() {
                const state = getTemporaryModuleResolutionState(packageJsonInfoCache, host, options);
                const packageJsonLocations = [];
                state.failedLookupLocations = packageJsonLocations;
                state.affectingLocations = packageJsonLocations;
                const packageJsonScope = getPackageScopeForPath(fileName, state);
                const impliedNodeFormat = (packageJsonScope == null ? void 0 : packageJsonScope.contents.packageJsonContent.type) === "module" ? 99 /* ESNext */ : 1 /* CommonJS */;
                return { impliedNodeFormat, packageJsonLocations, packageJsonScope };
            }
        }