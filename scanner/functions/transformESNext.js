function transformESNext(context) {
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitor(node) {
                if ((node.transformFlags & 4 /* ContainsESNext */) === 0) {
                    return node;
                }
                switch (node.kind) {
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
        }