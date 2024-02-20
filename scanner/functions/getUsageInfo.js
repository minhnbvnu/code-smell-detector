function getUsageInfo(oldFile, toMove, checker) {
            const movedSymbols = new SymbolSet();
            const oldImportsNeededByNewFile = new SymbolSet();
            const newFileImportsFromOldFile = new SymbolSet();
            const containsJsx = find(toMove, (statement) => !!(statement.transformFlags & 2 /* ContainsJsx */));
            const jsxNamespaceSymbol = getJsxNamespaceSymbol(containsJsx);
            if (jsxNamespaceSymbol) {
                oldImportsNeededByNewFile.add(jsxNamespaceSymbol);
            }
            for (const statement of toMove) {
                forEachTopLevelDeclaration(statement, (decl) => {
                    movedSymbols.add(Debug.checkDefined(isExpressionStatement(decl) ? checker.getSymbolAtLocation(decl.expression.left) : decl.symbol, "Need a symbol here"));
                });
            }
            for (const statement of toMove) {
                forEachReference(statement, checker, (symbol) => {
                    if (!symbol.declarations)
                        return;
                    for (const decl of symbol.declarations) {
                        if (isInImport(decl)) {
                            oldImportsNeededByNewFile.add(symbol);
                        }
                        else if (isTopLevelDeclaration(decl) && sourceFileOfTopLevelDeclaration(decl) === oldFile && !movedSymbols.has(symbol)) {
                            newFileImportsFromOldFile.add(symbol);
                        }
                    }
                });
            }
            const unusedImportsFromOldFile = oldImportsNeededByNewFile.clone();
            const oldFileImportsFromNewFile = new SymbolSet();
            for (const statement of oldFile.statements) {
                if (contains(toMove, statement))
                    continue;
                if (jsxNamespaceSymbol && !!(statement.transformFlags & 2 /* ContainsJsx */)) {
                    unusedImportsFromOldFile.delete(jsxNamespaceSymbol);
                }
                forEachReference(statement, checker, (symbol) => {
                    if (movedSymbols.has(symbol))
                        oldFileImportsFromNewFile.add(symbol);
                    unusedImportsFromOldFile.delete(symbol);
                });
            }
            return { movedSymbols, newFileImportsFromOldFile, oldFileImportsFromNewFile, oldImportsNeededByNewFile, unusedImportsFromOldFile };
            function getJsxNamespaceSymbol(containsJsx2) {
                if (containsJsx2 === void 0) {
                    return void 0;
                }
                const jsxNamespace = checker.getJsxNamespace(containsJsx2);
                const jsxNamespaceSymbol2 = checker.resolveName(jsxNamespace, containsJsx2, 1920 /* Namespace */, 
                /*excludeGlobals*/
                true);
                return !!jsxNamespaceSymbol2 && some(jsxNamespaceSymbol2.declarations, isInImport) ? jsxNamespaceSymbol2 : void 0;
            }
        }