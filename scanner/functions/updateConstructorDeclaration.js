function updateConstructorDeclaration(node, modifiers, parameters, body) {
                return node.modifiers !== modifiers || node.parameters !== parameters || node.body !== body ? finishUpdateConstructorDeclaration(createConstructorDeclaration(modifiers, parameters, body), node) : node;
            }