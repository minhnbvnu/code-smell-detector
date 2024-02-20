function getAdjustedLocationForHeritageClause(node) {
            if (node.types.length === 1) {
                return node.types[0].expression;
            }
        }