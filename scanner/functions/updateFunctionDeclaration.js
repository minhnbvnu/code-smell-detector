function updateFunctionDeclaration(node, modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
                return node.modifiers !== modifiers || node.asteriskToken !== asteriskToken || node.name !== name || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type || node.body !== body ? finishUpdateFunctionDeclaration(createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body), node) : node;
            }