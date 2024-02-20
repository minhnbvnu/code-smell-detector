function getParameterTypeNodeForDecoratorCheck(node) {
                const typeNode = getEffectiveTypeAnnotationNode(node);
                return isRestParameter(node) ? getRestParameterElementType(typeNode) : typeNode;
            }