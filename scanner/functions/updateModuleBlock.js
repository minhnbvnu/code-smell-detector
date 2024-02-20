function updateModuleBlock(node, statements) {
                return node.statements !== statements ? update(createModuleBlock(statements), node) : node;
            }