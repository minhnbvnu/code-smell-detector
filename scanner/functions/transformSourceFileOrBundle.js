function transformSourceFileOrBundle(node) {
                return node.kind === 308 /* SourceFile */ ? transformSourceFile(node) : transformBundle(node);
            }