function isAnyImportSyntax(node) {
            switch (node.kind) {
                case 269 /* ImportDeclaration */:
                case 268 /* ImportEqualsDeclaration */:
                    return true;
                default:
                    return false;
            }
        }