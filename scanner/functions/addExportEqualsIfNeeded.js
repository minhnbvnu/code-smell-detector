function addExportEqualsIfNeeded(statements, emitAsReturn) {
                if (currentModuleInfo.exportEquals) {
                    const expressionResult = visitNode(currentModuleInfo.exportEquals.expression, visitor, isExpression);
                    if (expressionResult) {
                        if (emitAsReturn) {
                            const statement = factory2.createReturnStatement(expressionResult);
                            setTextRange(statement, currentModuleInfo.exportEquals);
                            setEmitFlags(statement, 768 /* NoTokenSourceMaps */ | 3072 /* NoComments */);
                            statements.push(statement);
                        }
                        else {
                            const statement = factory2.createExpressionStatement(factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createIdentifier("module"), "exports"), expressionResult));
                            setTextRange(statement, currentModuleInfo.exportEquals);
                            setEmitFlags(statement, 3072 /* NoComments */);
                            statements.push(statement);
                        }
                    }
                }
            }