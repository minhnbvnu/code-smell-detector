function updateJsxClosingElement(node, tagName) {
                return node.tagName !== tagName ? update(createJsxClosingElement(tagName), node) : node;
            }