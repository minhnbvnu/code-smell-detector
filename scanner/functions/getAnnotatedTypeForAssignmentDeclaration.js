function getAnnotatedTypeForAssignmentDeclaration(declaredType, expression, symbol, declaration) {
                var _a2;
                const typeNode = getEffectiveTypeAnnotationNode(expression.parent);
                if (typeNode) {
                    const type = getWidenedType(getTypeFromTypeNode(typeNode));
                    if (!declaredType) {
                        return type;
                    }
                    else if (!isErrorType(declaredType) && !isErrorType(type) && !isTypeIdenticalTo(declaredType, type)) {
                        errorNextVariableOrPropertyDeclarationMustHaveSameType(
                        /*firstDeclaration*/
                        void 0, declaredType, declaration, type);
                    }
                }
                if ((_a2 = symbol.parent) == null ? void 0 : _a2.valueDeclaration) {
                    const typeNode2 = getEffectiveTypeAnnotationNode(symbol.parent.valueDeclaration);
                    if (typeNode2) {
                        const annotationSymbol = getPropertyOfType(getTypeFromTypeNode(typeNode2), symbol.escapedName);
                        if (annotationSymbol) {
                            return getNonMissingTypeOfSymbol(annotationSymbol);
                        }
                    }
                }
                return declaredType;
            }