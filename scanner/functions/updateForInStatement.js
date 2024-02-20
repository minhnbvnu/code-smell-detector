function updateForInStatement(node, initializer, expression, statement) {
                return node.initializer !== initializer || node.expression !== expression || node.statement !== statement ? update(createForInStatement(initializer, expression, statement), node) : node;
            }