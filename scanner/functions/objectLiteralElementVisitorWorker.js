function objectLiteralElementVisitorWorker(node, parent2) {
                switch (node.kind) {
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                    case 301 /* SpreadAssignment */:
                        return visitor(node);
                    case 174 /* GetAccessor */:
                        return visitGetAccessor(node, parent2);
                    case 175 /* SetAccessor */:
                        return visitSetAccessor(node, parent2);
                    case 171 /* MethodDeclaration */:
                        return visitMethodDeclaration(node, parent2);
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }