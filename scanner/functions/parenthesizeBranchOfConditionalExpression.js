function parenthesizeBranchOfConditionalExpression(branch) {
                const emittedExpression = skipPartiallyEmittedExpressions(branch);
                return isCommaSequence(emittedExpression) ? factory2.createParenthesizedExpression(branch) : branch;
            }