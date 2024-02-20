function isReachableFlowNodeWorker(flow, noCacheCheck) {
                while (true) {
                    if (flow === lastFlowNode) {
                        return lastFlowNodeReachable;
                    }
                    const flags = flow.flags;
                    if (flags & 4096 /* Shared */) {
                        if (!noCacheCheck) {
                            const id = getFlowNodeId(flow);
                            const reachable = flowNodeReachable[id];
                            return reachable !== void 0 ? reachable : flowNodeReachable[id] = isReachableFlowNodeWorker(flow, 
                            /*noCacheCheck*/
                            true);
                        }
                        noCacheCheck = false;
                    }
                    if (flags & (16 /* Assignment */ | 96 /* Condition */ | 256 /* ArrayMutation */)) {
                        flow = flow.antecedent;
                    }
                    else if (flags & 512 /* Call */) {
                        const signature = getEffectsSignature(flow.node);
                        if (signature) {
                            const predicate = getTypePredicateOfSignature(signature);
                            if (predicate && predicate.kind === 3 /* AssertsIdentifier */ && !predicate.type) {
                                const predicateArgument = flow.node.arguments[predicate.parameterIndex];
                                if (predicateArgument && isFalseExpression(predicateArgument)) {
                                    return false;
                                }
                            }
                            if (getReturnTypeOfSignature(signature).flags & 131072 /* Never */) {
                                return false;
                            }
                        }
                        flow = flow.antecedent;
                    }
                    else if (flags & 4 /* BranchLabel */) {
                        return some(flow.antecedents, (f) => isReachableFlowNodeWorker(f, 
                        /*noCacheCheck*/
                        false));
                    }
                    else if (flags & 8 /* LoopLabel */) {
                        const antecedents = flow.antecedents;
                        if (antecedents === void 0 || antecedents.length === 0) {
                            return false;
                        }
                        flow = antecedents[0];
                    }
                    else if (flags & 128 /* SwitchClause */) {
                        if (flow.clauseStart === flow.clauseEnd && isExhaustiveSwitchStatement(flow.switchStatement)) {
                            return false;
                        }
                        flow = flow.antecedent;
                    }
                    else if (flags & 1024 /* ReduceLabel */) {
                        lastFlowNode = void 0;
                        const target = flow.target;
                        const saveAntecedents = target.antecedents;
                        target.antecedents = flow.antecedents;
                        const result = isReachableFlowNodeWorker(flow.antecedent, 
                        /*noCacheCheck*/
                        false);
                        target.antecedents = saveAntecedents;
                        return result;
                    }
                    else {
                        return !(flags & 1 /* Unreachable */);
                    }
                }
            }