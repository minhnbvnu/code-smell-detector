function updateCallSignature(node, typeParameters, parameters, type) {
                return node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? finishUpdateBaseSignatureDeclaration(createCallSignature(typeParameters, parameters, type), node) : node;
            }