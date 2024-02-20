function getFixesInfoForNonUMDImport({ sourceFile, program, cancellationToken, host, preferences }, symbolToken, useAutoImportProvider) {
            const checker = program.getTypeChecker();
            const compilerOptions = program.getCompilerOptions();
            return flatMap(getSymbolNamesToImport(sourceFile, checker, symbolToken, compilerOptions), (symbolName2) => {
                if (symbolName2 === "default" /* Default */) {
                    return void 0;
                }
                const isValidTypeOnlyUseSite = isValidTypeOnlyAliasUseSite(symbolToken);
                const useRequire = shouldUseRequire(sourceFile, program);
                const exportInfo = getExportInfos(symbolName2, isJSXTagName(symbolToken), getMeaningFromLocation(symbolToken), cancellationToken, sourceFile, program, useAutoImportProvider, host, preferences);
                return arrayFrom(flatMapIterator(exportInfo.values(), (exportInfos) => getImportFixes(exportInfos, symbolToken.getStart(sourceFile), isValidTypeOnlyUseSite, useRequire, program, sourceFile, host, preferences).fixes), (fix) => ({ fix, symbolName: symbolName2, errorIdentifierText: symbolToken.text, isJsxNamespaceFix: symbolName2 !== symbolToken.text }));
            });
        }