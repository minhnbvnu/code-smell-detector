function getModuleSpecifierWorker(compilerOptions, importingSourceFile, importingSourceFileName, toFileName2, host, preferences, userPreferences, options = {}) {
            const info = getInfo(importingSourceFileName, host);
            const modulePaths = getAllModulePaths(importingSourceFileName, toFileName2, host, userPreferences, options);
            return firstDefined(modulePaths, (modulePath) => tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, userPreferences, 
            /*packageNameOnly*/
            void 0, options.overrideImportMode)) || getLocalModuleSpecifier(toFileName2, info, compilerOptions, host, options.overrideImportMode || importingSourceFile.impliedNodeFormat, preferences);
        }