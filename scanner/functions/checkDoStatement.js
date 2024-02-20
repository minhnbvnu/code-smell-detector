function checkDoStatement(node) {
                checkGrammarStatementInAmbientContext(node);
                checkSourceElement(node.statement);
                checkTruthinessExpression(node.expression);
            }