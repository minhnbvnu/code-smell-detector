function forEachChildInBlock(node, cbNode, cbNodes) {
            return visitNodes(cbNode, cbNodes, node.statements);
        }