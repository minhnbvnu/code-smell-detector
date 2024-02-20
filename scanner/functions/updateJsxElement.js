function updateJsxElement(node, openingElement, children, closingElement) {
                return node.openingElement !== openingElement || node.children !== children || node.closingElement !== closingElement ? update(createJsxElement(openingElement, children, closingElement), node) : node;
            }