function getTypeAtFlowArrayMutation(flow) {
                    if (declaredType === autoType || declaredType === autoArrayType) {
                        const node = flow.node;
                        const expr = node.kind === 210 /* CallExpression */ ? node.expression.expression : node.left.expression;
                        if (isMatchingReference(reference, getReferenceCandidate(expr))) {
                            const flowType = getTypeAtFlowNode(flow.antecedent);
                            const type = getTypeFromFlowType(flowType);
                            if (getObjectFlags(type) & 256 /* EvolvingArray */) {
                                let evolvedType2 = type;
                                if (node.kind === 210 /* CallExpression */) {
                                    for (const arg of node.arguments) {
                                        evolvedType2 = addEvolvingArrayElementType(evolvedType2, arg);
                                    }
                                }
                                else {
                                    const indexType = getContextFreeTypeOfExpression(node.left.argumentExpression);
                                    if (isTypeAssignableToKind(indexType, 296 /* NumberLike */)) {
                                        evolvedType2 = addEvolvingArrayElementType(evolvedType2, node.right);
                                    }
                                }
                                return evolvedType2 === type ? flowType : createFlowType(evolvedType2, isIncomplete(flowType));
                            }
                            return flowType;
                        }
                    }
                    return void 0;
                }