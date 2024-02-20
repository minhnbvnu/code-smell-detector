function shouldEmitWhitespaceBeforeOperand(node) {
                const operand = node.operand;
                return operand.kind === 221 /* PrefixUnaryExpression */ && (node.operator === 39 /* PlusToken */ && (operand.operator === 39 /* PlusToken */ || operand.operator === 45 /* PlusPlusToken */) || node.operator === 40 /* MinusToken */ && (operand.operator === 40 /* MinusToken */ || operand.operator === 46 /* MinusMinusToken */));
            }