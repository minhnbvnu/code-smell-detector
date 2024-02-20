function getTypeFromTypeReference(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    if (isConstTypeReference(node) && isAssertionExpression(node.parent)) {
                        links.resolvedSymbol = unknownSymbol;
                        return links.resolvedType = checkExpressionCached(node.parent.expression);
                    }
                    let symbol;
                    let type;
                    const meaning = 788968 /* Type */;
                    if (isJSDocTypeReference(node)) {
                        type = getIntendedTypeFromJSDocTypeReference(node);
                        if (!type) {
                            symbol = resolveTypeReferenceName(node, meaning, 
                            /*ignoreErrors*/
                            true);
                            if (symbol === unknownSymbol) {
                                symbol = resolveTypeReferenceName(node, meaning | 111551 /* Value */);
                            }
                            else {
                                resolveTypeReferenceName(node, meaning);
                            }
                            type = getTypeReferenceType(node, symbol);
                        }
                    }
                    if (!type) {
                        symbol = resolveTypeReferenceName(node, meaning);
                        type = getTypeReferenceType(node, symbol);
                    }
                    links.resolvedSymbol = symbol;
                    links.resolvedType = type;
                }
                return links.resolvedType;
            }