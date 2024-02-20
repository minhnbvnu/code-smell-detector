function getTypeFromUnionTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    const aliasSymbol = getAliasSymbolForTypeNode(node);
                    links.resolvedType = getUnionType(map(node.types, getTypeFromTypeNode), 1 /* Literal */, aliasSymbol, getTypeArgumentsForAliasSymbol(aliasSymbol));
                }
                return links.resolvedType;
            }