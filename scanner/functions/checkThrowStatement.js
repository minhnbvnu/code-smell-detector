function checkThrowStatement(node) {
                if (!checkGrammarStatementInAmbientContext(node)) {
                    if (isIdentifier(node.expression) && !node.expression.escapedText) {
                        grammarErrorAfterFirstToken(node, Diagnostics.Line_break_not_permitted_here);
                    }
                }
                if (node.expression) {
                    checkExpression(node.expression);
                }
            }