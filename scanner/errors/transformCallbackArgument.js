function transformCallbackArgument(func, hasContinuation, continuationArgName, inputArgName, parent2, transformer) {
            var _a2;
            switch (func.kind) {
                case 104 /* NullKeyword */:
                    break;
                case 208 /* PropertyAccessExpression */:
                case 79 /* Identifier */:
                    if (!inputArgName) {
                        break;
                    }
                    const synthCall = factory.createCallExpression(getSynthesizedDeepClone(func), 
                    /*typeArguments*/
                    void 0, isSynthIdentifier(inputArgName) ? [referenceSynthIdentifier(inputArgName)] : []);
                    if (shouldReturn(parent2, transformer)) {
                        return maybeAnnotateAndReturn(synthCall, getExplicitPromisedTypeOfPromiseReturningCallExpression(parent2, func, transformer.checker));
                    }
                    const type = transformer.checker.getTypeAtLocation(func);
                    const callSignatures = transformer.checker.getSignaturesOfType(type, 0 /* Call */);
                    if (!callSignatures.length) {
                        return silentFail();
                    }
                    const returnType = callSignatures[0].getReturnType();
                    const varDeclOrAssignment = createVariableOrAssignmentOrExpressionStatement(continuationArgName, factory.createAwaitExpression(synthCall), getExplicitPromisedTypeOfPromiseReturningCallExpression(parent2, func, transformer.checker));
                    if (continuationArgName) {
                        continuationArgName.types.push(transformer.checker.getAwaitedType(returnType) || returnType);
                    }
                    return varDeclOrAssignment;
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */: {
                    const funcBody = func.body;
                    const returnType2 = (_a2 = getLastCallSignature(transformer.checker.getTypeAtLocation(func), transformer.checker)) == null ? void 0 : _a2.getReturnType();
                    if (isBlock(funcBody)) {
                        let refactoredStmts = [];
                        let seenReturnStatement = false;
                        for (const statement of funcBody.statements) {
                            if (isReturnStatement(statement)) {
                                seenReturnStatement = true;
                                if (isReturnStatementWithFixablePromiseHandler(statement, transformer.checker)) {
                                    refactoredStmts = refactoredStmts.concat(transformReturnStatementWithFixablePromiseHandler(transformer, statement, hasContinuation, continuationArgName));
                                }
                                else {
                                    const possiblyAwaitedRightHandSide = returnType2 && statement.expression ? getPossiblyAwaitedRightHandSide(transformer.checker, returnType2, statement.expression) : statement.expression;
                                    refactoredStmts.push(...maybeAnnotateAndReturn(possiblyAwaitedRightHandSide, getExplicitPromisedTypeOfPromiseReturningCallExpression(parent2, func, transformer.checker)));
                                }
                            }
                            else if (hasContinuation && forEachReturnStatement(statement, returnTrue)) {
                                return silentFail();
                            }
                            else {
                                refactoredStmts.push(statement);
                            }
                        }
                        return shouldReturn(parent2, transformer) ? refactoredStmts.map((s) => getSynthesizedDeepClone(s)) : removeReturns(refactoredStmts, continuationArgName, transformer, seenReturnStatement);
                    }
                    else {
                        const inlinedStatements = isFixablePromiseHandler(funcBody, transformer.checker) ? transformReturnStatementWithFixablePromiseHandler(transformer, factory.createReturnStatement(funcBody), hasContinuation, continuationArgName) : emptyArray;
                        if (inlinedStatements.length > 0) {
                            return inlinedStatements;
                        }
                        if (returnType2) {
                            const possiblyAwaitedRightHandSide = getPossiblyAwaitedRightHandSide(transformer.checker, returnType2, funcBody);
                            if (!shouldReturn(parent2, transformer)) {
                                const transformedStatement = createVariableOrAssignmentOrExpressionStatement(continuationArgName, possiblyAwaitedRightHandSide, 
                                /*typeAnnotation*/
                                void 0);
                                if (continuationArgName) {
                                    continuationArgName.types.push(transformer.checker.getAwaitedType(returnType2) || returnType2);
                                }
                                return transformedStatement;
                            }
                            else {
                                return maybeAnnotateAndReturn(possiblyAwaitedRightHandSide, getExplicitPromisedTypeOfPromiseReturningCallExpression(parent2, func, transformer.checker));
                            }
                        }
                        else {
                            return silentFail();
                        }
                    }
                }
                default:
                    return silentFail();
            }
            return emptyArray;
        }