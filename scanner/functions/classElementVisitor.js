function classElementVisitor(node) {
                switch (node.kind) {
                    case 173 /* Constructor */:
                        return visitConstructorDeclaration(node);
                    case 171 /* MethodDeclaration */:
                        return visitMethodDeclaration(node);
                    case 174 /* GetAccessor */:
                        return visitGetAccessorDeclaration(node);
                    case 175 /* SetAccessor */:
                        return visitSetAccessorDeclaration(node);
                    case 169 /* PropertyDeclaration */:
                        return visitPropertyDeclaration(node);
                    case 172 /* ClassStaticBlockDeclaration */:
                        return visitClassStaticBlockDeclaration(node);
                    default:
                        return visitor(node);
                }
            }