function tryGetFunctionLikeBodyCompletionContainer(contextToken2) {
                if (contextToken2) {
                    let prev;
                    const container = findAncestor(contextToken2.parent, (node2) => {
                        if (isClassLike(node2)) {
                            return "quit";
                        }
                        if (isFunctionLikeDeclaration(node2) && prev === node2.body) {
                            return true;
                        }
                        prev = node2;
                        return false;
                    });
                    return container && container;
                }
            }