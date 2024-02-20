function isThislessInterface(symbol) {
                if (!symbol.declarations) {
                    return true;
                }
                for (const declaration of symbol.declarations) {
                    if (declaration.kind === 261 /* InterfaceDeclaration */) {
                        if (declaration.flags & 128 /* ContainsThis */) {
                            return false;
                        }
                        const baseTypeNodes = getInterfaceBaseTypeNodes(declaration);
                        if (baseTypeNodes) {
                            for (const node of baseTypeNodes) {
                                if (isEntityNameExpression(node.expression)) {
                                    const baseSymbol = resolveEntityName(node.expression, 788968 /* Type */, 
                                    /*ignoreErrors*/
                                    true);
                                    if (!baseSymbol || !(baseSymbol.flags & 64 /* Interface */) || getDeclaredTypeOfClassOrInterface(baseSymbol).thisType) {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                return true;
            }