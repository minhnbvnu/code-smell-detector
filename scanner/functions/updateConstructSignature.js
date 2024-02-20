function updateConstructSignature(node, typeParameters, parameters, type) {
                return node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? finishUpdateBaseSignatureDeclaration(createConstructSignature(typeParameters, parameters, type), node) : node;
            }