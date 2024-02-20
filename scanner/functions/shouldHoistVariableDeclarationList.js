function shouldHoistVariableDeclarationList(node) {
                return (getEmitFlags(node) & 4194304 /* NoHoisting */) === 0 && (enclosingBlockScopedContainer.kind === 308 /* SourceFile */ || (getOriginalNode(node).flags & 3 /* BlockScoped */) === 0);
            }