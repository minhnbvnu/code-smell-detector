function isFalseExpression(expr) {
                const node = skipParentheses(expr, 
                /*excludeJSDocTypeAssertions*/
                true);
                return node.kind === 95 /* FalseKeyword */ || node.kind === 223 /* BinaryExpression */ && (node.operatorToken.kind === 55 /* AmpersandAmpersandToken */ && (isFalseExpression(node.left) || isFalseExpression(node.right)) || node.operatorToken.kind === 56 /* BarBarToken */ && isFalseExpression(node.left) && isFalseExpression(node.right));
            }