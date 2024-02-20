function getNextStatement(statement) {
        const parent = statement.parent;
        if (node_1.isBlockLike(parent)) {
            const index = parent.statements.indexOf(statement);
            if (index < parent.statements.length)
                return parent.statements[index + 1];
        }
    }