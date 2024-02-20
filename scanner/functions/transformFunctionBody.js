function transformFunctionBody(body, exposedVariableDeclarations, writes, substitutions, hasReturn2) {
            const hasWritesOrVariableDeclarations = writes !== void 0 || exposedVariableDeclarations.length > 0;
            if (isBlock(body) && !hasWritesOrVariableDeclarations && substitutions.size === 0) {
                return { body: factory.createBlock(body.statements, 
                    /*multLine*/
                    true), returnValueProperty: void 0 };
            }
            let returnValueProperty;
            let ignoreReturns = false;
            const statements = factory.createNodeArray(isBlock(body) ? body.statements.slice(0) : [isStatement(body) ? body : factory.createReturnStatement(skipParentheses(body))]);
            if (hasWritesOrVariableDeclarations || substitutions.size) {
                const rewrittenStatements = visitNodes2(statements, visitor, isStatement).slice();
                if (hasWritesOrVariableDeclarations && !hasReturn2 && isStatement(body)) {
                    const assignments = getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes);
                    if (assignments.length === 1) {
                        rewrittenStatements.push(factory.createReturnStatement(assignments[0].name));
                    }
                    else {
                        rewrittenStatements.push(factory.createReturnStatement(factory.createObjectLiteralExpression(assignments)));
                    }
                }
                return { body: factory.createBlock(rewrittenStatements, 
                    /*multiLine*/
                    true), returnValueProperty };
            }
            else {
                return { body: factory.createBlock(statements, 
                    /*multiLine*/
                    true), returnValueProperty: void 0 };
            }
            function visitor(node) {
                if (!ignoreReturns && isReturnStatement(node) && hasWritesOrVariableDeclarations) {
                    const assignments = getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes);
                    if (node.expression) {
                        if (!returnValueProperty) {
                            returnValueProperty = "__return";
                        }
                        assignments.unshift(factory.createPropertyAssignment(returnValueProperty, visitNode(node.expression, visitor, isExpression)));
                    }
                    if (assignments.length === 1) {
                        return factory.createReturnStatement(assignments[0].name);
                    }
                    else {
                        return factory.createReturnStatement(factory.createObjectLiteralExpression(assignments));
                    }
                }
                else {
                    const oldIgnoreReturns = ignoreReturns;
                    ignoreReturns = ignoreReturns || isFunctionLikeDeclaration(node) || isClassLike(node);
                    const substitution = substitutions.get(getNodeId(node).toString());
                    const result = substitution ? getSynthesizedDeepClone(substitution) : visitEachChild(node, visitor, nullTransformationContext);
                    ignoreReturns = oldIgnoreReturns;
                    return result;
                }
            }
        }