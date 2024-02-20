function isNonVariableTopLevelDeclaration(node) {
            switch (node.kind) {
                case 259 /* FunctionDeclaration */:
                case 260 /* ClassDeclaration */:
                case 264 /* ModuleDeclaration */:
                case 263 /* EnumDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                case 261 /* InterfaceDeclaration */:
                case 268 /* ImportEqualsDeclaration */:
                    return true;
                default:
                    return false;
            }
        }