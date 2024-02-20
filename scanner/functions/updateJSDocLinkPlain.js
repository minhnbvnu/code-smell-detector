function updateJSDocLinkPlain(node, name, text) {
                return node.name !== name ? update(createJSDocLinkPlain(name, text), node) : node;
            }