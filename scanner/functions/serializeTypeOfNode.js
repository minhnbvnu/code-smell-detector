function serializeTypeOfNode(node) {
                switch (node.kind) {
                    case 169 /* PropertyDeclaration */:
                    case 166 /* Parameter */:
                        return serializeTypeNode(node.type);
                    case 175 /* SetAccessor */:
                    case 174 /* GetAccessor */:
                        return serializeTypeNode(getAccessorTypeNode(node));
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                    case 171 /* MethodDeclaration */:
                        return factory.createIdentifier("Function");
                    default:
                        return factory.createVoidZero();
                }
            }