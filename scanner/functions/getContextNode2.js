function getContextNode2(node) {
                if (isJsxAttributes(node) && !isJsxSelfClosingElement(node.parent)) {
                    return node.parent.parent;
                }
                return node;
            }