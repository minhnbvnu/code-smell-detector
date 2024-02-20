function updateContinueStatement(node, label) {
                return node.label !== label ? update(createContinueStatement(label), node) : node;
            }