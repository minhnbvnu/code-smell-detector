function symbolToNode(symbol, context, meaning) {
                    if (context.flags & 1073741824 /* WriteComputedProps */) {
                        if (symbol.valueDeclaration) {
                            const name = getNameOfDeclaration(symbol.valueDeclaration);
                            if (name && isComputedPropertyName(name))
                                return name;
                        }
                        const nameType = getSymbolLinks(symbol).nameType;
                        if (nameType && nameType.flags & (1024 /* EnumLiteral */ | 8192 /* UniqueESSymbol */)) {
                            context.enclosingDeclaration = nameType.symbol.valueDeclaration;
                            return factory.createComputedPropertyName(symbolToExpression(nameType.symbol, context, meaning));
                        }
                    }
                    return symbolToExpression(symbol, context, meaning);
                }