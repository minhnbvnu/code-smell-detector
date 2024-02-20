function getParenTokens(node, leftArgumentListParen, sourceCode) {
        const parens = [sourceCode.getFirstToken(node), sourceCode.getLastToken(node)];
        let leftNext = sourceCode.getTokenBefore(node);
        let rightNext = sourceCode.getTokenAfter(node);
        // Note: don't include the parens of the argument list.
        while (leftNext &&
            rightNext &&
            leftNext.range[0] > leftArgumentListParen.range[0] &&
            isOpeningParenToken(leftNext) &&
            isClosingParenToken(rightNext)) {
            parens.push(leftNext, rightNext);
            leftNext = sourceCode.getTokenBefore(leftNext);
            rightNext = sourceCode.getTokenAfter(rightNext);
        }
        return parens.sort((a, b) => a.range[0] - b.range[0]);
    }