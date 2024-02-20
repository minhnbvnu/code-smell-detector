function visitNamespaceExports(node) {
                return factory2.updateNamespaceExport(node, Debug.checkDefined(visitNode(node.name, visitor, isIdentifier)));
            }