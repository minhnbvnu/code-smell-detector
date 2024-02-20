function isSignedNumericLiteral(node) {
            return isPrefixUnaryExpression(node) && (node.operator === 39 /* PlusToken */ || node.operator === 40 /* MinusToken */) && isNumericLiteral(node.operand);
        }