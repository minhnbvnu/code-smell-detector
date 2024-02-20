function updateConstructorTypeNode1(node, modifiers, typeParameters, parameters, type) {
                return node.modifiers !== modifiers || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? finishUpdateBaseSignatureDeclaration(createConstructorTypeNode(modifiers, typeParameters, parameters, type), node) : node;
            }