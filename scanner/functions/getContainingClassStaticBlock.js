function getContainingClassStaticBlock(node) {
            return findAncestor(node.parent, (n) => {
                if (isClassLike(n) || isFunctionLike(n)) {
                    return "quit";
                }
                return isClassStaticBlockDeclaration(n);
            });
        }