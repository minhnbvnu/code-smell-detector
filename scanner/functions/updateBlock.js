function updateBlock(node, statements) {
                return node.statements !== statements ? update(createBlock(statements, node.multiLine), node) : node;
            }