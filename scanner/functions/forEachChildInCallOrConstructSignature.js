function forEachChildInCallOrConstructSignature(node, cbNode, cbNodes) {
            return visitNodes(cbNode, cbNodes, node.typeParameters) || visitNodes(cbNode, cbNodes, node.parameters) || visitNode2(cbNode, node.type);
        }