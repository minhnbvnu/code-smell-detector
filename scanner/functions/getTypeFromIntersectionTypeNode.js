function getTypeFromIntersectionTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    const aliasSymbol = getAliasSymbolForTypeNode(node);
                    const types = map(node.types, getTypeFromTypeNode);
                    const noSupertypeReduction = types.length === 2 && !!(types[0].flags & (4 /* String */ | 8 /* Number */ | 64 /* BigInt */)) && types[1] === emptyTypeLiteralType;
                    links.resolvedType = getIntersectionType(types, aliasSymbol, getTypeArgumentsForAliasSymbol(aliasSymbol), noSupertypeReduction);
                }
                return links.resolvedType;
            }