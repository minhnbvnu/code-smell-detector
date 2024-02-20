function symbolToExpression(symbol, context, meaning) {
                    const chain = lookupSymbolChain(symbol, context, meaning);
                    return createExpressionFromSymbolChain(chain, chain.length - 1);
                    function createExpressionFromSymbolChain(chain2, index) {
                        const typeParameterNodes = lookupTypeParameterNodes(chain2, index, context);
                        const symbol2 = chain2[index];
                        if (index === 0) {
                            context.flags |= 16777216 /* InInitialEntityName */;
                        }
                        let symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                        if (index === 0) {
                            context.flags ^= 16777216 /* InInitialEntityName */;
                        }
                        let firstChar = symbolName2.charCodeAt(0);
                        if (isSingleOrDoubleQuote(firstChar) && some(symbol2.declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                            return factory.createStringLiteral(getSpecifierForModuleSymbol(symbol2, context));
                        }
                        if (index === 0 || canUsePropertyAccess(symbolName2, languageVersion)) {
                            const identifier = setEmitFlags(factory.createIdentifier(symbolName2), 33554432 /* NoAsciiEscaping */);
                            if (typeParameterNodes)
                                setIdentifierTypeArguments(identifier, factory.createNodeArray(typeParameterNodes));
                            identifier.symbol = symbol2;
                            return index > 0 ? factory.createPropertyAccessExpression(createExpressionFromSymbolChain(chain2, index - 1), identifier) : identifier;
                        }
                        else {
                            if (firstChar === 91 /* openBracket */) {
                                symbolName2 = symbolName2.substring(1, symbolName2.length - 1);
                                firstChar = symbolName2.charCodeAt(0);
                            }
                            let expression;
                            if (isSingleOrDoubleQuote(firstChar) && !(symbol2.flags & 8 /* EnumMember */)) {
                                expression = factory.createStringLiteral(stripQuotes(symbolName2).replace(/\\./g, (s) => s.substring(1)), firstChar === 39 /* singleQuote */);
                            }
                            else if ("" + +symbolName2 === symbolName2) {
                                expression = factory.createNumericLiteral(+symbolName2);
                            }
                            if (!expression) {
                                const identifier = setEmitFlags(factory.createIdentifier(symbolName2), 33554432 /* NoAsciiEscaping */);
                                if (typeParameterNodes)
                                    setIdentifierTypeArguments(identifier, factory.createNodeArray(typeParameterNodes));
                                identifier.symbol = symbol2;
                                expression = identifier;
                            }
                            return factory.createElementAccessExpression(createExpressionFromSymbolChain(chain2, index - 1), expression);
                        }
                    }
                }