function isImplementationExpression(node) {
                        switch (node.kind) {
                            case 214 /* ParenthesizedExpression */:
                                return isImplementationExpression(node.expression);
                            case 216 /* ArrowFunction */:
                            case 215 /* FunctionExpression */:
                            case 207 /* ObjectLiteralExpression */:
                            case 228 /* ClassExpression */:
                            case 206 /* ArrayLiteralExpression */:
                                return true;
                            default:
                                return false;
                        }
                    }