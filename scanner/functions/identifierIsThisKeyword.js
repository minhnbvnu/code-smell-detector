function identifierIsThisKeyword(id) {
        return (
        // eslint-disable-next-line deprecation/deprecation -- intentional for older TS versions
        (isAtLeast50 ? ts.identifierToKeywordKind(id) : id.originalKeywordKind) ===
            SyntaxKind.ThisKeyword);
    }