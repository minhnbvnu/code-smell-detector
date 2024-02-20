function checkForOfStatement(node) {
                checkGrammarForInOrForOfStatement(node);
                const container = getContainingFunctionOrClassStaticBlock(node);
                if (node.awaitModifier) {
                    if (container && isClassStaticBlockDeclaration(container)) {
                        grammarErrorOnNode(node.awaitModifier, Diagnostics.For_await_loops_cannot_be_used_inside_a_class_static_block);
                    }
                    else {
                        const functionFlags = getFunctionFlags(container);
                        if ((functionFlags & (4 /* Invalid */ | 2 /* Async */)) === 2 /* Async */ && languageVersion < 99 /* ESNext */) {
                            checkExternalEmitHelpers(node, 16384 /* ForAwaitOfIncludes */);
                        }
                    }
                }
                else if (compilerOptions.downlevelIteration && languageVersion < 2 /* ES2015 */) {
                    checkExternalEmitHelpers(node, 256 /* ForOfIncludes */);
                }
                if (node.initializer.kind === 258 /* VariableDeclarationList */) {
                    checkForInOrForOfVariableDeclaration(node);
                }
                else {
                    const varExpr = node.initializer;
                    const iteratedType = checkRightHandSideOfForOf(node);
                    if (varExpr.kind === 206 /* ArrayLiteralExpression */ || varExpr.kind === 207 /* ObjectLiteralExpression */) {
                        checkDestructuringAssignment(varExpr, iteratedType || errorType);
                    }
                    else {
                        const leftType = checkExpression(varExpr);
                        checkReferenceExpression(varExpr, Diagnostics.The_left_hand_side_of_a_for_of_statement_must_be_a_variable_or_a_property_access, Diagnostics.The_left_hand_side_of_a_for_of_statement_may_not_be_an_optional_property_access);
                        if (iteratedType) {
                            checkTypeAssignableToAndOptionallyElaborate(iteratedType, leftType, varExpr, node.expression);
                        }
                    }
                }
                checkSourceElement(node.statement);
                if (node.locals) {
                    registerForUnusedIdentifiersCheck(node);
                }
            }