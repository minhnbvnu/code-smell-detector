function tryGetModuleSpecifiersFromCache(moduleSymbol, importingSourceFile, host, userPreferences, options = {}) {
            return tryGetModuleSpecifiersFromCacheWorker(moduleSymbol, importingSourceFile, host, userPreferences, options)[0];
        }