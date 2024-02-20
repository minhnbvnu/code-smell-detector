function isThislessVariableLikeDeclaration(node) {
                const typeNode = getEffectiveTypeAnnotationNode(node);
                return typeNode ? isThislessType(typeNode) : !hasInitializer(node);
            }