function transformRoot(node) {
                return node && (!isSourceFile(node) || !node.isDeclarationFile) ? transformation(node) : node;
            }