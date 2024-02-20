function signatureUsesTypeParameter(sig, isTypeParameter) {
                return sig.params.some((p) => typeContainsTypeParameter(isTSParameterProperty(p)
                    ? p.parameter.typeAnnotation
                    : p.typeAnnotation));
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
            }