function generateCallToConvertedLoop(loopFunctionExpressionName, state, outerState, containsYield) {
                const statements = [];
                const isSimpleLoop = !(state.nonLocalJumps & ~4 /* Continue */) && !state.labeledNonLocalBreaks && !state.labeledNonLocalContinues;
                const call = factory2.createCallExpression(loopFunctionExpressionName, 
                /*typeArguments*/
                void 0, map(state.loopParameters, (p) => p.name));
                const callResult = containsYield ? factory2.createYieldExpression(factory2.createToken(41 /* AsteriskToken */), setEmitFlags(call, 16777216 /* Iterator */)) : call;
                if (isSimpleLoop) {
                    statements.push(factory2.createExpressionStatement(callResult));
                    copyOutParameters(state.loopOutParameters, 1 /* Body */, 0 /* ToOriginal */, statements);
                }
                else {
                    const loopResultName = factory2.createUniqueName("state");
                    const stateVariable = factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([factory2.createVariableDeclaration(loopResultName, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, callResult)]));
                    statements.push(stateVariable);
                    copyOutParameters(state.loopOutParameters, 1 /* Body */, 0 /* ToOriginal */, statements);
                    if (state.nonLocalJumps & 8 /* Return */) {
                        let returnStatement;
                        if (outerState) {
                            outerState.nonLocalJumps |= 8 /* Return */;
                            returnStatement = factory2.createReturnStatement(loopResultName);
                        }
                        else {
                            returnStatement = factory2.createReturnStatement(factory2.createPropertyAccessExpression(loopResultName, "value"));
                        }
                        statements.push(factory2.createIfStatement(factory2.createTypeCheck(loopResultName, "object"), returnStatement));
                    }
                    if (state.nonLocalJumps & 2 /* Break */) {
                        statements.push(factory2.createIfStatement(factory2.createStrictEquality(loopResultName, factory2.createStringLiteral("break")), factory2.createBreakStatement()));
                    }
                    if (state.labeledNonLocalBreaks || state.labeledNonLocalContinues) {
                        const caseClauses = [];
                        processLabeledJumps(state.labeledNonLocalBreaks, 
                        /*isBreak*/
                        true, loopResultName, outerState, caseClauses);
                        processLabeledJumps(state.labeledNonLocalContinues, 
                        /*isBreak*/
                        false, loopResultName, outerState, caseClauses);
                        statements.push(factory2.createSwitchStatement(loopResultName, factory2.createCaseBlock(caseClauses)));
                    }
                }
                return statements;
            }