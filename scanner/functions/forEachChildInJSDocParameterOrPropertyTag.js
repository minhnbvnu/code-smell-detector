function forEachChildInJSDocParameterOrPropertyTag(node, cbNode, cbNodes) {
            return visitNode2(cbNode, node.tagName) || (node.isNameFirst ? visitNode2(cbNode, node.name) || visitNode2(cbNode, node.typeExpression) : visitNode2(cbNode, node.typeExpression) || visitNode2(cbNode, node.name)) || (typeof node.comment === "string" ? void 0 : visitNodes(cbNode, cbNodes, node.comment));
        }