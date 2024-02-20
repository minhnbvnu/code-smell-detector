function getContainingFunctionOrClassStaticBlock(node) {
            return findAncestor(node.parent, isFunctionLikeOrClassStaticBlockDeclaration);
        }