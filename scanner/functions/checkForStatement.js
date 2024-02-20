function checkForStatement(node) {
                if (!checkGrammarStatementInAmbientContext(node)) {
                    if (node.initializer && node.initializer.kind === 258 /* VariableDeclarationList */) {
                        checkGrammarVariableDeclarationList(node.initializer);
                    }
                }
                if (node.initializer) {
                    if (node.initializer.kind === 258 /* VariableDeclarationList */) {
                        forEach(node.initializer.declarations, checkVariableDeclaration);
                    }
                    else {
                        checkExpression(node.initializer);
                    }
                }
                if (node.condition)
                    checkTruthinessExpression(node.condition);
                if (node.incrementor)
                    checkExpression(node.incrementor);
                checkSourceElement(node.statement);
                if (node.locals) {
                    registerForUnusedIdentifiersCheck(node);
                }
            }