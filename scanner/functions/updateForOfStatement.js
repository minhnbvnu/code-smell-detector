function updateForOfStatement(node, awaitModifier, initializer, expression, statement) {
                return node.awaitModifier !== awaitModifier || node.initializer !== initializer || node.expression !== expression || node.statement !== statement ? update(createForOfStatement(awaitModifier, initializer, expression, statement), node) : node;
            }