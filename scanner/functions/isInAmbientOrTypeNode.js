function isInAmbientOrTypeNode(node) {
                return !!(node.flags & 16777216 /* Ambient */ || findAncestor(node, (n) => isInterfaceDeclaration(n) || isTypeLiteralNode(n)));
            }