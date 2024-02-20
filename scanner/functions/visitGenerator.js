function visitGenerator(node) {
                switch (node.kind) {
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 215 /* FunctionExpression */:
                        return visitFunctionExpression(node);
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }