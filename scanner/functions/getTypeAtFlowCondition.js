function getTypeAtFlowCondition(flow) {
                    const flowType = getTypeAtFlowNode(flow.antecedent);
                    const type = getTypeFromFlowType(flowType);
                    if (type.flags & 131072 /* Never */) {
                        return flowType;
                    }
                    const assumeTrue = (flow.flags & 32 /* TrueCondition */) !== 0;
                    const nonEvolvingType = finalizeEvolvingArrayType(type);
                    const narrowedType = narrowType(nonEvolvingType, flow.node, assumeTrue);
                    if (narrowedType === nonEvolvingType) {
                        return flowType;
                    }
                    return createFlowType(narrowedType, isIncomplete(flowType));
                }