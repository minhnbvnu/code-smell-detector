function getAccessorTypeNode(node) {
                const accessors = resolver.getAllAccessorDeclarations(node);
                return accessors.setAccessor && getSetAccessorTypeAnnotationNode(accessors.setAccessor) || accessors.getAccessor && getEffectiveReturnTypeNode(accessors.getAccessor);
            }