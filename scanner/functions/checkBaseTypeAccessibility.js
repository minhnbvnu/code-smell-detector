function checkBaseTypeAccessibility(type, node) {
                const signatures = getSignaturesOfType(type, 1 /* Construct */);
                if (signatures.length) {
                    const declaration = signatures[0].declaration;
                    if (declaration && hasEffectiveModifier(declaration, 8 /* Private */)) {
                        const typeClassDeclaration = getClassLikeDeclarationOfSymbol(type.symbol);
                        if (!isNodeWithinClass(node, typeClassDeclaration)) {
                            error(node, Diagnostics.Cannot_extend_a_class_0_Class_constructor_is_marked_as_private, getFullyQualifiedName(type.symbol));
                        }
                    }
                }
            }