function updateJSDocText(node, text) {
                return node.text !== text ? update(createJSDocText(text), node) : node;
            }