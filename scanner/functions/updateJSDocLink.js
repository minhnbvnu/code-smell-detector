function updateJSDocLink(node, name, text) {
                return node.name !== name ? update(createJSDocLink(name, text), node) : node;
            }