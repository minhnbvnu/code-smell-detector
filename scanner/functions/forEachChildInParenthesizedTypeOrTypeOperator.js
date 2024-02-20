function forEachChildInParenthesizedTypeOrTypeOperator(node, cbNode, _cbNodes) {
            return visitNode2(cbNode, node.type);
        }