function updateEnumDeclaration(node, modifiers, name, members) {
                return node.modifiers !== modifiers || node.name !== name || node.members !== members ? update(createEnumDeclaration(modifiers, name, members), node) : node;
            }