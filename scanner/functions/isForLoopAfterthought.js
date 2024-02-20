function isForLoopAfterthought(node) {
        const parent = node.parent;
        if (parent.type === "SequenceExpression") {
            return isForLoopAfterthought(parent);
        }
        return isForStatementUpdate(node);
    }