function updateTypeAliasDeclaration(node, modifiers, name, typeParameters, type) {
                return node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.type !== type ? update(createTypeAliasDeclaration(modifiers, name, typeParameters, type), node) : node;
            }