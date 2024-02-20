function transformForOfStatementWithObjectRest(node) {
                const initializerWithoutParens = skipParentheses(node.initializer);
                if (isVariableDeclarationList(initializerWithoutParens) || isAssignmentPattern(initializerWithoutParens)) {
                    let bodyLocation;
                    let statementsLocation;
                    const temp = factory2.createTempVariable(
                    /*recordTempVariable*/
                    void 0);
                    const statements = [createForOfBindingStatement(factory2, initializerWithoutParens, temp)];
                    if (isBlock(node.statement)) {
                        addRange(statements, node.statement.statements);
                        bodyLocation = node.statement;
                        statementsLocation = node.statement.statements;
                    }
                    else if (node.statement) {
                        append(statements, node.statement);
                        bodyLocation = node.statement;
                        statementsLocation = node.statement;
                    }
                    return factory2.updateForOfStatement(node, node.awaitModifier, setTextRange(factory2.createVariableDeclarationList([
                        setTextRange(factory2.createVariableDeclaration(temp), node.initializer)
                    ], 1 /* Let */), node.initializer), node.expression, setTextRange(factory2.createBlock(setTextRange(factory2.createNodeArray(statements), statementsLocation), 
                    /*multiLine*/
                    true), bodyLocation));
                }
                return node;
            }