function updateFunctionTypeNode(node, typeParameters, parameters, type) {
                return node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? finishUpdateFunctionTypeNode(createFunctionTypeNode(typeParameters, parameters, type), node) : node;
            }