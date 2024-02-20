function createEntityNameFromSymbolChain(chain2, index) {
                        const typeParameterNodes = lookupTypeParameterNodes(chain2, index, context);
                        const symbol2 = chain2[index];
                        if (index === 0) {
                            context.flags |= 16777216 /* InInitialEntityName */;
                        }
                        const symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                        if (index === 0) {
                            context.flags ^= 16777216 /* InInitialEntityName */;
                        }
                        const identifier = setEmitFlags(factory.createIdentifier(symbolName2), 33554432 /* NoAsciiEscaping */);
                        if (typeParameterNodes)
                            setIdentifierTypeArguments(identifier, factory.createNodeArray(typeParameterNodes));
                        identifier.symbol = symbol2;
                        return index > 0 ? factory.createQualifiedName(createEntityNameFromSymbolChain(chain2, index - 1), identifier) : identifier;
                    }