function getSwitchCaseColonToken(node, sourceCode) {
        if (node.test) {
            return sourceCode.getTokenAfter(node.test, isColonToken);
        }
        return sourceCode.getFirstToken(node, 1);
    }