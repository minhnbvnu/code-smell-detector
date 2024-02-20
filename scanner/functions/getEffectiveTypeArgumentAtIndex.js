function getEffectiveTypeArgumentAtIndex(node, typeParameters, index) {
                if (node.typeArguments && index < node.typeArguments.length) {
                    return getTypeFromTypeNode(node.typeArguments[index]);
                }
                return getEffectiveTypeArguments2(node, typeParameters)[index];
            }