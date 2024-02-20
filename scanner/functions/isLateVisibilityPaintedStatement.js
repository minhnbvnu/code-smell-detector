function isLateVisibilityPaintedStatement(node) {
            switch (node.kind) {
                case 269 /* ImportDeclaration */:
                case 268 /* ImportEqualsDeclaration */:
                case 240 /* VariableStatement */:
                case 260 /* ClassDeclaration */:
                case 259 /* FunctionDeclaration */:
                case 264 /* ModuleDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                case 261 /* InterfaceDeclaration */:
                case 263 /* EnumDeclaration */:
                    return true;
                default:
                    return false;
            }
        }