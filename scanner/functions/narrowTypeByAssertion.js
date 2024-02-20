function narrowTypeByAssertion(type, expr) {
                    const node = skipParentheses(expr, 
                    /*excludeJSDocTypeAssertions*/
                    true);
                    if (node.kind === 95 /* FalseKeyword */) {
                        return unreachableNeverType;
                    }
                    if (node.kind === 223 /* BinaryExpression */) {
                        if (node.operatorToken.kind === 55 /* AmpersandAmpersandToken */) {
                            return narrowTypeByAssertion(narrowTypeByAssertion(type, node.left), node.right);
                        }
                        if (node.operatorToken.kind === 56 /* BarBarToken */) {
                            return getUnionType([narrowTypeByAssertion(type, node.left), narrowTypeByAssertion(type, node.right)]);
                        }
                    }
                    return narrowType(type, node, 
                    /*assumeTrue*/
                    true);
                }