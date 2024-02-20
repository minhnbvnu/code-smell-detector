function getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    const aliasSymbol = getAliasSymbolForTypeNode(node);
                    if (getMembersOfSymbol(node.symbol).size === 0 && !aliasSymbol) {
                        links.resolvedType = emptyTypeLiteralType;
                    }
                    else {
                        let type = createObjectType(16 /* Anonymous */, node.symbol);
                        type.aliasSymbol = aliasSymbol;
                        type.aliasTypeArguments = getTypeArgumentsForAliasSymbol(aliasSymbol);
                        if (isJSDocTypeLiteral(node) && node.isArrayType) {
                            type = createArrayType(type);
                        }
                        links.resolvedType = type;
                    }
                }
                return links.resolvedType;
            }