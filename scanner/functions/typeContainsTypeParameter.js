function typeContainsTypeParameter(type) {
                    if (!type) {
                        return false;
                    }
                    if (type.type === utils_1.AST_NODE_TYPES.TSTypeReference) {
                        const typeName = type.typeName;
                        if (isIdentifier(typeName) && isTypeParameter(typeName.name)) {
                            return true;
                        }
                    }
                    return typeContainsTypeParameter(type.typeAnnotation ||
                        type.elementType);
                }