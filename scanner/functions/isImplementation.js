function isImplementation(node) {
                        return !!(node.flags & 16777216 /* Ambient */) ? !(isInterfaceDeclaration(node) || isTypeAliasDeclaration(node)) : isVariableLike(node) ? hasInitializer(node) : isFunctionLikeDeclaration(node) ? !!node.body : isClassLike(node) || isModuleOrEnumDeclaration(node);
                    }