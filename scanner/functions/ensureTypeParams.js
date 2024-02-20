function ensureTypeParams(node, params) {
                return hasEffectiveModifier(node, 8 /* Private */) ? void 0 : visitNodes2(params, visitDeclarationSubtree, isTypeParameterDeclaration);
            }