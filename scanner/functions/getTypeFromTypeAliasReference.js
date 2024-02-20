function getTypeFromTypeAliasReference(node, symbol) {
                if (getCheckFlags(symbol) & 1048576 /* Unresolved */) {
                    const typeArguments = typeArgumentsFromTypeReferenceNode(node);
                    const id = getAliasId(symbol, typeArguments);
                    let errorType2 = errorTypes.get(id);
                    if (!errorType2) {
                        errorType2 = createIntrinsicType(1 /* Any */, "error");
                        errorType2.aliasSymbol = symbol;
                        errorType2.aliasTypeArguments = typeArguments;
                        errorTypes.set(id, errorType2);
                    }
                    return errorType2;
                }
                const type = getDeclaredTypeOfSymbol(symbol);
                const typeParameters = getSymbolLinks(symbol).typeParameters;
                if (typeParameters) {
                    const numTypeArguments = length(node.typeArguments);
                    const minTypeArgumentCount = getMinTypeArgumentCount(typeParameters);
                    if (numTypeArguments < minTypeArgumentCount || numTypeArguments > typeParameters.length) {
                        error(node, minTypeArgumentCount === typeParameters.length ? Diagnostics.Generic_type_0_requires_1_type_argument_s : Diagnostics.Generic_type_0_requires_between_1_and_2_type_arguments, symbolToString(symbol), minTypeArgumentCount, typeParameters.length);
                        return errorType;
                    }
                    const aliasSymbol = getAliasSymbolForTypeNode(node);
                    let newAliasSymbol = aliasSymbol && (isLocalTypeAlias(symbol) || !isLocalTypeAlias(aliasSymbol)) ? aliasSymbol : void 0;
                    let aliasTypeArguments;
                    if (newAliasSymbol) {
                        aliasTypeArguments = getTypeArgumentsForAliasSymbol(newAliasSymbol);
                    }
                    else if (isTypeReferenceType(node)) {
                        const aliasSymbol2 = resolveTypeReferenceName(node, 2097152 /* Alias */, 
                        /*ignoreErrors*/
                        true);
                        if (aliasSymbol2 && aliasSymbol2 !== unknownSymbol) {
                            const resolved = resolveAlias(aliasSymbol2);
                            if (resolved && resolved.flags & 524288 /* TypeAlias */) {
                                newAliasSymbol = resolved;
                                aliasTypeArguments = typeArgumentsFromTypeReferenceNode(node) || (typeParameters ? [] : void 0);
                            }
                        }
                    }
                    return getTypeAliasInstantiation(symbol, typeArgumentsFromTypeReferenceNode(node), newAliasSymbol, aliasTypeArguments);
                }
                return checkNoTypeArguments(node, symbol) ? type : errorType;
            }