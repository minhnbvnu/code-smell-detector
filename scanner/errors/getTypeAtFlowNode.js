function getTypeAtFlowNode(flow) {
                    var _a3;
                    if (flowDepth === 2e3) {
                        (_a3 = tracing) == null ? void 0 : _a3.instant(tracing.Phase.CheckTypes, "getTypeAtFlowNode_DepthLimit", { flowId: flow.id });
                        flowAnalysisDisabled = true;
                        reportFlowControlError(reference);
                        return errorType;
                    }
                    flowDepth++;
                    let sharedFlow;
                    while (true) {
                        const flags = flow.flags;
                        if (flags & 4096 /* Shared */) {
                            for (let i = sharedFlowStart; i < sharedFlowCount; i++) {
                                if (sharedFlowNodes[i] === flow) {
                                    flowDepth--;
                                    return sharedFlowTypes[i];
                                }
                            }
                            sharedFlow = flow;
                        }
                        let type;
                        if (flags & 16 /* Assignment */) {
                            type = getTypeAtFlowAssignment(flow);
                            if (!type) {
                                flow = flow.antecedent;
                                continue;
                            }
                        }
                        else if (flags & 512 /* Call */) {
                            type = getTypeAtFlowCall(flow);
                            if (!type) {
                                flow = flow.antecedent;
                                continue;
                            }
                        }
                        else if (flags & 96 /* Condition */) {
                            type = getTypeAtFlowCondition(flow);
                        }
                        else if (flags & 128 /* SwitchClause */) {
                            type = getTypeAtSwitchClause(flow);
                        }
                        else if (flags & 12 /* Label */) {
                            if (flow.antecedents.length === 1) {
                                flow = flow.antecedents[0];
                                continue;
                            }
                            type = flags & 4 /* BranchLabel */ ? getTypeAtFlowBranchLabel(flow) : getTypeAtFlowLoopLabel(flow);
                        }
                        else if (flags & 256 /* ArrayMutation */) {
                            type = getTypeAtFlowArrayMutation(flow);
                            if (!type) {
                                flow = flow.antecedent;
                                continue;
                            }
                        }
                        else if (flags & 1024 /* ReduceLabel */) {
                            const target = flow.target;
                            const saveAntecedents = target.antecedents;
                            target.antecedents = flow.antecedents;
                            type = getTypeAtFlowNode(flow.antecedent);
                            target.antecedents = saveAntecedents;
                        }
                        else if (flags & 2 /* Start */) {
                            const container = flow.node;
                            if (container && container !== flowContainer && reference.kind !== 208 /* PropertyAccessExpression */ && reference.kind !== 209 /* ElementAccessExpression */ && reference.kind !== 108 /* ThisKeyword */) {
                                flow = container.flowNode;
                                continue;
                            }
                            type = initialType;
                        }
                        else {
                            type = convertAutoToAny(declaredType);
                        }
                        if (sharedFlow) {
                            sharedFlowNodes[sharedFlowCount] = sharedFlow;
                            sharedFlowTypes[sharedFlowCount] = type;
                            sharedFlowCount++;
                        }
                        flowDepth--;
                        return type;
                    }
                }