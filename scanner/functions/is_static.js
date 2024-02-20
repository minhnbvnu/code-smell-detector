function is_static(node) {
        return typescript_1.default.canHaveModifiers(node) && typescript_1.default.getModifiers(node)?.find((modifier) => modifier.kind == typescript_1.default.SyntaxKind.StaticKeyword) != null;
    }