function isTypeOnlyImportDeclaration(node) {
            switch (node.kind) {
                case 273 /* ImportSpecifier */:
                    return node.isTypeOnly || node.parent.parent.isTypeOnly;
                case 271 /* NamespaceImport */:
                    return node.parent.isTypeOnly;
                case 270 /* ImportClause */:
                case 268 /* ImportEqualsDeclaration */:
                    return node.isTypeOnly;
            }
            return false;
        }