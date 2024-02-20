function updateJSDocNameReference(node, name) {
                return node.name !== name ? update(createJSDocNameReference(name), node) : node;
            }