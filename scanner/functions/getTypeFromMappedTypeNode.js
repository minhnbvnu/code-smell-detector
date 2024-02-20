function getTypeFromMappedTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    const type = createObjectType(32 /* Mapped */, node.symbol);
                    type.declaration = node;
                    type.aliasSymbol = getAliasSymbolForTypeNode(node);
                    type.aliasTypeArguments = getTypeArgumentsForAliasSymbol(type.aliasSymbol);
                    links.resolvedType = type;
                    getConstraintTypeFromMappedType(type);
                }
                return links.resolvedType;
            }