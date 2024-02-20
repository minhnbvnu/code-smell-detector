function propagateNameFlags(node) {
            return node && isIdentifier(node) ? propagateIdentifierNameFlags(node) : propagateChildFlags(node);
        }