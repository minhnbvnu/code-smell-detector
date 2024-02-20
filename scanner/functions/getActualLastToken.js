function getActualLastToken(node, sourceCode) {
        const semiToken = sourceCode.getLastToken(node);
        const prevToken = sourceCode.getTokenBefore(semiToken);
        const nextToken = sourceCode.getTokenAfter(semiToken);
        const isSemicolonLessStyle = prevToken &&
            nextToken &&
            prevToken.range[0] >= node.range[0] &&
            util.isSemicolonToken(semiToken) &&
            semiToken.loc.start.line !== prevToken.loc.end.line &&
            semiToken.loc.end.line === nextToken.loc.start.line;
        return isSemicolonLessStyle ? prevToken : semiToken;
    }