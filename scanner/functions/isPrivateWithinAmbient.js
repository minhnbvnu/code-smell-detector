function isPrivateWithinAmbient(node) {
                return (hasEffectiveModifier(node, 8 /* Private */) || isPrivateIdentifierClassElementDeclaration(node)) && !!(node.flags & 16777216 /* Ambient */);
            }