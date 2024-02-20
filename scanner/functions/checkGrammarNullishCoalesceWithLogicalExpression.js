function checkGrammarNullishCoalesceWithLogicalExpression(node) {
                const { left, operatorToken, right } = node;
                if (operatorToken.kind === 60 /* QuestionQuestionToken */) {
                    if (isBinaryExpression(left) && (left.operatorToken.kind === 56 /* BarBarToken */ || left.operatorToken.kind === 55 /* AmpersandAmpersandToken */)) {
                        grammarErrorOnNode(left, Diagnostics._0_and_1_operations_cannot_be_mixed_without_parentheses, tokenToString(left.operatorToken.kind), tokenToString(operatorToken.kind));
                    }
                    if (isBinaryExpression(right) && (right.operatorToken.kind === 56 /* BarBarToken */ || right.operatorToken.kind === 55 /* AmpersandAmpersandToken */)) {
                        grammarErrorOnNode(right, Diagnostics._0_and_1_operations_cannot_be_mixed_without_parentheses, tokenToString(right.operatorToken.kind), tokenToString(operatorToken.kind));
                    }
                }
            }