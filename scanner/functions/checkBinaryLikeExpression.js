function checkBinaryLikeExpression(left, operatorToken, right, checkMode, errorNode) {
                const operator = operatorToken.kind;
                if (operator === 63 /* EqualsToken */ && (left.kind === 207 /* ObjectLiteralExpression */ || left.kind === 206 /* ArrayLiteralExpression */)) {
                    return checkDestructuringAssignment(left, checkExpression(right, checkMode), checkMode, right.kind === 108 /* ThisKeyword */);
                }
                let leftType;
                if (isLogicalOrCoalescingBinaryOperator(operator)) {
                    leftType = checkTruthinessExpression(left, checkMode);
                }
                else {
                    leftType = checkExpression(left, checkMode);
                }
                const rightType = checkExpression(right, checkMode);
                return checkBinaryLikeExpressionWorker(left, operatorToken, right, leftType, rightType, errorNode);
            }