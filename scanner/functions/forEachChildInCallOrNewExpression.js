function forEachChildInCallOrNewExpression(node, cbNode, cbNodes) {
            return visitNode2(cbNode, node.expression) || // TODO: should we separate these branches out?
                visitNode2(cbNode, node.questionDotToken) || visitNodes(cbNode, cbNodes, node.typeArguments) || visitNodes(cbNode, cbNodes, node.arguments);
        }