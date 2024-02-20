function updateJSDocSignature(node, typeParameters, parameters, type) {
                return node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? update(createJSDocSignature(typeParameters, parameters, type), node) : node;
            }