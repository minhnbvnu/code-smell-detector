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