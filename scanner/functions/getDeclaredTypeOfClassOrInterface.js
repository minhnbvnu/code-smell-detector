function getDeclaredTypeOfClassOrInterface(symbol) {
                let links = getSymbolLinks(symbol);
                const originalLinks = links;
                if (!links.declaredType) {
                    const kind = symbol.flags & 32 /* Class */ ? 1 /* Class */ : 2 /* Interface */;
                    const merged = mergeJSSymbols(symbol, symbol.valueDeclaration && getAssignedClassSymbol(symbol.valueDeclaration));
                    if (merged) {
                        symbol = merged;
                        links = merged.links;
                    }
                    const type = originalLinks.declaredType = links.declaredType = createObjectType(kind, symbol);
                    const outerTypeParameters = getOuterTypeParametersOfClassOrInterface(symbol);
                    const localTypeParameters = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                    if (outerTypeParameters || localTypeParameters || kind === 1 /* Class */ || !isThislessInterface(symbol)) {
                        type.objectFlags |= 4 /* Reference */;
                        type.typeParameters = concatenate(outerTypeParameters, localTypeParameters);
                        type.outerTypeParameters = outerTypeParameters;
                        type.localTypeParameters = localTypeParameters;
                        type.instantiations = /* @__PURE__ */ new Map();
                        type.instantiations.set(getTypeListId(type.typeParameters), type);
                        type.target = type;
                        type.resolvedTypeArguments = type.typeParameters;
                        type.thisType = createTypeParameter(symbol);
                        type.thisType.isThisType = true;
                        type.thisType.constraint = type;
                    }
                }
                return links.declaredType;
            }