function getRestTypeElementFlags(node) {
                return getArrayElementTypeNode(node.type) ? 4 /* Rest */ : 8 /* Variadic */;
            }