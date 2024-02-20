function getTypeAtFlowBranchLabel(flow) {
                    const antecedentTypes = [];
                    let subtypeReduction = false;
                    let seenIncomplete = false;
                    let bypassFlow;
                    for (const antecedent of flow.antecedents) {
                        if (!bypassFlow && antecedent.flags & 128 /* SwitchClause */ && antecedent.clauseStart === antecedent.clauseEnd) {
                            bypassFlow = antecedent;
                            continue;
                        }
                        const flowType = getTypeAtFlowNode(antecedent);
                        const type = getTypeFromFlowType(flowType);
                        if (type === declaredType && declaredType === initialType) {
                            return type;
                        }
                        pushIfUnique(antecedentTypes, type);
                        if (!isTypeSubsetOf(type, declaredType)) {
                            subtypeReduction = true;
                        }
                        if (isIncomplete(flowType)) {
                            seenIncomplete = true;
                        }
                    }
                    if (bypassFlow) {
                        const flowType = getTypeAtFlowNode(bypassFlow);
                        const type = getTypeFromFlowType(flowType);
                        if (!(type.flags & 131072 /* Never */) && !contains(antecedentTypes, type) && !isExhaustiveSwitchStatement(bypassFlow.switchStatement)) {
                            if (type === declaredType && declaredType === initialType) {
                                return type;
                            }
                            antecedentTypes.push(type);
                            if (!isTypeSubsetOf(type, declaredType)) {
                                subtypeReduction = true;
                            }
                            if (isIncomplete(flowType)) {
                                seenIncomplete = true;
                            }
                        }
                    }
                    return createFlowType(getUnionOrEvolvingArrayType(antecedentTypes, subtypeReduction ? 2 /* Subtype */ : 1 /* Literal */), seenIncomplete);
                }