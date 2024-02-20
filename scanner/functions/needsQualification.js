function needsQualification(symbol, enclosingDeclaration, meaning) {
                let qualify = false;
                forEachSymbolTableInScope(enclosingDeclaration, (symbolTable) => {
                    let symbolFromSymbolTable = getMergedSymbol(symbolTable.get(symbol.escapedName));
                    if (!symbolFromSymbolTable) {
                        return false;
                    }
                    if (symbolFromSymbolTable === symbol) {
                        return true;
                    }
                    const shouldResolveAlias = symbolFromSymbolTable.flags & 2097152 /* Alias */ && !getDeclarationOfKind(symbolFromSymbolTable, 278 /* ExportSpecifier */);
                    symbolFromSymbolTable = shouldResolveAlias ? resolveAlias(symbolFromSymbolTable) : symbolFromSymbolTable;
                    const flags = shouldResolveAlias ? getAllSymbolFlags(symbolFromSymbolTable) : symbolFromSymbolTable.flags;
                    if (flags & meaning) {
                        qualify = true;
                        return true;
                    }
                    return false;
                });
                return qualify;
            }