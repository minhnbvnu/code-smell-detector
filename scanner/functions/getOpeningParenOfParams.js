function getOpeningParenOfParams(node, sourceCode) {
        return util.nullThrows(node.id
            ? sourceCode.getTokenAfter(node.id, util.isOpeningParenToken)
            : sourceCode.getFirstToken(node, util.isOpeningParenToken), util.NullThrowsReasons.MissingToken('(', node.type));
    }