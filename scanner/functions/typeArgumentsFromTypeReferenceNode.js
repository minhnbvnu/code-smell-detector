function typeArgumentsFromTypeReferenceNode(node) {
                return map(node.typeArguments, getTypeFromTypeNode);
            }