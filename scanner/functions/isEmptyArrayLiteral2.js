function isEmptyArrayLiteral2(node) {
                const expr = skipParentheses(node, 
                /*excludeJSDocTypeAssertions*/
                true);
                return expr.kind === 206 /* ArrayLiteralExpression */ && expr.elements.length === 0;
            }