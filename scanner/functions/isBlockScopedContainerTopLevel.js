function isBlockScopedContainerTopLevel(node) {
            return node.kind === 308 /* SourceFile */ || node.kind === 264 /* ModuleDeclaration */ || isFunctionLikeOrClassStaticBlockDeclaration(node);
        }