function isAmbientPropertyDeclaration(node) {
            return !!(node.flags & 16777216 /* Ambient */) || hasSyntacticModifier(node, 2 /* Ambient */);
        }