function chainBundle(context, transformSourceFile) {
            return transformSourceFileOrBundle;
            function transformSourceFileOrBundle(node) {
                return node.kind === 308 /* SourceFile */ ? transformSourceFile(node) : transformBundle(node);
            }
            function transformBundle(node) {
                return context.factory.createBundle(map(node.sourceFiles, transformSourceFile), node.prepends);
            }
        }