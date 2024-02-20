function serializeTypeForDeclaration(context, type, symbol, enclosingDeclaration, includePrivateSymbol, bundled) {
                    if (!isErrorType(type) && enclosingDeclaration) {
                        const declWithExistingAnnotation = getDeclarationWithTypeAnnotation(symbol, getEnclosingDeclarationIgnoringFakeScope(enclosingDeclaration));
                        if (declWithExistingAnnotation && !isFunctionLikeDeclaration(declWithExistingAnnotation) && !isGetAccessorDeclaration(declWithExistingAnnotation)) {
                            const existing = getEffectiveTypeAnnotationNode(declWithExistingAnnotation);
                            if (typeNodeIsEquivalentToType(existing, declWithExistingAnnotation, type) && existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(existing, type)) {
                                const result2 = serializeExistingTypeNode(context, existing, includePrivateSymbol, bundled);
                                if (result2) {
                                    return result2;
                                }
                            }
                        }
                    }
                    const oldFlags = context.flags;
                    if (type.flags & 8192 /* UniqueESSymbol */ && type.symbol === symbol && (!context.enclosingDeclaration || some(symbol.declarations, (d) => getSourceFileOfNode(d) === getSourceFileOfNode(context.enclosingDeclaration)))) {
                        context.flags |= 1048576 /* AllowUniqueESSymbolType */;
                    }
                    const result = typeToTypeNodeHelper(type, context);
                    context.flags = oldFlags;
                    return result;
                }