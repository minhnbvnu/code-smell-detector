function getTSNodeAccessibility(node) {
        const modifiers = (0, getModifiers_1.getModifiers)(node);
        if (modifiers == null) {
            return null;
        }
        for (const modifier of modifiers) {
            switch (modifier.kind) {
                case SyntaxKind.PublicKeyword:
                    return 'public';
                case SyntaxKind.ProtectedKeyword:
                    return 'protected';
                case SyntaxKind.PrivateKeyword:
                    return 'private';
                default:
                    break;
            }
        }
        return null;
    }