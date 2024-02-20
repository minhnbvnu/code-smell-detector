function checkIfStatement(node) {
                checkGrammarStatementInAmbientContext(node);
                const type = checkTruthinessExpression(node.expression);
                checkTestingKnownTruthyCallableOrAwaitableType(node.expression, type, node.thenStatement);
                checkSourceElement(node.thenStatement);
                if (node.thenStatement.kind === 239 /* EmptyStatement */) {
                    error(node.thenStatement, Diagnostics.The_body_of_an_if_statement_cannot_be_the_empty_statement);
                }
                checkSourceElement(node.elseStatement);
            }