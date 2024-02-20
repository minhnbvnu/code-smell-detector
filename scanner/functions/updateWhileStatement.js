function updateWhileStatement(node, expression, statement) {
                return node.expression !== expression || node.statement !== statement ? update(createWhileStatement(expression, statement), node) : node;
            }