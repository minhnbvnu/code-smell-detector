function getTypeAtFlowAssignment(flow) {
                    const node = flow.node;
                    if (isMatchingReference(reference, node)) {
                        if (!isReachableFlowNode(flow)) {
                            return unreachableNeverType;
                        }
                        if (getAssignmentTargetKind(node) === 2 /* Compound */) {
                            const flowType = getTypeAtFlowNode(flow.antecedent);
                            return createFlowType(getBaseTypeOfLiteralType(getTypeFromFlowType(flowType)), isIncomplete(flowType));
                        }
                        if (declaredType === autoType || declaredType === autoArrayType) {
                            if (isEmptyArrayAssignment(node)) {
                                return getEvolvingArrayType(neverType);
                            }
                            const assignedType = getWidenedLiteralType(getInitialOrAssignedType(flow));
                            return isTypeAssignableTo(assignedType, declaredType) ? assignedType : anyArrayType;
                        }
                        if (declaredType.flags & 1048576 /* Union */) {
                            return getAssignmentReducedType(declaredType, getInitialOrAssignedType(flow));
                        }
                        return declaredType;
                    }
                    if (containsMatchingReference(reference, node)) {
                        if (!isReachableFlowNode(flow)) {
                            return unreachableNeverType;
                        }
                        if (isVariableDeclaration(node) && (isInJSFile(node) || isVarConst(node))) {
                            const init = getDeclaredExpandoInitializer(node);
                            if (init && (init.kind === 215 /* FunctionExpression */ || init.kind === 216 /* ArrowFunction */)) {
                                return getTypeAtFlowNode(flow.antecedent);
                            }
                        }
                        return declaredType;
                    }
                    if (isVariableDeclaration(node) && node.parent.parent.kind === 246 /* ForInStatement */ && (isMatchingReference(reference, node.parent.parent.expression) || optionalChainContainsReference(node.parent.parent.expression, reference))) {
                        return getNonNullableTypeIfNeeded(finalizeEvolvingArrayType(getTypeFromFlowType(getTypeAtFlowNode(flow.antecedent))));
                    }
                    return void 0;
                }