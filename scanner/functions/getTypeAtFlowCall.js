function getTypeAtFlowCall(flow) {
                    const signature = getEffectsSignature(flow.node);
                    if (signature) {
                        const predicate = getTypePredicateOfSignature(signature);
                        if (predicate && (predicate.kind === 2 /* AssertsThis */ || predicate.kind === 3 /* AssertsIdentifier */)) {
                            const flowType = getTypeAtFlowNode(flow.antecedent);
                            const type = finalizeEvolvingArrayType(getTypeFromFlowType(flowType));
                            const narrowedType = predicate.type ? narrowTypeByTypePredicate(type, predicate, flow.node, 
                            /*assumeTrue*/
                            true) : predicate.kind === 3 /* AssertsIdentifier */ && predicate.parameterIndex >= 0 && predicate.parameterIndex < flow.node.arguments.length ? narrowTypeByAssertion(type, flow.node.arguments[predicate.parameterIndex]) : type;
                            return narrowedType === type ? flowType : createFlowType(narrowedType, isIncomplete(flowType));
                        }
                        if (getReturnTypeOfSignature(signature).flags & 131072 /* Never */) {
                            return unreachableNeverType;
                        }
                    }
                    return void 0;
                }