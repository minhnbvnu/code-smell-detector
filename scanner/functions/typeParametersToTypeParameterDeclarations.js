function typeParametersToTypeParameterDeclarations(symbol, context) {
                    let typeParameterNodes;
                    const targetSymbol = getTargetSymbol(symbol);
                    if (targetSymbol.flags & (32 /* Class */ | 64 /* Interface */ | 524288 /* TypeAlias */)) {
                        typeParameterNodes = factory.createNodeArray(map(getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol), (tp) => typeParameterToDeclaration(tp, context)));
                    }
                    return typeParameterNodes;
                }