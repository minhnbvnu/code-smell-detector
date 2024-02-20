function getAnyImportSyntax(node) {
                switch (node.kind) {
                    case 268 /* ImportEqualsDeclaration */:
                        return node;
                    case 270 /* ImportClause */:
                        return node.parent;
                    case 271 /* NamespaceImport */:
                        return node.parent.parent;
                    case 273 /* ImportSpecifier */:
                        return node.parent.parent.parent;
                    default:
                        return void 0;
                }
            }