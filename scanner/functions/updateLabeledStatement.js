function updateLabeledStatement(node, label, statement) {
                return node.label !== label || node.statement !== statement ? update(createLabeledStatement(label, statement), node) : node;
            }