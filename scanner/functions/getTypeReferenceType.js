function getTypeReferenceType(node, symbol) {
                if (symbol === unknownSymbol) {
                    return errorType;
                }
                symbol = getExpandoSymbol(symbol) || symbol;
                if (symbol.flags & (32 /* Class */ | 64 /* Interface */)) {
                    return getTypeFromClassOrInterfaceReference(node, symbol);
                }
                if (symbol.flags & 524288 /* TypeAlias */) {
                    return getTypeFromTypeAliasReference(node, symbol);
                }
                const res = tryGetDeclaredTypeOfSymbol(symbol);
                if (res) {
                    return checkNoTypeArguments(node, symbol) ? getRegularTypeOfLiteralType(res) : errorType;
                }
                if (symbol.flags & 111551 /* Value */ && isJSDocTypeReference(node)) {
                    const jsdocType = getTypeFromJSDocValueReference(node, symbol);
                    if (jsdocType) {
                        return jsdocType;
                    }
                    else {
                        resolveTypeReferenceName(node, 788968 /* Type */);
                        return getTypeOfSymbol(symbol);
                    }
                }
                return errorType;
            }