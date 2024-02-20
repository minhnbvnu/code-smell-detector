function getNodeModulesPackageName(compilerOptions, importingSourceFile, nodeModulesFileName, host, preferences, options = {}) {
            const info = getInfo(importingSourceFile.path, host);
            const modulePaths = getAllModulePaths(importingSourceFile.path, nodeModulesFileName, host, preferences, options);
            return firstDefined(modulePaths, (modulePath) => tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, preferences, 
            /*packageNameOnly*/
            true, options.overrideImportMode));
        }