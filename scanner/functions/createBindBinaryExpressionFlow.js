function createBindBinaryExpressionFlow() {
                return createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, 
                /*foldState*/
                void 0);
                function onEnter(node, state) {
                    if (state) {
                        state.stackIndex++;
                        setParent(node, parent2);
                        const saveInStrictMode = inStrictMode;
                        bindWorker(node);
                        const saveParent = parent2;
                        parent2 = node;
                        state.skip = false;
                        state.inStrictModeStack[state.stackIndex] = saveInStrictMode;
                        state.parentStack[state.stackIndex] = saveParent;
                    }
                    else {
                        state = {
                            stackIndex: 0,
                            skip: false,
                            inStrictModeStack: [void 0],
                            parentStack: [void 0]
                        };
                    }
                    const operator = node.operatorToken.kind;
                    if (isLogicalOrCoalescingBinaryOperator(operator) || isLogicalOrCoalescingAssignmentOperator(operator)) {
                        if (isTopLevelLogicalExpression(node)) {
                            const postExpressionLabel = createBranchLabel();
                            bindLogicalLikeExpression(node, postExpressionLabel, postExpressionLabel);
                            currentFlow = finishFlowLabel(postExpressionLabel);
                        }
                        else {
                            bindLogicalLikeExpression(node, currentTrueTarget, currentFalseTarget);
                        }
                        state.skip = true;
                    }
                    return state;
                }
                function onLeft(left, state, node) {
                    if (!state.skip) {
                        const maybeBound = maybeBind2(left);
                        if (node.operatorToken.kind === 27 /* CommaToken */) {
                            maybeBindExpressionFlowIfCall(left);
                        }
                        return maybeBound;
                    }
                }
                function onOperator(operatorToken, state, _node) {
                    if (!state.skip) {
                        bind(operatorToken);
                    }
                }
                function onRight(right, state, node) {
                    if (!state.skip) {
                        const maybeBound = maybeBind2(right);
                        if (node.operatorToken.kind === 27 /* CommaToken */) {
                            maybeBindExpressionFlowIfCall(right);
                        }
                        return maybeBound;
                    }
                }
                function onExit(node, state) {
                    if (!state.skip) {
                        const operator = node.operatorToken.kind;
                        if (isAssignmentOperator(operator) && !isAssignmentTarget(node)) {
                            bindAssignmentTargetFlow(node.left);
                            if (operator === 63 /* EqualsToken */ && node.left.kind === 209 /* ElementAccessExpression */) {
                                const elementAccess = node.left;
                                if (isNarrowableOperand(elementAccess.expression)) {
                                    currentFlow = createFlowMutation(256 /* ArrayMutation */, currentFlow, node);
                                }
                            }
                        }
                    }
                    const savedInStrictMode = state.inStrictModeStack[state.stackIndex];
                    const savedParent = state.parentStack[state.stackIndex];
                    if (savedInStrictMode !== void 0) {
                        inStrictMode = savedInStrictMode;
                    }
                    if (savedParent !== void 0) {
                        parent2 = savedParent;
                    }
                    state.skip = false;
                    state.stackIndex--;
                }
                function maybeBind2(node) {
                    if (node && isBinaryExpression(node) && !isDestructuringAssignment(node)) {
                        return node;
                    }
                    bind(node);
                }
            }