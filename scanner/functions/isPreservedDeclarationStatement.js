function isPreservedDeclarationStatement(node) {
            switch (node.kind) {
                case 259 /* FunctionDeclaration */:
                case 264 /* ModuleDeclaration */:
                case 268 /* ImportEqualsDeclaration */:
                case 261 /* InterfaceDeclaration */:
                case 260 /* ClassDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                case 263 /* EnumDeclaration */:
                case 240 /* VariableStatement */:
                case 269 /* ImportDeclaration */:
                case 275 /* ExportDeclaration */:
                case 274 /* ExportAssignment */:
                    return true;
            }
            return false;
        }