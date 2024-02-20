function nodeHasTokens(n, ast) {
        // If we have a token or node that has a non-zero width, it must have tokens.
        // Note: getWidth() does not take trivia into account.
        return n.kind === SyntaxKind.EndOfFileToken
            ? !!n.jsDoc
            : n.getWidth(ast) !== 0;
    }