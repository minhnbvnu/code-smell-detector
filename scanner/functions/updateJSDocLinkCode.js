function updateJSDocLinkCode(node, name, text) {
                return node.name !== name ? update(createJSDocLinkCode(name, text), node) : node;
            }