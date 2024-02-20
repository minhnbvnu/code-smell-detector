function expandPreOrPostfixIncrementOrDecrementExpression(factory2, node, expression, recordTempVariable, resultVariable) {
            const operator = node.operator;
            Debug.assert(operator === 45 /* PlusPlusToken */ || operator === 46 /* MinusMinusToken */, "Expected 'node' to be a pre- or post-increment or pre- or post-decrement expression");
            const temp = factory2.createTempVariable(recordTempVariable);
            expression = factory2.createAssignment(temp, expression);
            setTextRange(expression, node.operand);
            let operation = isPrefixUnaryExpression(node) ? factory2.createPrefixUnaryExpression(operator, temp) : factory2.createPostfixUnaryExpression(temp, operator);
            setTextRange(operation, node);
            if (resultVariable) {
                operation = factory2.createAssignment(resultVariable, operation);
                setTextRange(operation, node);
            }
            expression = factory2.createComma(expression, operation);
            setTextRange(expression, node);
            if (isPostfixUnaryExpression(node)) {
                expression = factory2.createComma(expression, temp);
                setTextRange(expression, node);
            }
            return expression;
        }