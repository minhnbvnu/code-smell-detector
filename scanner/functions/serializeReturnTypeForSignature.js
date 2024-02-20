function serializeReturnTypeForSignature(context, type, signature, includePrivateSymbol, bundled) {
                    if (!isErrorType(type) && context.enclosingDeclaration) {
                        const annotation = signature.declaration && getEffectiveReturnTypeNode(signature.declaration);
                        const enclosingDeclarationIgnoringFakeScope = getEnclosingDeclarationIgnoringFakeScope(context.enclosingDeclaration);
                        if (!!findAncestor(annotation, (n) => n === enclosingDeclarationIgnoringFakeScope) && annotation) {
                            const annotated = getTypeFromTypeNode(annotation);
                            const thisInstantiated = annotated.flags & 262144 /* TypeParameter */ && annotated.isThisType ? instantiateType(annotated, signature.mapper) : annotated;
                            if (thisInstantiated === type && existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(annotation, type)) {
                                const result = serializeExistingTypeNode(context, annotation, includePrivateSymbol, bundled);
                                if (result) {
                                    return result;
                                }
                            }
                        }
                    }
                    return typeToTypeNodeHelper(type, context);
                }