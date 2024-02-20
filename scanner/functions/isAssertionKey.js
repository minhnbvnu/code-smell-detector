function isAssertionKey(node) {
            return isStringLiteral(node) || isIdentifier(node);
        }