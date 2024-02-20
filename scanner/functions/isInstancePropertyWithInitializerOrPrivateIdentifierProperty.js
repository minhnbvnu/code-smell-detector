function isInstancePropertyWithInitializerOrPrivateIdentifierProperty(n) {
                    if (isPrivateIdentifierClassElementDeclaration(n)) {
                        return true;
                    }
                    return n.kind === 169 /* PropertyDeclaration */ && !isStatic(n) && !!n.initializer;
                }