function updateJsxAttributes(node, properties) {
                return node.properties !== properties ? update(createJsxAttributes(properties), node) : node;
            }