function checkExpressionWithTypeArguments(node) {
                checkGrammarExpressionWithTypeArguments(node);
                forEach(node.typeArguments, checkSourceElement);
                const exprType = node.kind === 230 /* ExpressionWithTypeArguments */ ? checkExpression(node.expression) : isThisIdentifier(node.exprName) ? checkThisExpression(node.exprName) : checkExpression(node.exprName);
                return getInstantiationExpressionType(exprType, node);
            }