function isNegatedBinaryExpression(test) {
                return test.type === "BinaryExpression" &&
                    (test.operator === "!=" || test.operator === "!==");
            }