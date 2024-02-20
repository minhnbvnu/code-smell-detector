function updateNamespaceExportDeclaration(node, name) {
                return node.name !== name ? finishUpdateNamespaceExportDeclaration(createNamespaceExportDeclaration(name), node) : node;
            }