function updateJsxSpreadAttribute(node, expression) {
                return node.expression !== expression ? update(createJsxSpreadAttribute(expression), node) : node;
            }