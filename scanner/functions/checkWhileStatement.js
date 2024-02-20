function checkWhileStatement(node) {
                checkGrammarStatementInAmbientContext(node);
                checkTruthinessExpression(node.expression);
                checkSourceElement(node.statement);
            }