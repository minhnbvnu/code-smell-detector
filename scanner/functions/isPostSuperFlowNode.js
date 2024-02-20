function isPostSuperFlowNode(flow, noCacheCheck) {
                while (true) {
                    const flags = flow.flags;
                    if (flags & 4096 /* Shared */) {
                        if (!noCacheCheck) {
                            const id = getFlowNodeId(flow);
                            const postSuper = flowNodePostSuper[id];
                            return postSuper !== void 0 ? postSuper : flowNodePostSuper[id] = isPostSuperFlowNode(flow, 
                            /*noCacheCheck*/
                            true);
                        }
                        noCacheCheck = false;
                    }
                    if (flags & (16 /* Assignment */ | 96 /* Condition */ | 256 /* ArrayMutation */ | 128 /* SwitchClause */)) {
                        flow = flow.antecedent;
                    }
                    else if (flags & 512 /* Call */) {
                        if (flow.node.expression.kind === 106 /* SuperKeyword */) {
                            return true;
                        }
                        flow = flow.antecedent;
                    }
                    else if (flags & 4 /* BranchLabel */) {
                        return every(flow.antecedents, (f) => isPostSuperFlowNode(f, 
                        /*noCacheCheck*/
                        false));
                    }
                    else if (flags & 8 /* LoopLabel */) {
                        flow = flow.antecedents[0];
                    }
                    else if (flags & 1024 /* ReduceLabel */) {
                        const target = flow.target;
                        const saveAntecedents = target.antecedents;
                        target.antecedents = flow.antecedents;
                        const result = isPostSuperFlowNode(flow.antecedent, 
                        /*noCacheCheck*/
                        false);
                        target.antecedents = saveAntecedents;
                        return result;
                    }
                    else {
                        return !!(flags & 1 /* Unreachable */);
                    }
                }
            }