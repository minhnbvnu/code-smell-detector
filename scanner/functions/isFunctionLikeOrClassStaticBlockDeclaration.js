function isFunctionLikeOrClassStaticBlockDeclaration(node) {
            return !!node && (isFunctionLikeKind(node.kind) || isClassStaticBlockDeclaration(node));
        }