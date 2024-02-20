function forEachChildInClassDeclarationOrExpression(node, cbNode, cbNodes) {
            return visitNodes(cbNode, cbNodes, node.modifiers) || visitNode2(cbNode, node.name) || visitNodes(cbNode, cbNodes, node.typeParameters) || visitNodes(cbNode, cbNodes, node.heritageClauses) || visitNodes(cbNode, cbNodes, node.members);
        }