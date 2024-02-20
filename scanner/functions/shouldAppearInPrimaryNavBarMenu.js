function shouldAppearInPrimaryNavBarMenu(item) {
                if (item.children) {
                    return true;
                }
                switch (navigationBarNodeKind(item)) {
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                    case 263 /* EnumDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 264 /* ModuleDeclaration */:
                    case 308 /* SourceFile */:
                    case 262 /* TypeAliasDeclaration */:
                    case 349 /* JSDocTypedefTag */:
                    case 341 /* JSDocCallbackTag */:
                        return true;
                    case 216 /* ArrowFunction */:
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                        return isTopLevelFunctionDeclaration(item);
                    default:
                        return false;
                }
                function isTopLevelFunctionDeclaration(item2) {
                    if (!item2.node.body) {
                        return false;
                    }
                    switch (navigationBarNodeKind(item2.parent)) {
                        case 265 /* ModuleBlock */:
                        case 308 /* SourceFile */:
                        case 171 /* MethodDeclaration */:
                        case 173 /* Constructor */:
                            return true;
                        default:
                            return false;
                    }
                }
            }