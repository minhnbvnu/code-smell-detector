function updateTypeParameterDeclaration(node, modifiers, name, constraint, defaultType) {
                return node.modifiers !== modifiers || node.name !== name || node.constraint !== constraint || node.default !== defaultType ? update(createTypeParameterDeclaration(modifiers, name, constraint, defaultType), node) : node;
            }