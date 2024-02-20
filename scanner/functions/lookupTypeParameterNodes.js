function lookupTypeParameterNodes(chain, index, context) {
                    var _a2;
                    Debug.assert(chain && 0 <= index && index < chain.length);
                    const symbol = chain[index];
                    const symbolId = getSymbolId(symbol);
                    if ((_a2 = context.typeParameterSymbolList) == null ? void 0 : _a2.has(symbolId)) {
                        return void 0;
                    }
                    (context.typeParameterSymbolList || (context.typeParameterSymbolList = /* @__PURE__ */ new Set())).add(symbolId);
                    let typeParameterNodes;
                    if (context.flags & 512 /* WriteTypeParametersInQualifiedName */ && index < chain.length - 1) {
                        const parentSymbol = symbol;
                        const nextSymbol = chain[index + 1];
                        if (getCheckFlags(nextSymbol) & 1 /* Instantiated */) {
                            const params = getTypeParametersOfClassOrInterface(parentSymbol.flags & 2097152 /* Alias */ ? resolveAlias(parentSymbol) : parentSymbol);
                            typeParameterNodes = mapToTypeNodes(map(params, (t) => getMappedType(t, nextSymbol.links.mapper)), context);
                        }
                        else {
                            typeParameterNodes = typeParametersToTypeParameterDeclarations(symbol, context);
                        }
                    }
                    return typeParameterNodes;
                }