function isDeclarationAndNotVisible(node) {
                node = getParseTreeNode(node);
                switch (node.kind) {
                    case 259 /* FunctionDeclaration */:
                    case 264 /* ModuleDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 260 /* ClassDeclaration */:
                    case 262 /* TypeAliasDeclaration */:
                    case 263 /* EnumDeclaration */:
                        return !resolver.isDeclarationVisible(node);
                    case 257 /* VariableDeclaration */:
                        return !getBindingNameVisible(node);
                    case 268 /* ImportEqualsDeclaration */:
                    case 269 /* ImportDeclaration */:
                    case 275 /* ExportDeclaration */:
                    case 274 /* ExportAssignment */:
                        return false;
                    case 172 /* ClassStaticBlockDeclaration */:
                        return true;
                }
                return false;
            }