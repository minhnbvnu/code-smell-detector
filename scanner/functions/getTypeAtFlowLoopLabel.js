function getTypeAtFlowLoopLabel(flow) {
                    const id = getFlowNodeId(flow);
                    const cache = flowLoopCaches[id] || (flowLoopCaches[id] = /* @__PURE__ */ new Map());
                    const key2 = getOrSetCacheKey();
                    if (!key2) {
                        return declaredType;
                    }
                    const cached = cache.get(key2);
                    if (cached) {
                        return cached;
                    }
                    for (let i = flowLoopStart; i < flowLoopCount; i++) {
                        if (flowLoopNodes[i] === flow && flowLoopKeys[i] === key2 && flowLoopTypes[i].length) {
                            return createFlowType(getUnionOrEvolvingArrayType(flowLoopTypes[i], 1 /* Literal */), 
                            /*incomplete*/
                            true);
                        }
                    }
                    const antecedentTypes = [];
                    let subtypeReduction = false;
                    let firstAntecedentType;
                    for (const antecedent of flow.antecedents) {
                        let flowType;
                        if (!firstAntecedentType) {
                            flowType = firstAntecedentType = getTypeAtFlowNode(antecedent);
                        }
                        else {
                            flowLoopNodes[flowLoopCount] = flow;
                            flowLoopKeys[flowLoopCount] = key2;
                            flowLoopTypes[flowLoopCount] = antecedentTypes;
                            flowLoopCount++;
                            const saveFlowTypeCache = flowTypeCache;
                            flowTypeCache = void 0;
                            flowType = getTypeAtFlowNode(antecedent);
                            flowTypeCache = saveFlowTypeCache;
                            flowLoopCount--;
                            const cached2 = cache.get(key2);
                            if (cached2) {
                                return cached2;
                            }
                        }
                        const type = getTypeFromFlowType(flowType);
                        pushIfUnique(antecedentTypes, type);
                        if (!isTypeSubsetOf(type, declaredType)) {
                            subtypeReduction = true;
                        }
                        if (type === declaredType) {
                            break;
                        }
                    }
                    const result = getUnionOrEvolvingArrayType(antecedentTypes, subtypeReduction ? 2 /* Subtype */ : 1 /* Literal */);
                    if (isIncomplete(firstAntecedentType)) {
                        return createFlowType(result, 
                        /*incomplete*/
                        true);
                    }
                    cache.set(key2, result);
                    return result;
                }