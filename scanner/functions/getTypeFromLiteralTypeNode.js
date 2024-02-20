function getTypeFromLiteralTypeNode(node) {
                if (node.literal.kind === 104 /* NullKeyword */) {
                    return nullType;
                }
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    links.resolvedType = getRegularTypeOfLiteralType(checkExpression(node.literal));
                }
                return links.resolvedType;
            }