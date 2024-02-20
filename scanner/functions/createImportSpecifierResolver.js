function createImportSpecifierResolver(importingFile, program, host, preferences) {
            const packageJsonImportFilter = createPackageJsonImportFilter(importingFile, preferences, host);
            const importMap = createExistingImportMap(program.getTypeChecker(), importingFile, program.getCompilerOptions());
            return { getModuleSpecifierForBestExportInfo };
            function getModuleSpecifierForBestExportInfo(exportInfo, position, isValidTypeOnlyUseSite, fromCacheOnly) {
                const { fixes, computedWithoutCacheCount } = getImportFixes(exportInfo, position, isValidTypeOnlyUseSite, 
                /*useRequire*/
                false, program, importingFile, host, preferences, importMap, fromCacheOnly);
                const result = getBestFix(fixes, importingFile, program, packageJsonImportFilter, host);
                return result && { ...result, computedWithoutCacheCount };
            }
        }