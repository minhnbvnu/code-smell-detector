function getFixInfo(checker, declaration, expectType, isFunctionType) {
            if (!declaration.body || !isBlock(declaration.body) || length(declaration.body.statements) !== 1)
                return void 0;
            const firstStatement = first(declaration.body.statements);
            if (isExpressionStatement(firstStatement) && checkFixedAssignableTo(checker, declaration, checker.getTypeAtLocation(firstStatement.expression), expectType, isFunctionType)) {
                return {
                    declaration,
                    kind: 0 /* MissingReturnStatement */,
                    expression: firstStatement.expression,
                    statement: firstStatement,
                    commentSource: firstStatement.expression
                };
            }
            else if (isLabeledStatement(firstStatement) && isExpressionStatement(firstStatement.statement)) {
                const node = factory.createObjectLiteralExpression([factory.createPropertyAssignment(firstStatement.label, firstStatement.statement.expression)]);
                const nodeType = createObjectTypeFromLabeledExpression(checker, firstStatement.label, firstStatement.statement.expression);
                if (checkFixedAssignableTo(checker, declaration, nodeType, expectType, isFunctionType)) {
                    return isArrowFunction(declaration) ? {
                        declaration,
                        kind: 1 /* MissingParentheses */,
                        expression: node,
                        statement: firstStatement,
                        commentSource: firstStatement.statement.expression
                    } : {
                        declaration,
                        kind: 0 /* MissingReturnStatement */,
                        expression: node,
                        statement: firstStatement,
                        commentSource: firstStatement.statement.expression
                    };
                }
            }
            else if (isBlock(firstStatement) && length(firstStatement.statements) === 1) {
                const firstBlockStatement = first(firstStatement.statements);
                if (isLabeledStatement(firstBlockStatement) && isExpressionStatement(firstBlockStatement.statement)) {
                    const node = factory.createObjectLiteralExpression([factory.createPropertyAssignment(firstBlockStatement.label, firstBlockStatement.statement.expression)]);
                    const nodeType = createObjectTypeFromLabeledExpression(checker, firstBlockStatement.label, firstBlockStatement.statement.expression);
                    if (checkFixedAssignableTo(checker, declaration, nodeType, expectType, isFunctionType)) {
                        return {
                            declaration,
                            kind: 0 /* MissingReturnStatement */,
                            expression: node,
                            statement: firstStatement,
                            commentSource: firstBlockStatement
                        };
                    }
                }
            }
            return void 0;
        }