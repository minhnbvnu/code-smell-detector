function updateJsxAttribute(node, name, initializer) {
                return node.name !== name || node.initializer !== initializer ? update(createJsxAttribute(name, initializer), node) : node;
            }