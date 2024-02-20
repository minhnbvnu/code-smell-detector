function checkReferenceExpression(expr, invalidReferenceMessage, invalidOptionalChainMessage) {
                const node = skipOuterExpressions(expr, 6 /* Assertions */ | 1 /* Parentheses */);
                if (node.kind !== 79 /* Identifier */ && !isAccessExpression(node)) {
                    error(expr, invalidReferenceMessage);
                    return false;
                }
                if (node.flags & 32 /* OptionalChain */) {
                    error(expr, invalidOptionalChainMessage);
                    return false;
                }
                return true;
            }