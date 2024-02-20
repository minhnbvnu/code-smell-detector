function forEachChildInJSDocTag(node, cbNode, cbNodes) {
            return visitNode2(cbNode, node.tagName) || (typeof node.comment === "string" ? void 0 : visitNodes(cbNode, cbNodes, node.comment));
        }