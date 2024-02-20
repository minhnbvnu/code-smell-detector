function shouldEmitAccessorDeclaration(node) {
                return !(nodeIsMissing(node.body) && hasSyntacticModifier(node, 256 /* Abstract */));
            }