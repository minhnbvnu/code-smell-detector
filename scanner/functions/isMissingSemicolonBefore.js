function isMissingSemicolonBefore(node, sourceCode) {
        for (;;) {
            const parent = node.parent;
            if (parent.type === utils_1.AST_NODE_TYPES.ExpressionStatement) {
                const block = parent.parent;
                if (block.type === utils_1.AST_NODE_TYPES.Program ||
                    block.type === utils_1.AST_NODE_TYPES.BlockStatement) {
                    // parent is an expression statement in a block
                    const statementIndex = block.body.indexOf(parent);
                    const previousStatement = block.body[statementIndex - 1];
                    if (statementIndex > 0 &&
                        sourceCode.getLastToken(previousStatement).value !== ';') {
                        return true;
                    }
                }
            }
            if (!isLeftHandSide(node)) {
                return false;
            }
            node = parent;
        }
    }