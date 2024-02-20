function skipPastExportOrImportSpecifierOrUnion(symbol, node, checker, useLocalSymbolForExportSpecifier) {
                        const { parent: parent2 } = node;
                        if (isExportSpecifier(parent2) && useLocalSymbolForExportSpecifier) {
                            return getLocalSymbolForExportSpecifier(node, symbol, parent2, checker);
                        }
                        return firstDefined(symbol.declarations, (decl) => {
                            if (!decl.parent) {
                                if (symbol.flags & 33554432 /* Transient */)
                                    return void 0;
                                Debug.fail(`Unexpected symbol at ${Debug.formatSyntaxKind(node.kind)}: ${Debug.formatSymbol(symbol)}`);
                            }
                            return isTypeLiteralNode(decl.parent) && isUnionTypeNode(decl.parent.parent) ? checker.getPropertyOfType(checker.getTypeFromTypeNode(decl.parent.parent), symbol.name) : void 0;
                        });
                    }