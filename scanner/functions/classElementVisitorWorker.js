function classElementVisitorWorker(node, parent2) {
                switch (node.kind) {
                    case 173 /* Constructor */:
                        return visitConstructor(node);
                    case 169 /* PropertyDeclaration */:
                        return visitPropertyDeclaration(node, parent2);
                    case 174 /* GetAccessor */:
                        return visitGetAccessor(node, parent2);
                    case 175 /* SetAccessor */:
                        return visitSetAccessor(node, parent2);
                    case 171 /* MethodDeclaration */:
                        return visitMethodDeclaration(node, parent2);
                    case 172 /* ClassStaticBlockDeclaration */:
                        return visitEachChild(node, visitor, context);
                    case 237 /* SemicolonClassElement */:
                        return node;
                    case 178 /* IndexSignature */:
                        return;
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }