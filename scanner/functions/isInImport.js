function isInImport(decl) {
            switch (decl.kind) {
                case 268 /* ImportEqualsDeclaration */:
                case 273 /* ImportSpecifier */:
                case 270 /* ImportClause */:
                case 271 /* NamespaceImport */:
                    return true;
                case 257 /* VariableDeclaration */:
                    return isVariableDeclarationInImport(decl);
                case 205 /* BindingElement */:
                    return isVariableDeclaration(decl.parent.parent) && isVariableDeclarationInImport(decl.parent.parent);
                default:
                    return false;
            }
        }