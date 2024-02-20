function isSelfReferenceLocation(node) {
                switch (node.kind) {
                    case 259 /* FunctionDeclaration */:
                    case 260 /* ClassDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 263 /* EnumDeclaration */:
                    case 262 /* TypeAliasDeclaration */:
                    case 264 /* ModuleDeclaration */:
                        return true;
                    default:
                        return false;
                }
            }