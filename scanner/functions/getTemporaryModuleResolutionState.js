function getTemporaryModuleResolutionState(packageJsonInfoCache, host, options) {
            return {
                host,
                compilerOptions: options,
                traceEnabled: isTraceEnabled(options, host),
                failedLookupLocations: noopPush,
                affectingLocations: noopPush,
                packageJsonInfoCache,
                features: 0 /* None */,
                conditions: emptyArray,
                requestContainingDirectory: void 0,
                reportDiagnostic: noop,
                isConfigLookup: false,
                candidateIsFromPackageJsonField: false
            };
        }