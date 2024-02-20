function isPrivateMethodTypeParameter(node) {
                return node.parent.kind === 171 /* MethodDeclaration */ && hasEffectiveModifier(node.parent, 8 /* Private */);
            }