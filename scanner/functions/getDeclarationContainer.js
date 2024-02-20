function getDeclarationContainer(node) {
                return findAncestor(getRootDeclaration(node), (node2) => {
                    switch (node2.kind) {
                        case 257 /* VariableDeclaration */:
                        case 258 /* VariableDeclarationList */:
                        case 273 /* ImportSpecifier */:
                        case 272 /* NamedImports */:
                        case 271 /* NamespaceImport */:
                        case 270 /* ImportClause */:
                            return false;
                        default:
                            return true;
                    }
                }).parent;
            }