function getPreviousStatement(statement) {
        const parent = statement.parent;
        if (node_1.isBlockLike(parent)) {
            const index = parent.statements.indexOf(statement);
            if (index > 0)
                return parent.statements[index - 1];
        }
    }