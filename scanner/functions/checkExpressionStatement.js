function checkExpressionStatement(node) {
                checkGrammarStatementInAmbientContext(node);
                checkExpression(node.expression);
            }