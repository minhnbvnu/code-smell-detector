function forEachChildInNamedImportsOrExports(node, cbNode, cbNodes) {
            return visitNodes(cbNode, cbNodes, node.elements);
        }