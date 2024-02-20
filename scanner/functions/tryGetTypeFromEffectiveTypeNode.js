function tryGetTypeFromEffectiveTypeNode(node) {
                const typeNode = getEffectiveTypeAnnotationNode(node);
                if (typeNode) {
                    return getTypeFromTypeNode(typeNode);
                }
            }