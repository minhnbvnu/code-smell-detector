function getModuleSpecifierForBestExportInfo(exportInfo, position, isValidTypeOnlyUseSite, fromCacheOnly) {
                const { fixes, computedWithoutCacheCount } = getImportFixes(exportInfo, position, isValidTypeOnlyUseSite, 
                /*useRequire*/
                false, program, importingFile, host, preferences, importMap, fromCacheOnly);
                const result = getBestFix(fixes, importingFile, program, packageJsonImportFilter, host);
                return result && { ...result, computedWithoutCacheCount };
            }