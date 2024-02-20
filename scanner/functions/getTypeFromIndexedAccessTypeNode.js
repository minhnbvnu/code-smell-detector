function getTypeFromIndexedAccessTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    const objectType = getTypeFromTypeNode(node.objectType);
                    const indexType = getTypeFromTypeNode(node.indexType);
                    const potentialAlias = getAliasSymbolForTypeNode(node);
                    links.resolvedType = getIndexedAccessType(objectType, indexType, 0 /* None */, node, potentialAlias, getTypeArgumentsForAliasSymbol(potentialAlias));
                }
                return links.resolvedType;
            }