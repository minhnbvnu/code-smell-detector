function getModuleSpecifiers(moduleSymbol, checker, compilerOptions, importingSourceFile, host, userPreferences, options = {}) {
            return getModuleSpecifiersWithCacheInfo(moduleSymbol, checker, compilerOptions, importingSourceFile, host, userPreferences, options).moduleSpecifiers;
        }