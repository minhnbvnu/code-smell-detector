function transformConstructorBody(constructor, node, extendsClauseElement, hasSynthesizedSuper) {
                const isDerivedClass = !!extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== 104 /* NullKeyword */;
                if (!constructor)
                    return createDefaultConstructorBody(node, isDerivedClass);
                const prologue = [];
                const statements = [];
                resumeLexicalEnvironment();
                const existingPrologue = takeWhile(constructor.body.statements, isPrologueDirective);
                const { superCall, superStatementIndex } = findSuperCallAndStatementIndex(constructor.body.statements, existingPrologue);
                const postSuperStatementsStart = superStatementIndex === -1 ? existingPrologue.length : superStatementIndex + 1;
                let statementOffset = postSuperStatementsStart;
                if (!hasSynthesizedSuper)
                    statementOffset = factory2.copyStandardPrologue(constructor.body.statements, prologue, statementOffset, 
                    /*ensureUseStrict*/
                    false);
                if (!hasSynthesizedSuper)
                    statementOffset = factory2.copyCustomPrologue(constructor.body.statements, statements, statementOffset, visitor, 
                    /*filter*/
                    void 0);
                let superCallExpression;
                if (hasSynthesizedSuper) {
                    superCallExpression = createDefaultSuperCallOrThis();
                }
                else if (superCall) {
                    superCallExpression = visitSuperCallInBody(superCall);
                }
                if (superCallExpression) {
                    hierarchyFacts |= 8192 /* ConstructorWithCapturedSuper */;
                }
                addDefaultValueAssignmentsIfNeeded2(prologue, constructor);
                addRestParameterIfNeeded(prologue, constructor, hasSynthesizedSuper);
                addRange(statements, visitNodes2(constructor.body.statements, visitor, isStatement, 
                /*start*/
                statementOffset));
                factory2.mergeLexicalEnvironment(prologue, endLexicalEnvironment());
                insertCaptureNewTargetIfNeeded(prologue, constructor, 
                /*copyOnWrite*/
                false);
                if (isDerivedClass || superCallExpression) {
                    if (superCallExpression && postSuperStatementsStart === constructor.body.statements.length && !(constructor.body.transformFlags & 16384 /* ContainsLexicalThis */)) {
                        const superCall2 = cast(cast(superCallExpression, isBinaryExpression).left, isCallExpression);
                        const returnStatement = factory2.createReturnStatement(superCallExpression);
                        setCommentRange(returnStatement, getCommentRange(superCall2));
                        setEmitFlags(superCall2, 3072 /* NoComments */);
                        statements.push(returnStatement);
                    }
                    else {
                        if (superStatementIndex <= existingPrologue.length) {
                            insertCaptureThisForNode(statements, constructor, superCallExpression || createActualThis());
                        }
                        else {
                            insertCaptureThisForNode(prologue, constructor, createActualThis());
                            if (superCallExpression) {
                                insertSuperThisCaptureThisForNode(statements, superCallExpression);
                            }
                        }
                        if (!isSufficientlyCoveredByReturnStatements(constructor.body)) {
                            statements.push(factory2.createReturnStatement(factory2.createUniqueName("_this", 16 /* Optimistic */ | 32 /* FileLevel */)));
                        }
                    }
                }
                else {
                    insertCaptureThisForNodeIfNeeded(prologue, constructor);
                }
                const body = factory2.createBlock(setTextRange(factory2.createNodeArray([
                    ...existingPrologue,
                    ...prologue,
                    ...superStatementIndex <= existingPrologue.length ? emptyArray : visitNodes2(constructor.body.statements, visitor, isStatement, existingPrologue.length, superStatementIndex - existingPrologue.length),
                    ...statements
                ]), 
                /*location*/
                constructor.body.statements), 
                /*multiLine*/
                true);
                setTextRange(body, constructor.body);
                return body;
            }