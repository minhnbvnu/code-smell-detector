function isIdentifierANonContextualKeyword(node) {
            const originalKeywordKind = identifierToKeywordKind(node);
            return !!originalKeywordKind && !isContextualKeyword(originalKeywordKind);
        }