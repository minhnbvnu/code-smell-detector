function tryReparseOptionalChain(node) {
                        if (node.flags & 32 /* OptionalChain */) {
                            return true;
                        }
                        if (isNonNullExpression(node)) {
                            let expr = node.expression;
                            while (isNonNullExpression(expr) && !(expr.flags & 32 /* OptionalChain */)) {
                                expr = expr.expression;
                            }
                            if (expr.flags & 32 /* OptionalChain */) {
                                while (isNonNullExpression(node)) {
                                    node.flags |= 32 /* OptionalChain */;
                                    node = node.expression;
                                }
                                return true;
                            }
                        }
                        return false;
                    }