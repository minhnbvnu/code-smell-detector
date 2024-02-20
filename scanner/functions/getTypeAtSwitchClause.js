function getTypeAtSwitchClause(flow) {
                    const expr = flow.switchStatement.expression;
                    const flowType = getTypeAtFlowNode(flow.antecedent);
                    let type = getTypeFromFlowType(flowType);
                    if (isMatchingReference(reference, expr)) {
                        type = narrowTypeBySwitchOnDiscriminant(type, flow.switchStatement, flow.clauseStart, flow.clauseEnd);
                    }
                    else if (expr.kind === 218 /* TypeOfExpression */ && isMatchingReference(reference, expr.expression)) {
                        type = narrowTypeBySwitchOnTypeOf(type, flow.switchStatement, flow.clauseStart, flow.clauseEnd);
                    }
                    else {
                        if (strictNullChecks) {
                            if (optionalChainContainsReference(expr, reference)) {
                                type = narrowTypeBySwitchOptionalChainContainment(type, flow.switchStatement, flow.clauseStart, flow.clauseEnd, (t) => !(t.flags & (32768 /* Undefined */ | 131072 /* Never */)));
                            }
                            else if (expr.kind === 218 /* TypeOfExpression */ && optionalChainContainsReference(expr.expression, reference)) {
                                type = narrowTypeBySwitchOptionalChainContainment(type, flow.switchStatement, flow.clauseStart, flow.clauseEnd, (t) => !(t.flags & 131072 /* Never */ || t.flags & 128 /* StringLiteral */ && t.value === "undefined"));
                            }
                        }
                        const access = getDiscriminantPropertyAccess(expr, type);
                        if (access) {
                            type = narrowTypeBySwitchOnDiscriminantProperty(type, access, flow.switchStatement, flow.clauseStart, flow.clauseEnd);
                        }
                    }
                    return createFlowType(type, isIncomplete(flowType));
                }