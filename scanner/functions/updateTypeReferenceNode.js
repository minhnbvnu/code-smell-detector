function updateTypeReferenceNode(node, typeName, typeArguments) {
                return node.typeName !== typeName || node.typeArguments !== typeArguments ? update(createTypeReferenceNode(typeName, typeArguments), node) : node;
            }