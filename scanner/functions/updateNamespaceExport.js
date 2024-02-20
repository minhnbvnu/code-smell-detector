function updateNamespaceExport(node, name) {
                return node.name !== name ? update(createNamespaceExport(name), node) : node;
            }