function traverseWithoutCrossingFunction(node, cb) {
                        cb(node);
                        if (!isFunctionLike(node) && !isClassLike(node) && !isInterfaceDeclaration(node) && !isModuleDeclaration(node) && !isTypeAliasDeclaration(node) && !isTypeNode(node)) {
                            forEachChild(node, (child) => traverseWithoutCrossingFunction(child, cb));
                        }
                    }