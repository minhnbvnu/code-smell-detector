function equateSerializedTypeNodes(left, right) {
                return (
                // temp vars used in fallback
                isGeneratedIdentifier(left) ? isGeneratedIdentifier(right) : (
                // entity names
                isIdentifier(left) ? isIdentifier(right) && left.escapedText === right.escapedText : isPropertyAccessExpression(left) ? isPropertyAccessExpression(right) && equateSerializedTypeNodes(left.expression, right.expression) && equateSerializedTypeNodes(left.name, right.name) : (
                // `void 0`
                isVoidExpression(left) ? isVoidExpression(right) && isNumericLiteral(left.expression) && left.expression.text === "0" && isNumericLiteral(right.expression) && right.expression.text === "0" : (
                // `"undefined"` or `"function"` in `typeof` checks
                isStringLiteral(left) ? isStringLiteral(right) && left.text === right.text : (
                // used in `typeof` checks for fallback
                isTypeOfExpression(left) ? isTypeOfExpression(right) && equateSerializedTypeNodes(left.expression, right.expression) : (
                // parens in `typeof` checks with temps
                isParenthesizedExpression(left) ? isParenthesizedExpression(right) && equateSerializedTypeNodes(left.expression, right.expression) : (
                // conditionals used in fallback
                isConditionalExpression(left) ? isConditionalExpression(right) && equateSerializedTypeNodes(left.condition, right.condition) && equateSerializedTypeNodes(left.whenTrue, right.whenTrue) && equateSerializedTypeNodes(left.whenFalse, right.whenFalse) : (
                // logical binary and assignments used in fallback
                isBinaryExpression(left) ? isBinaryExpression(right) && left.operatorToken.kind === right.operatorToken.kind && equateSerializedTypeNodes(left.left, right.left) && equateSerializedTypeNodes(left.right, right.right) : false))))))));
            }