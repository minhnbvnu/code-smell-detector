function updateForStatement(node, initializer, condition, incrementor, statement) {
                return node.initializer !== initializer || node.condition !== condition || node.incrementor !== incrementor || node.statement !== statement ? update(createForStatement(initializer, condition, incrementor, statement), node) : node;
            }