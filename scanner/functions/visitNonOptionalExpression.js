function visitNonOptionalExpression(node, captureThisArg, isDelete) {
                switch (node.kind) {
                    case 214 /* ParenthesizedExpression */:
                        return visitNonOptionalParenthesizedExpression(node, captureThisArg, isDelete);
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        return visitNonOptionalPropertyOrElementAccessExpression(node, captureThisArg, isDelete);
                    case 210 /* CallExpression */:
                        return visitNonOptionalCallExpression(node, captureThisArg);
                    default:
                        return visitNode(node, visitor, isExpression);
                }
            }