function eachSymbolReferenceInFile(definition, checker, sourceFile, cb, searchContainer = sourceFile) {
                        const symbol = isParameterPropertyDeclaration(definition.parent, definition.parent.parent) ? first(checker.getSymbolsOfParameterPropertyDeclaration(definition.parent, definition.text)) : checker.getSymbolAtLocation(definition);
                        if (!symbol)
                            return void 0;
                        for (const token of getPossibleSymbolReferenceNodes(sourceFile, symbol.name, searchContainer)) {
                            if (!isIdentifier(token) || token === definition || token.escapedText !== definition.escapedText)
                                continue;
                            const referenceSymbol = checker.getSymbolAtLocation(token);
                            if (referenceSymbol === symbol || checker.getShorthandAssignmentValueSymbol(token.parent) === symbol || isExportSpecifier(token.parent) && getLocalSymbolForExportSpecifier(token, referenceSymbol, token.parent, checker) === symbol) {
                                const res = cb(token);
                                if (res)
                                    return res;
                            }
                        }
                    }