function updateClassDeclaration(node, modifiers, name, typeParameters, heritageClauses, members) {
                return node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.heritageClauses !== heritageClauses || node.members !== members ? update(createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members), node) : node;
            }