function updateTryStatement(node, tryBlock, catchClause, finallyBlock) {
                return node.tryBlock !== tryBlock || node.catchClause !== catchClause || node.finallyBlock !== finallyBlock ? update(createTryStatement(tryBlock, catchClause, finallyBlock), node) : node;
            }