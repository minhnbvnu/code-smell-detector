function createLabel(label) {
                if (label !== void 0 && label > 0) {
                    if (labelExpressions === void 0) {
                        labelExpressions = [];
                    }
                    const expression = factory2.createNumericLiteral(-1);
                    if (labelExpressions[label] === void 0) {
                        labelExpressions[label] = [expression];
                    }
                    else {
                        labelExpressions[label].push(expression);
                    }
                    return expression;
                }
                return factory2.createOmittedExpression();
            }