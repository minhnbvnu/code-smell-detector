function getImportFixes(exportInfos, usagePosition, isValidTypeOnlyUseSite, useRequire, program, sourceFile, host, preferences, importMap = createExistingImportMap(program.getTypeChecker(), sourceFile, program.getCompilerOptions()), fromCacheOnly) {
            const checker = program.getTypeChecker();
            const existingImports = flatMap(exportInfos, importMap.getImportsForExportInfo);
            const useNamespace = usagePosition !== void 0 && tryUseExistingNamespaceImport(existingImports, usagePosition);
            const addToExisting = tryAddToExistingImport(existingImports, isValidTypeOnlyUseSite, checker, program.getCompilerOptions());
            if (addToExisting) {
                return {
                    computedWithoutCacheCount: 0,
                    fixes: [...useNamespace ? [useNamespace] : emptyArray, addToExisting]
                };
            }
            const { fixes, computedWithoutCacheCount = 0 } = getFixesForAddImport(exportInfos, existingImports, program, sourceFile, usagePosition, isValidTypeOnlyUseSite, useRequire, host, preferences, fromCacheOnly);
            return {
                computedWithoutCacheCount,
                fixes: [...useNamespace ? [useNamespace] : emptyArray, ...fixes]
            };
        }