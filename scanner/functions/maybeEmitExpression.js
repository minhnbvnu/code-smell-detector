function maybeEmitExpression(next, parent2, side) {
                    const parenthesizerRule = side === "left" ? parenthesizer.getParenthesizeLeftSideOfBinaryForOperator(parent2.operatorToken.kind) : parenthesizer.getParenthesizeRightSideOfBinaryForOperator(parent2.operatorToken.kind);
                    let pipelinePhase = getPipelinePhase(0 /* Notification */, 1 /* Expression */, next);
                    if (pipelinePhase === pipelineEmitWithSubstitution) {
                        Debug.assertIsDefined(lastSubstitution);
                        next = parenthesizerRule(cast(lastSubstitution, isExpression));
                        pipelinePhase = getNextPipelinePhase(1 /* Substitution */, 1 /* Expression */, next);
                        lastSubstitution = void 0;
                    }
                    if (pipelinePhase === pipelineEmitWithComments || pipelinePhase === pipelineEmitWithSourceMaps || pipelinePhase === pipelineEmitWithHint) {
                        if (isBinaryExpression(next)) {
                            return next;
                        }
                    }
                    currentParenthesizerRule = parenthesizerRule;
                    pipelinePhase(1 /* Expression */, next);
                }