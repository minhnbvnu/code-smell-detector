function isModuleName(node) {
            return isIdentifier(node) || isStringLiteral(node);
        }