function updateModuleDeclaration(node, modifiers, name, body) {
                return node.modifiers !== modifiers || node.name !== name || node.body !== body ? update(createModuleDeclaration(modifiers, name, body, node.flags), node) : node;
            }