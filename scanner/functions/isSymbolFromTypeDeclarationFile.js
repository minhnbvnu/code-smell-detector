function isSymbolFromTypeDeclarationFile(symbol) {
                    if (!symbol.declarations) {
                        return false;
                    }
                    let current = symbol;
                    while (true) {
                        const parent2 = getParentOfSymbol(current);
                        if (parent2) {
                            current = parent2;
                        }
                        else {
                            break;
                        }
                    }
                    if (current.valueDeclaration && current.valueDeclaration.kind === 308 /* SourceFile */ && current.flags & 512 /* ValueModule */) {
                        return false;
                    }
                    for (const decl of symbol.declarations) {
                        const file = getSourceFileOfNode(decl);
                        if (fileToDirective.has(file.path)) {
                            return true;
                        }
                    }
                    return false;
                }