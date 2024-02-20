function visitJavaScriptContainingYield(node) {
                switch (node.kind) {
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node);
                    case 357 /* CommaListExpression */:
                        return visitCommaListExpression(node);
                    case 224 /* ConditionalExpression */:
                        return visitConditionalExpression(node);
                    case 226 /* YieldExpression */:
                        return visitYieldExpression(node);
                    case 206 /* ArrayLiteralExpression */:
                        return visitArrayLiteralExpression(node);
                    case 207 /* ObjectLiteralExpression */:
                        return visitObjectLiteralExpression(node);
                    case 209 /* ElementAccessExpression */:
                        return visitElementAccessExpression(node);
                    case 210 /* CallExpression */:
                        return visitCallExpression(node);
                    case 211 /* NewExpression */:
                        return visitNewExpression(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }