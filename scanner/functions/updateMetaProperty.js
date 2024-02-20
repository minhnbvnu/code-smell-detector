function updateMetaProperty(node, name) {
                return node.name !== name ? update(createMetaProperty(node.keywordToken, name), node) : node;
            }