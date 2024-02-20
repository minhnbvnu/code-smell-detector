function getTypeFromTypeOperatorNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    switch (node.operator) {
                        case 141 /* KeyOfKeyword */:
                            links.resolvedType = getIndexType(getTypeFromTypeNode(node.type));
                            break;
                        case 156 /* UniqueKeyword */:
                            links.resolvedType = node.type.kind === 153 /* SymbolKeyword */ ? getESSymbolLikeTypeForNode(walkUpParenthesizedTypes(node.parent)) : errorType;
                            break;
                        case 146 /* ReadonlyKeyword */:
                            links.resolvedType = getTypeFromTypeNode(node.type);
                            break;
                        default:
                            throw Debug.assertNever(node.operator);
                    }
                }
                return links.resolvedType;
            }