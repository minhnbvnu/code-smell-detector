function isHintableDeclaration(node) {
                if ((isParameterDeclaration(node) || isVariableDeclaration(node) && isVarConst(node)) && node.initializer) {
                    const initializer = skipParentheses(node.initializer);
                    return !(isHintableLiteral(initializer) || isNewExpression(initializer) || isObjectLiteralExpression(initializer) || isAssertionExpression(initializer));
                }
                return true;
            }