function visitBreakOrContinueStatement(node) {
                if (convertedLoopState) {
                    const jump = node.kind === 249 /* BreakStatement */ ? 2 /* Break */ : 4 /* Continue */;
                    const canUseBreakOrContinue = node.label && convertedLoopState.labels && convertedLoopState.labels.get(idText(node.label)) || !node.label && convertedLoopState.allowedNonLabeledJumps & jump;
                    if (!canUseBreakOrContinue) {
                        let labelMarker;
                        const label = node.label;
                        if (!label) {
                            if (node.kind === 249 /* BreakStatement */) {
                                convertedLoopState.nonLocalJumps |= 2 /* Break */;
                                labelMarker = "break";
                            }
                            else {
                                convertedLoopState.nonLocalJumps |= 4 /* Continue */;
                                labelMarker = "continue";
                            }
                        }
                        else {
                            if (node.kind === 249 /* BreakStatement */) {
                                labelMarker = `break-${label.escapedText}`;
                                setLabeledJump(convertedLoopState, 
                                /*isBreak*/
                                true, idText(label), labelMarker);
                            }
                            else {
                                labelMarker = `continue-${label.escapedText}`;
                                setLabeledJump(convertedLoopState, 
                                /*isBreak*/
                                false, idText(label), labelMarker);
                            }
                        }
                        let returnExpression = factory2.createStringLiteral(labelMarker);
                        if (convertedLoopState.loopOutParameters.length) {
                            const outParams = convertedLoopState.loopOutParameters;
                            let expr;
                            for (let i = 0; i < outParams.length; i++) {
                                const copyExpr = copyOutParameter(outParams[i], 1 /* ToOutParameter */);
                                if (i === 0) {
                                    expr = copyExpr;
                                }
                                else {
                                    expr = factory2.createBinaryExpression(expr, 27 /* CommaToken */, copyExpr);
                                }
                            }
                            returnExpression = factory2.createBinaryExpression(expr, 27 /* CommaToken */, returnExpression);
                        }
                        return factory2.createReturnStatement(returnExpression);
                    }
                }
                return visitEachChild(node, visitor, context);
            }