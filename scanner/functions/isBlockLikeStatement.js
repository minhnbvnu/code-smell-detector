function isBlockLikeStatement(node, sourceCode) {
        // do-while with a block is a block-like statement.
        if (node.type === utils_1.AST_NODE_TYPES.DoWhileStatement &&
            node.body.type === utils_1.AST_NODE_TYPES.BlockStatement) {
            return true;
        }
        /**
         * IIFE is a block-like statement specially from
         * JSCS#disallowPaddingNewLinesAfterBlocks.
         */
        if (isIIFEStatement(node)) {
            return true;
        }
        // Checks the last token is a closing brace of blocks.
        const lastToken = sourceCode.getLastToken(node, util.isNotSemicolonToken);
        const belongingNode = lastToken && util.isClosingBraceToken(lastToken)
            ? sourceCode.getNodeByRangeIndex(lastToken.range[0])
            : null;
        return (!!belongingNode &&
            (belongingNode.type === utils_1.AST_NODE_TYPES.BlockStatement ||
                belongingNode.type === utils_1.AST_NODE_TYPES.SwitchStatement));
    }