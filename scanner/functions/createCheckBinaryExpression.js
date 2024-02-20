function createCheckBinaryExpression() {
                const trampoline = createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, foldState);
                return (node, checkMode) => {
                    const result = trampoline(node, checkMode);
                    Debug.assertIsDefined(result);
                    return result;
                };
                function onEnter(node, state, checkMode) {
                    if (state) {
                        state.stackIndex++;
                        state.skip = false;
                        setLeftType(state, 
                        /*type*/
                        void 0);
                        setLastResult(state, 
                        /*type*/
                        void 0);
                    }
                    else {
                        state = {
                            checkMode,
                            skip: false,
                            stackIndex: 0,
                            typeStack: [void 0, void 0]
                        };
                    }
                    if (isInJSFile(node) && getAssignedExpandoInitializer(node)) {
                        state.skip = true;
                        setLastResult(state, checkExpression(node.right, checkMode));
                        return state;
                    }
                    checkGrammarNullishCoalesceWithLogicalExpression(node);
                    const operator = node.operatorToken.kind;
                    if (operator === 63 /* EqualsToken */ && (node.left.kind === 207 /* ObjectLiteralExpression */ || node.left.kind === 206 /* ArrayLiteralExpression */)) {
                        state.skip = true;
                        setLastResult(state, checkDestructuringAssignment(node.left, checkExpression(node.right, checkMode), checkMode, node.right.kind === 108 /* ThisKeyword */));
                        return state;
                    }
                    return state;
                }
                function onLeft(left, state, _node) {
                    if (!state.skip) {
                        return maybeCheckExpression(state, left);
                    }
                }
                function onOperator(operatorToken, state, node) {
                    if (!state.skip) {
                        const leftType = getLastResult(state);
                        Debug.assertIsDefined(leftType);
                        setLeftType(state, leftType);
                        setLastResult(state, 
                        /*type*/
                        void 0);
                        const operator = operatorToken.kind;
                        if (isLogicalOrCoalescingBinaryOperator(operator)) {
                            let parent2 = node.parent;
                            while (parent2.kind === 214 /* ParenthesizedExpression */ || isLogicalOrCoalescingBinaryExpression(parent2)) {
                                parent2 = parent2.parent;
                            }
                            if (operator === 55 /* AmpersandAmpersandToken */ || isIfStatement(parent2)) {
                                checkTestingKnownTruthyCallableOrAwaitableType(node.left, leftType, isIfStatement(parent2) ? parent2.thenStatement : void 0);
                            }
                            checkTruthinessOfType(leftType, node.left);
                        }
                    }
                }
                function onRight(right, state, _node) {
                    if (!state.skip) {
                        return maybeCheckExpression(state, right);
                    }
                }
                function onExit(node, state) {
                    let result;
                    if (state.skip) {
                        result = getLastResult(state);
                    }
                    else {
                        const leftType = getLeftType(state);
                        Debug.assertIsDefined(leftType);
                        const rightType = getLastResult(state);
                        Debug.assertIsDefined(rightType);
                        result = checkBinaryLikeExpressionWorker(node.left, node.operatorToken, node.right, leftType, rightType, node);
                    }
                    state.skip = false;
                    setLeftType(state, 
                    /*type*/
                    void 0);
                    setLastResult(state, 
                    /*type*/
                    void 0);
                    state.stackIndex--;
                    return result;
                }
                function foldState(state, result, _side) {
                    setLastResult(state, result);
                    return state;
                }
                function maybeCheckExpression(state, node) {
                    if (isBinaryExpression(node)) {
                        return node;
                    }
                    setLastResult(state, checkExpression(node, state.checkMode));
                }
                function getLeftType(state) {
                    return state.typeStack[state.stackIndex];
                }
                function setLeftType(state, type) {
                    state.typeStack[state.stackIndex] = type;
                }
                function getLastResult(state) {
                    return state.typeStack[state.stackIndex + 1];
                }
                function setLastResult(state, type) {
                    state.typeStack[state.stackIndex + 1] = type;
                }
            }