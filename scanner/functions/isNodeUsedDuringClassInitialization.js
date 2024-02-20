function isNodeUsedDuringClassInitialization(node) {
                return !!findAncestor(node, (element) => {
                    if (isConstructorDeclaration(element) && nodeIsPresent(element.body) || isPropertyDeclaration(element)) {
                        return true;
                    }
                    else if (isClassLike(element) || isFunctionLikeDeclaration(element)) {
                        return "quit";
                    }
                    return false;
                });
            }