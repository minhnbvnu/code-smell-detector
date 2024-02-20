function bothHelper(condExpr2, body2) {
                    condExpr2 = skipParentheses(condExpr2);
                    helper(condExpr2, body2);
                    while (isBinaryExpression(condExpr2) && (condExpr2.operatorToken.kind === 56 /* BarBarToken */ || condExpr2.operatorToken.kind === 60 /* QuestionQuestionToken */)) {
                        condExpr2 = skipParentheses(condExpr2.left);
                        helper(condExpr2, body2);
                    }
                }