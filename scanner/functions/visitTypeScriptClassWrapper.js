function visitTypeScriptClassWrapper(node) {
                const body = cast(cast(skipOuterExpressions(node.expression), isArrowFunction).body, isBlock);
                const isVariableStatementWithInitializer = (stmt) => isVariableStatement(stmt) && !!first(stmt.declarationList.declarations).initializer;
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const bodyStatements = visitNodes2(body.statements, classWrapperStatementVisitor, isStatement);
                convertedLoopState = savedConvertedLoopState;
                const classStatements = filter(bodyStatements, isVariableStatementWithInitializer);
                const remainingStatements = filter(bodyStatements, (stmt) => !isVariableStatementWithInitializer(stmt));
                const varStatement = cast(first(classStatements), isVariableStatement);
                const variable = varStatement.declarationList.declarations[0];
                const initializer = skipOuterExpressions(variable.initializer);
                let aliasAssignment = tryCast(initializer, isAssignmentExpression);
                if (!aliasAssignment && isBinaryExpression(initializer) && initializer.operatorToken.kind === 27 /* CommaToken */) {
                    aliasAssignment = tryCast(initializer.left, isAssignmentExpression);
                }
                const call = cast(aliasAssignment ? skipOuterExpressions(aliasAssignment.right) : initializer, isCallExpression);
                const func = cast(skipOuterExpressions(call.expression), isFunctionExpression);
                const funcStatements = func.body.statements;
                let classBodyStart = 0;
                let classBodyEnd = -1;
                const statements = [];
                if (aliasAssignment) {
                    const extendsCall = tryCast(funcStatements[classBodyStart], isExpressionStatement);
                    if (extendsCall) {
                        statements.push(extendsCall);
                        classBodyStart++;
                    }
                    statements.push(funcStatements[classBodyStart]);
                    classBodyStart++;
                    statements.push(factory2.createExpressionStatement(factory2.createAssignment(aliasAssignment.left, cast(variable.name, isIdentifier))));
                }
                while (!isReturnStatement(elementAt(funcStatements, classBodyEnd))) {
                    classBodyEnd--;
                }
                addRange(statements, funcStatements, classBodyStart, classBodyEnd);
                if (classBodyEnd < -1) {
                    addRange(statements, funcStatements, classBodyEnd + 1);
                }
                const returnStatement = tryCast(elementAt(funcStatements, classBodyEnd), isReturnStatement);
                for (const statement of remainingStatements) {
                    if (isReturnStatement(statement) && (returnStatement == null ? void 0 : returnStatement.expression) && !isIdentifier(returnStatement.expression)) {
                        statements.push(returnStatement);
                    }
                    else {
                        statements.push(statement);
                    }
                }
                addRange(statements, classStatements, 
                /*start*/
                1);
                return factory2.restoreOuterExpressions(node.expression, factory2.restoreOuterExpressions(variable.initializer, factory2.restoreOuterExpressions(aliasAssignment && aliasAssignment.right, factory2.updateCallExpression(call, factory2.restoreOuterExpressions(call.expression, factory2.updateFunctionExpression(func, 
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, func.parameters, 
                /*type*/
                void 0, factory2.updateBlock(func.body, statements))), 
                /*typeArguments*/
                void 0, call.arguments))));
            }