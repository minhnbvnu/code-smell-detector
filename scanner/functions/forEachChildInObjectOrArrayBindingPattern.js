function forEachChildInObjectOrArrayBindingPattern(node, cbNode, cbNodes) {
            return visitNodes(cbNode, cbNodes, node.elements);
        }