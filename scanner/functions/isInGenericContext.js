function isInGenericContext(node) {
                return !!findAncestor(node, (n) => isDeclarationWithTypeParameters(n) && getEffectiveTypeParameterDeclarations(n).length !== 0);
            }