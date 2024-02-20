function updateNamespaceImport(node, name) {
                return node.name !== name ? update(createNamespaceImport(name), node) : node;
            }