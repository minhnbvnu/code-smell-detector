function forEachChildInJSDocTypeLikeTag(node, cbNode, cbNodes) {
            return visitNode2(cbNode, node.tagName) || visitNode2(cbNode, node.typeExpression) || (typeof node.comment === "string" ? void 0 : visitNodes(cbNode, cbNodes, node.comment));
        }