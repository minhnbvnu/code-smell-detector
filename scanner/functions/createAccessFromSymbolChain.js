function createAccessFromSymbolChain(chain2, index, stopper) {
                        const typeParameterNodes = index === chain2.length - 1 ? overrideTypeArguments : lookupTypeParameterNodes(chain2, index, context);
                        const symbol2 = chain2[index];
                        const parent2 = chain2[index - 1];
                        let symbolName2;
                        if (index === 0) {
                            context.flags |= 16777216 /* InInitialEntityName */;
                            symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                            context.approximateLength += (symbolName2 ? symbolName2.length : 0) + 1;
                            context.flags ^= 16777216 /* InInitialEntityName */;
                        }
                        else {
                            if (parent2 && getExportsOfSymbol(parent2)) {
                                const exports = getExportsOfSymbol(parent2);
                                forEachEntry(exports, (ex, name) => {
                                    if (getSymbolIfSameReference(ex, symbol2) && !isLateBoundName(name) && name !== "export=" /* ExportEquals */) {
                                        symbolName2 = unescapeLeadingUnderscores(name);
                                        return true;
                                    }
                                });
                            }
                        }
                        if (symbolName2 === void 0) {
                            const name = firstDefined(symbol2.declarations, getNameOfDeclaration);
                            if (name && isComputedPropertyName(name) && isEntityName(name.expression)) {
                                const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                                if (isEntityName(LHS)) {
                                    return factory.createIndexedAccessTypeNode(factory.createParenthesizedType(factory.createTypeQueryNode(LHS)), factory.createTypeQueryNode(name.expression));
                                }
                                return LHS;
                            }
                            symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                        }
                        context.approximateLength += symbolName2.length + 1;
                        if (!(context.flags & 16 /* ForbidIndexedAccessSymbolReferences */) && parent2 && getMembersOfSymbol(parent2) && getMembersOfSymbol(parent2).get(symbol2.escapedName) && getSymbolIfSameReference(getMembersOfSymbol(parent2).get(symbol2.escapedName), symbol2)) {
                            const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                            if (isIndexedAccessTypeNode(LHS)) {
                                return factory.createIndexedAccessTypeNode(LHS, factory.createLiteralTypeNode(factory.createStringLiteral(symbolName2)));
                            }
                            else {
                                return factory.createIndexedAccessTypeNode(factory.createTypeReferenceNode(LHS, typeParameterNodes), factory.createLiteralTypeNode(factory.createStringLiteral(symbolName2)));
                            }
                        }
                        const identifier = setEmitFlags(factory.createIdentifier(symbolName2), 33554432 /* NoAsciiEscaping */);
                        if (typeParameterNodes)
                            setIdentifierTypeArguments(identifier, factory.createNodeArray(typeParameterNodes));
                        identifier.symbol = symbol2;
                        if (index > stopper) {
                            const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                            if (!isEntityName(LHS)) {
                                return Debug.fail("Impossible construct - an export of an indexed access cannot be reachable");
                            }
                            return factory.createQualifiedName(LHS, identifier);
                        }
                        return identifier;
                    }