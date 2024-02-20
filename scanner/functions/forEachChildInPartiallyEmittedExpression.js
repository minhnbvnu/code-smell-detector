function forEachChildInPartiallyEmittedExpression(node, cbNode, _cbNodes) {
            return visitNode2(cbNode, node.expression);
        }