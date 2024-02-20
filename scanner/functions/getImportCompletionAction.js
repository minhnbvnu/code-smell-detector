function getImportCompletionAction(targetSymbol, moduleSymbol, exportMapKey, sourceFile, symbolName2, isJsxTagName, host, program, formatContext, position, preferences, cancellationToken) {
            const compilerOptions = program.getCompilerOptions();
            let exportInfos;
            if (exportMapKey) {
                exportInfos = getExportInfoMap(sourceFile, host, program, preferences, cancellationToken).get(sourceFile.path, exportMapKey);
                Debug.assertIsDefined(exportInfos, "Some exportInfo should match the specified exportMapKey");
            }
            else {
                exportInfos = pathIsBareSpecifier(stripQuotes(moduleSymbol.name)) ? [getSingleExportInfoForSymbol(targetSymbol, symbolName2, moduleSymbol, program, host)] : getAllExportInfoForSymbol(sourceFile, targetSymbol, symbolName2, moduleSymbol, isJsxTagName, program, host, preferences, cancellationToken);
                Debug.assertIsDefined(exportInfos, "Some exportInfo should match the specified symbol / moduleSymbol");
            }
            const useRequire = shouldUseRequire(sourceFile, program);
            const isValidTypeOnlyUseSite = isValidTypeOnlyAliasUseSite(getTokenAtPosition(sourceFile, position));
            const fix = Debug.checkDefined(getImportFixForSymbol(sourceFile, exportInfos, program, position, isValidTypeOnlyUseSite, useRequire, host, preferences));
            return {
                moduleSpecifier: fix.moduleSpecifier,
                codeAction: codeFixActionToCodeAction(codeActionForFix({ host, formatContext, preferences }, sourceFile, symbolName2, fix, 
                /*includeSymbolNameInDescription*/
                false, compilerOptions, preferences))
            };
        }