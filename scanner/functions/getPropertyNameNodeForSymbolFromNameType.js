function getPropertyNameNodeForSymbolFromNameType(symbol, context, singleQuote, stringNamed) {
                    const nameType = getSymbolLinks(symbol).nameType;
                    if (nameType) {
                        if (nameType.flags & 384 /* StringOrNumberLiteral */) {
                            const name = "" + nameType.value;
                            if (!isIdentifierText(name, getEmitScriptTarget(compilerOptions)) && (stringNamed || !isNumericLiteralName(name))) {
                                return factory.createStringLiteral(name, !!singleQuote);
                            }
                            if (isNumericLiteralName(name) && startsWith(name, "-")) {
                                return factory.createComputedPropertyName(factory.createNumericLiteral(+name));
                            }
                            return createPropertyNameNodeForIdentifierOrLiteral(name, getEmitScriptTarget(compilerOptions));
                        }
                        if (nameType.flags & 8192 /* UniqueESSymbol */) {
                            return factory.createComputedPropertyName(symbolToExpression(nameType.symbol, context, 111551 /* Value */));
                        }
                    }
                }