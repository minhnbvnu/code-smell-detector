function getImportFixForSymbol(sourceFile, exportInfos, program, position, isValidTypeOnlyUseSite, useRequire, host, preferences) {
            const packageJsonImportFilter = createPackageJsonImportFilter(sourceFile, preferences, host);
            return getBestFix(getImportFixes(exportInfos, position, isValidTypeOnlyUseSite, useRequire, program, sourceFile, host, preferences).fixes, sourceFile, program, packageJsonImportFilter, host);
        }