function getReturnTypeFromAnnotation(declaration) {
                if (declaration.kind === 173 /* Constructor */) {
                    return getDeclaredTypeOfClassOrInterface(getMergedSymbol(declaration.parent.symbol));
                }
                if (isJSDocSignature(declaration)) {
                    const root = getJSDocRoot(declaration);
                    if (root && isConstructorDeclaration(root.parent)) {
                        return getDeclaredTypeOfClassOrInterface(getMergedSymbol(root.parent.parent.symbol));
                    }
                }
                if (isJSDocConstructSignature(declaration)) {
                    return getTypeFromTypeNode(declaration.parameters[0].type);
                }
                const typeNode = getEffectiveReturnTypeNode(declaration);
                if (typeNode) {
                    return getTypeFromTypeNode(typeNode);
                }
                if (declaration.kind === 174 /* GetAccessor */ && hasBindableName(declaration)) {
                    const jsDocType = isInJSFile(declaration) && getTypeForDeclarationFromJSDocComment(declaration);
                    if (jsDocType) {
                        return jsDocType;
                    }
                    const setter = getDeclarationOfKind(getSymbolOfDeclaration(declaration), 175 /* SetAccessor */);
                    const setterType = getAnnotatedAccessorType(setter);
                    if (setterType) {
                        return setterType;
                    }
                }
                return getReturnTypeOfTypeTag(declaration);
            }