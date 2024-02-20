function forEachChildInContinueOrBreakStatement(node, cbNode, _cbNodes) {
            return visitNode2(cbNode, node.label);
        }