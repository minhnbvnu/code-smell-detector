function getTypeFromRestTypeNode(node) {
                return getTypeFromTypeNode(getArrayElementTypeNode(node.type) || node.type);
            }