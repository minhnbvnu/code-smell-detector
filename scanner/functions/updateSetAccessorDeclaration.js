function updateSetAccessorDeclaration(node, modifiers, name, parameters, body) {
                return node.modifiers !== modifiers || node.name !== name || node.parameters !== parameters || node.body !== body ? finishUpdateSetAccessorDeclaration(createSetAccessorDeclaration(modifiers, name, parameters, body), node) : node;
            }