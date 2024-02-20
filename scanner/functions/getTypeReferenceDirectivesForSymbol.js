function getTypeReferenceDirectivesForSymbol(symbol, meaning) {
                    if (!fileToDirective || !isSymbolFromTypeDeclarationFile(symbol)) {
                        return void 0;
                    }
                    let typeReferenceDirectives;
                    for (const decl of symbol.declarations) {
                        if (decl.symbol && decl.symbol.flags & meaning) {
                            const file = getSourceFileOfNode(decl);
                            const typeReferenceDirective = fileToDirective.get(file.path);
                            if (typeReferenceDirective) {
                                (typeReferenceDirectives || (typeReferenceDirectives = [])).push(typeReferenceDirective);
                            }
                            else {
                                return void 0;
                            }
                        }
                    }
                    return typeReferenceDirectives;
                }