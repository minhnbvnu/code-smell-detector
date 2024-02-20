function visitFunctionDeclarationLikeForReturnType(decl) {
                if (isArrowFunction(decl)) {
                    if (!findChildOfKind(decl, 20 /* OpenParenToken */, file)) {
                        return;
                    }
                }
                const effectiveTypeAnnotation = getEffectiveReturnTypeNode(decl);
                if (effectiveTypeAnnotation || !decl.body) {
                    return;
                }
                const signature = checker.getSignatureFromDeclaration(decl);
                if (!signature) {
                    return;
                }
                const returnType = checker.getReturnTypeOfSignature(signature);
                if (isModuleReferenceType(returnType)) {
                    return;
                }
                const typeDisplayString = printTypeInSingleLine(returnType);
                if (!typeDisplayString) {
                    return;
                }
                addTypeHints(typeDisplayString, getTypeAnnotationPosition(decl));
            }