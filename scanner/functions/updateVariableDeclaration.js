function updateVariableDeclaration(node, name, exclamationToken, type, initializer) {
                return node.name !== name || node.type !== type || node.exclamationToken !== exclamationToken || node.initializer !== initializer ? update(createVariableDeclaration(name, exclamationToken, type, initializer), node) : node;
            }