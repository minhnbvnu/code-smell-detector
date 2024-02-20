function getContextualTypeForVariableLikeDeclaration(declaration, contextFlags) {
                const typeNode = getEffectiveTypeAnnotationNode(declaration) || (isInJSFile(declaration) ? tryGetJSDocSatisfiesTypeNode(declaration) : void 0);
                if (typeNode) {
                    return getTypeFromTypeNode(typeNode);
                }
                switch (declaration.kind) {
                    case 166 /* Parameter */:
                        return getContextuallyTypedParameterType(declaration);
                    case 205 /* BindingElement */:
                        return getContextualTypeForBindingElement(declaration, contextFlags);
                    case 169 /* PropertyDeclaration */:
                        if (isStatic(declaration)) {
                            return getContextualTypeForStaticPropertyDeclaration(declaration, contextFlags);
                        }
                }
            }