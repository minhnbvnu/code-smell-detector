function bindContainer(node, containerFlags) {
                const saveContainer = container;
                const saveThisParentContainer = thisParentContainer;
                const savedBlockScopeContainer = blockScopeContainer;
                if (containerFlags & 1 /* IsContainer */) {
                    if (node.kind !== 216 /* ArrowFunction */) {
                        thisParentContainer = container;
                    }
                    container = blockScopeContainer = node;
                    if (containerFlags & 32 /* HasLocals */) {
                        container.locals = createSymbolTable();
                        addToContainerChain(container);
                    }
                }
                else if (containerFlags & 2 /* IsBlockScopedContainer */) {
                    blockScopeContainer = node;
                    if (containerFlags & 32 /* HasLocals */) {
                        blockScopeContainer.locals = void 0;
                    }
                }
                if (containerFlags & 4 /* IsControlFlowContainer */) {
                    const saveCurrentFlow = currentFlow;
                    const saveBreakTarget = currentBreakTarget;
                    const saveContinueTarget = currentContinueTarget;
                    const saveReturnTarget = currentReturnTarget;
                    const saveExceptionTarget = currentExceptionTarget;
                    const saveActiveLabelList = activeLabelList;
                    const saveHasExplicitReturn = hasExplicitReturn;
                    const isImmediatelyInvoked = containerFlags & 16 /* IsFunctionExpression */ && !hasSyntacticModifier(node, 512 /* Async */) && !node.asteriskToken && !!getImmediatelyInvokedFunctionExpression(node) || node.kind === 172 /* ClassStaticBlockDeclaration */;
                    if (!isImmediatelyInvoked) {
                        currentFlow = initFlowNode({ flags: 2 /* Start */ });
                        if (containerFlags & (16 /* IsFunctionExpression */ | 128 /* IsObjectLiteralOrClassExpressionMethodOrAccessor */)) {
                            currentFlow.node = node;
                        }
                    }
                    currentReturnTarget = isImmediatelyInvoked || node.kind === 173 /* Constructor */ || isInJSFile(node) && (node.kind === 259 /* FunctionDeclaration */ || node.kind === 215 /* FunctionExpression */) ? createBranchLabel() : void 0;
                    currentExceptionTarget = void 0;
                    currentBreakTarget = void 0;
                    currentContinueTarget = void 0;
                    activeLabelList = void 0;
                    hasExplicitReturn = false;
                    bindChildren(node);
                    node.flags &= ~2816 /* ReachabilityAndEmitFlags */;
                    if (!(currentFlow.flags & 1 /* Unreachable */) && containerFlags & 8 /* IsFunctionLike */ && nodeIsPresent(node.body)) {
                        node.flags |= 256 /* HasImplicitReturn */;
                        if (hasExplicitReturn)
                            node.flags |= 512 /* HasExplicitReturn */;
                        node.endFlowNode = currentFlow;
                    }
                    if (node.kind === 308 /* SourceFile */) {
                        node.flags |= emitFlags;
                        node.endFlowNode = currentFlow;
                    }
                    if (currentReturnTarget) {
                        addAntecedent(currentReturnTarget, currentFlow);
                        currentFlow = finishFlowLabel(currentReturnTarget);
                        if (node.kind === 173 /* Constructor */ || node.kind === 172 /* ClassStaticBlockDeclaration */ || isInJSFile(node) && (node.kind === 259 /* FunctionDeclaration */ || node.kind === 215 /* FunctionExpression */)) {
                            node.returnFlowNode = currentFlow;
                        }
                    }
                    if (!isImmediatelyInvoked) {
                        currentFlow = saveCurrentFlow;
                    }
                    currentBreakTarget = saveBreakTarget;
                    currentContinueTarget = saveContinueTarget;
                    currentReturnTarget = saveReturnTarget;
                    currentExceptionTarget = saveExceptionTarget;
                    activeLabelList = saveActiveLabelList;
                    hasExplicitReturn = saveHasExplicitReturn;
                }
                else if (containerFlags & 64 /* IsInterface */) {
                    seenThisKeyword = false;
                    bindChildren(node);
                    Debug.assertNotNode(node, isIdentifier);
                    node.flags = seenThisKeyword ? node.flags | 128 /* ContainsThis */ : node.flags & ~128 /* ContainsThis */;
                }
                else {
                    bindChildren(node);
                }
                container = saveContainer;
                thisParentContainer = saveThisParentContainer;
                blockScopeContainer = savedBlockScopeContainer;
            }