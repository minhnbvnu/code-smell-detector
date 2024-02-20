function getModuleSpecifiersWithCacheInfo(moduleSymbol, checker, compilerOptions, importingSourceFile, host, userPreferences, options = {}) {
            let computedWithoutCache = false;
            const ambient = tryGetModuleNameFromAmbientModule(moduleSymbol, checker);
            if (ambient)
                return { moduleSpecifiers: [ambient], computedWithoutCache };
            let [specifiers, moduleSourceFile, modulePaths, cache] = tryGetModuleSpecifiersFromCacheWorker(moduleSymbol, importingSourceFile, host, userPreferences, options);
            if (specifiers)
                return { moduleSpecifiers: specifiers, computedWithoutCache };
            if (!moduleSourceFile)
                return { moduleSpecifiers: emptyArray, computedWithoutCache };
            computedWithoutCache = true;
            modulePaths || (modulePaths = getAllModulePathsWorker(importingSourceFile.path, moduleSourceFile.originalFileName, host));
            const result = computeModuleSpecifiers(modulePaths, compilerOptions, importingSourceFile, host, userPreferences, options);
            cache == null ? void 0 : cache.set(importingSourceFile.path, moduleSourceFile.path, userPreferences, options, modulePaths, result);
            return { moduleSpecifiers: result, computedWithoutCache };
        }