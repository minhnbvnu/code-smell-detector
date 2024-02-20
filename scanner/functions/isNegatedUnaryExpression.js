function isNegatedUnaryExpression(test) {
                return test.type === "UnaryExpression" && test.operator === "!";
            }