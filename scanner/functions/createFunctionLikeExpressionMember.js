function createFunctionLikeExpressionMember(members2, expression, name) {
                        if (isFunctionExpression(expression))
                            return createFunctionExpressionMember(members2, expression, name);
                        else
                            return createArrowFunctionExpressionMember(members2, expression, name);
                    }