function createEmitBinaryExpression() {
                return createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, 
                /*foldState*/
                void 0);
                function onEnter(node, state) {
                    if (state) {
                        state.stackIndex++;
                        state.preserveSourceNewlinesStack[state.stackIndex] = preserveSourceNewlines;
                        state.containerPosStack[state.stackIndex] = containerPos;
                        state.containerEndStack[state.stackIndex] = containerEnd;
                        state.declarationListContainerEndStack[state.stackIndex] = declarationListContainerEnd;
                        const emitComments2 = state.shouldEmitCommentsStack[state.stackIndex] = shouldEmitComments(node);
                        const emitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex] = shouldEmitSourceMaps(node);
                        onBeforeEmitNode == null ? void 0 : onBeforeEmitNode(node);
                        if (emitComments2)
                            emitCommentsBeforeNode(node);
                        if (emitSourceMaps)
                            emitSourceMapsBeforeNode(node);
                        beforeEmitNode(node);
                    }
                    else {
                        state = {
                            stackIndex: 0,
                            preserveSourceNewlinesStack: [void 0],
                            containerPosStack: [-1],
                            containerEndStack: [-1],
                            declarationListContainerEndStack: [-1],
                            shouldEmitCommentsStack: [false],
                            shouldEmitSourceMapsStack: [false]
                        };
                    }
                    return state;
                }
                function onLeft(next, _workArea, parent2) {
                    return maybeEmitExpression(next, parent2, "left");
                }
                function onOperator(operatorToken, _state, node) {
                    const isCommaOperator = operatorToken.kind !== 27 /* CommaToken */;
                    const linesBeforeOperator = getLinesBetweenNodes(node, node.left, operatorToken);
                    const linesAfterOperator = getLinesBetweenNodes(node, operatorToken, node.right);
                    writeLinesAndIndent(linesBeforeOperator, isCommaOperator);
                    emitLeadingCommentsOfPosition(operatorToken.pos);
                    writeTokenNode(operatorToken, operatorToken.kind === 101 /* InKeyword */ ? writeKeyword : writeOperator);
                    emitTrailingCommentsOfPosition(operatorToken.end, 
                    /*prefixSpace*/
                    true);
                    writeLinesAndIndent(linesAfterOperator, 
                    /*writeSpaceIfNotIndenting*/
                    true);
                }
                function onRight(next, _workArea, parent2) {
                    return maybeEmitExpression(next, parent2, "right");
                }
                function onExit(node, state) {
                    const linesBeforeOperator = getLinesBetweenNodes(node, node.left, node.operatorToken);
                    const linesAfterOperator = getLinesBetweenNodes(node, node.operatorToken, node.right);
                    decreaseIndentIf(linesBeforeOperator, linesAfterOperator);
                    if (state.stackIndex > 0) {
                        const savedPreserveSourceNewlines = state.preserveSourceNewlinesStack[state.stackIndex];
                        const savedContainerPos = state.containerPosStack[state.stackIndex];
                        const savedContainerEnd = state.containerEndStack[state.stackIndex];
                        const savedDeclarationListContainerEnd = state.declarationListContainerEndStack[state.stackIndex];
                        const shouldEmitComments2 = state.shouldEmitCommentsStack[state.stackIndex];
                        const shouldEmitSourceMaps2 = state.shouldEmitSourceMapsStack[state.stackIndex];
                        afterEmitNode(savedPreserveSourceNewlines);
                        if (shouldEmitSourceMaps2)
                            emitSourceMapsAfterNode(node);
                        if (shouldEmitComments2)
                            emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
                        onAfterEmitNode == null ? void 0 : onAfterEmitNode(node);
                        state.stackIndex--;
                    }
                }
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
            }