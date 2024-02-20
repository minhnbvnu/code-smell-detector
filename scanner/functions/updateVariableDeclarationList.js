function updateVariableDeclarationList(node, declarations) {
                return node.declarations !== declarations ? update(createVariableDeclarationList(declarations, node.flags), node) : node;
            }