function isInConstructorArgumentInitializer(node, constructorDecl) {
                return !!findAncestor(node, (n) => isFunctionLikeDeclaration(n) ? "quit" : n.kind === 166 /* Parameter */ && n.parent === constructorDecl);
            }