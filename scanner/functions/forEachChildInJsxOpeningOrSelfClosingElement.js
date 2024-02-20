function forEachChildInJsxOpeningOrSelfClosingElement(node, cbNode, cbNodes) {
            return visitNode2(cbNode, node.tagName) || visitNodes(cbNode, cbNodes, node.typeArguments) || visitNode2(cbNode, node.attributes);
        }