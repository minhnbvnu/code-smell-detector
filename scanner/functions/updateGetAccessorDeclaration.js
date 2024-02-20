function updateGetAccessorDeclaration(node, modifiers, name, parameters, type, body) {
                return node.modifiers !== modifiers || node.name !== name || node.parameters !== parameters || node.type !== type || node.body !== body ? finishUpdateGetAccessorDeclaration(createGetAccessorDeclaration(modifiers, name, parameters, type, body), node) : node;
            }