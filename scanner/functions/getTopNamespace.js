function getTopNamespace(namespaceDeclaration) {
                    while (namespaceDeclaration.flags & 4 /* NestedNamespace */) {
                        namespaceDeclaration = namespaceDeclaration.parent;
                    }
                    return namespaceDeclaration;
                }