function addImportFromExportedSymbol(exportedSymbol, isValidTypeOnlyUseSite) {
                const moduleSymbol = Debug.checkDefined(exportedSymbol.parent);
                const symbolName2 = getNameForExportedSymbol(exportedSymbol, getEmitScriptTarget(compilerOptions));
                const checker = program.getTypeChecker();
                const symbol = checker.getMergedSymbol(skipAlias(exportedSymbol, checker));
                const exportInfo = getAllExportInfoForSymbol(sourceFile, symbol, symbolName2, moduleSymbol, 
                /*isJsxTagName*/
                false, program, host, preferences, cancellationToken);
                const useRequire = shouldUseRequire(sourceFile, program);
                const fix = getImportFixForSymbol(sourceFile, Debug.checkDefined(exportInfo), program, 
                /*position*/
                void 0, !!isValidTypeOnlyUseSite, useRequire, host, preferences);
                if (fix) {
                    addImport({ fix, symbolName: symbolName2, errorIdentifierText: void 0 });
                }
            }