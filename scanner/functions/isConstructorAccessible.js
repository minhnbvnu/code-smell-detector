function isConstructorAccessible(node, signature) {
                if (!signature || !signature.declaration) {
                    return true;
                }
                const declaration = signature.declaration;
                const modifiers = getSelectedEffectiveModifierFlags(declaration, 24 /* NonPublicAccessibilityModifier */);
                if (!modifiers || declaration.kind !== 173 /* Constructor */) {
                    return true;
                }
                const declaringClassDeclaration = getClassLikeDeclarationOfSymbol(declaration.parent.symbol);
                const declaringClass = getDeclaredTypeOfSymbol(declaration.parent.symbol);
                if (!isNodeWithinClass(node, declaringClassDeclaration)) {
                    const containingClass = getContainingClass(node);
                    if (containingClass && modifiers & 16 /* Protected */) {
                        const containingType = getTypeOfNode(containingClass);
                        if (typeHasProtectedAccessibleBase(declaration.parent.symbol, containingType)) {
                            return true;
                        }
                    }
                    if (modifiers & 8 /* Private */) {
                        error(node, Diagnostics.Constructor_of_class_0_is_private_and_only_accessible_within_the_class_declaration, typeToString(declaringClass));
                    }
                    if (modifiers & 16 /* Protected */) {
                        error(node, Diagnostics.Constructor_of_class_0_is_protected_and_only_accessible_within_the_class_declaration, typeToString(declaringClass));
                    }
                    return false;
                }
                return true;
            }