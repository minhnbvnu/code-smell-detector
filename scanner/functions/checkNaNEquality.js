function checkNaNEquality(errorNode2, operator2, left2, right2) {
                    const isLeftNaN = isGlobalNaN(skipParentheses(left2));
                    const isRightNaN = isGlobalNaN(skipParentheses(right2));
                    if (isLeftNaN || isRightNaN) {
                        const err = error(errorNode2, Diagnostics.This_condition_will_always_return_0, tokenToString(operator2 === 36 /* EqualsEqualsEqualsToken */ || operator2 === 34 /* EqualsEqualsToken */ ? 95 /* FalseKeyword */ : 110 /* TrueKeyword */));
                        if (isLeftNaN && isRightNaN)
                            return;
                        const operatorString = operator2 === 37 /* ExclamationEqualsEqualsToken */ || operator2 === 35 /* ExclamationEqualsToken */ ? tokenToString(53 /* ExclamationToken */) : "";
                        const location = isLeftNaN ? right2 : left2;
                        const expression = skipParentheses(location);
                        addRelatedInfo(err, createDiagnosticForNode(location, Diagnostics.Did_you_mean_0, `${operatorString}Number.isNaN(${isEntityNameExpression(expression) ? entityNameToString(expression) : "..."})`));
                    }
                }