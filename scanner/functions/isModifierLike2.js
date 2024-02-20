function isModifierLike2(node) {
            if (isModifier(node)) {
                return node.kind;
            }
            if (isIdentifier(node)) {
                const originalKeywordKind = identifierToKeywordKind(node);
                if (originalKeywordKind && isModifierKind(originalKeywordKind)) {
                    return originalKeywordKind;
                }
            }
            return void 0;
        }