function transformBundle(node) {
                return context.factory.createBundle(map(node.sourceFiles, transformSourceFile), node.prepends);
            }