function isInStatementList(node) {
        return astUtils.STATEMENT_LIST_PARENTS.has(node.parent.type);
    }